/**
 * Single source of truth for the two-speed flow overlay geometry.
 *
 * The journey canvas is a FIXED-width layout (the inner card is min-w-[1120px]
 * with 20px padding, so the content area is 1080px wide, laid out as an
 * 8-column grid with 12px gaps). The flow now lives in its OWN horizontal
 * channel between a top card-row and a bottom card-row, so it is never
 * occluded by the cards. Every coordinate below is deterministic and correct
 * on first paint — no runtime measurement, so it cannot break or flash during
 * a live demo.
 *
 * Coordinate origin is the CONTENT area (inside the card's 20px padding), the
 * same origin the card grid uses, so flow and cards line up exactly. The SVG
 * is placed at left:0 of that content area; column maths therefore do NOT add
 * the padding (that earlier double-count is what made alignment fragile).
 */

export const COLS = 8;
export const GAP = 12; // tailwind gap-3
export const CONTENT_W = 1080; // 1120 card − 2×20 padding
export const COL_W = (CONTENT_W - GAP * (COLS - 1)) / COLS; // 124.5

/** Width the SVG spans — the full content area. */
export const CANVAS_W = CONTENT_W;

/** X centre of each stage column, measured from the content-area left edge. */
export const COL_CENTERS: number[] = Array.from(
  { length: COLS },
  (_, i) => i * (COL_W + GAP) + COL_W / 2,
);

/** The visible flow channel that sits BETWEEN the two card rows. */
export const BAND_H = 168;
export const CENTER_Y = BAND_H / 2; // 84
export const LANE_OFFSET = 44; // SMB lane above, Enterprise lane below
export const UPPER_Y = CENTER_Y - LANE_OFFSET; // 40
export const LOWER_Y = CENTER_Y + LANE_OFFSET; // 128

/** Stage 3 forks (index 2); stage 6 merges (index 5). */
export const FORK_X = COL_CENTERS[2];
export const MERGE_X = COL_CENTERS[5];

const START_X = COL_CENTERS[0];
const END_X = COL_CENTERS[COLS - 1];

// Curve "shoulder" length for the fork/merge transitions.
const SH = 42;

/** Shared spine across all eight stages, along the channel centre line. */
export const SPINE_D = `M ${START_X} ${CENTER_Y} L ${END_X} ${CENTER_Y}`;

/** Upper (SMB) lane: branch up just after the fork, ride across, rejoin at merge. */
export const SMB_LANE_D = [
  `M ${FORK_X} ${CENTER_Y}`,
  `C ${FORK_X + SH} ${CENTER_Y}, ${FORK_X + SH} ${UPPER_Y}, ${FORK_X + SH * 2} ${UPPER_Y}`,
  `L ${MERGE_X - SH * 2} ${UPPER_Y}`,
  `C ${MERGE_X - SH} ${UPPER_Y}, ${MERGE_X - SH} ${CENTER_Y}, ${MERGE_X} ${CENTER_Y}`,
].join(" ");

/** Lower (Enterprise) lane: mirror of the SMB lane below the centre line. */
export const ENT_LANE_D = [
  `M ${FORK_X} ${CENTER_Y}`,
  `C ${FORK_X + SH} ${CENTER_Y}, ${FORK_X + SH} ${LOWER_Y}, ${FORK_X + SH * 2} ${LOWER_Y}`,
  `L ${MERGE_X - SH * 2} ${LOWER_Y}`,
  `C ${MERGE_X - SH} ${LOWER_Y}, ${MERGE_X - SH} ${CENTER_Y}, ${MERGE_X} ${CENTER_Y}`,
].join(" ");

/** Node anchor dots sit on the spine at each shared stage centre. */
export const SHARED_STAGE_INDICES = [0, 1, 6, 7];
