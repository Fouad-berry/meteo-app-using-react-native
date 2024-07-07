import { View, Text, StyleSheet, ImageBackground,StatusBar,TouchableOpacity } from 'react-native';
import React from 'react';
import { StyleHome } from '../Styles/StyleHome';
import { useNavigation } from '@react-navigation/native';


export const HomeScreen = () => {
    
    const navigation = useNavigation();

    const handleButtonPress = () => {
      navigation.navigate('Tabs');
  
    };

  return (
    <View style={StyleHome.container}>
        <StatusBar hidden={true} />
      <ImageBackground
        source={require('../../assets/Images/home_img3.jpg')}
        resizeMode="cover"
         style={StyleHome.image}
     />
     <Text style={StyleHome.text} >Weather App</Text>
     <TouchableOpacity style={StyleHome.button} onPress={handleButtonPress} >
        <Text style={StyleHome.buttonText}>Let's Start</Text>
    </TouchableOpacity>
    </View>
  );
};
