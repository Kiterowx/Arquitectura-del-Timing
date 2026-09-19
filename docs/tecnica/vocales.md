# Prepare the vocal track

The *vocal track* is the **Vocals** stem produced by a source separator: the voices it can isolate from music and effects. It may contain dialogue, singing, breathing, several speakers, and residual noise. It makes speech boundaries easier to see. Keep the original mix to check anything the model removes or distorts.

## Which file goes where?

| File | Contents | Use |
| --- | --- | --- |
| `01.mkv` | Original episode video. | Picture in Aegisub; scene analysis in SCXvid. |
| `01_mix.wav` | Selected audio track, including music and effects. | Separator input and listening reference. |
| `01.wav` | Separated voices on the video's timeline. | Audio generators and reference listening in Aegisub. |
| `01.waveform.json` | Min/max peaks from `01.wav`. | Lazy, optional waveform for Busy, ChronoSplit, and SubWave. |
| Silence, VAD, flux, and envelope files | Measurements from `01.wav`. | Their fields in **Busy Files...**; Legacy uses the silence logs. |

Auto Timing reads analysis files. Opening a WAV in Aegisub does not generate or load a waveform JSON, and the audio alone cannot tell the macro which sentence belongs to which cue.

## Extract the correct audio track

Install [FFmpeg and FFprobe](https://ffmpeg.org/download.html). In PowerShell, run these commands from the episode folder:

```powershell
ffprobe -v error -select_streams a -show_entries stream=index,codec_name,channels,start_time:stream_tags=language,title -of json '01.mkv'
ffmpeg -n -i '01.mkv' -map 0:a:0 -vn -ac 2 -ar 44100 -c:a pcm_s16le '01_mix.wav'
```

`0:a:0` selects the first audio track; `0:a:1` selects the second. FFprobe also shows absolute stream indexes: `-map 0:2` would select container stream 2. Listen to a sample to confirm the language and edition.

This decodes a stereo WAV; it does not separate the voices. Keep the full timeline, including opening silence. `-n` prevents overwriting an existing WAV. There is no need to downsample to 16 kHz beforehand; the generators prepare their own inputs.

If the container specifies an audio/video offset, a plain WAV can lose that timing reference. Measure and correct the offset before generating analysis files. Matching durations alone do not prove that two tracks start together.

## Choose a free separator

### UVR: desktop interface

[Ultimate Vocal Remover](https://github.com/Anjok07/ultimatevocalremovergui) provides a desktop application. Its installer supplies its dependencies separately from the Python environment used by Chrono Generators.

1. Select `01_mix.wav` and a separate output folder.
2. Choose a model that extracts **Vocals** and download it in the application if needed.
3. Choose WAV output. If exporting just one stem, make sure it is **Vocals**.
4. Process the track and listen to the result.
5. Copy the vocal WAV beside the video and name it `01.wav`.

Control placement varies by version. Check that consonants and sentence endings are intact. **Instrumental** or **No Vocals** is the wrong output for this workflow. Do not enable trimming or playback-speed changes.

### Demucs: command line

The original [Demucs repository](https://github.com/facebookresearch/demucs) is archived. Install Demucs in its own environment because its dependencies differ from those of the generators. With Python 3.11 installed:

```powershell
py -3.11 -m venv .venv-demucs
.\.venv-demucs\Scripts\python.exe -m pip install torch==2.0.1 torchaudio==2.0.2 --index-url https://download.pytorch.org/whl/cpu
.\.venv-demucs\Scripts\python.exe -m pip install 'numpy<2' soundfile 'demucs==4.0.1'
.\.venv-demucs\Scripts\python.exe -m demucs -n htdemucs --two-stems=vocals -d cpu -o separated '01_mix.wav'
Copy-Item -LiteralPath '.\separated\htdemucs\01_mix\vocals.wav' -Destination '.\01.wav'
```

This uses a [matched PyTorch/torchaudio pair](https://pytorch.org/get-started/previous-versions/#v201) because Demucs 4.0.1 requires `torchaudio<2.1`. NumPy stays on 1.x. FFmpeg and FFprobe must be on PATH; do not upgrade this environment as if it were Chrono's.

The command downloads the model on first use and runs on CPU. For `-d cuda`, install a PyTorch build compatible with your GPU first. The two-stem option combines separated sources afterward; it does not guarantee lower memory use or less work.

### Audio Separator: a choice of models

[Audio Separator](https://github.com/nomadkaraoke/python-audio-separator) supports models from several architectures. Here is a CPU setup in a separate environment:

```powershell
py -3.11 -m venv .venv-separator
.\.venv-separator\Scripts\python.exe -m pip install 'audio-separator[cpu]'
.\.venv-separator\Scripts\audio-separator.exe --list_models
.\.venv-separator\Scripts\audio-separator.exe '01_mix.wav' --model_filename UVR_MDXNET_KARA_2.onnx --output_format WAV --output_dir separated
```

The project documents this model as an example. Test it on your dialogue before processing the full episode. Read the output filenames in the console, select the **Vocals** WAV, and check it before copying it to `01.wav`. Models download on first use; GPU requirements depend on the chosen backend.

## Check the result and its synchronization

Before processing a series, test quiet speech, initial consonants, and long vocal tails. Compare them with the mix for missing speech, residual music, and false attacks caused by breathing or separation artifacts.

```powershell
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 '01_mix.wav'
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 '01.wav'
```

Duration checks catch obvious trimming. To confirm synchronization, compare a recognizable attack near the start, middle, and end against the video. A constant error suggests an offset; a growing error calls for checking speed, sample-rate handling, or the source edition. Correct the track first, then regenerate all analysis files derived from it.

A center channel from a multichannel mix can help with listening, but it is not necessarily isolated dialogue. If separation damages a phrase, use the original mix and time that passage by hand.

## Generate only what you will use

For Lazy, run **Waveform JSON.bat** on `01.wav`. For Busy, add **Silence Retimes.bat** and **RMS Envelope.bat**. **Spectral Features.bat** produces optional reference data. **Generate All.bat** makes all nine outputs when the video, vocal WAV, and required tools are available.

Continue with [generator setup](generadores.md) and [Auto Timing](motor.md). Check the detection in **Raw voice** before adding padding across an episode.
