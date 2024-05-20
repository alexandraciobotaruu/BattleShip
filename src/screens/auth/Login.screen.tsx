import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Login from '../../components/Login';
import { useAuth } from '../../hooks/authContext';
import COLORS from '../../constants/colors';
import Button from '../../components/Button';


const LoginScreen = () => {
    const navigation = useNavigation<any>()
    const auth = useAuth()
    const handleLogin = async (email: string, password: string) => {
        try {
            await auth.login(email, password);
            navigation.navigate("Lobby");
        } catch (error) {
            console.error('Login error:', error);
        }
    };


    return (
        <LinearGradient
            style={styles.container}
            colors={[COLORS.secondary, COLORS.primary]}
        > 
            <View style={styles.contentContainer}>
                <Login onSubmit={handleLogin}/>                         
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="Welcome Page"
                    onPress={() => navigation.navigate("Welcome")}
                    style={{ width: '100%', backgroundColor: COLORS.black }}
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
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 50, 
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
});

export default LoginScreen;
