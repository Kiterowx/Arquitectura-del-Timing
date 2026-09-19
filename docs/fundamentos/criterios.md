# Reading speed and timing limits

A fast cue may need more time, less text, or a better division. A slow one may be following a deliberate pause. Measurements help locate these cases and compare an adjustment with the original; the text and its place in the scene explain which change will help.

## Count characters consistently

Characters per second (CPS) is the character count divided by the duration in seconds. Keep the same counting method when comparing two timings. Chrono's audit and **Count CPS** exclude spaces and recognized punctuation; a count that includes them will be higher for the same subtitle.

“Run, we have to go!” contains 13 letters and 19 characters including spaces and punctuation. At 0.5 seconds, it measures 26 or 38 CPS. At 0.95 seconds, the full character count gives 20 CPS. Those calculations do not tell us whether the longer hold fits the next cue.

## Try the count yourself

Change the text or duration to compare the two counts. This example uses plain text: do not include ASS tags. It counts Unicode code points, so combined accents and emoji sequences may differ from the visible character count in your editor.

<form class="tg-calculator" data-tg-cps>
<label for="cps-text">Subtitle text</label>
<textarea id="cps-text" rows="2">Run, we have to go!</textarea>
<div class="tg-calculator-fields">
<div><label for="cps-duration">Duration (seconds)</label><input id="cps-duration" type="number" min="0.01" step="any" value="0.5" inputmode="decimal" aria-describedby="cps-error"></div>
<div><label for="cps-count">Count</label><select id="cps-count"><option value="all">Include spaces and punctuation</option><option value="letters">Letters and numbers only</option></select></div>
</div>
<output for="cps-text cps-duration cps-count" aria-live="polite"><strong data-cps-result>38.0 CPS</strong><span data-cps-detail>19 characters ÷ 0.50 seconds</span></output>
<p id="cps-error" class="tg-field-error" hidden>Enter a duration greater than zero.</p>
<p class="tg-calculator-note">Use the same count when comparing durations, then read the cue in playback.</p>
<noscript><p>The static example above is 19 ÷ 0.5 = 38 CPS. Enable JavaScript to recalculate after editing.</p></noscript>
</form>

## Suggested review thresholds {#suggested-review-thresholds}

| Measure | Review point | What to check |
| --- | --- | --- |
| Reading speed | Above 20 or below 7 CPS, keeping the count consistent. | Reading load or an unnecessarily long hold. |
| Short duration | About 700–833 ms. | Whether the cue flashes past before it can be read. |
| Long duration | About 5500 ms or more. | Whether the sentence needs all that time. |
| Line length | More than 42 characters per displayed line. | Actual width, syntax, and possible splitting. |
| Layout | More than two displayed lines. | Whether to condense or segment the text. |
| Short gap | Around 80 ms. | Flicker, expressive pause, and room to chain. |
| Long gap | Around 1200 ms or more. | A real pause or misplaced timing. |

These are the working references used in this guide; justified exceptions are possible. Chrono's full audit preset uses a 500 ms minimum, a 7000 ms maximum, and 300 ms for short gaps. Auto Timing has its own 28 CPS flag. Check the settings in your installed version before interpreting a clean report.

## Compare what the adjustment changes {#apply-the-delivery-specification}

Extending a cue lowers its CPS, but also keeps it over more of the scene. Check what occupies that extra time: the same thought, a useful pause, another speaker, or a new action. If the hold makes the exchange harder to follow, revisit the wording or divide the sentence at a meaningful point.

Repeated playback can hide a reading problem because the sentence is already familiar. Watch the passage from a few cues earlier, with the picture and original mix, and check whether the text leaves time to follow the action. A compact reply and an unfamiliar name can demand different attention at the same CPS.

Auto Timing's CPS warning uses a narrower punctuation filter than **Count CPS** and the audit. For example, curly quotation marks can remain in Auto Timing's count. The calculator above offers two simple counts for comparison; its “letters and numbers” option does not reproduce every detail of either macro.

## Padding and scene changes

For manual work, this guide suggests lead-ins around 80–150 ms and lead-outs around 350–420 ms as starting points for review. Auto Timing starts at 120 and 420 ms, with maxima of 400 and 800 ms. Those maxima guide the chaining adjustments. Snapping, short-gap handling, and the minimum-duration target have additional rules, described in the [algorithm notes](../algoritmos/index.md#chronos-final-pass). Inspect the resulting edges after a pass.

The `edge_snap_protect_ms` setting defaults to 250 ms in Chrono's directional snapping tools. It limits search distance. Its name does not mean the tool can recognize and protect an already correct boundary.

## Frames and milliseconds

For constant frame rate video, one frame lasts `1000 / fps` milliseconds.

| Frame rate | One frame | Two frames |
| --- | ---: | ---: |
| 24000/1001 fps (≈23.976) | ≈41.71 ms | ≈83.42 ms |
| 24 fps | ≈41.67 ms | ≈83.33 ms |
| 25 fps | 40 ms | 80 ms |
| 30 fps | ≈33.33 ms | ≈66.67 ms |

For variable frame rate video, use the actual timecodes. Dividing a frame number by an average frame rate does not reliably give that frame's time.

## Change a tolerance deliberately

Try a new value on one representative scene. Increasing **SHORT-GAP** marks more positive gaps; decreasing it marks fewer. Increasing **FAST-CPS** marks fewer fast cues. Check this direction before trying to reduce the number of warnings.

The [audit](../tecnica/auditoria.md) collects those warnings. After resolving them, watch the scene at normal speed.
