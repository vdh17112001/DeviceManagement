import {NavigationContainer} from '@react-navigation/native'
import {MainStack} from './src/navigation/MainStack'
import Toast from 'react-native-toast-message'

const App = () => {
   return (
      <NavigationContainer>
         <MainStack />
         <Toast />
      </NavigationContainer>
   )
}

export default App
