// ui/app.js - Controlador de Interfaz y Vinculación de Capas

import { MemoryClassRepository } from '../repository/memoryRepository.js';
import { BookingUseCase } from '../usecase/booking.js';

// Inicialización de la arquitectura
const repository = new MemoryClassRepository();
const bookingApp = new BookingUseCase(repository);

// Usuaria simulada (Lucía Gómez - User Persona)
const currentUser = { id: 'usr_lucia', name: 'Lucía Gómez' };

document.addEventListener('DOMContentLoaded', async () => {
  // Publicar aviso urgente inicial (Requisito Tarea 3)
  bookingApp.publishNotice('Sala cambiada a Studio B para la clase de las 19:00', 'HIGH');
  
  renderNotice();
  await renderClasses();
});

// Renderizar el banner de aviso urgente
function renderNotice() {
  const notice = bookingApp.getActiveNotice();
  const banner = document.getElementById('notice-banner');
  const noticeText = document.getElementById('notice-text');
  const noticeTime = document.getElementById('notice-time');

  if (notice && banner) {
    noticeText.textContent = notice.message;
    noticeTime.textContent = notice.timestamp;
    banner.classList.remove('hidden');
  }
}

// Renderizar las tarjetas de clases vespertinas
async function renderClasses() {
  const container = document.getElementById('classes-container');
  if (!container) return;

  const classes = await bookingApp.getAvailableClasses();
  container.innerHTML = '';

  classes.forEach(yogaClass => {
    const isFull = yogaClass.isFull();
    const isUserAttending = yogaClass.attendees.includes(currentUser.id);
    const isUserWaitlisted = yogaClass.waitlist.includes(currentUser.id);

    const card = document.createElement('div');
    card.className = 'bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between space-y-3';

    let statusBadge = '';
    if (isUserAttending) {
      statusBadge = `<span class="bg-emerald-100 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-semibold">Tu plaza está reservada</span>`;
    } else if (isUserWaitlisted) {
      statusBadge = `<span class="bg-amber-100 text-amber-700 text-xs px-2.5 py-1 rounded-full font-semibold">En Lista de Espera</span>`;
    } else if (isFull) {
      statusBadge = `<span class="bg-rose-100 text-rose-700 text-xs px-2.5 py-1 rounded-full font-semibold">Cupo Completo (${yogaClass.attendees.length}/${yogaClass.capacity})</span>`;
    } else {
      statusBadge = `<span class="bg-salviaLight text-salviaDark text-xs px-2.5 py-1 rounded-full font-semibold">Plazas Disponibles (${yogaClass.attendees.length}/${yogaClass.capacity})</span>`;
    }

    card.innerHTML = `
      <div class="flex justify-between items-start">
        <div>
          <h3 class="font-bold text-slate-800 text-base">${yogaClass.title}</h3>
          <p class="text-xs text-slate-500">Instructora: ${yogaClass.instructor} • ${yogaClass.schedule}</p>
        </div>
        ${statusBadge}
      </div>
      <div class="flex gap-2 pt-2 border-t border-slate-50">
        ${
          isUserAttending || isUserWaitlisted
            ? `<button onclick="handleCancel('${yogaClass.id}')" class="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold py-2 px-3 rounded-lg transition">Cancelar Reserva</button>`
            : `<button onclick="handleReserve('${yogaClass.id}')" class="w-full bg-salvia hover:bg-salviaDark text-white text-xs font-semibold py-2 px-3 rounded-lg transition">${isFull ? 'Unirse a Lista de Espera' : 'Reservar Clase'}</button>`
        }
      </div>
    `;

    container.appendChild(card);
  });
}

// Handlers globales para interactuar desde el HTML
window.handleReserve = async (classId) => {
  const result = await bookingApp.reserveSpot(classId, currentUser);
  alert(result.message);
  await renderClasses();
};

window.handleCancel = async (classId) => {
  const result = await bookingApp.cancelSpot(classId, currentUser.id);
  alert(result.message);
  await renderClasses();
};