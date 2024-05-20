import React, { useState } from "react";
import styled from "styled-components/native";
import { Text } from "react-native";
import COLORS from '../constants/colors';

const Container = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 50px;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  color: ${COLORS.black};
  font-size: 60px;
  font-weight: 800;
  margin-bottom: 30px;
`;

const Input = styled.TextInput`
  width: 80%;
  height: 50px;
  border: 1px solid ${COLORS.primary};
  margin-bottom: 20px;
  padding: 8px;
  background-color: ${COLORS.white};
  border-radius: 8px;
`;

const Button = styled.TouchableOpacity<{ disabled: boolean }>`
  background-color: ${({ disabled }) => (disabled ? COLORS.darkgrey : COLORS.black)};
  padding: 10px 20px;
  border-radius: 8px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
  width: 80%;
`;

const ButtonText = styled.Text`
  color: ${COLORS.white};
  font-size: 18px;
  text-align: center;
`;

const ErrorM = styled.Text`
  color: ${COLORS.red};
  text-align: center;
  margin-bottom: 10px;
`;

export interface ILogin {
  onSubmit: (email: string, password: string) => void
}

const Register: React.FC<ILogin> = ({onSubmit}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match!");
    } else {
      onSubmit(email, password);
      setErrorMessage("");
    }
  };

  const isDisabled = email === '' || password === '' || confirmPassword === '';

  return (
    <Container>
      <Title>Register</Title>
      <Text style={{ fontSize: 18, color: COLORS.black }}>Email:</Text>
      <Input 
        placeholder="Email" 
        keyboardType="email-address" 
        onChangeText={setEmail} 
        placeholderTextColor={COLORS.gray} 
      />
      <Text style={{ fontSize: 18, color: COLORS.black }}>Password:</Text>
      <Input 
        placeholder="Password" 
        secureTextEntry 
        onChangeText={setPassword} 
        placeholderTextColor={COLORS.gray} 
      />
      <Text style={{ fontSize: 18, color: COLORS.black }}>Confirm password:</Text>
      <Input 
        placeholder="Confirm password" 
        secureTextEntry 
        onChangeText={setConfirmPassword} 
        placeholderTextColor={COLORS.gray} 
      />
      {errorMessage && <ErrorM>{errorMessage}</ErrorM>}
      <Button onPress={handleSubmit} disabled={isDisabled}>
        <ButtonText>Create Account</ButtonText>
      </Button>
    </Container>
  )
}

export default Register;