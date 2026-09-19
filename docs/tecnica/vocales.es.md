# Preparar y extraer las vocales {#prepare-the-vocal-track}

La pista de *vocales* es la salida **Vocals** que entrega un separador: las voces que consigue aislar de la música y los efectos. Puede contener diálogo, canto, respiraciones y varios hablantes a la vez. Facilita la identificación de los ataques y cierres de las frases. Conserva la mezcla original para comprobar lo que el modelo haya quitado o deformado.

## Qué archivo necesita cada paso {#which-file-goes-where}

| Archivo | Contenido | Uso |
| --- | --- | --- |
| `01.mkv` | Video original del episodio. | Aegisub y SCXvid, para imagen y cortes. |
| `01_mix.wav` | Pista de audio elegida, todavía con música y efectos. | Entrada del separador y referencia de escucha. |
| `01.wav` | Voces separadas, con el mismo origen temporal que el video. | Generadores de audio y escucha auxiliar en Aegisub. |
| `01.waveform.json` | Resumen de picos de `01.wav`. | Auto Timing → Lazy; onda opcional para Busy; ChronoSplit y SubWave. |
| Silencios, VAD, flux y envelope | Mediciones obtenidas de `01.wav`. | Campos correspondientes de Auto Timing → Archivos Busy. Legacy usa los silencios. |

Auto Timing lee los archivos de señales. Abrir un WAV en Aegisub no genera el JSON ni lo carga automáticamente en la macro. El WAV tampoco incluye texto ni identifica qué voz corresponde a cada línea.

## 1. Extraer la pista correcta {#extract-the-correct-audio-track}

Instala [FFmpeg y FFprobe](https://ffmpeg.org/download.html) y ejecuta desde la carpeta del episodio, en PowerShell:

```powershell
ffprobe -v error -select_streams a -show_entries stream=index,codec_name,channels,start_time:stream_tags=language,title -of json '01.mkv'
ffmpeg -n -i '01.mkv' -map 0:a:0 -vn -ac 2 -ar 44100 -c:a pcm_s16le '01_mix.wav'
```

`0:a:0` selecciona la primera pista de audio, `0:a:1` la segunda. El índice absoluto que muestra FFprobe puede ser distinto: `-map 0:2` seleccionaría el stream 2 del contenedor. Escucha un fragmento para confirmar idioma y edición.

El ejemplo decodifica la mezcla a WAV estéreo. No separa voces ni necesita que reduzcas antes el audio a 16 kHz: los generadores preparan sus propias mediciones. `-n` evita sobrescribir un WAV existente. Los separadores pueden trabajar a una frecuencia distinta; cambiarla correctamente no debe cambiar la velocidad del audio.

Mantén la línea de tiempo completa, incluidos los silencios del principio. Si hay un desfase declarado entre audio y video, una extracción a WAV puede perder esa referencia del contenedor. Mide y corrige ese desfase antes de generar señales; no des por hecho que dos archivos de duración semejante empiezan juntos.

## 2. Elegir un separador gratuito {#choose-a-free-separator}

### UVR {#uvr-desktop-interface}

[Ultimate Vocal Remover](https://github.com/Anjok07/ultimatevocalremovergui) ofrece una interfaz de escritorio. El instalador incluye sus dependencias; no usa el entorno de Python de Chrono Generators.

1. Elige `01_mix.wav` como entrada y una carpeta de salida distinta.
2. Selecciona un modelo que extraiga **Vocals** y descárgalo desde la aplicación si falta.
3. Pide salida WAV. Si activas una sola salida, comprueba que sea **Vocals**.
4. Procesa y escucha la pista vocal antes de usarla para timing.
5. Copia esa pista junto al video y nómbrala `01.wav`.

La ubicación de los controles depende de la versión. Comprueba que la voz conserve sus consonantes y colas. Selecciona **Vocals**; **Instrumental** y **No Vocals** extraen el acompañamiento. Mantén desactivadas las opciones de recorte o cambio de velocidad.

### Demucs {#demucs-command-line}

[Demucs](https://github.com/facebookresearch/demucs) se ejecuta desde consola. El repositorio original está archivado; la instalación en un entorno independiente evita mezclar sus dependencias con las de los generadores. Con Python 3.11 instalado:

```powershell
py -3.11 -m venv .venv-demucs
.\.venv-demucs\Scripts\python.exe -m pip install torch==2.0.1 torchaudio==2.0.2 --index-url https://download.pytorch.org/whl/cpu
.\.venv-demucs\Scripts\python.exe -m pip install 'numpy<2' soundfile 'demucs==4.0.1'
.\.venv-demucs\Scripts\python.exe -m demucs -n htdemucs --two-stems=vocals -d cpu -o separated '01_mix.wav'
Copy-Item -LiteralPath '.\separated\htdemucs\01_mix\vocals.wav' -Destination '.\01.wav'
```

El ejemplo fija este [par de PyTorch y torchaudio](https://pytorch.org/get-started/previous-versions/#v201) porque Demucs 4.0.1 requiere `torchaudio<2.1`; NumPy queda en la rama 1.x. FFmpeg y FFprobe deben estar en el PATH. No actualices este entorno como si fuera el de Chrono.

El comando descarga el modelo en el primer uso y procesa en CPU. Para usar `-d cuda`, necesitas instalar antes una variante de PyTorch compatible con tu GPU. La opción de dos pistas agrupa las fuentes después de separarlas; no promete menos memoria ni menos trabajo.

### Audio Separator {#audio-separator-a-choice-of-models}

[Audio Separator](https://github.com/nomadkaraoke/python-audio-separator) permite elegir entre modelos de varias arquitecturas. Para una instalación en CPU, también en un entorno separado:

```powershell
py -3.11 -m venv .venv-separator
.\.venv-separator\Scripts\python.exe -m pip install 'audio-separator[cpu]'
.\.venv-separator\Scripts\audio-separator.exe --list_models
.\.venv-separator\Scripts\audio-separator.exe '01_mix.wav' --model_filename UVR_MDXNET_KARA_2.onnx --output_format WAV --output_dir separated
```

El proyecto documenta este modelo como ejemplo. Pruébalo con el diálogo antes de procesar el episodio completo. La consola indica los nombres de salida. Escoge el WAV **Vocals**, compruébalo y cópialo como `01.wav`. Los modelos se descargan en el primer uso; los requisitos de GPU dependen del backend elegido.

## 3. Comprobar la separación y la sincronía {#check-the-result-and-its-synchronization}

Antes de procesar una serie completa, prueba escenas con voz suave, consonantes iniciales y finales largos. Compara el resultado con la mezcla original para detectar voz perdida, música residual o una respiración convertida en un falso ataque.

```powershell
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 '01_mix.wav'
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 '01.wav'
```

La duración ayuda a detectar recortes. Para confirmar sincronía, compara un ataque reconocible al principio, otro a mitad y otro al final del episodio contra el video. Un error constante sugiere un desplazamiento; uno que crece obliga a revisar velocidad, frecuencia de muestreo o edición. Si el separador recorta silencios, cambia velocidad o introduce un desplazamiento, corrige la pista y vuelve a generar todas las señales.

Una pista central de una mezcla multicanal puede facilitar la escucha, pero no es necesariamente voz aislada. Si la separación destruye una frase, revisa ese tramo con la mezcla original y ajústalo a mano.

## 4. Generar solo lo que vas a usar {#generate-only-what-you-will-use}

Para Lazy, ejecuta **Waveform JSON.bat** sobre `01.wav`. Para Busy, añade **Silence Retimes.bat** y **RMS Envelope.bat**. **Spectral Features.bat** queda como consulta. **Generate All.bat** produce las nueve señales cuando están preparados el video, el WAV y todas las dependencias.

Continúa con [Generadores de señales](generadores.md) para instalar y ejecutar, y con [Motor de timing](motor.md) para cargar cada salida en Auto Timing. Comprueba la detección en **Voz bruta** antes de aplicar márgenes al episodio.
