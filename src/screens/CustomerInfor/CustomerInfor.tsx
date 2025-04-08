import React from 'react'
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'
import {useForm} from 'react-hook-form'
import {FormCustomerData} from './utils/type'
import {yupResolver} from '@hookform/resolvers/yup'
import {customerSchema} from './utils/validation'
import {ControllerDateInput} from './components/ControllerDateInput'
import {ControllerInput} from '../../components/InputForm/ControllerInput'
import customerStore from '../../common/store/customerInforStore'
import {useNavigate} from '../../common/hooks/useNavigate'
import {showToastSuccess} from '../../common/utils/toast'
import {height, width} from '../../common/utils/dimensions'

const CustomerInfor = () => {
   const navigation = useNavigate()
   const {
      buttonSubmit,
      container,
      titleButton,
      navigationText,
      navigationButton,
   } = styles
   const {setCustomerInforForm, customerInfor} = customerStore

   const {control, handleSubmit} = useForm({
      defaultValues: customerInfor as any,
      resolver: yupResolver(customerSchema),
   })

   const _onSubmit = (data: FormCustomerData) => {
      console.log('Hoang: data ', data)
      setCustomerInforForm(data)
      showToastSuccess('Submit success')
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
         <ControllerInput
            name="address"
            placeholder="Address"
            control={control}
         />
         <ControllerDateInput name="birth" control={control} />

         <TouchableOpacity
            style={buttonSubmit}
            onPress={handleSubmit(_onSubmit)}>
            <Text style={titleButton}>Submit</Text>
         </TouchableOpacity>
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
   buttonSubmit: {
      width: width * 0.9,
      height: height * 0.05,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'blue',
   },
   titleButton: {
      fontSize: 15,
      color: 'white',
   },
   navigationText: {
      fontSize: 15,
      color: 'black',
   },
   navigationButton: {
      alignSelf: 'flex-end',
      marginRight: 10,
   },
})
