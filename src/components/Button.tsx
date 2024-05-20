import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import COLORS from '../constants/colors';


interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  color?: string;
  filled?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
    const filledBgColor = props.color || COLORS.primary;
    const outlinedColor = COLORS.white;
    const bgColor = props.filled ? filledBgColor : 'transparent'; 
    const textColor = props.filled ? COLORS.white : COLORS.primary;

  return (
    <TouchableOpacity
        activeOpacity={0.8}
        onPress={props.onPress}
        style={[
            styles.button,
            { backgroundColor: bgColor, borderColor: props.filled ? 'transparent' : COLORS.primary },
            props.style
        ]}
    >
        <Text style={[styles.text, { color: textColor }]}>
            {props.title}
        </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2, 
  },
  text: {
    fontSize: 18,
    
  },
});

export default Button;
