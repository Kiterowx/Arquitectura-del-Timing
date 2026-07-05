# Fase técnica

La fase técnica instrumenta el timing: toma el criterio establecido
en Fundamentos y lo rodea de evidencia medible y de operaciones repetibles, para
reservar la atención a las decisiones difíciles.

El trabajo se reparte en tres capas que se comunican por archivos. Cada capa
produce algo que la siguiente lee, y cada archivo intermedio queda en disco para
poder inspeccionarse, rehacerse o auditarse.

## Las tres capas

**Generadores.** Un conjunto de archivos por lotes convierte el material del
episodio —video para escena y pista vocal para diálogo— en señales:
keyframes de escena, silencios a varios umbrales, regiones de voz, ataques
espectrales, energía RMS y una onda comprimida. Son procesos externos al editor;
se ejecutan una vez por episodio y dejan sus salidas junto al video.

**[Chrono Suite](https://github.com/Kitherow/Kite-Aegisub-Scripts/blob/main/docs/ChronoSuite.md).** Una suite de macros para Aegisub que consume esas señales
dentro del editor. Auto Timing coordina las rutas Lazy, Busy y Legacy, propone
bordes a partir de la voz detectada, los pule con márgenes, snaps y cadenas,
audita riesgos y limpia el guion. La detección multiseñal de Busy se apoya en un
módulo de cronometraje complementario. Legacy conserva la familia de
[Lazytimer Pocket-sized](https://github.com/Kitherow/lazytimer-pocket-sized) como ruta por silencios.
Todo ocurre sobre las líneas reales del subtítulo, con deshacer disponible en cada paso.

**Material visual.** La onda comprimida sirve para estudiar un caso difícil fuera
del editor, documentarlo o explicarlo, y el editor web
[SubWave](web.md) corrige el pegado directamente sobre ella desde el
navegador. Es la capa donde un problema ambiguo se aísla, se mira con calma y se
resuelve antes de repetir la decisión en producción.

La jerarquía de Fundamentos sigue mandando por encima de las tres. Una señal
fuerte sugiere un borde; la persona confirma que ese borde respeta lectura, voz,
escena y continuidad. Ninguna automatización cierra una línea por su cuenta.



## Recorrido de un episodio

El orden habitual avanza de lo bruto a lo revisado:

1. Se prepara una carpeta de trabajo con el video, el subtítulo base y la pista vocal.
2. Se dividen las líneas que contienen dos frases separables, con las utilidades de la suite.
3. Se generan las señales del episodio en una sola pasada por lotes.
4. Se cargan audio, video y keyframes en el editor.
5. Se pega el timing primario a la voz, a mano o con el cronometraje automático, hasta dejar cada línea sobre su voz.
6. Se aplica el post-timing —a mano en orden inverso, o automático— para los márgenes, la escena y la continuidad.
7. Se audita el episodio por familias de riesgo.
8. Se estudian con la onda comprimida los casos que siguen sin resolverse.
9. Se revisa el resultado como espectador y se cierra con cada marca corregida o justificada.

Cada uno de esos pasos tiene su página. El detalle de las herramientas y la lectura de las
señales viven en [Generadores de señales](generadores.md) y [Motor de timing](motor.md); el
cierre, en [Auditoría y marcadores](auditoria.md). El fundamento algorítmico de los procesos
automáticos se desarrolla en [Algoritmos y automatización](../algoritmos/index.md).

## Entorno mínimo

El entorno mínimo combina el editor, los binarios de procesamiento de audio y
video, y los detectores especializados.

- **Aegisub** con audio, video, keyframes y soporte de macros Lua. Es donde vive Chrono Suite y donde se aplican todos los cambios.
- **[FFmpeg y FFprobe](https://ffmpeg.org/download.html)** en el PATH. FFmpeg decodifica y normaliza el audio y mide silencios; FFprobe extrae la energía RMS cuadro a cuadro.
- **SCXvid** como ejecutable accesible, que el generador de keyframes usa para marcar los cambios de escena cuando el contenedor no trae keyframes utilizables.
- **vadflux.exe**, ejecutable que el generador de silencios usa para las regiones de habla y los picos de flux sobre el audio normalizado. La carpeta de generadores incluye `Build VADFlux.bat` para construirlo.
- **Python** para `Features Espectrales.bat`, `Waveform JSON.bat` y `Procesar Todo.bat`, con NumPy para las funciones espectrales. Para compilar `vadflux.exe` se añaden PyInstaller, torch, torchaudio, librosa, soundfile y numba.
- **[UVR](https://github.com/Anjok07/ultimatevocalremovergui)** —Ultimate Vocal Remover, una aplicación de escritorio— para separar la voz de la música en una pista propia. La pista vocal es parte del flujo de generación de señales: silencios, detección de voz, flux, espectro, envelope y onda comprimida deben leerse sobre diálogo aislado cuando se busca medir habla.

La decisión entre trabajo manual y trabajo automático depende del costo real de cada
workflow. Si generar vocales, señales y archivos auxiliares tarda más que pegar el episodio
a mano, el método manual es la ruta eficiente. Si las señales ya se producen rápido y el
equipo está preparado, el método automático ahorra tiempo en la repetición. Ambos caminos
deben terminar en el mismo resultado: un timing pegado a la voz, legible, alineado con la
escena y revisado con criterio.
