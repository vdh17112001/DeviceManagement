import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';

interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handlePress = () => {
        const newChecked = !isChecked;
        setIsChecked(newChecked);
        onChange(newChecked);
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.container}>
            <View style={[styles.checkbox, isChecked && styles.checked]} />
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#000',
        marginRight: 8,
    },
    checked: {
        backgroundColor: '#000',
    },
    label: {
        fontSize: 16,
    },
});

export default Checkbox;