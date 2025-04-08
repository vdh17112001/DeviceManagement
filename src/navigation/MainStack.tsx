import {createNativeStackNavigator} from '@react-navigation/native-stack'
import CustomerInfor from '../screens/CustomerInfor/CustomerInfor'
import {stackScreenConfig} from '../contants/AppConfig'
import DeviceList from '../screens/DeviceList/DeviceList'

export type MainStackParamList = {
  CustomerInfor: undefined
  DeviceList: undefined
}

const Stack = createNativeStackNavigator<MainStackParamList>()

export const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="DeviceList"
      screenOptions={stackScreenConfig}>
      <Stack.Screen name="CustomerInfor" component={CustomerInfor} />
      <Stack.Screen name="DeviceList" component={DeviceList} />
    </Stack.Navigator>
  )
}
