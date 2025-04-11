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
      const [removeImgId, setRemoveImgId] = useState('')

      const _handleUpload = async () => {
         if (!deviceId) {
            showToast('Device does not exist', 'error')
            return
         }
         const imgInfo = await selectImageFromLibrary()
         if (imgInfo) {
            const image = {
               id: deviceId,
               img: imgInfo,
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
                  onPress={() => setRemoveImgId(img?.fileName || '')}
                  uri={img?.uri || ''}
               />
            )
         },
         [data],
      )

      const _onRemove = () => {
         onRemove(removeImgId)
         setRemoveImgId('')
      }

      return (
         <View style={container}>
            <FlatList
               numColumns={3}
               renderItem={renderItem}
               data={[...data, { id: 'upload', img: {} as Asset }]}
               keyExtractor={(_, index) => index.toString()}
            />
            {!!removeImgId && (
               <ModalRemove
                  content="Are you sure you want to remove this image ?"
                  onRemove={_onRemove}
                  onClose={() => setRemoveImgId('')}
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
