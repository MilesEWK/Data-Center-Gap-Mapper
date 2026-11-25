// Single entry point for the read-only data files. papers.json is cast to Paper[] here, once.
import rawPapers from "./papers.json";
import { GAP_BRIEF } from "./brief";
import type { Paper } from "../types";

export const PAPERS = rawPapers as Paper[];

export const PAPERS_BY_ID: ReadonlyMap<string, Paper> = new Map(PAPERS.map((p) => [p.id, p]));

export { GAP_BRIEF };
export type { GapBrief, Contradiction, EvidencePoint, Domain } from "./brief";
