import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';

export const MeteoScreen = () => {
  const [city, setCity] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [weather, setWeather] = useState(null);

  const fetchWeatherData = async () => {
    const API_KEY = 'd93fad19731955ebdb3718647350440f'; // Remplacez par votre clé d'API OpenWeatherMap

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
      );

      if (response.ok) {
        const data = await response.json();
        setSelectedCity(data.city.name);
        const currentDate = new Date().toISOString().split('T')[0]; // Récupère la date actuelle au format 'YYYY-MM-DD'
        const todayWeather = data.list.filter(item => item.dt_txt.includes(currentDate));
        setWeather(todayWeather);
      } else {
        console.log('Erreur de réponse de l\'API:', response.status);
      }
    } catch (error) {
      console.log('Erreur lors de la récupération des données météo:', error);
    }
  };

  const renderItem = ({ item }) => {
    const temperatureDiff = item.main.temp - 273.15;

    return (
      <View style={styles.forecastItem}>
        <Image
          source={{
            uri: `https://openweathermap.org/img/w/${item.weather[0].icon}.png`,
          }}
          style={styles.forecastIcon}
        />
        <Text style={styles.forecastTemperature}>{temperatureDiff.toFixed(1)}°C</Text>
        <Text style={styles.forecastDate}>{item.dt_txt.substring(11, 16)}</Text>
      </View>
    );
  };

  const renderCurrentWeather = () => {
    if (!weather || weather.length === 0) {
      return null;
    }

    const currentWeather = weather[0]; // Première entrée dans la liste est l'heure actuelle

    const temperatureDiff = currentWeather.main.temp - 273.15;
    const humidity = currentWeather.main.humidity;
    let weatherText = '';

    // Convertir le code de l'icône en texte correspondant à la condition météorologique
    switch (currentWeather.weather[0].icon) {
      case '01d':
      case '01n':
        weatherText = 'Ensoleillé';
        break;
      case '02d':
      case '02n':
        weatherText = 'Nuageux';
        break;
      case '03d':
      case '03n':
        weatherText = 'Nuages dispersés';
        break;
      case '04d':
      case '04n':
        weatherText = 'Nuageux';
        break;
      case '09d':
      case '09n':
        weatherText = 'Averses';
        break;
      case '10d':
      case '10n':
        weatherText = 'Pluie';
        break;
      case '11d':
      case '11n':
        weatherText = 'Orageux';
        break;
      case '13d':
      case '13n':
        weatherText = 'Neige';
        break;
      case '50d':
      case '50n':
        weatherText = 'Brumeux';
        break;
      default:
        weatherText = 'Conditions inconnues';
    }

    return (
        <ScrollView>
      <View style={styles.currentWeatherContainer}>
        <Text style={styles.currentWeatherTitle}>Conditions actuelles</Text>
        <View style={styles.currentWeatherItem}>
          <Image
            source={{
              uri: `https://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`,
            }}
            style={styles.currentWeatherIcon}
          />
          <Text style={styles.currentWeatherText}>{weatherText}</Text>
          <View>
            <Text style={styles.currentWeatherTemperature}>Température: {temperatureDiff.toFixed(1)}°C</Text>
            <Text style={styles.currentWeatherHumidity}>Humidité: {humidity}%</Text>
          </View>
        </View>
      </View>
      </ScrollView>
    );
  };

  return (

    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Entrez le nom de la ville"
        value={city}
        onChangeText={text => setCity(text)}
      />

      <TouchableOpacity style={styles.button} onPress={fetchWeatherData}>
        <Text style={styles.buttontext}>Obtenir la météo</Text>
      </TouchableOpacity>

      {selectedCity ? (
        <Text style={styles.selectedCity}>{selectedCity}</Text>
      ) : null}

      {renderCurrentWeather()}

      {weather && (
        <FlatList
          data={weather}
          renderItem={renderItem}
          keyExtractor={item => item.dt.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#81BEEB',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 16,
    paddingHorizontal: 8,
    marginTop: 20,
    borderRadius: 5,
  },
  forecastItem: {
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: 'white',
    backgroundColor: 'rgba(220, 190, 235, 0.5)',
    opacity: 0.8,
    height: 130,
    paddingHorizontal: 10,
  },
  forecastDate: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    borderRadius: 15,
    paddingHorizontal: 13,
    paddingVertical: 5,
    backgroundColor: 'white',
  },
  forecastIcon: {
    width: 80,
    height: 50,
    marginBottom: 8,
  },
  forecastTemperature: {
    fontSize: 16,
    marginBottom: 4,
    color: 'white',
    fontWeight: '500',
  },
  selectedCity: {
    fontSize: 25,
    fontWeight: '500',
    marginTop: 16,
    marginBottom: 16,
    color: 'white',
  },
  button: {
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 28,
    paddingVertical: 13,
    backgroundColor: 'black',
    opacity: 0.9,
  },
  buttontext: {
    color: 'white',
  },
  currentWeatherContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  currentWeatherTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
  },
  currentWeatherItem: {
    flexDirection: 'column',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 25,
    borderColor: 'white',
    backgroundColor: '#BED7F5',
/*     opacity: 0.5,
 */    paddingHorizontal: 70,
    paddingVertical: 90,
  },
  currentWeatherIcon: {
    width: 150,
    height: 80,
    marginRight: 8,
    bottom: 65,
  },
  currentWeatherTemperature: {
    fontSize: 16,
    marginBottom: 4,
    color: 'black',
    fontWeight: '800',
  },
  currentWeatherHumidity: {
    fontSize: 16,
    color: 'black',
    fontWeight: '800',
  },
  currentWeatherText:{
    fontSize:30,
    fontWeight:'600',
    letterSpacing:1,
    marginTop:-18,
    bottom:35,
  }
});
