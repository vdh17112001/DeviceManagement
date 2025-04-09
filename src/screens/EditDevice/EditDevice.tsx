import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {height, width} from '../../common/utils/dimensions'
import {useNavigate} from '../../common/hooks/useNavigate'
import {Controller, useForm} from 'react-hook-form'
import {showToast} from '../../common/utils/toast'
import {ControllerInput} from '../../components/InputForm/ControllerInput'
import {yupResolver} from '@hookform/resolvers/yup'
import {Toolbar} from '../../components/Header/Toolbar'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {MainStackParamList} from '../../navigation/MainStack'
import {DeviceItemType} from '../DeviceList/utils/type'
import {editDeviceSchema} from './utils/validation'
import {Checkbox} from '../../components/Checkbox/Checkbox'
import {errText} from '../../contants/FormInputStyles'
import deviceStore from '../../common/store/deviceStore'

type Props = NativeStackScreenProps<MainStackParamList, 'EditDevice'>

const EditDevice = ({route}: Props) => {
   const {buttonSubmit, container, titleButton, subView} = styles
   const {updateDevice} = deviceStore
   const {control, handleSubmit} = useForm({
      defaultValues: route.params as any,
      resolver: yupResolver(editDeviceSchema),
   })

   const _onSubmit = (data: Omit<DeviceItemType, 'selected' | 'id'>) => {
      const params = route.params
      if (!params) {
         showToast('Modify device fail', 'error')
         return
      }
      const finalData = {
         id: params?.id,
         selected: params?.selected || false,
         ...data,
      }
      updateDevice(finalData)
      showToast('Modify device success')
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
            render={({field: {onChange, value}, fieldState: {error}}) => (
               <View>
                  <View style={subView}>
                     <Text>Status: </Text>
                     <Checkbox
                        onChange={onChange}
                        checked={value}
                        size={'sm'}
                     />
                  </View>
                  {error && <Text style={errText}>{error.message}</Text>}
               </View>
            )}
         />

         <TouchableOpacity
            style={buttonSubmit}
            onPress={handleSubmit(_onSubmit)}>
            <Text style={titleButton}>Save</Text>
         </TouchableOpacity>
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
   buttonSubmit: {
      width: width * 0.9,
      height: height * 0.05,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'blue',
   },
   titleButton: {
      fontSize: 15,
      color: 'white',
   },
   subView: {
      width: width * 0.9,
      height: height * 0.05,
      alignItems: 'center',
      flexDirection: 'row',
      rowGap: 10,
   },
})
