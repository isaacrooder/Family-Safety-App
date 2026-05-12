export interface Alert {
  id: string;
  title: string;
  severity: 'high' | 'medium' | 'low';
  time: string;
  source: string;
  description: string;
  recommendation: string;
}

export interface AppUsage {
  name: string;
  minutes: number;
}

export interface Contact {
  name: string;
  volume: number;
  change: string;
}

export interface Child {
  id: string;
  name: string;
  age: number;
  totalScreenTime: string;
  messagingTime: string;
  emailTime: string;
  lateNightPercent: number;
  riskScore: number;
  alerts: Alert[];
  apps: AppUsage[];
  contacts: Contact[];
  weeklyTrend: number[];
}

export type TabId = 'dashboard' | 'alerts' | 'children' | 'settings';
