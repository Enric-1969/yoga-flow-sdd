# Especificación del Feature: Gestión de Cupos Vespertinos

## 1. Definición del Problema
Las clases de la tarde tienen un límite estricto de 12 personas y se llenan con rapidez. Las alumnas que llegan sin lugar se marchan molestas y no existe actualmente un mecanismo automatizado de lista de espera.

## 2. Diseño de la Solución
Un panel interactivo que muestra el estado en tiempo real de cada clase vespertina, visualizando el contador de cupos (ej. `8/12`) y gestionando de forma inteligente el paso de la reserva a la lista de espera digital.

## 3. Criterios de Aceptación Verificables
1. **Visualización de Cupo:** Cada tarjeta de clase muestra de forma explícita el número actual de inscritos en relación con el límite máximo de 12 plazas (ej. `10/12`).
2. **Cambio Automático de Estado:** Si una clase alcanza el límite de 12/12, el botón de acción cambia automáticamente de "Reservar clase" a "Unirse a lista de espera".
3. **Gestión de Cancelaciones:** Si una alumna registrada cancela su asistencia, el sistema libera un cupo y promueve automáticamente al primer miembro de la lista de espera, reflejándolo visualmente en el panel.
4. **Adaptabilidad Móvil:** En pantallas de smartphones, la lista de clases y los botones de reserva se apilan verticalmente para facilitar la interacción táctil con una sola mano.