import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Register from '../../components/Register';
import { useAuth } from '../../hooks/authContext';
import COLORS from '../../constants/colors';
import Button from '../../components/Button';

const RegisterScreen = () => {
    const [error, setError] = useState<string | null>(null);
    const auth = useAuth();
    const navigation = useNavigation<NavigationProp<any>>();

    const handleRegister = async (email: string, password: string) => {
        try {
            await auth.register(email, password);
            navigation.navigate("Login");
        } catch (error) {
            console.error('Failed to Register. Try again.', error);
            setError('Failed to Register. Please try again.');
        }
    };

    return (
        <LinearGradient style={styles.container} colors={[COLORS.secondary, COLORS.primary]}>
            <View style={styles.contentContainer}>
                {error && <Text style={styles.errorText}>{error}</Text>}
                <Register onSubmit={handleRegister} />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="Welcome Page"
                    onPress={() => navigation.navigate("Welcome")}
                    style={styles.button}
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
    button: {
        width: '100%',
        backgroundColor: COLORS.black,
    },
    errorText: {
        color: COLORS.red,
        marginBottom: 20,
        fontSize: 14,
    },
});

export default RegisterScreen;