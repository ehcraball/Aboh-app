import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BaseScreen from '../components/BaseScreen';
import theme from '../styles/theme';

type Session = {
  start: string; // ISO
  end: string;   // ISO
  mode: 'auto' | 'manual';
  workSeconds: number;
  pauseSeconds: number;
  workCycles: number;
};

export default function StatsScreen() {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const raw = await AsyncStorage.getItem('sessions');
        if (raw) {
          const parsed: Session[] = JSON.parse(raw);
          const sorted = parsed.sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime());
          setSessions(sorted);
        }
      } catch (e) {
        console.error('Erreur chargement sessions :', e);
      }
    };

    loadSessions();
  }, []);

  const formatDuration = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <BaseScreen>
      <View style={styles.container}>
        <Text style={styles.title}>Historique des sessions</Text>
        {sessions.length === 0 ? (
          <Text style={{ color: theme.colors.text }}>Aucune session enregistrée</Text>
        ) : (
          <FlatList
            data={sessions}
            keyExtractor={(item, index) => `${item.start}-${index}`}
            renderItem={({ item }) => (
              <View style={styles.sessionBox}>
                <Text style={styles.date}>{new Date(item.start).toLocaleDateString()}</Text>
                <Text style={styles.data}>Début : {formatDate(item.start)}</Text>
                <Text style={styles.data}>Fin : {formatDate(item.end)}</Text>
                <Text style={styles.data}>Mode : {item.mode}</Text>
                {item.mode == 'auto' ? (
                  <Text style={styles.data}>Cycles complétés : {item.workCycles ?? 0}</Text>
                ) : (
                  <>
                    <Text style={styles.data}>Travail : {formatDuration(item.workSeconds)}</Text>
                    <Text style={styles.data}>Pause : {formatDuration(item.pauseSeconds)}</Text>
                  </>
                )}

              </View>
            )}
          />
        )}
      </View>
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: theme.colors.text,
  },
  sessionBox: {
    marginBottom: 16,
    backgroundColor: '#2E4756',
    borderRadius: 12,
    padding: 12,
  },
  date: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: theme.colors.text,
  },
  data: {
    fontSize: 14,
    color: theme.colors.text,
  },
});
