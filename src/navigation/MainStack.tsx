import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {stackScreenConfig} from '../contants/AppConfig'
import CustomerInfor from '../screens/CustomerInfor/CustomerInfor'
import DeviceList from '../screens/DeviceList/DeviceList'
import EditDevice from '../screens/EditDevice/EditDevice'
import {DeviceItemType} from '../screens/DeviceList/utils/type'

export type MainStackParamList = {
   CustomerInfor: undefined
   DeviceList: undefined
   EditDevice: DeviceItemType | undefined
}

const Stack = createNativeStackNavigator<MainStackParamList>()

export const MainStack = () => {
   return (
      <Stack.Navigator
         initialRouteName="DeviceList"
         screenOptions={stackScreenConfig}>
         <Stack.Screen name="CustomerInfor" component={CustomerInfor} />
         <Stack.Screen name="DeviceList" component={DeviceList} />
         <Stack.Screen name="EditDevice" component={EditDevice} />
      </Stack.Navigator>
   )
}
