# Motor de timing {#auto-timing}

**Auto Timing**, dentro de [Chrono Suite](https://github.com/Kiterowx/Kite-Aegisub-Scripts/blob/main/docs/es/ChronoSuite.md), reajusta líneas que ya están cerca de su diálogo. La macro no transcribe, no traduce y no sabe qué personaje habla. Si todas las líneas empiezan en cero o pertenecen a otra edición, primero hay que ubicarlas sobre el audio correcto.

## Qué necesita cada método {#choose-a-method}

| Ruta | Archivos | Dependencias en Aegisub |
| --- | --- | --- |
| Lazy | `.waveform.json` del WAV vocal. | Chrono Suite; no necesita `kite.Timing` para detectar sobre la onda. |
| Busy | Silencios, VAD, flux, envelope y/o JSON de onda. | Chrono Suite y `kite.Timing`. |
| Legacy… | Uno o varios archivos de silencios. | Chrono Suite y `kite.Timing`. |

Lazy mide actividad a partir de la amplitud de la onda. Una [pista vocal](vocales.md) reduce el riesgo de que siga música o efectos de la mezcla completa. Busy combina señales y permite contrastarlas, pero tampoco reconoce el contenido de la frase. Legacy adapta el método por silencios de [Lazytimer Pocket-sized](https://github.com/Kiterowx/lazytimer-pocket-sized).

`_Retimes_spectrum.tsv` es material de consulta. La ventana de Auto Timing no tiene un campo para cargarlo. El WAV se abre en Aegisub para escuchar; los métodos leen los archivos de señales, no ese audio cargado directamente.

## Primera pasada con Lazy {#start-with-a-short-lazy-pass}

1. Guarda una copia del ASS. Abre el video y el WAV vocal de la misma edición en Aegisub.
2. Selecciona unas líneas que ya cubran aproximadamente su diálogo.
3. Abre **Chrono Suite** y pulsa **Auto Timing**; también existe el acceso **Autotiming** entre las acciones individuales de la suite.
4. Elige **Lazy** y carga `01.waveform.json` en **Waveform JSON**.
5. Comprueba el alcance y el filtro de estilos. Elige **Voz bruta** y ejecuta.
6. Escucha entradas y salidas. Corrige una ventana mal situada antes de ampliar los parámetros para todo el episodio.

La onda se conserva en caché durante la sesión. Si regeneras el archivo en disco, activa **Recargar caché de onda** para releerlo.

## Cargar Busy {#load-the-busy-inputs}

Instala o actualiza `kite.Timing` mediante DependencyControl. En Auto Timing, elige **Busy** y abre **Archivos Busy…**:

| Campo | Archivo de ejemplo |
| --- | --- |
| Silencio −30 | `01_Retimes_30.txt` |
| Silencio −40 | `01_Retimes_40.txt` |
| Silencio −50 | `01_Retimes_50.txt` |
| VAD | `01_Retimes_vad.tsv` |
| Flux | `01_Retimes_flux.tsv` |
| Envelope | `01_envelope.tsv` |

Puedes buscar los archivos por nombre junto al subtítulo o elegirlos desde el diálogo. Revisa las rutas al cambiar de episodio. El JSON opcional se carga en la ventana principal; en el módulo actual, su envolvente toma el lugar del envelope TSV cuando se proporciona. No cuentan como dos medidas independientes de energía.

Busy admite entradas parciales, incluso una onda, pero un archivo de ataques de flux por sí solo no delimita frases completas. Empieza con las señales disponibles y comprueba el resultado en **Voz bruta**. La explicación del cálculo está en [Algoritmos y automatización](../algoritmos/index.md).

Busy busca dentro del intervalo existente de cada evento. Si la primera consonante queda antes de su inicio, adelanta ese borde antes de repetir la detección. **Buscar ±** y los controles de umbral y limpieza pertenecen a Lazy; cambiarlos no amplía la búsqueda de Busy.

## Modos de Lazy y Busy {#choose-the-processing-mode}

| Modo | Qué hace | Keyframes |
| --- | --- | --- |
| Voz bruta | Estima el inicio y el final de la voz, sin añadir márgenes. | No los usa. |
| Completo + ajuste | Detecta voz y aplica el cierre de márgenes, cadenas y snap. | Requiere los keyframes cargados en Aegisub. |
| Post actual | Parte de los tiempos actuales y aplica ese cierre. | Requiere los keyframes cargados en Aegisub. |

Para usar los cortes de SCXvid, carga `01_keyframes.log` desde **Video → Abrir keyframes**. El campo Waveform JSON no acepta ese log. Revisa los cortes y los timecodes del video antes de ejecutar la pasada completa.

**Post actual** parte de los tiempos presentes; aplicarlo repetidamente puede volver a ampliar líneas que ya tienen márgenes. Conserva una copia del pegado para comparar o reaplicar otra configuración.

Un evento marcado con `[TM-NOVOICE]` queda sin cambios en **Post actual**. Corrige su posición inicial y repite la detección antes de usar ese modo para añadir márgenes.

## Legacy tiene su propia ventana {#legacy-opens-a-separate-dialog}

Pulsa **Legacy…**, carga sus silencios y elige Cluster, Table o LazyFusion. **Solo silencios (ignora el método)** fuerza LazyFusion y desactiva los auxiliares VAD y flux. Si está desmarcado, Legacy puede reutilizar esos archivos de **Archivos Busy…**, según el método. Esta ruta trabaja sin keyframes de video ni los tres modos anteriores y puede dejar etiquetas `[LZ …]`. Consulta la [comparación de métodos](../algoritmos/index.md#legacy-and-chronos-final-pass) antes de elegir la distancia de búsqueda.

## Controles de detección y márgenes {#detection-settings-and-padding}

En Lazy, **Buscar ±** amplía la ventana alrededor de cada línea; a cero analiza solo su intervalo. **Suavizado** reduce picos breves. **Umbral automático (Otsu)** separa dos clases de amplitud; al desactivarlo se calcula un umbral entre percentiles. **Unir huecos**, **Quitar islas** y **Recortar derrames de borde** modifican la máscara de actividad. Un ajuste excesivo puede borrar una consonante o unir voces distintas.

La pasada final de Chrono parte de 120 ms de lead-in y 420 ms de lead-out. Los máximos de 400/800 ms orientan las cadenas; otras reglas pueden ampliar un margen más allá de ellos. La búsqueda de keyframes empieza hasta 400 ms antes del ataque y 800 ms después del final. **Corte de voz máx (ms)**, inicialmente en 100 ms, permite además un snap hacia dentro en cualquiera de los extremos. Escucha la voz que haya quedado fuera.

La pasada intenta alcanzar 500 ms de duración y marca velocidades superiores a 28 CPS. La marca de CPS no activa una ampliación. Las notas sobre la [pasada final](../algoritmos/index.md#chronos-final-pass) explican cómo se relacionan estos ajustes.

## Revisar el resultado {#review-the-result}

Busca en **Effect** las marcas `[TM-…]`: ausencia de voz, coincidencia débil, solape, duración breve o CPS alto. Comprueba los eventos ajustados y sus vecinos con el WAV vocal y después con la mezcla original. Las restricciones de vecindad solo incluyen el diálogo dentro del alcance y los filtros elegidos; revisa los extremos de la selección contra los eventos intactos. Los carteles y las canciones requieren su propio criterio de timing.

Continúa con [Postprocesado](postprocesado.md) para ajustes concretos o con [Auditoría y marcadores](auditoria.md) para revisar el episodio.
