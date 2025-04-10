import { StyleSheet, Text, View } from 'react-native'
import { height, width } from '../../common/utils/dimensions'
import { Controller, useForm } from 'react-hook-form'
import { showToast } from '../../common/utils/toast'
import { ControllerInput } from '../../components/InputForm/ControllerInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { Toolbar } from '../../components/Header/Toolbar'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { MainStackParamList } from '../../navigation/MainStack'
import { DeviceItemType } from '../DeviceList/utils/type'
import { editDeviceSchema } from './utils/validation'
import { Checkbox } from '../../components/Checkbox/Checkbox'
import { errText } from '../../constants/FormInputStyles'
import deviceStore, { ImageList } from '../../common/store/deviceStore'
import { UploadImage } from './components/UploadImage'
import { useEffect } from 'react'
import { ButtonSubmit } from '../../components/Button/ButtonSubmit'

type Props = NativeStackScreenProps<MainStackParamList, 'EditDevice'>

type EditDeviceSubmitType = DeviceItemType & {
   image?: ImageList[]
}

const EditDevice = ({ route }: Props) => {
   const { container, subView } = styles
   const { updateDevice, uploadImageToDevice, getDeviceImageListById } =
      deviceStore
   const param = route.params

   const { control, handleSubmit } = useForm({
      defaultValues: {
         ...param,
         image: getDeviceImageListById(param?.id || ''),
      } as any,
      resolver: yupResolver(editDeviceSchema),
   })

   const _onSubmit = (data: Omit<EditDeviceSubmitType, 'selected' | 'id'>) => {
      if (!param) {
         showToast('Modify device fail', 'error')
         return
      }

      const { image, ...fData } = data

      const finalData = {
         id: param?.id,
         selected: param?.selected || false,
         ...fData,
      }

      updateDevice(finalData)
      uploadImageToDevice(param.id, image || [])
      showToast('Modify device success')
   }

   const _onRemove = (
      fileName: string,
      value: ImageList[],
      onChange: (...event: any[]) => void,
   ) => {
      const data = [...value]
      const newData = data.filter((v: ImageList) => v.img.fileName !== fileName)
      onChange(newData)
   }

   return (
      <View style={container}>
         <Toolbar />
         <ControllerInput
            name="name"
            placeholder="Device name"
            control={control}
         />
         <ControllerInput
            name="description"
            placeholder="Description"
            control={control}
            multiline
         />
         <ControllerInput
            name="quantity"
            placeholder="Quantity"
            control={control}
            keyboardType="number-pad"
         />

         <ControllerInput
            name="note"
            placeholder="Note"
            control={control}
            multiline
         />
         <ControllerInput
            name="fee"
            placeholder="Fee"
            control={control}
            keyboardType="number-pad"
         />

         <Controller
            control={control}
            name={'status'}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
               <View>
                  <View style={subView}>
                     <Text>Status: </Text>
                     <Checkbox
                        onChange={onChange}
                        checked={value}
                        size={'sm'}
                     />
                  </View>
                  {!!error && <Text style={errText}>{error.message}</Text>}
               </View>
            )}
         />
         <Controller
            control={control}
            name={'image'}
            render={({ field: { onChange, value } }) => (
               <UploadImage
                  deviceId={param?.id || ''}
                  data={value}
                  onUpload={data => onChange([...value, data])}
                  onRemove={(fileName: string) =>
                     _onRemove(fileName, value, onChange)
                  }
               />
            )}
         />

         <ButtonSubmit label="Save" onPress={handleSubmit(_onSubmit)} />
      </View>
   )
}

export default EditDevice

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      gap: 10,
   },

   subView: {
      width: width * 0.9,
      height: height * 0.05,
      alignItems: 'center',
      flexDirection: 'row',
      rowGap: 10,
   },
})
