import { Child } from './types';

export const CHILDREN: Child[] = [
  {
    id: 'ava',
    name: 'Ava',
    age: 13,
    totalScreenTime: '4h 32m',
    messagingTime: '1h 48m',
    emailTime: '22m',
    lateNightPercent: 31,
    riskScore: 68,
    alerts: [
      {
        id: 'a1',
        title: 'Potential bullying language',
        severity: 'high',
        time: '2 hours ago',
        source: 'Submitted message review',
        description:
          'The review engine detected repeated insulting language and social exclusion cues in a manually submitted conversation snippet.',
        recommendation:
          'Talk with Ava and review whether this is peer conflict, joking between friends, or sustained bullying.',
      },
      {
        id: 'a2',
        title: 'Late-night usage spike',
        severity: 'medium',
        time: 'Yesterday',
        source: 'Messaging activity',
        description: 'Message activity after 11:00 PM increased 54% week over week.',
        recommendation:
          'Consider setting a bedtime messaging window and reviewing nighttime device habits.',
      },
    ],
    apps: [
      { name: 'Messages', minutes: 82 },
      { name: 'Instagram', minutes: 46 },
      { name: 'Mail', minutes: 22 },
      { name: 'Safari', minutes: 39 },
    ],
    contacts: [
      { name: 'Alex', volume: 120, change: '+18%' },
      { name: 'Maya', volume: 84, change: '+6%' },
      { name: 'Unknown Number', volume: 19, change: '+200%' },
    ],
    weeklyTrend: [42, 46, 50, 55, 49, 63, 68],
  },
  {
    id: 'ethan',
    name: 'Ethan',
    age: 15,
    totalScreenTime: '3h 11m',
    messagingTime: '58m',
    emailTime: '15m',
    lateNightPercent: 11,
    riskScore: 24,
    alerts: [
      {
        id: 'e1',
        title: 'New contact increase',
        severity: 'low',
        time: 'Today',
        source: 'Communication graph',
        description: "A new contact entered Ethan's top communication network this week.",
        recommendation: 'Normal to monitor. No direct risk language was submitted.',
      },
    ],
    apps: [
      { name: 'Messages', minutes: 40 },
      { name: 'YouTube', minutes: 55 },
      { name: 'Mail', minutes: 15 },
      { name: 'Chrome', minutes: 32 },
    ],
    contacts: [
      { name: 'Sam', volume: 44, change: '+4%' },
      { name: 'Noah', volume: 31, change: '-8%' },
      { name: 'Priya', volume: 20, change: '+9%' },
    ],
    weeklyTrend: [18, 20, 24, 19, 21, 23, 24],
  },
];
