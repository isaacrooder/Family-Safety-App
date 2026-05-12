import React from 'react';
import { View, StyleSheet } from 'react-native';

interface Props {
  value: number;
}

export default function ProgressBar({ value }: Props) {
  const clamped = Math.min(Math.max(value, 0), 100);
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${clamped}%` as any }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 10,
    backgroundColor: '#e2e8f0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#334155',
    borderRadius: 10,
  },
});
