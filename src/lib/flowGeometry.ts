/**
 * Two-speed flow geometry, derived from the ACTUAL rendered width.
 *
 * The flow lives in its own horizontal channel between a top card-row and a
 * bottom card-row. Rather than freeze the canvas at a fixed width (which left
 * dead space on wide screens), FlowLayer measures its container and rebuilds
 * the geometry from that width via `buildFlowGeometry()`. Column centres are
 * computed with the same 8-column / 12px-gap maths the CSS grid uses, so the
 * spine, fork and merge always sit under the right stage columns at any width.
 */

export const COLS = 8;
export const GAP = 12; // tailwind gap-3, in px

/** The visible flow channel that sits BETWEEN the two card rows. */
export const BAND_H = 150;
export const CENTER_Y = BAND_H / 2; // 75
export const LANE_OFFSET = 40; // SMB lane above, Enterprise lane below
export const UPPER_Y = CENTER_Y - LANE_OFFSET; // 35
export const LOWER_Y = CENTER_Y + LANE_OFFSET; // 115

/** Vertical "shared" connector that ties a stage's two cards to the spine,
    used for stages OUTSIDE the fork so they read as one stage, not a fork. */
export const CONNECTOR_TOP = 6;
export const CONNECTOR_BOT = BAND_H - 6; // 144

/** Stage indices (0-based) that fork into two lanes: stage 3 and stage 6. */
export const FORK_INDEX = 2;
export const MERGE_INDEX = 5;

// Curve "shoulder" length for the fork/merge transitions.
const SH = 40;

export interface FlowGeometry {
  width: number;
  colCenters: number[];
  spineD: string;
  smbLaneD: string;
  entLaneD: string;
  forkX: number;
  mergeX: number;
  labelX: number;
}

/**
 * Build all flow paths for a given content width (the inner grid width, i.e.
 * the SVG's own box). Stage 3 (index 2) forks; stage 6 (index 5) merges.
 */
export function buildFlowGeometry(width: number): FlowGeometry {
  const colW = (width - GAP * (COLS - 1)) / COLS;
  const colCenters = Array.from(
    { length: COLS },
    (_, i) => i * (colW + GAP) + colW / 2,
  );

  const startX = colCenters[0];
  const endX = colCenters[COLS - 1];
  const forkX = colCenters[2];
  const mergeX = colCenters[5];

  const spineD = `M ${startX} ${CENTER_Y} L ${endX} ${CENTER_Y}`;

  const smbLaneD = [
    `M ${forkX} ${CENTER_Y}`,
    `C ${forkX + SH} ${CENTER_Y}, ${forkX + SH} ${UPPER_Y}, ${forkX + SH * 2} ${UPPER_Y}`,
    `L ${mergeX - SH * 2} ${UPPER_Y}`,
    `C ${mergeX - SH} ${UPPER_Y}, ${mergeX - SH} ${CENTER_Y}, ${mergeX} ${CENTER_Y}`,
  ].join(" ");

  const entLaneD = [
    `M ${forkX} ${CENTER_Y}`,
    `C ${forkX + SH} ${CENTER_Y}, ${forkX + SH} ${LOWER_Y}, ${forkX + SH * 2} ${LOWER_Y}`,
    `L ${mergeX - SH * 2} ${LOWER_Y}`,
    `C ${mergeX - SH} ${LOWER_Y}, ${mergeX - SH} ${CENTER_Y}, ${mergeX} ${CENTER_Y}`,
  ].join(" ");

  return {
    width,
    colCenters,
    spineD,
    smbLaneD,
    entLaneD,
    forkX,
    mergeX,
    labelX: (forkX + mergeX) / 2,
  };
}
