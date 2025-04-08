import React from 'react'
import {Controller} from 'react-hook-form'
import {TextInput, Text, TextInputProps} from 'react-native'
import {ControllerInputStyles} from './style'

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
  const {errText, input} = ControllerInputStyles

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
