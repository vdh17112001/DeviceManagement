import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {DeviceItemType} from '../utils/type'
import { height, width } from '../../../common/utils/dimensions'

type DeviceItemProps = {
   item: DeviceItemType
   onPress: () => void
   onDelete: () => void
}

export const DeviceItem = ({item, onPress, onDelete}: DeviceItemProps) => {
   const {name, quantity, fee, selected} = item
   const {container, text, subView, label, padding} = DeviceItemStyle

   return (
      <View style={container}>
         <TouchableOpacity onPress={onPress} style={{flex: 1}}>
            <View style={subView}>
               <Text style={[text, padding]}>{name}</Text>
               {selected && <Text style={text}>{name}</Text>}
            </View>
            <View style={subView}>
               <View>
                  <Text style={text}>
                     <Text style={[label, text]}>Fee:</Text> {fee}
                  </Text>
                  <Text style={text}>
                     <Text style={[label, text]}>Quantity:</Text> {quantity}
                  </Text>
               </View>
               <Text style={text}>{fee}</Text>
            </View>
         </TouchableOpacity>
      </View>
   )
}

const DeviceItemStyle = StyleSheet.create({
   container: {
      height: height * 0.1,
      width: width * 0.9,
      borderWidth: 0.5,
      borderRadius: 10,
      alignSelf: 'center',
      justifyContent: 'center',
      marginVertical: 5,
   },
   text: {
      fontSize: 14,
      color: 'black',
      paddingLeft: 8
   },
   padding: {
      padding: 8,
   },
   label: {fontWeight: 'bold'},
   subView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
})
