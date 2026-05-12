import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { CHILDREN } from './src/data';
import { TabId } from './src/types';
import DashboardScreen from './src/screens/DashboardScreen';
import AlertsScreen from './src/screens/AlertsScreen';
import ChildrenScreen from './src/screens/ChildrenScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
  { id: 'alerts', label: 'Alerts', icon: '🚨' },
  { id: 'children', label: 'Children', icon: '👥' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

export default function App() {
  const [tab, setTab] = useState<TabId>('dashboard');
  const [selectedChildId, setSelectedChildId] = useState(CHILDREN[0].id);
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);

  const selectedChild = useMemo(
    () => CHILDREN.find((c) => c.id === selectedChildId) ?? CHILDREN[0],
    [selectedChildId]
  );

  const handleTabChange = (tabId: TabId) => {
    setTab(tabId);
    if (tabId !== 'alerts') setSelectedAlertId(null);
  };

  const handleAlertPress = (alertId: string) => {
    setSelectedAlertId(alertId);
    setTab('alerts');
  };

  const handleViewChild = (childId: string) => {
    setSelectedChildId(childId);
    setTab('dashboard');
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" backgroundColor="#ffffff" />
      <SafeAreaView style={styles.root} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Family Safety</Text>
          <Text style={styles.headerSub}>Parent App</Text>
        </View>

        {/* Screen content */}
        <View style={styles.content}>
          {tab === 'dashboard' && (
            <DashboardScreen
              familyMembers={CHILDREN}
              selectedChild={selectedChild}
              onSelectChild={setSelectedChildId}
              onAlertPress={handleAlertPress}
            />
          )}
          {tab === 'alerts' && (
            <AlertsScreen
              familyMembers={CHILDREN}
              selectedAlertId={selectedAlertId}
              onSelectAlert={setSelectedAlertId}
            />
          )}
          {tab === 'children' && (
            <ChildrenScreen familyMembers={CHILDREN} onViewChild={handleViewChild} />
          )}
          {tab === 'settings' && <SettingsScreen />}
        </View>

        {/* Bottom tab bar */}
        <SafeAreaView edges={['bottom']} style={styles.tabBar}>
          {TABS.map((t) => {
            const active = tab === t.id;
            return (
              <Pressable
                key={t.id}
                style={styles.tabItem}
                onPress={() => handleTabChange(t.id)}
              >
                <Text style={styles.tabIcon}>{t.icon}</Text>
                <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>
                  {t.label}
                </Text>
                {active && <View style={styles.tabDot} />}
              </Pressable>
            );
          })}
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f1f5f9' },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#0f172a' },
  headerSub: { fontSize: 12, color: '#64748b', marginTop: 1 },
  content: { flex: 1 },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 8,
    paddingBottom: 4,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 4,
    gap: 2,
  },
  tabIcon: { fontSize: 22 },
  tabLabel: { fontSize: 10, color: '#94a3b8', fontWeight: '500' },
  tabLabelActive: { color: '#0f172a', fontWeight: '700' },
  tabDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#0f172a',
    marginTop: 2,
  },
});
