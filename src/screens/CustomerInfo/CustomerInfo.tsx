import React from 'react'
import { StyleSheet, View } from 'react-native'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useNavigate } from '../../common/hooks/useNavigate'
import customerStore from '../../common/store/customerInfoStore'
import { showToast } from '../../common/utils/toast'
import { ButtonSubmit } from '../../components/Button/ButtonSubmit'
import { ControllerInput } from '../../components/InputForm/ControllerInput'
import { ControllerDateInput } from './components/ControllerDateInput'
import { FormCustomerData } from './utils/type'
import { customerSchema } from './utils/validation'
import StatisticalChart from '../../components/StatisticalChart/StatisticalChart'

const CustomerInfo = () => {
   const navigation = useNavigate()
   const { container } = styles
   const { setCustomerInfoForm, customerInfo } = customerStore

   const { control, handleSubmit } = useForm({
      defaultValues: customerInfo as any,
      resolver: yupResolver(customerSchema),
   })

   const _onSubmit = (data: FormCustomerData) => {
      setCustomerInfoForm(data)
      showToast('Submit success')
      _navigate()
   }

   const _navigate = () => navigation.navigate('DeviceList')

   return (
      <View style={container}>
         {/* <ControllerInput name="name" placeholder="Name" control={control} />
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

         <ButtonSubmit label="Submit" onPress={handleSubmit(_onSubmit)} /> */}
         <StatisticalChart />
      </View>
   )
}

export default CustomerInfo

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
   },
})
