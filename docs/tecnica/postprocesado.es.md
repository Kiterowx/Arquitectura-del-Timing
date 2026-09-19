# Herramientas de post-timing {#post-timing-tools}

Después de revisar la voz, se añaden márgenes y se ajustan los eventos a la imagen y a sus vecinos. Una pasada en bloque resuelve cambios repetidos; las herramientas individuales atienden las excepciones. Los motivos de cada decisión se explican en [fundamentos de post-timing](../fundamentos/post-timing.md).

## Aplicar una pasada en bloque {#apply-a-batch-pass}

**Kite Timing**, dentro de Chrono Suite, añade lead-in, lead-out y cadenas a la selección. Sus valores predeterminados difieren de los que usa Auto Timing al detectar y ajustar:

| Parámetro de Kite Timing | Valor |
| --- | ---: |
| Lead-in / máximo | 150 / 300 ms |
| Lead-out / máximo | 350 / 600 ms |
| Lead-out al encadenar | 500 ms |
| Hueco máximo de cadena | 800 ms |

Se aplica sobre eventos ya situados contra la voz. Si falta una sílaba o el evento sigue a otro hablante, corrige primero ese intervalo.

**Post actual**, en [Auto Timing](motor.md), aplica el cierre de Chrono a los tiempos presentes. El **Timing Post-Processor (TPP)** de Aegisub ofrece otra pasada en bloque. Cada herramienta tiene criterios y valores propios. Elige la que se adapta al episodio y comprueba los márgenes existentes antes de ejecutar otra pasada.

## Mover un borde {#adjust-one-edge}

Los ajustes de lead de Chrono mueven el inicio o el final seleccionado por un paso fijo, inicialmente de 100 ms. Respetan las cadenas con hueco cero: mover el inicio arrastra el final anterior encadenado; mover el final arrastra el inicio siguiente. Con un hueco positivo, el borde se detiene al alcanzar al vecino.

Revisa ambos eventos tras el movimiento. Conservar la cadena todavía exige comprobar que cada texto tenga su tiempo de lectura.

## Ajustar a un corte {#snap-toward-a-cut}

El snap direccional lleva un borde al keyframe anterior o siguiente dentro de la distancia configurada. Se aplica después de evaluar una marca como `MISSED-START-KF` o `MISSED-END-KF`: la auditoría señala el candidato y el modificador ejecuta el ajuste elegido.

`edge_snap_protect_ms` tiene un valor inicial de 250 ms y limita la búsqueda direccional. La valoración del borde sigue a cargo de quien revisa; comprueba voz y lectura antes de aceptar el movimiento.

**Bidirectional Snapping** busca el keyframe más cercano a cada inicio y final seleccionado dentro de su rango, de dos fotogramas por defecto. Sirve para desviaciones pequeñas en bordes que ya deberían coincidir con esos cortes.

Un desfase constante pide desplazar tiempos. Si el error crece, hay que revisar velocidad, edición o timecodes. Una conversión de 24 a 25 fps altera la relación temporal del episodio y requiere resolver esa sincronía antes del snap local. Consulta la [tabla de duración por fotograma](../fundamentos/criterios.md#frames-and-milliseconds).

## Cerrar un hueco con intención {#close-a-gap-deliberately}

**Chain Left** extiende el inicio al final del evento anterior. **Chain Right** extiende el final al inicio del siguiente. Dejan hueco cero cuando el movimiento cabe en la distancia máxima configurada.

`SHORT-GAP` señala posible parpadeo; `LARGE-GAP` pide revisar la separación. Escucha el pasaje antes de encadenar y conserva una pausa expresiva aunque la herramienta permita cerrarla.

## Terminar con las excepciones {#finish-with-the-exceptions}

Después de la pasada en bloque, revisa entradas con poco tiempo de lectura, salidas que no aprovecharon un corte útil y huecos cercanos al límite de cadena automática. Reproduce cada ajuste con sus vecinos a velocidad normal y ejecuta la [auditoría](auditoria.md) para localizar lo pendiente.
