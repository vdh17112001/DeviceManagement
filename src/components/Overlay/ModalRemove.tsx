import {useEffect, useState} from 'react'
import {Button, Modal, StyleSheet, Text, View} from 'react-native'
import {height, width} from '../../common/utils/dimensions'

interface Props {
   onRemove: () => void
   onClose: () => void
   content: string
}

export const ModalRemove = ({onRemove, onClose, content}: Props) => {
   const {container, modalView, actionView, text} = styles
   return (
      <Modal
         animationType="fade"
         transparent={true}
         visible={true}
         onRequestClose={onClose}>
         <View style={container}>
            <View style={modalView}>
               <Text style={text}>{content}</Text>
               <View style={actionView}>
                  <Button title="Cancel" onPress={onClose} />
                  <Button title="Remove" onPress={onRemove} />
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
      borderWidth: 0.5,
   },
   actionView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: width * 0.6,
   },
   text: {
      fontSize: 15,
      fontWeight: '400',
      textAlign: 'center',
   },
})
