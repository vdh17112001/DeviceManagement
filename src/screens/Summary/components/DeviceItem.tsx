import React, {memo} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {height, width} from '../../../common/utils/dimensions'
import {DeviceItemType} from '../../DeviceList/utils/type'
import FastImage from '@d11/react-native-fast-image'
import {noneImage} from '../../../asset'
import {QuantityAction} from './QuanityAction'
import {DeviveItemSummaryType} from '../../../common/store/summaryStore'

type DeviceItemProps = {
   item: DeviveItemSummaryType
   img: string
   onUpdate?: (value: number) => void
}

export const DeviceItem = memo(({item, img, onUpdate}: DeviceItemProps) => {
   const {name, quantity, fee} = item
   const {container, text, subView, label, nameStyle, imageView, image} = styles

   return (
      <View style={container}>
         <View style={imageView}>
            <FastImage
               style={image}
               source={
                  img
                     ? {uri: img, priority: FastImage.priority.normal}
                     : noneImage
               }
               resizeMode={FastImage.resizeMode.center}
            />
         </View>
         <View style={subView}>
            <Text style={[text, nameStyle]}>{name}</Text>
            <Text style={text}>
               <Text style={[label, text]}>Fee:</Text> {fee}
            </Text>
         </View>
         <QuantityAction
            quantity={quantity}
            onUpdate={value => {
               onUpdate?.(value)
            }}
         />
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
      justifyContent: 'space-around',
      marginVertical: 5,
      flexDirection: 'row',
      backgroundColor: 'white',
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
      width: '55%',
      height: '100%',
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
})
