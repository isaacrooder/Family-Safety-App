import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Switch } from 'react-native';

export default function SettingsScreen() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [lateNightEnabled, setLateNightEnabled] = useState(true);
  const [networkEnabled, setNetworkEnabled] = useState(true);
  const [weeklyDigestEnabled, setWeeklyDigestEnabled] = useState(true);

  const settings = [
    {
      label: 'Push alerts',
      description: 'Receive alerts for high and medium severity signals.',
      value: pushEnabled,
      setter: setPushEnabled,
    },
    {
      label: 'Late-night activity alerts',
      description: 'Notify when nighttime communication rises above threshold.',
      value: lateNightEnabled,
      setter: setLateNightEnabled,
    },
    {
      label: 'Social network change alerts',
      description: 'Watch for unusual new-contact or interaction spikes.',
      value: networkEnabled,
      setter: setNetworkEnabled,
    },
    {
      label: 'Weekly digest',
      description: 'Receive a weekly family summary every Sunday evening.',
      value: weeklyDigestEnabled,
      setter: setWeeklyDigestEnabled,
    },
  ];

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Control notifications, digests, and signal sensitivity.</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Parent Notifications</Text>
        {settings.map((item, i) => (
          <View key={item.label} style={[styles.settingRow, i === 0 && styles.settingRowFirst]}>
            <View style={styles.settingText}>
              <Text style={styles.settingLabel}>{item.label}</Text>
              <Text style={styles.settingDesc}>{item.description}</Text>
            </View>
            <Switch
              value={item.value}
              onValueChange={item.setter}
              trackColor={{ false: '#e2e8f0', true: '#334155' }}
              thumbColor="#ffffff"
            />
          </View>
        ))}
      </View>

      <View style={styles.complianceBox}>
        <Text style={styles.complianceTitle}>✅  Compliance Posture</Text>
        <Text style={styles.complianceText}>
          This prototype is designed around transparent enrollment, usage summaries, parent alerts,
          and opt-in review flows rather than covert interception of private messages.
        </Text>
      </View>

      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { padding: 16, gap: 16 },
  title: { fontSize: 26, fontWeight: '700', color: '#0f172a' },
  subtitle: { fontSize: 14, color: '#64748b' },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#0f172a', marginBottom: 4 },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    gap: 12,
  },
  settingRowFirst: { borderTopWidth: 0 },
  settingText: { flex: 1 },
  settingLabel: { fontSize: 15, fontWeight: '600', color: '#0f172a' },
  settingDesc: { fontSize: 13, color: '#64748b', marginTop: 2, lineHeight: 18 },
  complianceBox: {
    backgroundColor: '#ecfdf5',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#a7f3d0',
    gap: 8,
  },
  complianceTitle: { fontSize: 14, fontWeight: '700', color: '#064e3b' },
  complianceText: { fontSize: 13, color: '#065f46', lineHeight: 20 },
  spacer: { height: 8 },
});
