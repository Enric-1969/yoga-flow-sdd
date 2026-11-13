import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { YogaClass } from '../domain/class.js';
import { BookingUseCase } from '../usecase/booking.js';

describe('Yoga Flow - Dominio y Casos de Uso (SDD)', () => {
  it('debe sanitizar entradas maliciosas XSS en YogaClass', () => {
    const malicioso = '<script>alert("xss")</script>';
    const limpio = YogaClass.sanitizeInput(malicioso);
    assert.equal(limpio, '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
  });

  it('debe gestionar reservas, lista de espera y promoción automática vía BookingUseCase', async () => {
    const clase = new YogaClass('c1', 'Hatha Yoga', 'Andrea', '18:00', 1);
    const fakeRepo = {
      getClassById: async (id) => (id === 'c1' ? clase : null),
      save: async () => {},
      getAllClasses: async () => [clase],
    };

    const useCase = new BookingUseCase(fakeRepo);

    // 1. Primera reserva ocupa el único cupo
    const r1 = await useCase.reserveSpot('c1', { id: 'lucia' });
    assert.equal(r1.status, 'RESERVED');

    // 2. Segunda reserva pasa automáticamente a lista de espera
    const r2 = await useCase.reserveSpot('c1', { id: 'elena' });
    assert.equal(r2.status, 'WAITLISTED');

    // 3. Cancelación promociona automáticamente a Elena
    const cancel = await useCase.cancelSpot('c1', 'lucia');
    assert.equal(cancel.status, 'CANCELLED');
    assert.equal(cancel.promotedUser, 'elena');
    assert.deepEqual(clase.attendees, ['elena']);
  });

  it('debe lanzar error al intentar reservar en una clase inexistente', async () => {
    const emptyRepo = { getClassById: async () => null };
    const useCase = new BookingUseCase(emptyRepo);

    await assert.rejects(() => useCase.reserveSpot('no-existe', { id: 'lucia' }), /Clase no encontrada/);
  });

  it('debe publicar y recuperar el banner de aviso urgente (Tarea 3)', () => {
    const useCase = new BookingUseCase({});
    assert.equal(useCase.getActiveNotice(), null);

    const notice = useCase.publishNotice('Las clases de hoy serán en la sala B');
    assert.equal(notice.message, 'Las clases de hoy serán en la sala B');
    assert.equal(useCase.getActiveNotice().priority, 'HIGH');
  });
});
