import React from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import {useForm} from 'react-hook-form'
import {FormCustomerData} from './utils/type'
import {CustomerInforStyle} from './style'
import {yupResolver} from '@hookform/resolvers/yup'
import {customerSchema} from './utils/validation'
import {ControllerDateInput} from './components/ControllerDateInput'
import {ControllerInput} from '../../components/InputForm/ControllerInput'

const CustomerInfor = () => {
  const {buttonSubmit, container, titleButton} = CustomerInforStyle
  const {control, handleSubmit} = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      address: '',
      birth: new Date(),
    },
    resolver: yupResolver(customerSchema),
  })

  const onSubmit = (data: FormCustomerData) => console.log(data)

  return (
    <View style={container}>
      <ControllerInput name="name" placeholder="Name" control={control} />
      <ControllerInput
        name="phone"
        placeholder="Phone number"
        control={control}
        keyboardType="number-pad"
      />
      <ControllerInput name="email" placeholder="Email" control={control} />
      <ControllerInput name="address" placeholder="Address" control={control} />
      <ControllerDateInput name="birth" control={control} />

      <TouchableOpacity style={buttonSubmit} onPress={handleSubmit(onSubmit)}>
        <Text style={titleButton}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CustomerInfor
