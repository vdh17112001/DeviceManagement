import {useEffect, useState} from 'react'
import {Button, Modal, StyleSheet, Text, View} from 'react-native'
import {height, width} from '../../../common/utils/dimensions'

interface Props {
   onRemove: () => void
   onClose: () => void
}

export const ModalRemoveImage = ({onRemove, onClose}: Props) => {

   const {container, modalView, actionView} = styles
   return (
      <Modal
         animationType="fade"
         transparent={true}
         visible={true}
         onRequestClose={onClose}>
         <View style={container}>
            <View style={modalView}>
               <Text>Are you sure you want to remove this image?</Text>
               <View style={actionView}>
                  <Button
                     title="Cancel"
                     onPress={onClose}
                  />
                  <Button
                     title="Remove"
                     onPress={onRemove}
                  />
               </View>
            </View>
         </View>
      </Modal>
   )
}

const styles = StyleSheet.create({
   container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
   modalView: {
      width: width * 0.8,
      height: height * 0.2,
      backgroundColor: 'white',
      justifyContent: 'space-around',
      alignItems: 'center',
   },
   actionView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: width * 0.6,
   },
})
