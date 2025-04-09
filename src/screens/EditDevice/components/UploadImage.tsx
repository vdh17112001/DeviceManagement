import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {height, width} from '../../../common/utils/dimensions'
import {ImageList} from '../../../common/store/deviceStore'
import {selectImageFromLibrary} from '../utils/uploadImage'
import {showToast} from '../../../common/utils/toast'
import {observer} from 'mobx-react'
import {ImageItem} from './ImageItem'
import {Asset} from 'react-native-image-picker'
interface Props {
   deviceId: string
   data: ImageList[]
   onUpload: (data: ImageList) => void
}

export const UploadImage = observer(({deviceId, data, onUpload}: Props) => {
   const {container, uploadButton, text} = styles

   const _handleUpload = async () => {
      if (!deviceId) {
         showToast('Device does not exist', 'error')
         return
      }
      const uri = await selectImageFromLibrary()

      if (!!uri) {
         const image = {
            id: deviceId,
            img: uri,
         }
         onUpload(image)
      }
   }

   const renderItem = ({item}: {item: ImageList}) => {
      const {id, img} = item

      if (id === 'upload') {
         return (
            <>
               {data?.length < 5 ? (
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
      return <ImageItem uri={img?.uri || ''} />
   }

   return (
      <View style={container}>
         <FlatList
            numColumns={3}
            renderItem={renderItem}
            data={[...data, {id: 'upload', img: {} as Asset}]}
            keyExtractor={(_, index) => index.toString()}
         />
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
})
