# Generadores de señales {#generate-the-analysis-files}

[Chrono Generators](https://github.com/Kiterowx/Chrono-Generators-Scripts) genera las mediciones que necesita Auto Timing. El video aporta los cortes de escena; el WAV vocal aporta las señales de audio. Los BAT llaman a los scripts Python de `scripts/`, donde cada cálculo tiene una sola implementación.

Si todavía tienes la mezcla con música y efectos, empieza por [Preparar y extraer las vocales](vocales.md). UVR, Demucs y Audio Separator son opciones para producir esa pista; ningún generador separa la voz por sí mismo.

## Requisitos {#requirements}

| Trabajo | Dependencias |
| --- | --- |
| Ejecutar cualquier BAT | Windows y Python de 64 bits, 3.10 o posterior compatible con los paquetes instalados. |
| Onda JSON o envelope RMS | Python y FFmpeg. No requieren NumPy ni PyTorch. |
| Espectro | Python, FFmpeg y `requirements.txt` (NumPy). |
| Silencios, VAD y flux | FFmpeg y `requirements-vad.txt`, o `vadflux.exe` junto a los BAT. |
| Keyframes | FFmpeg y SCXvid de consola. |
| Generate All | Todas las dependencias de generación anteriores. |
| Empaquetar VADFlux | `requirements-build.txt`, que añade PyInstaller; es opcional. |
| Inspeccionar pistas y duración | FFprobe, incluido en las distribuciones habituales de FFmpeg. |

Descarga [FFmpeg desde su página oficial](https://ffmpeg.org/download.html) y [SCXvid standalone desde sus releases](https://github.com/soyokaze/SCXvid-standalone/releases). `ffmpeg.exe` y `SCXvid.exe` pueden estar junto a los BAT o en el PATH. SCXvid debe ser el ejecutable de consola que recibe YUV4MPEG y escribe un log XviD; un plugin de VapourSynth no sustituye ese programa.

Dentro de la carpeta de Chrono Generators, prepara el entorno con PowerShell:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install --upgrade pip
.\.venv\Scripts\python.exe -m pip install -r requirements-vad.txt
```

Para trabajar solo con espectro, instala `requirements.txt`; para la onda o el RMS no hacen falta paquetes adicionales. Los BAT eligen el Python de `.venv` si existe. Conserva la carpeta `scripts/` al copiar los generadores.

`requirements-vad.txt` incluye NumPy, PyTorch, torchaudio, librosa, SoundFile y Numba. VADFlux descarga Silero VAD mediante PyTorch Hub la primera vez y reutiliza su caché. Se ejecuta en CPU. La instalación y la primera descarga necesitan conexión.

`Build VADFlux.bat` permite empaquetar `scripts/vadflux.py` después de instalar `requirements-build.txt`. Los generadores usan ese EXE si está junto a los BAT; si falta, ejecutan el script con Python. El EXE no incluye el modelo de Silero.

## Entradas y salidas {#inputs-and-outputs}

| Generador | Entrada | Salidas | Consumidor |
| --- | --- | --- | --- |
| SCXvid Keyframes | `01.mkv` | `01_keyframes.log` | Keyframes externos en Aegisub. |
| Waveform JSON | `01.wav` | `01.waveform.json` | Lazy, onda opcional de Busy, ChronoSplit y SubWave. |
| Silence Retimes | `01.wav` | `01_Retimes_30.txt`, `_40.txt`, `_50.txt`, `_vad.tsv`, `_flux.tsv` | Busy; Legacy carga los silencios. |
| RMS Envelope | `01.wav` | `01_envelope.tsv` | Envelope de Busy. |
| Spectral Features | `01.wav` | `01_Retimes_spectrum.tsv` | Consulta; no es una entrada de Auto Timing. |
| Generate All | `01.mkv` o `01.wav`, con su pareja presente | Las nueve señales | Preparación conjunta. |

Arrastra los archivos sobre el BAT o ejecútalo desde la consola. Sin argumentos pregunta **Start** y **End**, y busca en la carpeta actual de la consola. Acepta numeración sin ceros o con dos cifras y conserva el nombre encontrado: `1.wav` produce `1.waveform.json`; `01.wav`, `01.waveform.json`. También admite episodios de tres cifras. Evita tener dos variantes del mismo número en una carpeta.

Reconoce los alias exactos `01_vocals.wav` y `vocals_01.wav`, con salida base `01`. En Generate All, el video y el WAV deben compartir esa base; no se emparejan por coincidencias parciales. Si falta uno, se informa del error.

Las salidas quedan junto al material. Tras completar el procesamiento, sustituyen las del mismo nombre. Si falla una herramienta, se conservan las señales anteriores: lee el mensaje final para no confundir un resultado viejo con uno recién generado.

## Qué mide cada señal {#what-the-files-measure}

### Keyframes {#keyframes}

SCXvid analiza los fotogramas y produce un log XviD con candidatos a cambios de plano. Cárgalo como keyframes externos en Aegisub y revisa los cortes en imagen: un keyframe de codificación no equivale necesariamente a un cambio de escena, y un detector también puede omitir cortes o marcar destellos. En video de frecuencia variable, se usan los timecodes del video al convertir fotogramas a tiempos.

### Silencios {#silence-logs}

FFmpeg prepara un WAV temporal mono de 16 kHz, con filtros de paso alto a 80 Hz, paso bajo a 8 kHz y normalización dinámica. Sobre ese audio, `silencedetect` mide pausas de al menos 30 ms con umbrales de −30, −40 y −50 dB.

A −30 dB, un sonido débil puede contarse como silencio; a −50 dB, tiene que ser más débil para quedar debajo del umbral. Compara los tres cuando hay susurros. Los archivos son logs de FFmpeg con `silence_start` y `silence_end` en segundos. Como el audio está normalizado, esos umbrales no describen el nivel de la mezcla original.

### VAD y flux {#vad-and-flux}

Silero VAD estima regiones de habla; el TSV declara `start_ms` y `end_ms`. VADFlux usa un umbral de 0,4, una duración mínima de habla de 80 ms y pausas de 30 ms. No identifica palabras ni hablantes.

librosa obtiene una envolvente de ataques y detecta picos de flux. El archivo declara `time_ms`, `type` y `score`; este generador escribe eventos **onset**. Los finales de voz se contrastan con otras señales. Un ataque musical también puede producir un pico. El salto de análisis es de 10 ms; la posición del pico es una estimación, no el inicio exacto de una consonante.

### Espectro {#spectral-features}

El espectro usa el mismo audio preparado, ventanas de 32 ms y saltos de 10 ms. Escribe energía por bandas, RMS, pico, cruces por cero, centroide, planitud y flux. `speech_p` combina esas medidas con una fórmula heurística: no está calibrado como probabilidad de habla. Permite comparar tramos, pero por sí solo no distingue un susurro de música residual.

### Envelope RMS {#rms-envelope}

FFmpeg mide el RMS por bloque decodificado, sobre el WAV vocal sin la preparación normalizada anterior. La duración de esos bloques depende de la decodificación; no corresponde a los fotogramas del video. Aunque el archivo se llama `.tsv`, conserva dos columnas separadas por comas y sin cabecera: tiempo en segundos y dB RMS. El silencio digital puede aparecer como `-inf`.

### Onda JSON {#waveform-json}

El WAV se decodifica a mono, 48 kHz y 16 bits. Cada punto base resume el mínimo y el máximo de 48 muestras, equivalentes a 1 ms. Los niveles siguientes agrupan puntos para dibujar la onda a distintas escalas. El JSON no contiene sonido reproducible ni reconoce palabras; para escuchar hay que cargar también el audio. El formato se explica en [Onda comprimida y editor web](web.md).

## Contrastar las señales con el audio {#compare-evidence-against-the-audio}

Una región VAD cerca de un ataque de flux y de un cambio en el RMS merece revisión como posible inicio. Su coincidencia no demuestra que pertenezca al personaje de esa línea: todas las señales proceden del mismo audio y pueden compartir errores.

Si el RMS continúa después del VAD, escucha si queda una sílaba, reverberación o una respiración. Si el audio contradice la señal, manda lo que representa el subtítulo. La carga de archivos y los controles están en [Motor de timing](motor.md).
