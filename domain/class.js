// domain/class.js - Entidades y Reglas de Negocio Puras con Sanitización

export class YogaClass {
  /**
   * Constructor de la entidad YogaClass.
   * Define el estado inicial de una clase de yoga y sus límites de capacidad.
   */
  constructor(id, title, instructor, schedule, capacity = 15) {
    this.id = id;               // Identificador único de la clase
    this.title = title;         // Título o nombre de la disciplina (ej. Hatha Yoga)
    this.instructor = instructor; // Nombre del instructor a cargo
    this.schedule = schedule;   // Horario de la clase
    this.capacity = capacity;   // Límite máximo de alumnas permitidas (por defecto 15)
    this.attendees = [];        // Lista de IDs de usuarias con reserva confirmada
    this.waitlist = [];         // Lista de espera ordenada por orden de llegada
  }

  /**
   * Método auxiliar estático para desinfectar cualquier entrada de texto contra ataques XSS.
   * Convierte caracteres especiales en entidades HTML seguras para que el navegador 
   * los interprete estrictamente como texto plano y no como código ejecutable.
   */
  static sanitizeInput(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/[&<>"']/g, (match) => {
      const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;'
      };
      return map[match];
    });
  }

  /**
   * Comprueba si la clase ha alcanzado su límite máximo de capacidad.
   * @returns {boolean} True si está llena, false si aún hay plazas libres.
   */
  isFull() {
    return this.attendees.length >= this.capacity;
  }

  /**
   * Gestiona la lógica de inscripción de una usuaria.
   * Valida datos, aplica sanitización, comprueba cupos y gestiona la lista de espera.
   */
  addAttendee(user) {
    // Validación defensiva: Asegurar que el objeto usuario y su ID existan
    if (!user || !user.id) {
      return { status: 'INVALID_USER', message: 'Datos de usuario no válidos.' };
    }

    // Sanitizamos el ID del usuario para evitar inyecciones maliciosas (Zero Trust)
    const safeUserId = YogaClass.sanitizeInput(user.id);

    // Regla de negocio: Si la clase está llena, intentamos meterla en la lista de espera
    if (this.isFull()) {
      if (!this.waitlist.includes(safeUserId)) {
        this.waitlist.push(safeUserId);
        return { status: 'WAITLISTED', message: 'Cupo lleno. Añadida a lista de espera.' };
      }
      return { status: 'ALREADY_IN_WAITLIST', message: 'Ya estás en la lista de espera.' };
    }
    
    // Regla de negocio: Evitar duplicados si la usuaria ya tiene plaza reservada
    if (this.attendees.includes(safeUserId)) {
      return { status: 'ALREADY_RESERVED', message: 'Ya dispones de una reserva activa.' };
    }

    // Si hay espacio y no está duplicada, confirmamos la reserva añadiéndola al array
    this.attendees.push(safeUserId);
    return { status: 'RESERVED', message: 'Reserva confirmada con éxito.' };
  }

  /**
   * Gestiona la cancelación de una reserva y la promoción automática desde la lista de espera.
   */
  cancelReservation(userId) {
    // Sanitizamos el ID de entrada por seguridad
    const safeUserId = YogaClass.sanitizeInput(userId);
    const attendeeIndex = this.attendees.indexOf(safeUserId);
    
    // Si la usuaria tenía una reserva activa, la eliminamos
    if (attendeeIndex !== -1) {
      this.attendees.splice(attendeeIndex, 1);
      
      // Lógica de negocio avanzada: Promoción automática de la lista de espera
      let promotedUser = null;
      if (this.waitlist.length > 0) {
        promotedUser = this.waitlist.shift(); // Saca a la primera persona de la lista de espera
        this.attendees.push(promotedUser);   // La promociona directamente a plazas confirmadas
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