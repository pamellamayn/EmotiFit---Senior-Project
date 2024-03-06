//Insert Music information here from Johnathon
import React from 'react';
import { ScrollView, StyleSheet, SafeAreaView, View, Image, Text, TouchableOpacity, TextInput } from 'react-native';


export default function Music() {

    return(
        <View style={styles.container}>
            <Text 
            style={styles.text}
            >
                Spotify API Page
            </Text>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 1,
    },
  });