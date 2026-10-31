# Especificación de Característica (SPEC) — Tarea 3: Avisos Urgentes y Lista de Espera Dinámica

## 1. Visión General
Esta especificación define el comportamiento del **Banner de Avisos Urgentes del Día** y la **Promoción Automática en Lista de Espera** para garantizar la continuidad operativa del estudio *Yoga Flow* y mantener informadas a las alumnas en tiempo real[cite: 6].

---

## 2. Criterios de Aceptación (Acceptance Criteria)

### A. Banner de Avisos Urgentes
1. **Visibilidad:** El banner debe permanecer visible en la parte superior de la interfaz de usuario (`ui/index.html`) cuando exista un aviso activo publicado por la administración/instructora[cite: 2, 6].
2. **Formato:** Debe mostrar claramente el texto del mensaje (ej. *"Las clases de hoy serán en la sala B"*) y la hora de emisión[cite: 2].
3. **Estilo:** Seguir las directrices de la guía de marca (`salvia`, tipografía legible y contraste accesible)[cite: 2, 6].

### B. Lista de Espera y Sanitización
1. **Sin Sobreventas:** Cuando una clase alcanza la capacidad máxima (15 alumnas), las nuevas solicitudes de reserva se asignan automáticamente a la `waitlist` en orden de llegada[cite: 6].
2. **Promoción Automática:** Si una usuaria cancela su reserva activa, la primera persona en la `waitlist` se promociona automáticamente a plaza confirmada.
3. **Seguridad (Zero Trust):** Todos los IDs e insumos de texto deben sanitizarse en la entidad del dominio (`YogaClass.sanitizeInput`) para prevenir inyecciones de código (XSS) antes de modificar el estado[cite: 6].

---

## 3. Métricas de Éxito (Success Metrics)

1. **Reducción del Churn de Reservas:** Asignación del 100% de las plazas liberadas a la lista de espera de forma instantánea sin intervención manual.
2. **Tasa de Incidencias Cero por XSS:** 0% de ejecuciones de scripts no autorizados gracias a la combinación de sanitización en dominio y cabeceras CSP (`Content-Security-Policy`) en la capa visual[cite: 6].
3. **Efectividad Informativa:** Disminución de dudas en recepción sobre cambios de sala o avisos de última hora.