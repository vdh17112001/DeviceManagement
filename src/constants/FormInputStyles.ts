import { TextStyle } from 'react-native'
import { height, width } from '../common/utils/dimensions'

export const errText: TextStyle = {
   color: 'red',
   fontSize: 15,
   alignSelf: 'flex-start',
   paddingLeft: 22,
}

export const inputStyle = {
   color: 'black',
   width: width * 0.9,
   borderWidth: 1,
   borderRadius: 5,
   paddingLeft: 10,
   maxHeight: height * 0.3,
}
