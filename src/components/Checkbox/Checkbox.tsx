import {StyleSheet, TouchableOpacity} from 'react-native'
import {CheckIcon} from '../../asset/svg'
import {height, width} from '../../common/utils/dimensions'

interface Props {
   size: 'sm' | 'xl' | '2xl'
   checked: boolean
   onChange?: (state: boolean) => void
}

export const Checkbox = ({checked, onChange, size = 'sm'}: Props) => {
   const {box, checkedStyle} = styles

   return (
      <TouchableOpacity
         onPress={() => onChange?.(!checked)}
         style={[box, checked && checkedStyle, boxSize[size]]}>
         {checked && <CheckIcon />}
      </TouchableOpacity>
   )
}

const boxSize = {
   sm: {
      width: width * 0.04,
      height: height * 0.02,
   },
   xl: {width: width * 0.05, height: height * 0.025},
   '2xl': {width: width * 0.06, height: height * 0.03},
}

const styles = StyleSheet.create({
   checkedStyle: {
      borderWidth: 1,
      borderColor: 'green',
   },
   box: {
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 0.5,
      borderColor: 'black',
   },
})
