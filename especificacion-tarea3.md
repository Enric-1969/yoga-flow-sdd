# Especificación del Feature (Tarea 3): Avisos Urgentes y Notificaciones de Espera

## 1. Definición del Problema
Las alumnas en lista de espera no se enteran a tiempo cuando un cupo se libera por una cancelación de última hora. Asimismo, la instructora Andrea no tiene una forma directa de publicar avisos urgentes (ej. cambio de aula o cancelación por fuerza mayor).

## 2. Diseño de la Solución
Un componente destacado en la parte superior de la aplicación que muestra avisos del día de alta prioridad y una alerta visual e interactiva cuando la lista de espera se activa para la usuaria.

## 3. Criterios de Aceptación Verificables
1. **Banner de Aviso Urgente:** Si la instructora publica una alerta, se muestra un banner superior en verde salvia con la etiqueta `[Aviso del día]`.
2. **Promoción Visual de Lista de Espera:** Cuando una plaza se libera, el primer usuario en lista de espera ve cambiar su tarjeta de clase al estado `¡Cupo disponible para ti!` durante un contador de tiempo determinado.
3. **Persistencia de Estado Local:** El estado de las reservas y cancelaciones se actualiza dinámicamente en el frontend sin recargar la página.
4. **Resistencia a Errores de Conexión:** Si la red cae o es lenta, la interfaz muestra un mensaje de "Modo fuera de línea - Intentando reconectar..." sin bloquear la pantalla ni perder los datos introducidos.

## 4. Métricas de Éxito
- **Tasa de Ocupación:** Incrementar en un 25% la conversión de puestos liberados en lista de espera.
- **Tiempo de Respuesta:** Reducir a menos de 2 segundos la confirmación visual de reserva/cancelación en dispositivos móviles.
