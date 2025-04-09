import {launchImageLibrary} from 'react-native-image-picker'
import {uploadImageOptions} from '../../../contants/UploadImage'

export const selectImageFromLibrary = async () => {
   console.log('Hoang: selectImageFromLibrary ')
   const result = await launchImageLibrary(uploadImageOptions)
   console.log(`Hoang: ${result} `)
   return result?.assets && result.assets[0]
}
