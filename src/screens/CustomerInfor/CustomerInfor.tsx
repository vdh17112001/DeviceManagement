import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { useForm } from 'react-hook-form'
import { FormCustomerData } from './utils/type'
import { yupResolver } from '@hookform/resolvers/yup'
import { customerSchema } from './utils/validation'
import { ControllerDateInput } from './components/ControllerDateInput'
import { ControllerInput } from '../../components/InputForm/ControllerInput'
import customerStore from '../../common/store/customerInforStore'
import { useNavigate } from '../../common/hooks/useNavigate'
import { showToast } from '../../common/utils/toast'
import { ButtonSubmit } from '../../components/Button/ButtonSubmit'

const CustomerInfor = () => {
   const navigation = useNavigate()
   const { container } = styles
   const { setCustomerInforForm, customerInfor } = customerStore

   const { control, handleSubmit } = useForm({
      defaultValues: customerInfor as any,
      resolver: yupResolver(customerSchema),
   })

   const _onSubmit = (data: FormCustomerData) => {
      setCustomerInforForm(data)
      showToast('Submit success')
      _navigate()
   }

   const _navigate = () => {
      navigation.navigate('DeviceList')
   }

   useEffect(() => {
      console.log('Hoang: CustomerInfor render')
   })

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
         <ControllerInput
            name="address"
            placeholder="Address"
            control={control}
         />
         <ControllerDateInput name="birth" control={control} />

         <ButtonSubmit label="Submit" onPress={handleSubmit(_onSubmit)} />
      </View>
   )
}

export default CustomerInfor

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
   },
})
