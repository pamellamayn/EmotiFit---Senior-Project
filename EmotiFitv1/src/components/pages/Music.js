//Spotify Code developed by Johnathon
import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, TextInput, Image, StyleSheet, Alert } from 'react-native';
import { authorize, revoke } from 'react-native-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';
import InAppBrowser from 'react-native-inappbrowser-reborn';

//Spotify Configuration
const config = {
  issuer: 'https://accounts.spotify.com',
  clientId: 'ca9fb95223574af697d4c3784a52d1a5',
  redirectUrl: 'EmotiFit://spotify-callback',
  scopes: ['user-read-private', 'user-top-read', 'user-library-read'],
};

const Music = () => {
  const [authState, setAuthState] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [averageTempo, setAverageTempo] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [filteredTracks, setFilteredTracks] = useState([]);
  const [recommendedBPM, setRecommendedBPM] = useState('');
  const [filterCount, setFilterCount] = useState(0);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        fetchUserData(token);
      }
    };

    checkAuth();
  }, []);

  const signIn = async () => {
    try {
      const authState = await authorize(config);
      setAuthState(authState);
      await AsyncStorage.setItem('accessToken', authState.accessToken);
      fetchUserData(authState.accessToken); //Making sure that data fetching method works
    } catch (error) {
      console.error('Authorization failed:', error);
      Alert.alert('Authorization Error', error.message); //Error handling displayed to user
    }
  };

  const signOut = async () => {
    try {
      await revoke(config, { tokenToRevoke: authState.accessToken });
      setAuthState(null);
      await AsyncStorage.removeItem('accessToken');
    } catch (error) {
      Alert.alert('Failed to revoke token:', error.message);
    }
  };

  const fetchUserData = (accessToken) => {
    fetchTopTracks(accessToken);
    fetchTopArtists(accessToken);
  };

  const fetchTopTracks = (accessToken) => {
    fetch('https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=long_term', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTopTracks(data.items);
        const trackIds = data.items.map((track) => track.id).join(',');
        fetchAudioFeatures(accessToken, trackIds);
      })
      .catch((error) => {
        console.error('Error fetching top tracks:', error);
      });
  };

  const fetchTopArtists = (accessToken) => {
    fetch('https://api.spotify.com/v1/me/top/artists?limit=10&time_range=long_term', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTopArtists(data.items);
      })
      .catch((error) => {
        console.error('Error fetching top artists:', error);
      });
  };

  const fetchAudioFeatures = (accessToken, trackIds) => {
    fetch(`https://api.spotify.com/v1/audio-features?ids=${trackIds}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const tempos = data.audio_features.map((feature) => feature.tempo);
        const average = tempos.reduce((acc, curr) => acc + curr, 0) / tempos.length;
        setAverageTempo(Math.round(average));
      })
      .catch((error) => {
        console.error('Error fetching audio features:', error);
      });
  };

  const fetchFilteredTracks = (accessToken, desiredBPM) => {
    fetch('https://api.spotify.com/v1/me/tracks?limit=50', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const trackIds = data.items.map((item) => item.track.id).join(',');
        fetch(`https://api.spotify.com/v1/audio-features?ids=${trackIds}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((response) => response.json())
          .then((featuresData) => {
            const tracksWithAudioFeatures = data.items.map((item) => {
              const audioFeature = featuresData.audio_features.find(
                (feature) => feature.id === item.track.id
              );
              return {
                ...item,
                track: {
                  ...item.track,
                  audioFeature: audioFeature,
                },
              };
            });

            const sortedTracks = tracksWithAudioFeatures.sort((a, b) => {
              const diffA = Math.abs(a.track.audioFeature.tempo - desiredBPM);
              const diffB = Math.abs(b.track.audioFeature.tempo - desiredBPM);
              return diffA - diffB;
            });

            const nextThreeTracks = sortedTracks.slice(filterCount * 5, (filterCount + 1) * 5);

            if (nextThreeTracks.length > 0) {
              setFilteredTracks(nextThreeTracks);
              setFilterCount(filterCount + 1);
            } else {
              Alert.alert('No more songs', 'There are no more songs to display at this BPM range.');
              setFilterCount(0);
            }
          });
      })
      .catch((error) => {
        console.error('Error fetching liked songs:', error);
      });
  };

  return (
    <View style={styles.container}>
      {authState ? (
        <>
          <Text style={styles.loggedInText}>Welcome!</Text>
          <Button
            title={showStats ? 'Hide Stats' : 'Show Stats'}
            onPress={() => {
              setShowStats(!showStats);
              if (showRecommendations) {
                setShowRecommendations(false);
              }
            }}
          />
          <Button
            title={showRecommendations ? 'Hide Recommendations' : 'Show Recommendations'}
            onPress={() => {
              setShowRecommendations(!showRecommendations);
              if (showStats) {
                setShowStats(false);
              }
            }}
          />
          {showStats && (
            <ScrollView style={styles.scrollContainer}>
              <Text style={styles.header}>Top Tracks:</Text>
              {topTracks.map((track, index) => (
                <Text key={index} style={styles.smallText}>
                  {`${index + 1}. ${track.name} by ${track.artists
                    .map((artist) => artist.name)
                    .join(', ')}`}
                </Text>
              ))}
              <Text style={styles.header}>Top Artists:</Text>
              {topArtists.map((artist, index) => (
                <Text key={index} style={styles.smallText}>
                  {`${index + 1}. ${artist.name}`}
                </Text>
              ))}
              <Text style={styles.header}>Average Tempo:</Text>
              <Text style={styles.smallText}>{averageTempo} BPM</Text>
            </ScrollView>
          )}
          {showRecommendations && (
            <>
              <ScrollView style={styles.scrollContainer}>
                <Text style={styles.header}>Tracks Matching Your BPM:</Text>
                {filteredTracks.map((track, index) => (
                  <View key={index} style={styles.trackContainer}>
                    <Image
                      source={{ uri: track.track.album.images[0].url }}
                      style={styles.albumArtwork}
                    />
                    <Text style={styles.smallText}>
                      {`${track.track.name} by ${track.track.artists
                        .map((artist) => artist.name)
                        .join(', ')} (BPM: ${track.track.audioFeature.tempo.toFixed(2)})`}
                    </Text>
                  </View>
                ))}
              </ScrollView>
              <View style={styles.filterContainer}>
                <TextInput
                  style={styles.input}
                  onChangeText={setRecommendedBPM}
                  value={recommendedBPM}
                  placeholder='Enter desired BPM'
                  keyboardType='numeric'
                />
                <Button
                  title='Filter Tracks'
                  onPress={() => fetchFilteredTracks(authState.accessToken, parseFloat(recommendedBPM))}
                />
              </View>
            </>
          )}
          <Button title='Sign Out' onPress={signOut} />
        </>
      ) : (
        <Button title='Sign In to Spotify' onPress={signIn} />
      )}
      {!showStats && !showRecommendations && (
        <WebView style={styles.webview} source={{ uri: 'https://www.spotify.com' }} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    marginTop: 10,
    width: '50%',
    aspectRatio: 0.5,
  },
  scrollContainer: {
    width: '100%',
    padding: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  albumArtwork: {
    width: 50,
    height: 50,
  },
  filterContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
  },
  input: {
    height: 40,
    marginBottom: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
  trackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  smallText: {
    fontSize: 14,
    marginVertical: 5,
  },
  loggedInText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Music;