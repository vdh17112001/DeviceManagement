import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {DeviceItemType} from '../utils/type'
import {height, width} from '../../../common/utils/dimensions'

type DeviceItemProps = {
   item: DeviceItemType
   onPress: () => void
   onDelete: () => void
}

export const DeviceItem = ({item, onPress, onDelete}: DeviceItemProps) => {
   const {name, quantity, fee, selected} = item
   const {
      container,
      text,
      subView,
      label,
      padding,
      deleteText,
      selectItem,
      deleteButton,
   } = styles

   return (
      <View style={[container, selected && selectItem]}>
         <TouchableOpacity onPress={onPress}>
            <View style={subView}>
               <Text style={[text, padding]}>{name}</Text>
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
               <TouchableOpacity style={deleteButton} onPress={onDelete}>
                  <Text style={[text, deleteText]}>delete</Text>
               </TouchableOpacity>
            </View>
         </TouchableOpacity>
      </View>
   )
}

const styles = StyleSheet.create({
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
      paddingLeft: 8,
   },
   padding: {
      padding: 8,
   },
   label: {fontWeight: 'bold'},
   subView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
   },
   deleteText: {
      color: 'red',
   },
   deleteButton: {
      width: width * 0.2,
      alignItems: 'center',
      justifyContent: 'flex-end',
   },
   selectItem: {
      borderWidth: 1,
      borderColor: 'blue',
   },
})
