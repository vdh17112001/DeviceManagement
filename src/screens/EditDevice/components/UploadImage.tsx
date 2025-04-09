import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {height, width} from '../../../common/utils/dimensions'
import deviceStore from '../../../common/store/deviceStore'
import {selectImageFromLibrary} from '../utils/uploadImage'
import {useEffect, useState} from 'react'
import {showToast} from '../../../common/utils/toast'
import {observer} from 'mobx-react'
import {ImageItem} from './ImageItem'
interface Props {
   deviceId: string
}

export const UploadImage = observer(({deviceId}: Props) => {
   const {container, uploadButton, text, listView} = styles
   const {deviceImageList} = deviceStore
   const lst = deviceImageList.filter(v => v[deviceId])
   const imgList = !lst.length ? [] : lst[0][deviceId]
   const [img, setImg] = useState<string[]>([])

   useEffect(() => {
      setImg(imgList)
   }, [imgList])

   const _handleUpload = async () => {
      if (!deviceId) {
         showToast('Device does not exist', 'error')
         return
      }
      const uri = await selectImageFromLibrary()

      if (!!uri) {
         setImg(prev => [...prev, uri])
      }
   }

   const renderItem = ({item}: {item: string}) => {
      if (item === 'upload') {
         return (
            <>
               {img?.length < 5 ? (
                  <TouchableOpacity
                     onPress={_handleUpload}
                     style={uploadButton}>
                     <Text style={text}>Upload</Text>
                  </TouchableOpacity>
               ) : (
                  <></>
               )}
            </>
         )
      }
      return <ImageItem uri={item} />
   }

   return (
      <View style={container}>
         <View style={listView}>
            <FlatList
               numColumns={3}
               renderItem={renderItem}
               data={[...img, 'upload']}
               keyExtractor={(_, index) => index.toString()}
            />
         </View>
      </View>
   )
})

const styles = StyleSheet.create({
   container: {
      width: width * 0.9,
   },
   uploadButton: {
      width: width * 0.28,
      height: height * 0.12,
      borderRadius: 5,
      borderWidth: 0.5,
      justifyContent: 'center',
      alignItems: 'center',
   },
   text: {
      fontSize: 15,
      color: 'black',
   },
   listView: {
      height: 'auto',
   },
})
