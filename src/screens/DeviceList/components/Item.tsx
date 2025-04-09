import React, {useCallback} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {DeviceItemType} from '../utils/type'
import {height, width} from '../../../common/utils/dimensions'
import {useNavigate} from '../../../common/hooks/useNavigate'

type DeviceItemProps = {
   item: DeviceItemType
   onSelect: () => void
   onDelete: () => void
}

export const DeviceItem = ({item, onSelect, onDelete}: DeviceItemProps) => {
   const {name, quantity, fee, selected} = item
   const {
      container,
      text,
      subView,
      label,
      nameStyle,
      deleteText,
      selectItem,
      deleteButton,
      editText,
   } = styles

   const navigation = useNavigate()

   const editItem = useCallback(() => {
      navigation.navigate('EditDevice', item)
   }, [item])

   return (
      <View style={[container, selected && selectItem]}>
         <TouchableOpacity onPress={onSelect}>
            <View style={subView}>
               <Text style={[text, nameStyle]}>{name}</Text>
               <TouchableOpacity onPress={editItem}>
                  <Text style={[text, editText]}>Edit</Text>
               </TouchableOpacity>
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
   nameStyle: {
      padding: 8,
      fontWeight: 'bold',
   },

   editText: {
      padding: 8,
      paddingRight: 16,
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
