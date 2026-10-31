// repository/memoryRepository.js - Persistencia y Acceso a Datos

import { YogaClass } from '../domain/class.js';

export class MemoryClassRepository {
  constructor() {
    this.classes = new Map();
    this._seedData();
  }

  _seedData() {
    const classVespertina = new YogaClass('c1', 'Hatha Yoga Vespertino', 'Andrea', '19:00 - 20:15', 3);
    // Simular que el cupo vespertino ya está casi completo para probar la lista de espera
    classVespertina.attendees = ['usr_1', 'usr_2', 'usr_3'];
    this.classes.set(classVespertina.id, classVespertina);

    const classSmooth = new YogaClass('c2', 'Vinyasa Flow Suave', 'Andrea', '20:30 - 21:30', 10);
    this.classes.set(classSmooth.id, classSmooth);
  }

  async getAllClasses() {
    return Array.from(this.classes.values());
  }

  async getClassById(id) {
    return this.classes.get(id) || null;
  }

  async save(yogaClass) {
    this.classes.set(yogaClass.id, yogaClass);
    return true;
  }
}