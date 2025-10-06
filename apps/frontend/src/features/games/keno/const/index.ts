export enum KenoRisk {
  CLASSIC = 'classic',
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export const KenoRiskLabels: Record<KenoRisk, string> = {
  [KenoRisk.CLASSIC]: 'Classic',
  [KenoRisk.LOW]: 'Low',
  [KenoRisk.MEDIUM]: 'Medium',
  [KenoRisk.HIGH]: 'High',
};

export const KenoRiskDropdown = Object.entries(KenoRiskLabels).map(
  ([value, label]) => ({
    value: value as KenoRisk,
    label,
  })
);
