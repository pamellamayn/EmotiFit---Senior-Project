import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput, Image } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import BottomNav from '../navigator/BottomNav';
import { auth } from '../firebase';

const lessons = [
  {
    Image: '../assets/bikingicon.png',
    name: 'TABATAS (40/20S)',
    duration: 44,
  },
];

const HomeScreen = ({ navigation }) => {
return (

<SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <View style={styles.header}>
        </View>
        <View style={styles.welcome}>
          <Text style={styles.welcomeTitle}>Hello, <Text style={styles.welcomeName}>{auth.currentUser?.displayName}</Text>!</Text>
          <Text style={styles.welcomeText}>Let's get a workout in today!</Text>
        </View>
        <View style={styles.search}>
          <TextInput
            placeholder="Search for biking workouts"
            placeholderTextColor="#9695b0"
            style={styles.searchInput}
          />
          <View style={styles.search}>
            {/*IMPLEMENT SEARCH FUNCTION SO THAT THIS BUTTON WORKS*/}
            <TouchableOpacity>
              <View style={styles.searchButton}>
                <FeatherIcon name="search" size={20} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={styles.contentTitle}>Workouts</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Workouts')
            }>
            <Text style={styles.contentLink}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.container}>
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
                  source={require("../assets/bikingicon.png")} />

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
      </View>

      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={styles.contentTitle}>EmotiBit Connection</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Workouts')
            }>
            <Text style={styles.contentLink}>Connect here</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={styles.contentTitle}>Want to talk to your personal AI trainer?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Chatbot')
            }>
            <Text style={styles.contentLink}>Spark a conversation here!</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity 
        style={styles.navItem}
        onPress={() => navigation.navigate('Home')}
        >
            <Text>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
        style={styles.navItem}
        onPress={() => navigation.navigate('Music')}
        >
            <Text>Music</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={styles.navItem}
        onPress={() => navigation.navigate('Chatbot')}
        >
            <Text>Chatbot</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={styles.navItem}
        onPress={() => navigation.navigate('Workouts')}
        >
            <Text>Workouts</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={styles.navItem}
        onPress={() => navigation.navigate('Profile')}
        >
            <Text>Profile</Text>
        </TouchableOpacity>
    </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topBar: {
    width: '100%',
    backgroundColor: '#3498db',
    paddingVertical: 30,
    alignItems: 'center',
    bottom: 340,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    alignContent: 'center',
    color: 'white',
    top: 15,
    right: 4,
  },
  text: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },
  userWelcome: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },
  editProfileButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  workoutDataButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    paddingVertical: 25,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
},
navItem: {
    
    alignItems: 'center',
    bottom: 10
},
container: {
  backgroundColor: '#ffffff',
  flex: 1,
},
top: {
  paddingHorizontal: 24,
  paddingVertical: 8,
},
header: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},
avatar: {
  width: 48,
  height: 48,
  borderRadius: 9999,
},
welcome: {
  paddingVertical: 16,
  borderBottomWidth: 1,
  borderBottomColor: 'rgba(255,255,255,0.15)',
  marginBottom: 12,
},
welcomeTitle: {
  fontSize: 28,
  fontWeight: '800',
  color: '#1a2525',
},
welcomeName:{
  fontSize: 25,
  fontWeight: '800',
  color: '#0884af'
},
welcomeText: {
  fontSize: 16,
  fontWeight: '500',
  color: '#1a2525',
  marginTop: 8,
},
search: {
  position: 'relative',
},
searchInput: {
  height: 56,
  backgroundColor: '#f3f3f6',
  paddingHorizontal: 16,
  color: '#1a2525',
  fontSize: 18,
  borderRadius: 9999,
},
searchFloating: {
  position: 'absolute',
  top: 0,
  right: 0,
  height: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 8,
},
searchButton: {
  alignSelf: 'flex-end',
  width: 55,
  height: 55,
  borderRadius: 9999,
  backgroundColor: '#0884af',
  justifyContent: 'center',
  alignItems: 'center',
  top: -56,
},
content: {
  paddingVertical: 8,
  paddingHorizontal: 22,
  flex: 1,
},
contentHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 12,
},
contentTitle: {
  fontSize: 22,
  fontWeight: '800',
  color: '#1a2525',
},
contentLink: {
  fontSize: 16,
  fontWeight: '700',
  color: '#0884af',
},
contentPlaceholder: {
  borderStyle: 'dashed',
  borderWidth: 4,
  borderColor: '#e5e7eb',
  flex: 1,
  borderRadius: 8,
},
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

export default HomeScreen;