import { NavigationProp, useNavigation } from '@react-navigation/native'
import { MainStackParamList } from '../../navigation/MainStack'

type StackList = MainStackParamList

export const useNavigate = () => {
   return useNavigation<NavigationProp<StackList>>()
}
