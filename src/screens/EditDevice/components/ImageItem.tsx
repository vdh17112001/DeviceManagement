import { StyleSheet, TouchableOpacity } from 'react-native'

import FastImage from '@d11/react-native-fast-image'

import { height, width } from '../../../common/utils/dimensions'

interface Props {
   uri: string
   onPress: () => void
}

export const ImageItem = ({ uri, onPress }: Props) => {
   if (!uri) {
      return null
   }

   const { container, size } = styles

   return (
      <TouchableOpacity onPress={onPress} style={[container, size]}>
         <FastImage
            style={size}
            source={{
               uri: uri,
            }}
            resizeMode={FastImage.resizeMode.center}
         />
      </TouchableOpacity>
   )
}

const styles = StyleSheet.create({
   container: {
      borderRadius: 5,
      borderWidth: 0.5,
      marginRight: 10,
      marginBottom: 5,
   },
   size: {
      width: width * 0.28,
      height: height * 0.12,
   },
})
