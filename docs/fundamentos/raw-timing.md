# Raw timing

Raw timing locates the first and last speech sounds represented by a cue. The interval starts at the audible onset and ends at the final part of the last word. Reading padding, keyframe snaps, and chaining come later.

<figure class="tg-fig tg-strip">
<span class="tg-eyebrow">Speech before padding</span>
<div class="lane"><span class="seg voz" style="left:18%;width:52%">Wait, did you hear that?</span><i class="pin" style="left:18%"></i><i class="pin" style="left:70%"></i></div>
<div class="scale"><span class="v" style="left:18%">first sound</span><span class="v" style="left:70%">last sound</span></div>
<figcaption class="cap">Mark the words first. Add reading time and scene adjustments in the post-timing pass.</figcaption>
</figure>

Listen, inspect the waveform, move an edge, and listen again. Quiet speech often needs several passes. A visible rise in amplitude is only a clue to the onset; it may belong to music, a breath, or a different speaker.

## Decide which sounds belong to the cue

Dialogue timing covers the words represented by the text. A laugh or breath that the subtitle omits does not automatically extend that interval. When the text describes a sound, such as a laugh or a gasp, time that description against the sound itself. A reaction that changes the meaning of the reply deserves attention even when it contains no words.

Soft consonants, whispered words, shouts, and words spoken through tears still count as speech. Preserve the tail while it remains part of the final word. If someone is interrupted, the ending follows what was actually uttered, even if the word is incomplete. With overlapping voices, follow the speaker represented by the cue.

## Find the onset

The strongest vowel is not necessarily the start of the word. Listen for a quiet initial consonant before placing the edge. A breath or mouth noise can precede it without belonging to the word.

| Symptom | Adjustment |
| --- | --- |
| The first syllable begins before the subtitle | Move the start earlier to cover the onset. |
| The cue begins before any speech | Move the start later to the first relevant sound. |
| The cue starts on a noise unrelated to the words | Identify the actual speech onset. |
| A soft initial consonant is missing | Extend the start to include it. |

## Find the ending

At the other edge, distinguish the end of the word from the breath or background sound that follows. A clipped syllable or an audible vocal tail calls for a later end. A cue that includes unrelated noise needs to end earlier.

Separation can weaken consonants or remove speech. Check uncertain boundaries against the original mix.

## Check cues with two utterances

A cue containing two statements also contains their internal pause. Its outside edges can be accurate, but they cannot show each statement appearing separately. Revisit [segmentation](segmentacion.md) if the two parts would read better with their own timing. An internal pause alone does not make the outer timing wrong.

## Finish the raw pass

Check that the first and last speech sounds are covered, that neither edge includes unrelated sound, and that the cue still represents a coherent unit. Save this version before adding [post-timing](post-timing.md), so the padding can be changed without having to locate the speech again.
