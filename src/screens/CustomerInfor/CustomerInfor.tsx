import React from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import {useForm} from 'react-hook-form'
import {FormCustomerData} from './utils/type'
import {CustomerInforStyle} from './style'
import {yupResolver} from '@hookform/resolvers/yup'
import {customerSchema} from './utils/validation'
import {ControllerDateInput} from './components/ControllerDateInput'
import {ControllerInput} from '../../components/InputForm/ControllerInput'
import customerStore from '../../common/store/customerInforStore'
import {useNavigate} from '../../common/hooks/useNavigate'

const CustomerInfor = () => {
  const navigation = useNavigate()
  const {
    buttonSubmit,
    container,
    titleButton,
    navigationText,
    navigationButton,
  } = CustomerInforStyle
  const {setCustomerInforForm, customerInfor} = customerStore

  const {control, handleSubmit} = useForm({
    defaultValues: customerInfor as any,
    resolver: yupResolver(customerSchema),
  })

  const _onSubmit = (data: FormCustomerData) => {
    setCustomerInforForm(data)
  }

  const _navigate = () => {
    navigation.navigate('DeviceList')
  }

  return (
    <View style={container}>
      <TouchableOpacity style={navigationButton} onPress={_navigate}>
        <Text style={navigationText}>Go to Device List</Text>
      </TouchableOpacity>
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

      <TouchableOpacity style={buttonSubmit} onPress={handleSubmit(_onSubmit)}>
        <Text style={titleButton}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CustomerInfor
