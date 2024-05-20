import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../hooks/authContext';
import { getUserDetails } from '../../api';
import COLORS from '../../constants/colors';
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import Button from '../../components/Button';

const Title = styled.Text`
  color: ${COLORS.black};
  font-size: 40px;
  font-weight: 800;
  margin-left: 20px;
`;

const UserDetailsScreen = () => {
  const auth = useAuth();
  const [userDetails, setUserDetails] = useState<any>(null);
  const navigation = useNavigation<any>();

  const logout = () => {
    navigation.navigate("Welcome");
  };

  const goToLobby = () => {
    navigation.navigate("Lobby");
  };

  useEffect(() => {
    const getUserDetailsData = async () => {
      try {
        const data = await getUserDetails();
        setUserDetails(data);
      } catch (error) {
        console.error('Error getting user details:', error);
      }
    };

    getUserDetailsData();
  }, [auth.token]);

  return (
    <LinearGradient style={styles.container} colors={[COLORS.secondary, COLORS.primary]}>
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Image
            source={require("../../../assets/user.png")}
            style={styles.image}
          />
          <Title>My profile</Title>
        </View>
        <View style={styles.detailsContainer}>
          {userDetails && (
            <>
              <Text style={styles.detail}>ID: <Text style={styles.value}>{userDetails.user.id}</Text></Text>
              <Text style={styles.detail}>Email: <Text style={styles.value}>{userDetails.user.email}</Text></Text>
              <Text style={styles.detail}>Games played: <Text style={styles.value}>{userDetails.gamesPlayed}</Text></Text>
              <Text style={styles.detail}>Games lost: <Text style={styles.value}>{userDetails.gamesLost}</Text></Text>
              <Text style={styles.detail}>Games won: <Text style={styles.value}>{userDetails.gamesWon}</Text></Text>
              <Text style={styles.detail}>Currently: <Text style={styles.value}>{userDetails.currentlyGamesPlaying}</Text></Text>
            </>
          )}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Lobby"
          onPress={goToLobby}
          style={styles.button}
        />
        <Button
          title="Logout"
          onPress={logout}
          style={[styles.button, { marginTop: 10 }]}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 100,
  },
  detailsContainer: {
    alignItems: 'flex-start',
  },
  detail: {
    fontSize: 18,
    color: COLORS.black,
    marginBottom: 10,
  },
  value: {
    fontSize: 15,
    color: COLORS.black,
  },
  image: {
    width: 100,
    height: 100,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    bottom: 250,
  },
  button: {
    width: '100%',
    backgroundColor: COLORS.black,
  },
});

export default UserDetailsScreen;