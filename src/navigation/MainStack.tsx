import {createNativeStackNavigator} from '@react-navigation/native-stack'
import CustomerInfor from '../screens/CustomerInfor/CustomerInfor'
import {stackScreenConfig} from '../contants/AppConfig'

const Stack = createNativeStackNavigator()

export const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={stackScreenConfig}>
      <Stack.Screen name="CustomerInfor" component={CustomerInfor} />
    </Stack.Navigator>
  )
}
