/**
 * Single source of truth for the two-speed flow overlay geometry.
 *
 * The journey canvas is a FIXED-width layout (min-w-[1120px], 20px padding,
 * an 8-column grid with 12px gaps). Because the canvas never shrinks below
 * 1120px (it scrolls horizontally instead), every coordinate below is
 * deterministic and correct on first paint. No runtime measurement, so it
 * cannot break or flash on the day of a live demo.
 */

export const CANVAS_W = 1120; // outer card width (matches min-w-[1120px])
export const PAD = 20; // card padding
export const COLS = 8;
export const GAP = 12; // tailwind gap-3

const CONTENT_W = CANVAS_W - PAD * 2; // 1080
export const COL_W = (CONTENT_W - GAP * (COLS - 1)) / COLS; // 124.5

/** X centre of each stage column, in canvas coordinate space. */
export const COL_CENTERS: number[] = Array.from(
  { length: COLS },
  (_, i) => PAD + i * (COL_W + GAP) + COL_W / 2,
);

/** Vertical band the flow layer occupies (sits over the node grid only). */
export const BAND_H = 248;
export const CENTER_Y = BAND_H / 2; // 124
export const LANE_OFFSET = 54; // SMB lane above, Enterprise lane below
export const UPPER_Y = CENTER_Y - LANE_OFFSET;
export const LOWER_Y = CENTER_Y + LANE_OFFSET;

/** Stage 3 forks (index 2); stage 6 merges (index 5). */
export const FORK_X = COL_CENTERS[2];
export const MERGE_X = COL_CENTERS[5];

const START_X = COL_CENTERS[0];
const END_X = COL_CENTERS[COLS - 1];

// Curve "shoulder" length for the fork/merge transitions.
const SH = 46;

/** Shared spine across all eight stages. */
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
