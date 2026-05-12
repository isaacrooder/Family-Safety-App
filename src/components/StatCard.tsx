import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  icon: string;
  label: string;
  value: string;
  sublabel?: string;
}

export default function StatCard({ icon, label, value, sublabel }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View style={styles.textBox}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
        {sublabel ? <Text style={styles.sublabel}>{sublabel}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { fontSize: 22 },
  textBox: { flex: 1 },
  label: { fontSize: 13, color: '#64748b' },
  value: { fontSize: 22, fontWeight: '700', color: '#0f172a', marginTop: 2 },
  sublabel: { fontSize: 12, color: '#94a3b8', marginTop: 2 },
});
