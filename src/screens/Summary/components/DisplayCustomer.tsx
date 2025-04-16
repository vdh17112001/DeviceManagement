import { StyleSheet, Text, View } from 'react-native'

import customerStore from '../../../common/store/customerInfoStore'
import { width } from '../../../common/utils/dimensions'

export const DisplayCustomer = () => {
   const { container, text, title } = styles

   const { name, address, birth, email, phone } = customerStore.customerInfo

   return (
      <View style={container}>
         <Text style={text}>
            <Text style={[text, title]}>Name:</Text> {name}
         </Text>
         <Text style={text}>
            <Text style={[text, title]}>Email:</Text> {email}
         </Text>
         <Text style={text}>
            <Text style={[text, title]}>Phone:</Text> {phone}
         </Text>
         <Text style={text}>
            <Text style={[text, title]}>Address:</Text> {address}
         </Text>
         <Text style={text}>
            <Text style={[text, title]}>Birth:</Text>{' '}
            {birth?.toLocaleDateString()}
         </Text>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      width: width * 0.9,
      paddingVertical: 20,
      justifyContent: 'space-between',
      borderWidth: 0.5,
      borderRadius: 5,
      alignSelf: 'center',
      gap: 10,
   },
   text: {
      paddingHorizontal: 8,
      color: 'black',
   },
   title: {
      fontWeight: 'bold',
   },
})
