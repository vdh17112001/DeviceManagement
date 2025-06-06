import React from 'react'
import { Controller } from 'react-hook-form'
import { StyleSheet, Text, TextInput, TextInputProps } from 'react-native'
import { errText, inputStyle } from '../../constants/FormInputStyles'

type ControllerInputProps = {
   control: any
   name: string
   placeholder?: string
   rules?: object
   keyboardType?: TextInputProps['keyboardType']
   multiline?: TextInputProps['multiline']
}

export const ControllerInput: React.FC<ControllerInputProps> = ({
   control,
   name,
   placeholder = '',
   rules = { required: true },
   keyboardType = 'default',
   multiline = false,
}) => {
   const { input } = styles

   return (
      <Controller
         control={control}
         rules={rules}
         name={name}
         render={({
            field: { onChange, onBlur, value },
            fieldState: { error },
         }) => (
            <>
               <TextInput
                  style={input}
                  placeholder={placeholder}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value.toString()}
                  keyboardType={keyboardType}
                  multiline={multiline}
               />
               {!!error && <Text style={errText}>{error.message}</Text>}
            </>
         )}
      />
   )
}

const styles = StyleSheet.create({
   input: inputStyle,
})
