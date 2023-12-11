import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const BottomNav = () => {
    return (
    <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
            <Text>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
            <Text>Music</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
            <Text>Chatbot</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
            <Text>Workouts</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
            <Text>Profile</Text>
        </TouchableOpacity>
    </View>
    );
};

const styles = StyleSheet.create({

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

  });

export default BottomNav;