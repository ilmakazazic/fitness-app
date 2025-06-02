export enum GoalType {
  COUNT = "count",
  DURATION = "duration"
}

export enum Frequency {
  DAILY = "daily",
  WEEKLY = "weekly"
}

export interface UserGoal {
  type: GoalType.COUNT | GoalType.DURATION;
  value: string;
  frequency: Frequency.DAILY | Frequency.WEEKLY;
}
