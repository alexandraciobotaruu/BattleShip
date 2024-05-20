import React from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import COLORS from '../../constants/colors';
import Button from '../../components/Button';

type WelcomeScreenNavigationProp = StackNavigationProp<any, 'Welcome'>;
interface WelcomeProps {
  navigation: WelcomeScreenNavigationProp;
}

const Welcome: React.FC<WelcomeProps> = ({ navigation }) => {
  return (
    <LinearGradient
      style={styles.container}
      colors={[COLORS.secondary, COLORS.primary]}
    >
      <View style={styles.innerContainer}>
        <Image
          source={require("../../../assets/ship.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>Register or Login</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Register"
          onPress={() => {
            console.log('Register button pressed');
            navigation.navigate("Register");
          }}
          style={{ width: '50%', backgroundColor: COLORS.black }}
        />
      </View>

      <View style={styles.button1Container}>
        <Button
          title="Login"
          onPress={() => {
            navigation.navigate("Login");
          }}
          style={{ width: '50%', backgroundColor: COLORS.black }}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 550,
    left: 0,
    right: 0,
    paddingHorizontal: 5,
  },
  button1Container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 600,
    left: 0,
    right: 0,
    paddingHorizontal: 5,
  },
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  image: {
    height: 310,
    width: 310,
    borderRadius: 20,
    position: "absolute",
    top: 100,
    left: '50%',
    transform: [{ translateX: -155 }],
  },
  textContainer: {
    paddingHorizontal: 22,
    position: 'absolute',
    top: 450,
    width: '100%',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 45,
    fontWeight: "800",
    color: COLORS.black,
  },
});

export default Welcome;