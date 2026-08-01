# Flujo de trabajo

Un episodio avanza de material bruto a tiempos revisados pasando por una serie de
estados, cada uno con una salida concreta en disco. Esa traza importa: si algo sale
mal, se sabe en qué paso, y rehacer uno no obliga a rehacer los anteriores. El
recorrido combina trabajo de texto, generación de señales fuera del editor y
cronometraje dentro de él, en este orden.

<div class="tg-steps">
<div class="st"><span class="k">01</span><span class="h">Preparar</span><span class="d">Carpeta con el video, el subtítulo base y la pista vocal.</span></div>
<div class="st"><span class="k">02</span><span class="h">Dividir</span><span class="d">Partir las líneas con dos frases separables.</span></div>
<div class="st"><span class="k">03</span><span class="h">Señales</span><span class="d">Separar la voz y generar las señales del episodio.</span></div>
<div class="st"><span class="k">04</span><span class="h">Editor</span><span class="d">Cargar audio, video y keyframes en Aegisub.</span></div>
<div class="st"><span class="k">05</span><span class="h">Timing</span><span class="d">Pegado primario, a mano o automático, y post-timing.</span></div>
<div class="st"><span class="k">06</span><span class="h">Auditar y cerrar</span><span class="d">Marcar riesgos, resolver y revisar como espectador.</span></div>
</div>

## Preparar el material

Cada episodio vive en su propia carpeta de trabajo, con el video, el subtítulo base y la
pista vocal separada. Más tarde se añaden las señales que se generen. La numeración empareja
los tres archivos —`01.mkv`, `01.wav`, `01.ass`— para que los generadores reconozcan solos
las entradas y las salidas.

## Dividir las frases

Antes de tocar tiempos finos se localizan las líneas con dos frases separables y se
parten, con las utilidades de [división de líneas](division-lineas.md). Resolver la
segmentación primero evita pegar un timing que después habría que rehacer al partir la
línea. El formato se protege extrayendo las etiquetas antes de dividir y
reinsertándolas al terminar.

## Separar la voz y generar señales

La voz se separa en una pista propia con UVR antes de generar señales. El video aporta
exclusivamente los keyframes de escena; `01.wav`, la pista vocal, aporta silencios a tres
umbrales, detección de voz, flux, mapa espectral, energía RMS y onda comprimida. Cada BAT
rechaza la clase de entrada que no le corresponde. **Procesar Todo** empareja `01.mkv` y
`01.wav` y los dirige a sus rutas respectivas.

<div class="tg-files">
<div class="f"><span class="fn">01_keyframes.log</span><span class="fd">cambios de escena</span></div>
<div class="f"><span class="fn">01_Retimes_30/40/50.txt</span><span class="fd">silencios a tres umbrales</span></div>
<div class="f"><span class="fn">01_Retimes_vad.tsv</span><span class="fd">regiones de voz</span></div>
<div class="f"><span class="fn">01_Retimes_flux.tsv</span><span class="fd">ataques de flux</span></div>
<div class="f"><span class="fn">01_Retimes_spectrum.tsv</span><span class="fd">mapa espectral de consulta</span></div>
<div class="f"><span class="fn">01_envelope.tsv</span><span class="fd">energía RMS de la voz</span></div>
<div class="f"><span class="fn">01.waveform.json</span><span class="fd">onda comprimida</span></div>
</div>

El detalle de cada generador y de los archivos que produce está en
[Generadores](generadores.md).

## Cargar el editor

En Aegisub se abre el subtítulo, se carga la pista vocal y
el video, y se cargan los keyframes externos cuando el video no trae los suyos. Antes
de empezar conviene confirmar el framerate y que audio y video estén sincronizados,
porque todo el trabajo de escena depende de esa correspondencia.

![Menú de audio del editor](../assets/post-images/22_imagen_embebida_1.png){ loading=lazy }

## Timing primario

El timing primario es el pegado conceptual: llevar cada línea a la voz que subtitula y
dejar el intervalo desnudo que describe [Raw timing](../fundamentos/raw-timing.md). Dos
vías paralelas persiguen ese mismo resultado. A mano se consigue escuchando los ataques y
mirando la onda, línea por línea, dentro de Aegisub o sobre el [editor web de la onda](web.md),
que corrige el pegado desde el navegador y devuelve el `.ass` intacto en todo lo demás. El
**cronometraje automático** llega al mismo punto por su cuenta: el [motor de timing](motor.md)
lee las señales y lleva cada borde a la voz detectada.

La vía se elige por economía de trabajo. Si el equipo ya produce vocales y señales con
rapidez, automatizar reduce tiempo repetitivo. Si preparar esos archivos cuesta más que
resolver el episodio a oído y vista, el pegado manual es la ruta directa. La diferencia es
operativa, no de objetivo: ambos caminos deben entregar el mismo intervalo pegado a la voz,
listo para el post-timing.

El modo que corresponde a este pegado es la **voz bruta**, que sitúa cada línea en el inicio
y el final de la voz y se detiene ahí, sin márgenes ni keyframes. Según el material se elige
cómo detecta el motor —la onda comprimida para diálogo limpio, la combinación multiseñal
para escenas difíciles—. El resultado, a mano o automático, es el mismo intervalo pegado a
la voz, listo para el post-timing.

## Post-timing

El post-timing toma ese intervalo de voz y añade lo que la voz no contiene: los márgenes de
lectura, la alineación con la escena y la continuidad con las vecinas. Se hace a mano o de
forma automática, y ambas comparten los criterios de
[Post-timing](../fundamentos/post-timing.md).

A mano, cada borde se decide desde cero: cuánto aire pide la entrada, cómo trata el final un
corte cercano, si el hueco con la vecina se encadena o se respeta. Conviene recorrer la
selección en orden inverso —de la última línea a la primera—, porque el margen final de una
línea depende de dónde empieza la siguiente: fijado antes el inicio de la línea *n+1*, se ve
cuánto puede extenderse el final de la *n* sin invadirla. Los ajustes de
[postprocesado](postprocesado.md) mueven cada borde respetando esa continuidad.

De forma automática, la misma lógica de márgenes se aplica en bloque: el modo **post actual**
del [motor de timing](motor.md) sobre tiempos ya pegados, el post-procesador nativo de
Aegisub (**TPP**) o **Kite Timing**. Los dos automáticos —el del pegado y el del
post-timing— son el mismo [motor de timing](motor.md) en modos distintos: voz bruta para
pegar, post actual para pulir.

## Auditar el episodio

Con el timing asentado se audita el episodio por familias de riesgo, según
[Auditoría y marcadores](auditoria.md). Cada marca termina corregida o justificada. Los
casos que aún se resisten se aíslan y se estudian con la [onda comprimida](web.md), y la
decisión que de ahí salga se repite en producción.

## Cerrar

El cierre es una revisión como espectador, de principio a fin, que confirma que el
ritmo del episodio se sostiene como una sola experiencia.

## El entorno

El flujo necesita el editor, los binarios de audio y video, y los detectores
especializados, todos accesibles desde la línea de comandos o el PATH:

- **Aegisub**, donde se edita el subtítulo y se ejecuta la suite de macros.
- **[FFmpeg y FFprobe](https://ffmpeg.org/download.html)**, para decodificar y normalizar el audio, medir silencios y extraer la energía RMS.
- **SCXvid**, para los keyframes de escena.
- **vadflux.exe**, para la detección de voz y el flux; `Build VADFlux.bat` lo construye desde la propia carpeta de generadores.
- **Python**, con NumPy para las funciones espectrales, para `Features Espectrales.bat`, `Waveform JSON.bat` y `Procesar Todo.bat`. Para construir `vadflux.exe` hacen falta PyInstaller, torch, torchaudio, librosa, soundfile y numba.
- **[UVR](https://github.com/Anjok07/ultimatevocalremovergui)**, para separar la voz en una pista vocal limpia antes de generar señales de diálogo.

Antes de empezar conviene confirmar que las piezas básicas responden:

```powershell
ffmpeg -version
ffprobe -version
python --version
vadflux.exe --help
```

Los detectores —el ejecutable de keyframes y `vadflux.exe`— deben estar en el
PATH o junto a los archivos por lotes que los invocan; si una pasada de generación
informa de que no encuentra uno, ahí está el ajuste necesario.
