// domain/class.js - Entidades y Reglas de Negocio Puras

export class YogaClass {
  constructor(id, title, instructor, schedule, capacity = 15) {
    this.id = id;
    this.title = title;
    this.instructor = instructor;
    this.schedule = schedule;
    this.capacity = capacity;
    this.attendees = [];
    this.waitlist = [];
  }

  isFull() {
    return this.attendees.length >= this.capacity;
  }

  addAttendee(user) {
    if (this.isFull()) {
      if (!this.waitlist.includes(user.id)) {
        this.waitlist.push(user.id);
        return { status: 'WAITLISTED', message: 'Cupo lleno. Añadida a lista de espera.' };
      }
      return { status: 'ALREADY_IN_WAITLIST', message: 'Ya estás en la lista de espera.' };
    }
    
    this.attendees.push(user.id);
    return { status: 'RESERVED', message: 'Reserva confirmada con éxito.' };
  }

  cancelReservation(userId) {
    const attendeeIndex = this.attendees.indexOf(userId);
    if (attendeeIndex !== -1) {
      this.attendees.splice(attendeeIndex, 1);
      
      // Promoción automática de la lista de espera (Requisito Tarea 3)
      let promotedUser = null;
      if (this.waitlist.length > 0) {
        promotedUser = this.waitlist.shift();
        this.attendees.push(promotedUser);
      }
      
      return { 
        status: 'CANCELLED', 
        promotedUser: promotedUser,
        message: promotedUser 
          ? `Reserva cancelada. ¡Cupo liberado asignado automáticamente!` 
          : 'Reserva cancelada.' 
      };
    }
    return { status: 'NOT_FOUND', message: 'El usuario no tenía reserva activa.' };
  }
}