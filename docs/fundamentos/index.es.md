# Fundamentos del timing {#timing-fundamentals}

Cada evento se evalúa según la voz, el tiempo necesario para leer, la imagen y los subtítulos vecinos. La onda puede ayudar a encontrar un ataque tenue. La lectura y la escena permiten comprobar si la frase se sigue con comodidad o si aparece antes de su momento narrativo.

Esta sección explica esas decisiones. El [flujo de trabajo](../tecnica/flujo.md) muestra cómo aplicarlas con Aegisub y Chrono Suite.

## Orden de lectura {#read-in-order}

1. [Inicio y final](teoria.md): qué resuelve cada borde.
2. [Segmentar el diálogo](segmentacion.md): decidir qué contiene cada evento.
3. [Timing bruto](raw-timing.md): localizar el primer y el último sonido hablado.
4. [Resolver prioridades](filosofia.md): lectura, voz, cortes y continuidad.
5. [Post-timing](post-timing.md): añadir márgenes, ajustar a cortes y cerrar huecos que distraen.
6. [Decisiones de timing](casos.md): situaciones frecuentes y sus excepciones.
7. [Casos avanzados](casos-avanzados.md): desvanecimientos, revelación progresiva, reacciones y voces simultáneas.
8. [Valores de revisión](criterios.md): CPS, duración y cálculos por fotogramas.
9. [Glosario](glosario.md): términos de la guía.

## Aspectos que revisar {#what-i-check}

| Aspecto | Pregunta |
| --- | --- |
| Voz | ¿Dónde empieza y termina el habla representada por este evento? |
| Lectura | ¿Hay tiempo para comprender el texto visible? |
| Imagen | ¿Un corte cercano cambia dónde debe aparecer el subtítulo? |
| Continuidad | ¿Resulta natural el paso entre los eventos vecinos? |

Un **evento** es un subtítulo temporizado; un **renglón** es una fila de texto en pantalla. Un subtítulo de dos renglones puede seguir siendo un solo evento. Aegisub también llama «líneas» a las filas de su lista de eventos.
