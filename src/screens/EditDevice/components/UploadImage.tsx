import {
   FlatList,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from 'react-native'
import { height, width } from '../../../common/utils/dimensions'
import { ImageList } from '../../../common/store/deviceStore'
import { selectImageFromLibrary } from '../utils/uploadImage'
import { showToast } from '../../../common/utils/toast'
import { observer } from 'mobx-react'
import { ImageItem } from './ImageItem'
import { Asset } from 'react-native-image-picker'
import { useCallback, useState } from 'react'
import { ModalRemove } from '../../../components/Overlay/ModalRemove'
interface Props {
   deviceId: string
   data: ImageList[]
   onUpload: (data: ImageList) => void
   onRemove: (fileName: string) => void
}

export const UploadImage = observer(
   ({ deviceId, data, onUpload, onRemove }: Props) => {
      const { container, uploadButton, text } = styles
      const [modalVisible, setModalVisible] = useState('')

      const _handleUpload = async () => {
         if (!deviceId) {
            showToast('Device does not exist', 'error')
            return
         }
         const imgInfor = await selectImageFromLibrary()
         if (imgInfor) {
            const image = {
               id: deviceId,
               img: imgInfor,
            }
            onUpload(image)
         }
      }

      const renderItem = useCallback(
         ({ item }: { item: ImageList }) => {
            const { id, img } = item

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
            return (
               <ImageItem
                  onPress={() => setModalVisible(img?.fileName || '')}
                  uri={img?.uri || ''}
               />
            )
         },
         [data],
      )

      return (
         <View style={container}>
            <FlatList
               numColumns={3}
               renderItem={renderItem}
               data={[...data, { id: 'upload', img: {} as Asset }]}
               keyExtractor={(_, index) => index.toString()}
            />
            {!!modalVisible && (
               <ModalRemove
                  content="Are you sure you want to remove this image ?"
                  onRemove={() => {
                     onRemove(modalVisible)
                     setModalVisible('')
                  }}
                  onClose={() => setModalVisible('')}
               />
            )}
         </View>
      )
   },
)

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
