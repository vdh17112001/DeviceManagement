import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { stackScreenConfig } from '../contants/AppConfig'
import { DeviceItemType } from '../screens/DeviceList/utils/type'
import { lazy } from 'react'
import Receipt from '../screens/Receipt/Receipt'

const Customer = lazy(() => import('../screens/CustomerInfor/CustomerInfor'))
const DeviceList = lazy(() => import('../screens/DeviceList/DeviceList'))
const EditDevice = lazy(() => import('../screens/EditDevice/EditDevice'))
const Summary = lazy(() => import('../screens/Summary/Summary'))

export type MainStackParamList = {
   CustomerInfor: undefined
   DeviceList: undefined
   EditDevice: DeviceItemType | undefined
   Summary: undefined
   Receipt: undefined
}

const Stack = createNativeStackNavigator<MainStackParamList>()

export const MainStack = () => {
   return (
      <Stack.Navigator
         initialRouteName="CustomerInfor"
         screenOptions={stackScreenConfig}>
         <Stack.Screen name="CustomerInfor" component={Customer} />
         <Stack.Screen name="DeviceList" component={DeviceList} />
         <Stack.Screen name="EditDevice" component={EditDevice} />
         <Stack.Screen name="Summary" component={Summary} />
         <Stack.Screen name="Receipt" component={Receipt} />
      </Stack.Navigator>
   )
}
