import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

const lessons = [
  {
    emoji: '\u1F6B4',
    name: 'TABATAS (40/20S)',
    duration: 44,
  },
  {
    emoji: '\u1F6B4',
    name: 'SPRINTS',
    duration: 52,
  },
  {
    emoji: '\u1F6B4',
    name: 'SWEETSPOT',
    duration: 61,
  },
  {
    emoji: '\u1F6B4',
    name: 'RACE SIMULATION',
    duration: 65,
  },
  {
    emoji: '\u1F6B4',
    name: 'VO2 MAX INTERVALS',
    duration: 55,
  },
];

export default function Workout() {
  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Indoor cycling workouts 🚴</Text>

        {lessons.map(({ emoji, name, duration }, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                // handle onPress
              }}>
              <View style={styles.card}>
                <Image
                  alt=""
                  resizeMode="cover"
                  style={styles.cardEmoji}
                  source={{ uri: img }} />

                <View>
                  <Text style={styles.cardTitle}>{name}</Text>

                  <View style={styles.cardInfo}>
                    <View style={styles.cardInfoItem}>
                      <FeatherIcon color="#636a73" name="clock" />

                      <Text style={styles.cardInfoItemText}>
                        {duration} mins
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.cardAction}>
                  <FeatherIcon
                    color="#9ca3af"
                    name="chevron-right"
                    size={22} />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  /** Card */
  card: {
    paddingVertical: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardEmoji: {
    width: 50,
    height: 50,
    borderRadius: 9999,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  cardInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardInfoItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  cardInfoItemText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#636a73',
    marginLeft: 2,
  },
  cardAction: {
    marginLeft: 'auto',
  },
});