# Post-timing: padding, snapping, and chaining

Once the speech boundaries are right, add reading time and check how each cue meets the picture and its neighbors. Lead-in and lead-out provide that extra time. Snapping aligns an edge with a nearby cut. Chaining closes a distracting gap.

<figure class="tg-fig tg-strip">
<span class="tg-eyebrow">From speech to screen time</span>
<div class="lane">
<span class="seg aire" style="left:8%;width:6%"><i>in</i></span>
<span class="seg voz" style="left:14%;width:44%">speech</span>
<span class="seg aire" style="left:58%;width:14%"><i>out</i></span>
<span class="cont" style="left:78%;width:16%">next cue</span>
</div>
<div class="tg-keys"><b class="k-aire">padding</b><b class="k-voz">speech interval</b><b class="k-continuidad">neighboring cue</b></div>
<figcaption>The cue appears before the voice and stays briefly after it. The next cue limits how far that hold can extend.</figcaption>
</figure>

## Starting values

These are Auto Timing's initial settings. Try them on a short scene and inspect the entries, holds, and gaps before extending the pass to the episode. A useful setting for measured dialogue can leave too little room in a rapid exchange.

| Setting | Default | What it controls |
| --- | ---: | --- |
| Lead-in / maximum | 120 / 400 ms | Base entry padding / allowance used in chaining. |
| Lead-out / maximum | 420 / 800 ms | Base exit padding / allowance used in chaining. |
| Start / end keyframe window | 400 / 800 ms | How far each edge searches for a cut. |
| Voice-cut limit | 100 ms | Tolerance for a snap after speech starts or before it ends. |
| Minimum duration target | 500 ms | A target the surrounding constraints may prevent. |
| Reading-speed flag | Above 28 CPS | A prompt to review the text and duration. |

The [reading criteria](criterios.md) use tighter review thresholds. A cue can pass these broad defaults and still feel rushed.

## Work backward through the scene

For manual adjustments, start with the last cue. Its settled start then limits how far the previous cue can extend without overlapping it. Working back from there avoids repeatedly changing a hold because its neighbor has moved.

<figure class="tg-fig tg-strip">
<span class="tg-eyebrow">The next start limits the current end</span>
<div class="lane"><span class="seg voz" style="left:4%;width:24%">cue n−1</span><span class="seg aire" style="left:28%;width:10%"><i>out</i></span><i class="ord" style="left:95%">3</i></div>
<div class="lane"><span class="seg voz" style="left:34%;width:24%">cue n</span><span class="seg aire" style="left:58%;width:10%"><i>out</i></span><i class="ord" style="left:95%">2</i></div>
<div class="lane"><span class="cont" style="left:64%;width:26%">cue n+1</span><i class="ord" style="left:95%">1</i></div>
<figcaption>Review order: bottom to top. Each earlier end is checked against an already settled start.</figcaption>
</figure>

## Add padding where it helps reading

Lead-in gives the eye time to find the subtitle before the first syllable. Lead-out lets the reader finish after the voice stops. The exit usually needs more padding than the entry, but a short reaction and a sentence full of unfamiliar names need different holds.

The maximum settings guide how far chaining can extend the base margins. Other steps can exceed them, including short-gap handling and the minimum-duration target. Check the resulting hold: text can linger over silence or over a shot it no longer belongs to.

![Lead-in and lead-out around the speech waveform; original Spanish labels](../assets/ejemplos/margenes-silueta.png){ loading=lazy }

## Snap an edge to a useful cut

Check the image before choosing a keyframe: an encoded keyframe does not necessarily mark a shot change. Auto Timing searches within its configured windows and can also shorten speech coverage within **Voice-cut limit**. Listen to any edge moved inward; the setting measures milliseconds and cannot tell a fading tail from a distinct syllable.

If speech ends shortly before a cut, the subtitle can end on that cut, even when the resulting hold is shorter than the base lead-out. This works only if the cue has enough reading time. Speech that continues across the cut normally stays covered. A fading vocal tail may allow a small exception; a new word does not.

<figure class="tg-fig">
<span class="tg-eyebrow">Compare the same scene</span>
<div class="tg-compare tg-video-stack" data-tg-wipe>
<div class="col"><h4>Ends on the cut</h4><video src="../../assets/ejemplos/kf-end.mp4" controls loop playsinline preload="metadata"></video><p class="note">“¡Una sopa de soba!” (“One soba soup!”) clears as the wider restaurant shot changes to the man’s close-up.</p></div>
<div class="col"><h4>Runs past the cut</h4><video src="../../assets/ejemplos/no-kf-end.mp4" controls loop playsinline preload="metadata"></video><p class="note">The same subtitle remains over the next shot. Check whether that extra hold still serves the dialogue.</p></div>
</div>
<figcaption>Play the comparison, then drag the divider to inspect either version.</figcaption>
</figure>

## Chain cues when the gap flickers

A very short blank interval can look like a flash between two subtitles. Close it when the cues read naturally in sequence, the allowed padding covers the move, and the result creates no accidental overlap.

Keep a gap when it carries a hesitation, separates ideas or speakers, or gives the viewer a useful rest. A chain that leaves the first subtitle lingering through a long silence has solved the wrong problem.

<figure class="tg-fig">
<span class="tg-eyebrow">Watch the handoff between cues</span>
<div class="tg-compare tg-video-stack" data-tg-wipe>
<div class="col"><h4>Short gap</h4><video src="../../assets/ejemplos/con-gaps.mp4" controls loop playsinline preload="metadata"></video><p class="note">The Spanish cues read “Sí.” → “Lo sabía.” → “Nadie recuerda a mi hermano.” (“Yeah.” → “I knew it.” → “No one remembers my brother.”). Watch the brief blank intervals within this connected thought.</p></div>
<div class="col"><h4>Chained</h4><video src="../../assets/ejemplos/sin-gaps.mp4" controls loop playsinline preload="metadata"></video><p class="note">The next cue replaces the previous one directly. Compare the rhythm with the spoken pause.</p></div>
</div>
<figcaption>A gap is worth closing when it distracts more than it communicates.</figcaption>
</figure>

## Review competing adjustments

Check reading time first, then speech coverage, the picture, and continuity with neighboring cues. Follow with duration and overlap checks. If no edge adjustment can make the text readable, return to [segmentation](segmentacion.md) or revise the wording. Reproduce the full exchange after the change: gaining time for one cue can displace the problem onto its neighbor.
