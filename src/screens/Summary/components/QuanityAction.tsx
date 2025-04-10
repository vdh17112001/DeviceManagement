import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { height } from '../../../common/utils/dimensions'
import { useState } from 'react'

interface QuantityActionProps {
   onUpdate: (value: number) => void
   quantity: number
}

export const QuantityAction = ({
   onUpdate,

   quantity,
}: QuantityActionProps) => {
   const { container, actionButton, text, disabledStyle } = styles

   const [value, setValue] = useState(1)
   const inCreateaseDisabled = value === quantity
   const decreaseDisabled = value === 0
   return (
      <View style={container}>
         <TouchableOpacity
            disabled={inCreateaseDisabled}
            onPress={() => {
               const v = value + 1
               onUpdate(v)
               setValue(v)
            }}
            style={actionButton}>
            <Text style={[text, inCreateaseDisabled && disabledStyle]}>+</Text>
         </TouchableOpacity>
         <Text style={text}>{value}</Text>
         <TouchableOpacity
            disabled={value === 0}
            onPress={() => {
               const v = value - 1
               onUpdate(v)
               if (v !== 0) {
                  setValue(v)
               }
            }}
            style={actionButton}>
            <Text style={[text, decreaseDisabled && disabledStyle]}>-</Text>
         </TouchableOpacity>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      height: '100%',
      width: '10%',
      justifyContent: 'space-evenly',
      alignItems: 'center',
   },
   actionButton: {
      height: height * 0.025,
      width: height * 0.025,
      justifyContent: 'center',
      alignItems: 'center',
   },
   text: {
      fontSize: 17,
      fontWeight: 'bold',
   },
   disabledStyle: {
      color: 'gray',
   },
})
