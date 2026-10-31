// usecase/booking.js - Casos de Uso de Aplicación

export class BookingUseCase {
  constructor(classRepository) {
    this.repository = classRepository;
    this.currentNotice = null; // Banner de aviso urgente (Tarea 3)
  }

  async getAvailableClasses() {
    return await this.repository.getAllClasses();
  }

  async reserveSpot(classId, user) {
    const yogaClass = await this.repository.getClassById(classId);
    if (!yogaClass) throw new Error('Clase no encontrada.');
    
    const result = yogaClass.addAttendee(user);
    await this.repository.save(yogaClass);
    return result;
  }

  async cancelSpot(classId, userId) {
    const yogaClass = await this.repository.getClassById(classId);
    if (!yogaClass) throw new Error('Clase no encontrada.');

    const result = yogaClass.cancelReservation(userId);
    await this.repository.save(yogaClass);
    return result;
  }

  // Caso de uso: Publicar Aviso Urgente por la Instructora (Tarea 3)
  publishNotice(message, priority = 'HIGH') {
    this.currentNotice = {
      id: Date.now(),
      message: message,
      priority: priority,
      timestamp: new Date().toLocaleTimeString()
    };
    return this.currentNotice;
  }

  getActiveNotice() {
    return this.currentNotice;
  }
}