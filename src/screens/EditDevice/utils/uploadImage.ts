import {launchImageLibrary} from 'react-native-image-picker'
import {uploadImageOptions} from '../../../contants/UploadImage'

export const selectImageFromLibrary = async () => {
   const result = await launchImageLibrary(uploadImageOptions)
   return result?.assets && result.assets[0].uri
}
