# How the automation works

These notes describe [Chrono Suite 1.5.3](https://github.com/Kiterowx/Kite-Aegisub-Scripts/blob/main/Macros/kite.ChronoSuite.lua) and [kite.Timing 1.4.3](https://github.com/Kiterowx/Kite-Aegisub-Scripts/blob/main/Modules/kite/Timing.lua). Detection estimates where speech occurs; post-timing changes how long the subtitle stays on screen. Their results need separate checks.

## Start with an approximately placed cue

The existing start `s` and end `e` define where the detector can look. Place the cue over its own dialogue first. A window containing another speaker can produce convincing boundaries for the wrong line.

| Method | Search area | Consequence |
| --- | --- | --- |
| Lazy | The current interval, expanded by **Search ± (ms)**; the default expansion is zero. | A wider window can recover a missed onset, but can also include another utterance. |
| Busy | The current interval, with the final detected edges clamped to it. | Increasing Lazy's search setting does not expand Busy's window. |
| Legacy | Depends on the method in its separate dialog. | Check whether the method can move outward or only trim inward. |

For example, if a cue begins at 1200 ms but its first consonant starts at 1150 ms, Busy cannot recover those missing 50 ms. Move the original start earlier before detecting again. Lazy with 100 ms of extra search could include that consonant, provided it survives the amplitude threshold and cleanup.

```text
approximately placed cue + analysis files
    → estimated speech interval
    → padding, scene snapping, and chaining, if enabled
    → visible timing and review markers
```

## Lazy: amplitude and a threshold

Lazy reads the first peak level in the waveform JSON and takes the larger absolute value from each min/max pair. A moving average smooths this amplitude envelope over 10 ms by default. The RMS generator measures a different quantity.

With Otsu enabled, Lazy transforms the smoothed values with `log(1 + amplitude)`, bounds the histogram with the 1st and 99th percentiles, and uses 96 bins. It chooses the threshold that maximizes separation between two classes:

```text
θ* = argmaxθ ω0(θ) · ω1(θ) · (μ0(θ) − μ1(θ))²
```

Here `ω` is the fraction of samples in each class and `μ` its mean. These are amplitude classes: a loud effect can enter the active class as readily as speech. With Otsu disabled, the current code uses a fixed interpolation between the 5th and 95th percentiles of the smoothed amplitude:

```text
θ = P5 + 0.12 · (P95 − P5)
active[n] = smoothed_amplitude[n] ≥ θ
```

The resulting mask is processed in this order:

1. Bridge internal gaps up to 60 ms by default.
2. Remove remaining active islands shorter than 60 ms by default.
3. If edge trimming is enabled, discard eligible small, isolated components near the original cue's edges. This test considers their position, mass, and separation from the main activity.
4. Return the first and last edges of the components left in the window. Internal pauses remain inside that interval.

A wider search can therefore merge two utterances into one result. More aggressive cleanup can remove a quiet consonant or a short reaction. Compare those sounds with the original mix when the vocal stem or threshold makes them disappear.

## Busy: a weighted interval vote

Busy converts each silence log into complementary activity intervals and combines them with VAD regions and, when usable, an envelope. Each source contributes a weight:

| Source | Weight |
| --- | ---: |
| VAD | 1.00 |
| Silence −30 dB | 0.90 |
| Silence −40 dB | 0.85 |
| Silence −50 dB | 0.60 |
| Envelope | 1.00 |

The initial threshold is half the total participating weight:

```text
vote(t) = Σ_i weight_i · activity_indicator_i(t)
active(t) = vote(t) ≥ 0.50 · Σ_i weight_i
```

With all five sources participating, the total is 4.35 and the threshold is 2.175. The three silence sources alone contribute 2.35 when all indicate activity, so they can pass even where VAD is inactive. These measurements come from the same audio and can share residual music or noise. The vote is not a probability of speech.

The envelope contributes when enough samples and variation are available. Its threshold lies 35% of the way between reference levels near the 10th and 90th percentiles. A loaded waveform JSON replaces the RMS TSV with a smoothed amplitude envelope. The inputs have different units and the code uses their values directly, so switching between them can change the result.

### From active regions to speech boundaries {#busy-boundaries}

Busy filters runs shorter than 50 ms, retaining the original runs if that would remove every candidate. It bridges gaps up to 320 ms, then chooses an anchor using:

```text
score = overlap_duration + 0.2 · region_duration
```

The candidates have already been clipped to the original cue. Their overlap equals their duration, so this selects the longest merged region. Adjacent regions can join it when their separation is at most 900 ms and each added region lasts at least 120 ms. A long original window can consequently absorb separate phrases.

The edges are refined using silence boundaries, envelope crossings, and nearby flux events. VADFlux exports **onsets only**: it supplies no flux offsets for the ending. The spectral TSV is not an input to Busy. In a full pass, an ending that reaches the original window limit can also move to a keyframe within the last 150 ms of that window.

If the first attempt produces no usable interval, Chrono retries with a 0.38 vote fraction, 480 ms bridging, and looser run and pause limits. A weak result alone does not trigger this retry. Reaching the search limit or finding disagreement between boundary sources can produce a weak marker; listen there for clipped speech or the wrong speaker.

## Legacy and Chrono's final pass

Legacy adapts Lazytimer Pocket-sized in a separate dialog:

| Legacy method | How it chooses boundaries |
| --- | --- |
| Cluster | Scores and groups nearby silence boundaries within the search distance, using proximity, silence duration, and source confidence. Loaded VAD and flux can add evidence. |
| Table | Uses the first available silence log in the order −40, −30, −50 dB, builds activity groups, and trims within the original interval. |
| LazyFusion | Combines silence information to choose boundaries within the original interval; loaded flux can refine them. |

**Silences only** forces LazyFusion and disables auxiliary VAD and flux, regardless of the selected method. Otherwise, Legacy can reuse auxiliary files loaded through **Busy Files...**. Legacy uses neither video keyframes nor the modes below, and leaves `[LZ …]` markers when marking is enabled.

### Chrono's final pass {#chronos-final-pass}

Lazy and Busy share these modes:

| Mode | Operation |
| --- | --- |
| Raw voice | Writes detected speech boundaries without padding. |
| Full + polish | Detects speech, then applies padding, snapping, and chaining. |
| Post current | Uses the existing edges as speech boundaries and applies the same final pass. |

Full and Post require keyframes loaded in Aegisub. Their base padding is 120 ms before speech and 420 ms after it. Start snapping first looks up to 400 ms before the onset; end snapping first looks up to 800 ms after the ending. **Voice-cut limit**, 100 ms by default, also permits a start after the detected onset or an end before the detected ending. Listen to those inward moves: the algorithm cannot decide whether the removed sound is expendable.

The planner reconciles neighboring cues, preferring usable shared keyframes and resolving padding overlaps where possible. The 400/800 ms maximum lead-in/out settings guide chaining allowances. Preserving an original cut, handling a short gap, or pursuing the minimum duration can produce margins beyond those settings.

The 500 ms duration target is attempted afterward, extending the end first when possible. A remaining short cue is flagged. The 28 CPS check also adds a marker; it does not lengthen a cue until a target reading speed is reached.

Neighbor handling uses the dialogue cues included in the chosen scope and filters. Cues outside that set do not constrain the pass. Review the first and last adjusted cues against untouched neighbors, and inspect overlaps that remain where speech intervals conflict.

**Post current** can add padding again when rerun on already padded times. It also preserves a previous `[TM-NOVOICE]` result without adjusting that cue. After correcting the initial interval, rerun detection to check it; a post-timing pass cannot recover that speech by itself.

## Estimating padding in an existing timing pass

This is a manual comparison for choosing settings; Auto Timing does not estimate inherited padding with a median or MAD. Compare several clear cue boundaries `(a, b)` with measured speech `(α, β)`:

```text
δ_in  = α − a
δ_out = b − β
MAD = median(|δ − median(δ)|)
```

For cues without snapping, overlap, or other exceptions, the median differences suggest the usual margins. MAD describes their spread. Lead-ins of 110, 120, 120, 130, and 400 ms have a median of 120 ms and a MAD of 10 ms. Inspect the 400 ms case: it may reflect a cut or a misplaced start. A small spread in one scene does not establish a pattern for the episode, and a zero MAD does not make every difference an error.

Compare the proposed settings with a selection checked by hand. Note which first consonants disappear, which unrelated sounds are included, and which pauses become part of a cue. Those differences tell you whether to change a detector setting, move the initial window, or revisit the segmentation.
