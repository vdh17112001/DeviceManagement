import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { height } from '../../../common/utils/dimensions'
import { useState } from 'react'

interface QuantityActionProps {
   onUpdate: (value: number) => void
   quantity: number
}

export const QuantityAction = ({ onUpdate, quantity }: QuantityActionProps) => {
   const { container, actionButton, text, disabledStyle } = styles

   const [value, setValue] = useState(1)
   const inCreaseDisabled = value === quantity
   const decreaseDisabled = !value

   const _onIncrease = () => {
      const v = value + 1
      onUpdate(v)
      setValue(v)
   }
   const _onDecrease = () => {
      const v = value - 1
      onUpdate(v)
      if (v) {
         setValue(v)
      }
   }
   return (
      <View style={container}>
         <TouchableOpacity
            disabled={inCreaseDisabled}
            onPress={() => _onIncrease()}
            style={actionButton}>
            <Text style={[text, inCreaseDisabled && disabledStyle]}>+</Text>
         </TouchableOpacity>
         <Text style={text}>{value}</Text>
         <TouchableOpacity
            disabled={decreaseDisabled}
            onPress={_onDecrease}
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
