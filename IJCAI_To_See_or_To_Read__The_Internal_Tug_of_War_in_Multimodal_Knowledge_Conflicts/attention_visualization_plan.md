# Attention Visualization Plan

## Goal

Add one attention-based qualitative figure that directly visualizes late-layer textual override. The figure should show that, under multimodal conflict, the model is more visually grounded before the transition layer and becomes more text-driven after the transition layer. A successful case should be shown as a contrastive control.

## Model

Use `LLaVA-1.5-7B` so the visualization is aligned with the analysis model used in Figures 3, 4, and 5.

## Samples

Select two representative samples:

1. One `Conflict-Incorrect` sample
2. One `Conflict-Correct` sample

Priority should be given to samples that already have layer-wise MDR analysis or token-ranking analysis, so the new figure can be directly aligned with existing evidence.

## Layers

For each sample, visualize three layers:

1. `L_trans - 2`
2. `L_trans`
3. `L_final`

`L_trans` should be the transition layer defined in the paper by the JSD peak after `L_start`.

## Attention to Extract

For each sample and each selected layer, use the answer token as the query and extract two types of attention:

1. Attention from the answer token to visual tokens
2. Attention from the answer token to textual context tokens

## Visualization Outputs

For each layer, produce two aligned views:

1. An image attention heatmap
2. A text-token heatmap over the context

The image attention heatmap should highlight the spatial region that supports the correct visual answer.

The text-token heatmap should highlight which words or phrases in the textual context the answer token attends to, with the contradictory cue clearly visible.

## Figure Layout

Use a single figure with 2 rows and 3 columns.

Rows:

1. `Conflict-Incorrect`
2. `Conflict-Correct`

Columns:

1. `Before transition`
2. `At transition`
3. `Late layer`

Each panel should contain:

1. Left: image attention overlay
2. Right: text-token heatmap

## Expected Pattern

For the `Conflict-Incorrect` case:

1. At `L_trans - 2`, image attention should focus on the answer-relevant visual region, while text attention should not yet be dominated by the contradictory cue.
2. At `L_trans`, attention should begin to shift toward the contradictory textual cue.
3. At `L_final`, text attention should become more concentrated on the contradictory cue, while visual grounding weakens.

For the `Conflict-Correct` case:

1. Visual attention should remain anchored to the relevant image region across layers.
2. Text attention should not become dominated by the contradictory cue in late layers.
3. The final prediction should remain visually grounded.

## Figure Caption Requirements

The caption should explicitly state:

1. The model is `LLaVA-1.5-7B`
2. The query position is the answer token
3. The visualized layers are `L_trans - 2`, `L_trans`, and `L_final`
4. The figure is qualitative evidence supporting the MDR/JSD findings

Suggested caption logic:

`Attention visualization on LLaVA-1.5-7B. For each case, we visualize the answer-token attention to visual regions and textual context at L_trans-2, L_trans, and the final layer. In failure cases, attention shifts from answer-relevant visual regions to the contradictory textual cue after L_trans, while in success cases attention remains visually grounded. This qualitative pattern is consistent with late-layer textual override.`

## Placement in the Paper

Insert this figure in Section 3, after the discussion of transition direction and before moving into CALRD.

Suggested subsection title:

`Qualitative Attention Visualization`

## Accompanying Main-Text Paragraph

Add one short paragraph to explain the figure:

`To provide a more intuitive view of late-layer override, we visualize answer-token attention to both visual regions and textual context across layers. In Conflict-Incorrect cases, attention is initially concentrated on answer-relevant image regions but shifts toward the contradictory textual cue after the transition layer. In Conflict-Correct cases, this shift is much weaker, and attention remains visually grounded through the final layer. These qualitative patterns are consistent with the MDR-based analysis above.`

## Minimal Implementation Steps

1. Select one `Conflict-Incorrect` case and one `Conflict-Correct` case from `LLaVA-1.5-7B`.
2. Compute `L_trans` for each case using the same procedure as in the paper.
3. Extract answer-token attention at `L_trans - 2`, `L_trans`, and `L_final`.
4. Aggregate attention to visual tokens into an image heatmap.
5. Aggregate attention to context tokens into a text-token heatmap.
6. Assemble the final 2x3 figure.
7. Add the figure, caption, and short explanatory paragraph to Section 3.
