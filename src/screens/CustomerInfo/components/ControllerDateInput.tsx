import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { errText, inputStyle } from '../../../constants/FormInputStyles'
import { height } from '../../../common/utils/dimensions'

interface DateInputProps {
   control: any
   name: string
   placeholder?: string
}

export const ControllerDateInput = ({
   control,
   name,
   placeholder = 'Select date',
}: DateInputProps) => {
   const { container, input, errorText } = styles

   const [open, setOpen] = useState(false)

   const _onConfirm = (date: Date, onChange: (...e: any[]) => void) => {
      setOpen(false)
      onChange(date)
   }

   return (
      <Controller
         control={control}
         name={name}
         render={({ field: { onChange, value }, fieldState: { error } }) => {
            const color = { color: value ? '#000' : '#999' }
            return (
               <View style={container}>
                  <Pressable onPress={() => setOpen(true)} style={input}>
                     <Text style={color}>
                        {value
                           ? new Date(value).toLocaleDateString()
                           : placeholder}
                     </Text>
                  </Pressable>

                  <DatePicker
                     modal
                     open={open}
                     date={value ? new Date(value) : new Date()}
                     mode="date"
                     onConfirm={date => _onConfirm(date, onChange)}
                     onCancel={() => setOpen(false)}
                  />

                  {!!error && <Text style={errorText}>{error.message}</Text>}
               </View>
            )
         }}
      />
   )
}

const styles = StyleSheet.create({
   container: {
      marginBottom: 16,
   },
   input: {
      ...inputStyle,
      justifyContent: 'center',
      height: height * 0.05,
   },
   errorText: { ...errText, paddingLeft: 0, marginTop: 10 },
})
