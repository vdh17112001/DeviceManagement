import {
   StyleSheet,
   Text,
   TouchableOpacity,
   TouchableOpacityProps,
} from 'react-native'

import { height, width } from '../../common/utils/dimensions'

interface ButtonSubmitProps extends TouchableOpacityProps {
   customStyle?: TouchableOpacityProps['style']
   label: string
}

export const ButtonSubmit = (props: ButtonSubmitProps) => {
   const { buttonSubmit, titleButton } = styles
   const { customStyle, label } = props
   return (
      <TouchableOpacity
         {...props}
         style={customStyle ? customStyle : buttonSubmit}>
         <Text style={titleButton}>{label}</Text>
      </TouchableOpacity>
   )
}
const styles = StyleSheet.create({
   buttonSubmit: {
      width: width * 0.9,
      height: height * 0.05,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'blue',
      alignSelf: 'center',
   },
   titleButton: {
      fontSize: 15,
      color: 'white',
   },
})
