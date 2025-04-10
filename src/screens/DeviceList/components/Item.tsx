import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { DeviceItemType } from '../utils/type'
import { height, width } from '../../../common/utils/dimensions'
import { useNavigate } from '../../../common/hooks/useNavigate'
import FastImage from '@d11/react-native-fast-image'
import { noneImage } from '../../../asset'

interface DeviceItemProps {
   item: DeviceItemType
   onSelect: () => void
   onDelete: () => void
   img?: string
}

export const DeviceItem = ({
   item,
   onSelect,
   onDelete,
   img,
}: DeviceItemProps) => {
   const { name, quantity, fee, selected } = item
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
      imageView,
      image,
      disableStyle,
   } = styles

   const navigation = useNavigate()

   const editItem = () => navigation.navigate('EditDevice', item)

   const disableCondition = !quantity

   return (
      <TouchableOpacity
         disabled={disableCondition}
         onPress={onSelect}
         style={[
            container,
            selected && selectItem,
            disableCondition && disableStyle,
         ]}>
         <View style={imageView}>
            <FastImage
               style={image}
               source={
                  img
                     ? { uri: img, priority: FastImage.priority.normal }
                     : noneImage
               }
               resizeMode={FastImage.resizeMode.center}
            />
         </View>
         <View>
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
                  <Text style={[text, deleteText]}>Delete</Text>
               </TouchableOpacity>
            </View>
         </View>
      </TouchableOpacity>
   )
}

const styles = StyleSheet.create({
   container: {
      height: height * 0.1,
      width: width * 0.9,
      borderWidth: 0.5,
      borderRadius: 10,
      alignSelf: 'center',
      justifyContent: 'space-between',
      marginVertical: 5,
      flexDirection: 'row',
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
      color: 'black',
      fontWeight: '500',
   },
   label: { fontWeight: 'bold' },
   subView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: width * 0.6,
      paddingHorizontal: 5,
   },
   deleteText: {
      color: 'red',
      marginRight: 10,
      marginTop: 20,
   },
   deleteButton: {
      justifyContent: 'center',
   },
   selectItem: {
      borderWidth: 1,
      borderColor: 'blue',
   },
   imageView: {
      width: width * 0.28,
      height: height * 0.1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   image: {
      width: width * 0.28,
      height: height * 0.08,
   },
   disableStyle: {
      backgroundColor: '#d3d3d3',
   },
})
