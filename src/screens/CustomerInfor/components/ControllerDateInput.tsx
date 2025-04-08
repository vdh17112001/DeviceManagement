// DateInput.tsx
import React, {useState} from 'react'
import {Controller} from 'react-hook-form'
import {View, Text, Pressable} from 'react-native'
import DatePicker from 'react-native-date-picker'
import {ControllerDateInputStyles} from '../style'

type DateInputProps = {
   control: any
   name: string
   placeholder?: string
}

export const ControllerDateInput: React.FC<DateInputProps> = ({
   control,
   name,
   placeholder = 'Select date',
}) => {
   const {container, input, errorText} = ControllerDateInputStyles

   const [open, setOpen] = useState(false)
   return (
      <Controller
         control={control}
         name={name}
         render={({field: {onChange, value}, fieldState: {error}}) => (
            <View style={container}>
               <Pressable onPress={() => setOpen(true)} style={input}>
                  <Text style={{color: value ? '#000' : '#999'}}>
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
                  onConfirm={date => {
                     setOpen(false)
                     onChange(date)
                  }}
                  onCancel={() => setOpen(false)}
               />

               {error && <Text style={errorText}>{error.message}</Text>}
            </View>
         )}
      />
   )
}
