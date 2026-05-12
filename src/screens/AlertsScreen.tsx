import React, { useState, useMemo } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
} from 'react-native';
import { Child, Alert } from '../types';

interface AlertWithChild extends Alert {
  childName: string;
}

interface Props {
  familyMembers: Child[];
  selectedAlertId: string | null;
  onSelectAlert: (id: string | null) => void;
}

const SEVERITY_COLORS = {
  high: { bg: '#fee2e2', text: '#b91c1c', border: '#fecaca' },
  medium: { bg: '#fef3c7', text: '#b45309', border: '#fde68a' },
  low: { bg: '#d1fae5', text: '#047857', border: '#a7f3d0' },
};

export default function AlertsScreen({ familyMembers, selectedAlertId, onSelectAlert }: Props) {
  const [query, setQuery] = useState('');

  const allAlerts: AlertWithChild[] = useMemo(
    () =>
      familyMembers.flatMap((child) =>
        child.alerts.map((alert) => ({ ...alert, childName: child.name }))
      ),
    [familyMembers]
  );

  const filteredAlerts = useMemo(
    () =>
      allAlerts.filter((a) => {
        const hay = `${a.title} ${a.source} ${a.childName} ${a.description}`.toLowerCase();
        return hay.includes(query.toLowerCase());
      }),
    [allAlerts, query]
  );

  const selectedAlert = selectedAlertId
    ? allAlerts.find((a) => a.id === selectedAlertId) ?? null
    : null;

  if (selectedAlert) {
    const colors = SEVERITY_COLORS[selectedAlert.severity];
    return (
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Pressable style={styles.backBtn} onPress={() => onSelectAlert(null)}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        <Text style={styles.title}>Alert Detail</Text>
        <Text style={styles.subtitle}>Review the signal, context, and next step.</Text>

        <View style={styles.card}>
          <View style={styles.detailHeader}>
            <View style={styles.detailTitleBlock}>
              <Text style={styles.detailTitle}>{selectedAlert.title}</Text>
              <Text style={styles.detailMeta}>
                For {selectedAlert.childName} · {selectedAlert.source}
              </Text>
            </View>
            <View style={[styles.badge, { backgroundColor: colors.bg, borderColor: colors.border }]}>
              <Text style={[styles.badgeText, { color: colors.text }]}>
                {selectedAlert.severity}
              </Text>
            </View>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>What was detected</Text>
            <Text style={styles.infoText}>{selectedAlert.description}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Recommended parent action</Text>
            <Text style={styles.infoText}>{selectedAlert.recommendation}</Text>
          </View>

          <Pressable style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>Mark as reviewed</Text>
          </Pressable>
          <Pressable style={styles.outlineBtn}>
            <Text style={styles.outlineBtnText}>Add note</Text>
          </Pressable>
          <Pressable style={styles.outlineBtn}>
            <Text style={styles.outlineBtnText}>Adjust threshold</Text>
          </Pressable>
        </View>

        <View style={styles.spacer} />
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Alerts</Text>
      <Text style={styles.subtitle}>All family alerts in one feed.</Text>

      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔎</Text>
        <TextInput
          style={styles.searchInput}
          value={query}
          onChangeText={setQuery}
          placeholder="Search alerts"
          placeholderTextColor="#94a3b8"
          returnKeyType="search"
          autoCorrect={false}
        />
      </View>

      {filteredAlerts.map((alert) => {
        const colors = SEVERITY_COLORS[alert.severity];
        return (
          <Pressable
            key={alert.id}
            style={styles.alertCard}
            onPress={() => onSelectAlert(alert.id)}
          >
            <View style={styles.alertCardHeader}>
              <View style={styles.alertCardTitles}>
                <Text style={styles.alertTitle}>{alert.title}</Text>
                <Text style={styles.alertMeta}>
                  {alert.childName} · {alert.source}
                </Text>
              </View>
              <View style={[styles.badge, { backgroundColor: colors.bg, borderColor: colors.border }]}>
                <Text style={[styles.badgeText, { color: colors.text }]}>{alert.severity}</Text>
              </View>
            </View>
            <Text style={styles.alertDesc} numberOfLines={2}>
              {alert.description}
            </Text>
            <View style={styles.alertFooter}>
              <Text style={styles.alertTime}>{alert.time}</Text>
              <Text style={styles.alertOpen}>Open →</Text>
            </View>
          </Pressable>
        );
      })}

      <View style={styles.spacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  content: { padding: 16, gap: 12 },
  title: { fontSize: 26, fontWeight: '700', color: '#0f172a' },
  subtitle: { fontSize: 14, color: '#64748b' },
  backBtn: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
  },
  backText: { fontSize: 14, fontWeight: '600', color: '#334155' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 12,
    height: 46,
    gap: 8,
  },
  searchIcon: { fontSize: 16 },
  searchInput: { flex: 1, fontSize: 15, color: '#0f172a' },
  alertCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 10,
  },
  alertCardHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  alertCardTitles: { flex: 1 },
  alertTitle: { fontSize: 16, fontWeight: '700', color: '#0f172a' },
  alertMeta: { fontSize: 12, color: '#64748b', marginTop: 2 },
  alertDesc: { fontSize: 13, color: '#475569', lineHeight: 20 },
  alertFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  alertTime: { fontSize: 12, color: '#94a3b8' },
  alertOpen: { fontSize: 12, color: '#64748b', fontWeight: '600' },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 12,
  },
  detailHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  detailTitleBlock: { flex: 1 },
  detailTitle: { fontSize: 20, fontWeight: '700', color: '#0f172a' },
  detailMeta: { fontSize: 13, color: '#64748b', marginTop: 4 },
  infoBox: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 4,
  },
  infoLabel: { fontSize: 12, color: '#64748b', fontWeight: '600' },
  infoText: { fontSize: 13, color: '#334155', lineHeight: 20 },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20, borderWidth: 1 },
  badgeText: { fontSize: 11, fontWeight: '700' },
  primaryBtn: {
    backgroundColor: '#0f172a',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryBtnText: { color: '#ffffff', fontWeight: '700', fontSize: 15 },
  outlineBtn: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
  },
  outlineBtnText: { color: '#334155', fontWeight: '600', fontSize: 15 },
  spacer: { height: 8 },
});
