import React, {memo, useCallback} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {height, width} from '../../../common/utils/dimensions'
import {useNavigate} from '../../../common/hooks/useNavigate'
import {DeviceItemType} from '../../DeviceList/utils/type'

type DeviceItemProps = {
   item: DeviceItemType
   onDelete: () => void
}

export const DeviceItem = memo(({item, onDelete}: DeviceItemProps) => {
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
   } = styles

   return (
      <View style={[container, selected && selectItem]}>
         <View>
            <View style={subView}>
               <Text style={[text, nameStyle]}>{name}</Text>
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
         </View>
      </View>
   )
})

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
