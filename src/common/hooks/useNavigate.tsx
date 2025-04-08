import {NavigationProp, useNavigation} from '@react-navigation/native'
import {MainStackParamList} from '../../navigation/MainStack'

export const useNavigate = () => {
  return useNavigation<NavigationProp<MainStackParamList>>()
}
