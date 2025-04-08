import React from 'react'
import {Controller} from 'react-hook-form'
import {TextInput, Text, TextInputProps, StyleSheet} from 'react-native'
import {errText, inputStyle} from '../../contants/FormInputStyles'

type ControllerInputProps = {
   control: any
   name: string
   placeholder?: string
   rules?: object
   keyboardType?: TextInputProps['keyboardType']
}

export const ControllerInput: React.FC<ControllerInputProps> = ({
   control,
   name,
   placeholder = '',
   rules = {required: true},
   keyboardType = 'default',
}) => {
   const {errText, input} = styles

   return (
      <Controller
         control={control}
         rules={rules}
         name={name}
         render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
            <>
               <TextInput
                  style={input}
                  placeholder={placeholder}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType={keyboardType}
               />
               {error && <Text style={errText}>{error.message}</Text>}
            </>
         )}
      />
   )
}

const styles = StyleSheet.create({
   errText: errText,
   input: inputStyle,
})
