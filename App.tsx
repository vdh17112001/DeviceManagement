import {NavigationContainer} from '@react-navigation/native'
import {MainStack} from './src/navigation/MainStack'
import Toast from 'react-native-toast-message'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const App = () => {
   return (
      <GestureHandlerRootView style={{ flex: 1 }}>
         <NavigationContainer>
            <MainStack />
            <Toast />
         </NavigationContainer>
      </GestureHandlerRootView>
   )
}

export default App
