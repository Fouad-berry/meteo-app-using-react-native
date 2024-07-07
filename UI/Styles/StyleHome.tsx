import {StyleSheet} from 'react-native';

export const StyleHome = StyleSheet.create({
    container: {
      flex: 1,
      fontSize: 16,
      backgroundColor: '#81BEEB',
      alignItems: 'center',
    },
    image: {
      flex: 1,
      justifyContent: 'center',
      width: '100%',
      height: '80%',
      borderBottomEndRadius:45,
    },
    text: {
      fontSize: 30,
      textAlign: 'center',
      color: 'white',
      position: 'absolute',
      bottom: 0,
      alignSelf: 'center',
      marginBottom: '24%',
      letterSpacing:1,
      fontWeight:'500',
    },
    button:{
        borderWidth:1,
        borderRadius:25,
        paddingHorizontal:28,
        paddingVertical:13,
        marginBottom: '20%',
        backgroundColor:'black',
    },
    buttonText:{
        color:'white',
    }
  });
  