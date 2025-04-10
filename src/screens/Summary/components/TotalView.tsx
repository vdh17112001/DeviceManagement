import { StyleSheet, Text, View } from 'react-native'
import { width } from '../../../common/utils/dimensions'
import summaryStore from '../../../common/store/summaryStore'
import { observer } from 'mobx-react'
import { ButtonSubmit } from '../../../components/Button/ButtonSubmit'
import { useNavigate } from '../../../common/hooks/useNavigate'

export const TotalView = observer(() => {
   const { container, text, title, totalStyle } = styles
   const { total } = summaryStore
   const navigation = useNavigate()

   return (
      <View style={container}>
         <Text style={text}>
            <Text style={[text, title, totalStyle]}>Total: </Text>
            {total.toFixed(2)}
         </Text>
         <ButtonSubmit
            disabled={!total}
            label="Submit"
            onPress={() => navigation.navigate('Receipt')}
         />
      </View>
   )
})

const styles = StyleSheet.create({
   container: {
      width: width * 0.9,
      paddingVertical: 15,
      justifyContent: 'space-between',
      alignSelf: 'center',
      alignItems: 'flex-end',
      gap: 10,
      marginTop: 20,
   },
   text: {
      paddingHorizontal: 8,
      color: 'black',
      fontSize: 17,
   },
   title: {
      fontWeight: 'bold',
   },
   totalStyle: {
      fontSize: 20,
   },
})
