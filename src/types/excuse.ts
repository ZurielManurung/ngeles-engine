export interface ExcuseRecommendation {
  tier: string;
  excuse: string;
  tactic: string;
}

export interface ExcuseResponse {
  visual_breakdown: string;
  recommendations: ExcuseRecommendation[];
}

export type TargetRecipient = 'Bos / Atasan' | 'Teman / Tongkrongan' | 'Pasangan / Doang' | 'Dosen / Kampus' | 'Umum';
