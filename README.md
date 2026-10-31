# Yoga Flow — Sistema de Gestión Operativa y Reservas

Aplicación web para el estudio de yoga "Yoga Flow", orientada a automatizar la reserva de clases vespertinas, control de cupos en tiempo real, gestión de listas de espera y difusión de avisos urgentes[cite: 6].

---

## 🏗️ Arquitectura del Proyecto (Clean Architecture)

El proyecto sigue una estructura desacoplada basada en los principios de **Clean Architecture**, asegurando mantenibilidad, escalabilidad y separación de responsabilidades[cite: 6]:

- **`domain`**: Contiene las entidades de negocio puras (`domain/class.js`) y las reglas de validación y **sanitización de entradas** contra ataques de inyección[cite: 6].
- **`usecase`**: Agrupa la lógica de aplicación específica (`usecase/booking.js`), como los procesos de reserva, cancelación y publicación de avisos urgentes[cite: 6].
- **`repository`**: Gestiona el acceso a los datos de forma abstracta en memoria (`repository/memoryRepository.js`)[cite: 6].
- **`ui`**: Capa de interfaz adaptada a las directrices de marca, compuesta por `index.html` (con directivas de seguridad **CSP**) y el controlador de eventos `eventosfront.js`[cite: 2, 3, 6].

---

## 🔒 Seguridad y Principio "Zero Trust"

La aplicación incorpora medidas estrictas de blindaje para proteger el frontend y la lógica de negocio:
- **Sanitización de Datos en Dominio:** Filtrado activo de cadenas en las entidades de negocio para neutralizar cualquier intento de inyección de código (XSS).
- **Content-Security-Policy (CSP):** Cabecera de seguridad implementada en el HTML para restringir la ejecución de scripts externos no autorizados.
- **Estilos Modulares:** Integración optimizada de Tailwind CSS mediante CDN con configuración personalizada de colores corporativos[cite: 6].

---

## 📑 Documentación y Especificaciones (SDD)

El desarrollo del proyecto está guiado por la metodología **Spec-Driven Development (SDD)**[cite: 6]:

- `contexto-persistente.md`: Definición global del problema y reglas de arquitectura[cite: 6].
- `brand-skill.md`: Guía de diseño visual (colores verde salvia, grises y estética minimalista)[cite: 6].
- `icp-user-persona.md`: Perfil del cliente ideal (ICP) y User Persona (*Lucía Gómez*)[cite: 6].
- `especificacion-feature.md`: Especificación del control de cupos vespertinos y lista de espera[cite: 6].
- `especificacion-tarea3.md`: Especificación de avisos urgentes y notificaciones de lista de espera[cite: 6].

---

## 🚀 Despliegue y Versiones

- **Control de Versiones:** Historial de commits atómicos rigurosos y sincronización continua con la rama `main` en GitHub[cite: 6].
- **Entorno de Ejecución:** Vanilla JavaScript (ES Modules) nativo para máxima velocidad y ligereza sin necesidad de compiladores complejos.