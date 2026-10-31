# Yoga Flow — Sistema de Gestión Operativa y Reservas

Aplicación web de alta disponibilidad para el estudio de yoga "Yoga Flow", orientada a automatizar la reserva de clases vespertinas, control de cupos en tiempo real, gestión de listas de espera y difusión de avisos urgentes para la instructora Andrea.

---

## 🏗️ Arquitectura del Proyecto (Clean Architecture)

El proyecto sigue una estructura desacoplada basada en los principios de **Clean Architecture**, asegurando mantenibilidad, escalabilidad y facilidad de pruebas:

- **`domain`**: Contiene las entidades de negocio puras (por ejemplo, las reglas de las clases de yoga, los estados de los cupos y la lógica de la lista de espera). Es la capa más interna y no depende de ninguna tecnología externa.
- **`usecase`**: Agrupa la lógica de aplicación específica (como el proceso de reservar una clase, cancelar un cupo o enviar un aviso urgente). Orquesta el flujo de datos desde y hacia el dominio.
- **`repository`**: Gestiona el acceso a los datos, almacenamiento local, llamadas a API o persistencia de estado para que la aplicación recuerde las reservas y funcione de manera fluida.
- **`ui`**: Componentes visuales adaptados a nuestras directrices de marca (`brand-skill.md`), diseñados con enfoque móvil-primero (React/Tailwind CSS) para que la instructora Andrea y usuarias como Lucía Gómez interactúen sin fricciones.

---

## 📑 Documentación y Especificaciones (SDD)

El desarrollo del proyecto está guiado por la metodología **Spec-Driven Development (SDD)**:

- `contexto-persistente.md`: Definición global del problema y reglas de arquitectura.
- `brand-skill.md`: Guía de diseño visual (colores verde salvia, grises y estética minimalista).
- `icp-user-persona.md`: Perfil del cliente ideal (ICP) y User Persona (*Lucía Gómez*).
- `especificacion-feature.md`: Especificación del control de cupos vespertinos y lista de espera.
- `especificacion-tarea3.md`: Especificación de avisos urgentes y notificaciones de lista de espera.
- `sesion-1-resumen.md`: Fundamentos de Product Engineering con IA.

---

## 🚀 Despliegue e Infraestructura

- **Control de Versiones:** Estrategia de ramas (`main`, pruebas y producción).
- **Contenedorización:** Docker para garantizar entornos reproducibles de desarrollo y producción.
- **CI/CD:** Pipelines con GitHub Actions para pruebas automatizadas y escaneo de seguridad.