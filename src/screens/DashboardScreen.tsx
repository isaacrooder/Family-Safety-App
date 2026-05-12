import React from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';
import { Child } from '../types';
import MiniBars from '../components/MiniBars';
import StatCard from '../components/StatCard';
import ProgressBar from '../components/ProgressBar';

interface Props {
  familyMembers: Child[];
  selectedChild: Child;
  onSelectChild: (id: string) => void;
  onAlertPress: (alertId: string) => void;
}

const SEVERITY_COLORS = {
  high: { bg: '#fee2e2', text: '#b91c1c', border: '#fecaca' },
  medium: { bg: '#fef3c7', text: '#b45309', border: '#fde68a' },
  low: { bg: '#d1fae5', text: '#047857', border: '#a7f3d0' },
};

export default function DashboardScreen({
  familyMembers,
  selectedChild,
  onSelectChild,
  onAlertPress,
}: Props) {
  const maxAppMinutes = Math.max(...selectedChild.apps.map((a) => a.minutes), 1);
  const lastContact = selectedChild.contacts[selectedChild.contacts.length - 1];

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.subtitle}>Privacy-first signals and parent alerts.</Text>

      {/* Child picker */}
      <View style={styles.chipRow}>
        {familyMembers.map((child) => (
          <Pressable
            key={child.id}
            style={[styles.chip, selectedChild.id === child.id && styles.chipActive]}
            onPress={() => onSelectChild(child.id)}
          >
            <Text
              style={[styles.chipText, selectedChild.id === child.id && styles.chipTextActive]}
            >
              {child.name}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Stat cards */}
      <StatCard icon="⏰" label="Total Screen Time" value={selectedChild.totalScreenTime} sublabel="Today" />
      <StatCard icon="💬" label="Messaging Time" value={selectedChild.messagingTime} sublabel="Across monitored channels" />
      <StatCard icon="📧" label="Email Time" value={selectedChild.emailTime} sublabel="Today" />
      <StatCard icon="🛡️" label="Risk Score" value={`${selectedChild.riskScore}/100`} sublabel="Behavior and review signals" />

      {/* Weekly trend */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📊  Weekly Risk Trend</Text>
        <MiniBars values={selectedChild.weeklyTrend} />
        <View style={styles.divider} />
        <Text style={styles.sectionLabel}>Late-night activity</Text>
        <ProgressBar value={selectedChild.lateNightPercent} />
        <Text style={styles.progressCaption}>
          {selectedChild.lateNightPercent}% of communication after 9 PM
        </Text>
        <View style={styles.divider} />
        <Text style={styles.sectionLabel}>Top communication shift</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            {selectedChild.contacts[0].name} remains the top contact. Highest week-over-week
            change: {lastContact.name} at {lastContact.change}.
          </Text>
        </View>
      </View>

      {/* Recent alerts */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🚨  Recent Alerts</Text>
        {selectedChild.alerts.map((alert) => {
          const colors = SEVERITY_COLORS[alert.severity];
          return (
            <Pressable
              key={alert.id}
              style={styles.alertRow}
              onPress={() => onAlertPress(alert.id)}
            >
              <View style={styles.alertLeft}>
                <Text style={styles.alertTitle}>{alert.title}</Text>
                <Text style={styles.alertSource}>{alert.source}</Text>
              </View>
              <View style={[styles.badge, { backgroundColor: colors.bg, borderColor: colors.border }]}>
                <Text style={[styles.badgeText, { color: colors.text }]}>{alert.severity}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      {/* App usage */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📱  App Usage</Text>
        {selectedChild.apps.map((app) => (
          <View key={app.name} style={styles.appRow}>
            <View style={styles.appLabelRow}>
              <Text style={styles.appName}>{app.name}</Text>
              <Text style={styles.appMinutes}>{app.minutes} min</Text>
            </View>
            <ProgressBar value={(app.minutes / maxAppMinutes) * 100} />
          </View>
        ))}
      </View>

      {/* Social network */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>👥  Social Network</Text>
        {selectedChild.contacts.map((contact) => (
          <View key={contact.name} style={styles.contactRow}>
            <View>
              <Text style={styles.contactName}>{contact.name}</Text>
              <Text style={styles.contactVolume}>{contact.volume} interactions</Text>
            </View>
            <View style={styles.changeBadge}>
              <Text style={styles.changeText}>{contact.change}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { padding: 16, gap: 12 },
  title: { fontSize: 26, fontWeight: '700', color: '#0f172a' },
  subtitle: { fontSize: 14, color: '#64748b' },
  chipRow: { flexDirection: 'row', gap: 8 },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
  },
  chipActive: { backgroundColor: '#0f172a', borderColor: '#0f172a' },
  chipText: { fontSize: 14, fontWeight: '600', color: '#334155' },
  chipTextActive: { color: '#ffffff' },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 12,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
  divider: { height: 1, backgroundColor: '#f1f5f9' },
  sectionLabel: { fontSize: 13, color: '#64748b' },
  progressCaption: { fontSize: 13, fontWeight: '600', color: '#334155', marginTop: -4 },
  infoBox: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  infoText: { fontSize: 13, color: '#334155', lineHeight: 20 },
  alertRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  alertLeft: { flex: 1 },
  alertTitle: { fontSize: 14, fontWeight: '600', color: '#0f172a' },
  alertSource: { fontSize: 12, color: '#64748b', marginTop: 2 },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    borderWidth: 1,
  },
  badgeText: { fontSize: 11, fontWeight: '700' },
  appRow: { gap: 6 },
  appLabelRow: { flexDirection: 'row', justifyContent: 'space-between' },
  appName: { fontSize: 14, color: '#334155' },
  appMinutes: { fontSize: 14, fontWeight: '600', color: '#334155' },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  contactName: { fontSize: 14, fontWeight: '600', color: '#0f172a' },
  contactVolume: { fontSize: 12, color: '#64748b', marginTop: 2 },
  changeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
  },
  changeText: { fontSize: 12, color: '#475569', fontWeight: '500' },
  spacer: { height: 8 },
});
