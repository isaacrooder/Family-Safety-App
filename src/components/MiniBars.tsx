import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {
  values: number[];
}

export default function MiniBars({ values }: Props) {
  const max = Math.max(...values, 1);
  return (
    <View style={styles.container}>
      {values.map((v, i) => (
        <View key={i} style={styles.barBg}>
          <View style={[styles.barFill, { height: `${Math.max((v / max) * 100, 8)}%` as any }]} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 80,
    gap: 5,
  },
  barBg: {
    flex: 1,
    height: '100%',
    backgroundColor: '#e2e8f0',
    borderRadius: 6,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    backgroundColor: '#334155',
    borderRadius: 6,
  },
});
