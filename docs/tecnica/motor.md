# Auto Timing

**Auto Timing**, part of [Chrono Suite](https://github.com/Kiterowx/Kite-Aegisub-Scripts/blob/main/docs/ChronoSuite.md), adjusts cues that already sit near their dialogue. It does not transcribe, translate, or recognize characters. If every cue starts at zero, or the subtitles belong to another edition, place them against the correct audio first.

## Choose a method

| Method | Input | Aegisub dependencies |
| --- | --- | --- |
| Lazy | Vocal `.waveform.json`. | Chrono Suite; waveform detection does not need `kite.Timing`. |
| Busy | Silence, VAD, flux, envelope, and/or waveform JSON. | Chrono Suite and `kite.Timing`. |
| Legacy... | One or more silence logs. | Chrono Suite and `kite.Timing`. |

Lazy detects activity from waveform amplitude. A [vocal stem](vocales.md) reduces the chance of following music or effects instead. Busy combines measurements, but still does not recognize the sentence. Legacy adapts the silence-based method from [Lazytimer Pocket-sized](https://github.com/Kiterowx/lazytimer-pocket-sized).

The spectral TSV is for inspection and has no Auto Timing input field. Open the WAV in Aegisub for listening; the methods read their analysis files rather than analyzing Aegisub's loaded audio directly.

## Start with a short Lazy pass

1. Save a copy of the ASS. Open the matching video and vocal WAV in Aegisub.
2. Select a few cues already placed approximately over their dialogue.
3. Open **Chrono Suite → Auto Timing**, or the suite's individual **Autotiming** action.
4. Select **Lazy** and load `01.waveform.json` in **Waveform JSON**.
5. Confirm the scope and style filter. Select **Raw voice** and run the pass.
6. Listen to the starts and ends. Correct a misplaced cue before widening search settings for the whole episode.

Waveforms are cached during the session. After regenerating the JSON on disk, enable **Reload waveform cache** so the macro reads the new file.

## Load the Busy inputs

Install or update `kite.Timing` through DependencyControl. Select **Busy**, then open **Busy Files...** and load the matching episode's files.

| Input | Example file |
| --- | --- |
| Silence −30 | `01_Retimes_30.txt` |
| Silence −40 | `01_Retimes_40.txt` |
| Silence −50 | `01_Retimes_50.txt` |
| VAD | `01_Retimes_vad.tsv` |
| Flux | `01_Retimes_flux.tsv` |
| Envelope | `01_envelope.tsv` |

You can search by filename beside the subtitle or choose paths in the dialog. Recheck them when changing episodes. The optional waveform JSON is loaded in the main dialog; its amplitude envelope replaces the TSV envelope in the current module. They do not count as two independent energy measurements.

Busy accepts partial inputs, including a waveform, but flux onsets alone do not define complete speech intervals. Start with the available signals and inspect **Raw voice** results. The [algorithm notes](../algoritmos/index.md) explain the vote.

Busy searches within each cue's existing interval. If the first consonant falls before the current start, move that start earlier before rerunning detection. **Search ± (ms)** and the threshold and cleanup controls belong to Lazy; changing them does not widen Busy's search.

## Choose the processing mode

| Mode | Result | Keyframes |
| --- | --- | --- |
| Raw voice | Detected speech boundaries without padding. | Not used. |
| Full + polish | Detection followed by padding, chaining, and snapping. | Must be loaded in Aegisub. |
| Post current | Post-timing applied to the current cue times, without new detection. | Must be loaded in Aegisub. |

Load `01_keyframes.log` through Aegisub's **Video → Open Keyframes** command. The **Waveform JSON** field does not accept that log. Check the cuts and video timecodes before a full pass.

Keep a copy of the raw timing. Running **Post current** repeatedly can add padding to boundaries that already include it.

A cue marked `[TM-NOVOICE]` is left unchanged by **Post current**. Correct its initial placement and rerun detection before using that mode to add margins.

## Legacy opens a separate dialog

Choose **Legacy...**, load its silence logs, and select Cluster, Table, or LazyFusion. **Silences only (ignore method)** forces LazyFusion and disables auxiliary VAD and flux. Otherwise, Legacy can reuse those auxiliary files from **Busy Files...**, depending on the method. This route runs without video keyframes or the three modes above and can leave `[LZ …]` tags. See the [method comparison](../algoritmos/index.md#legacy-and-chronos-final-pass) before choosing a search distance.

## Detection settings and padding

In Lazy, **Search ± (ms)** expands the window around each cue; zero restricts it to the existing interval. **Smoothing (ms)** reduces brief peaks. **Auto threshold (Otsu)** separates amplitude classes; turning it off uses a threshold between percentiles. **Bridge gaps ≤ (ms)**, **Drop islands < (ms)**, and **Trim small edge spill** clean the activity mask. Excessive cleanup can erase a consonant or merge different voices.

Chrono's final pass starts with 120 ms lead-in and 420 ms lead-out. Its 400/800 ms maxima guide chaining; other rules can extend a margin beyond them. Keyframe searches first look up to 400 ms before the speech onset and 800 ms after the ending. **Voice-cut limit (ms)**, initially 100 ms, also allows an inward snap at either edge. Check any removed speech against the audio.

The pass tries to reach 500 ms duration and flags reading speeds above 28 CPS. The CPS flag does not trigger an extension. The [final-pass notes](../algoritmos/index.md#chronos-final-pass) explain how the adjustments interact.

## Review the result

Look in **Effect** for `[TM-…]` warnings about missing voice, weak matches, overlap, short duration, or high CPS. Check the adjusted cues and their neighbors with the vocal track, then with the original mix. Neighbor constraints only include dialogue within the chosen scope and filters, so inspect the boundaries of the selection against untouched cues. Signs and songs need their own timing decisions.

Continue with [post-timing tools](postprocesado.md) or the [audit](auditoria.md).
