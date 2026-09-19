# Split, rebreak, and join cues

Settle the text before fine timing. Two sentences with different spoken rhythms may need separate cues; one wide sentence may only need a better displayed line break. Those are different operations in Chrono Suite.

For the decision itself, see [segmentation](../fundamentos/segmentacion.md).

## Check formatting before and after

Work on a copy. **Extract Tags** moves leading ASS override blocks into **Effect**; **Reinsert Tags** prepends the saved blocks to the text. This pair does not extract or reposition tags embedded within the dialogue.

After splitting or joining, check italics, color changes, and tags attached to particular words. Relative timings in `\t`, `\move`, `\fad`, or karaoke tags need separate attention when an event's start changes.

## Split into timed events

| Tool | What it splits | Check afterward |
| --- | --- | --- |
| Split by Sentence | Sentence-ending punctuation, including ellipses. | Each proposed unit follows its own speech. |
| Split by Comma | The same boundaries, plus commas, colons, and semicolons. | The clauses remain easy to follow and each has enough reading time. |
| Divide by `\N` | Existing displayed line breaks. | Both new events make sense and have enough time. |

These tools divide the original duration in proportion to the counted characters in each part. They do not locate the spoken pause. Both punctuation splitters also recognize a hyphen surrounded by spaces, so inspect abbreviations, pauses, and dialogue separators before keeping every proposed split. Listen and adjust each new boundary against the audio.

<figure class="tg-fig">
<span class="tg-eyebrow">Inspect the result of each operation</span>
<div class="tg-compare tg-video-stack">
<div class="col"><h4>Two spoken units</h4><video src="../../assets/ejemplos/segmentacion-dos-palabras.mp4" controls loop playsinline preload="metadata"></video><p class="note">“Por supuesto. Yo también mejoro día a día.” means “Of course. I’m getting better every day, too.” The answer and explanation appear together.</p></div>
<div class="col"><h4>Split by Sentence</h4><video src="../../assets/ejemplos/segmentacion-dividido.mp4" controls loop playsinline preload="metadata"></video><p class="note">“Por supuesto.” (“Of course.”) appears first. The explanation, “Yo también mejoro día a día.” (“I’m getting better every day, too.”), follows in its own cue.</p></div>
<div class="col"><h4>Split by Comma</h4><video src="../../assets/ejemplos/segmentacion-por-coma.mp4" controls loop playsinline preload="metadata"></video><p class="note">The first cue begins “Por ahora, ya vimos las flores…”: the flowers of all four seasons have been covered. The next begins “así que ahora te enseñaré…”: “so now I’ll tell you…” It introduces the stories behind those flowers. The Spanish “así que” (“so”) keeps the connection clear across the split.</p></div>
</div>
<figcaption>The first comparison separates an answer from its explanation. The comma split gives each clause its own screen time while preserving the connection between them.</figcaption>
</figure>

## Change the displayed line break

**Smart Break** proposes a break when the rendered text exceeds the available width. Text that already fits on one line stays as it is. **Pivot `\N`** moves an existing break; **Remove `\N`** removes breaks and compacts spaces.

These operations change the layout within one event while keeping its times. For example, “I left the keys / on the kitchen table.” can be a readable two-line cue without becoming two separately timed subtitles. Here `/` illustrates a line break; ASS uses `\N`.

## Join fragmented cues

**Join Lines** combines the selected events into one spanning their earliest start and latest end. Select only the material that belongs together: unselected events between them can remain inside that interval. **Complete Sentences** joins an incomplete line to a following lowercase continuation; uncertain cases, such as overlaps or a following capital, receive `[POSSIBLE-JOIN]` for review.

For overlapping groups, **Join Overlaps** keeps each text on its own displayed line and extends the retained event to the group's bounds. **Join Overlap Sentences** treats the group as one continuous sentence. **Join Same Text** merges adjacent events with identical text.

Inspect speaker changes and formatting after every join. Preserve deliberate clause divisions, including the flower lesson above: its lowercase continuation is a useful split even if Complete Sentences proposes joining it.

## Translate before final segmentation

Translate complete thoughts first, then segment the settled wording against the audio. Translation changes length, word order, and punctuation; those changes can move the natural break.

**Count CPS** reports the selection's total counted characters divided by its total duration, plus the highest individual CPS and its event. Each cue’s duration therefore contributes to the calculation; averaging the individual CPS values equally would give a different result. The count excludes spaces and recognized punctuation. Use the same counting method when comparing it with another tool; [reading speed](../fundamentos/criterios.md) explains the differences.
