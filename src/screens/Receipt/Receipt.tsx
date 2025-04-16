import { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { useNavigate } from '../../common/hooks/useNavigate'
import customerStore from '../../common/store/customerInfoStore'
import deviceStore from '../../common/store/deviceStore'
import summaryStore from '../../common/store/summaryStore'
import { ButtonSubmit } from '../../components/Button/ButtonSubmit'

const Receipt = () => {
   const { container, text, title, nameText, totalText, subView } = styles
   const { name } = customerStore.customerInfo
   const { total, clearSummary, getQuantityList } = summaryStore
   const { updateDeviceAfterSubmit } = deviceStore
   const navigation = useNavigate()

   useEffect(() => {
      const quantityList = getQuantityList()
      updateDeviceAfterSubmit(quantityList)
      clearSummary()
   }, [])

   return (
      <View style={container}>
         <Text style={title}>Receipt</Text>
         <View style={subView}>
            <Text style={nameText}>Thank {name}</Text>
            <Text style={[text, totalText]}>
               Total: <Text style={text}> {total}</Text>
            </Text>
         </View>
         <ButtonSubmit
            label="Exit"
            onPress={() => navigation.navigate('CustomerInfo')}
         />
      </View>
   )
}

export default Receipt

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'space-evenly',
   },
   text: { fontSize: 20 },
   title: { fontSize: 30, fontWeight: 'bold' },
   nameText: {
      color: 'green',
      fontWeight: '500',
      fontSize: 25,
   },
   totalText: {
      fontWeight: 'bold',
   },
   subView: {
      width: '90%',
      padding: 10,
   },
})
