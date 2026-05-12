import React from 'react';
import { ScrollView, View, Text, StyleSheet, Pressable } from 'react-native';
import { Child } from '../types';
import MiniBars from '../components/MiniBars';

interface Props {
  familyMembers: Child[];
  onViewChild: (id: string) => void;
}

export default function ChildrenScreen({ familyMembers, onViewChild }: Props) {
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Children</Text>
      <Text style={styles.subtitle}>Compare high-level patterns across your family.</Text>

      {familyMembers.map((child) => (
        <View key={child.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.avatarBox}>
              <Text style={styles.avatarIcon}>👤</Text>
            </View>
            <View style={styles.nameBlock}>
              <Text style={styles.childName}>{child.name}</Text>
              <Text style={styles.childAge}>Age {child.age}</Text>
            </View>
            <Pressable style={styles.viewBtn} onPress={() => onViewChild(child.id)}>
              <Text style={styles.viewBtnText}>View</Text>
            </Pressable>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Risk</Text>
              <Text style={styles.statValue}>{child.riskScore}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Alerts</Text>
              <Text style={styles.statValue}>{child.alerts.length}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Screen</Text>
              <Text style={styles.statValueSm}>{child.totalScreenTime}</Text>
            </View>
          </View>

          <MiniBars values={child.weeklyTrend} />
        </View>
      ))}

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
    gap: 14,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatarBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarIcon: { fontSize: 24 },
  nameBlock: { flex: 1 },
  childName: { fontSize: 18, fontWeight: '700', color: '#0f172a' },
  childAge: { fontSize: 13, color: '#64748b', marginTop: 2 },
  viewBtn: {
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#ffffff',
  },
  viewBtnText: { fontSize: 13, fontWeight: '600', color: '#334155' },
  statsRow: { flexDirection: 'row', gap: 8 },
  statBox: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
  },
  statLabel: { fontSize: 11, color: '#64748b' },
  statValue: { fontSize: 20, fontWeight: '700', color: '#0f172a', marginTop: 2 },
  statValueSm: { fontSize: 14, fontWeight: '700', color: '#0f172a', marginTop: 2 },
  spacer: { height: 8 },
});
