import FastImage from '@d11/react-native-fast-image'
import {StyleSheet, View} from 'react-native'
import {height, width} from '../../../common/utils/dimensions'

interface Props {
   uri: string
}

export const ImageItem = ({uri}: Props) => {
   const {container, size} = styles

   return (
      <View style={[container, size]}>
         <FastImage
            style={size}
            source={{
               uri: uri,
            }}
            resizeMode={FastImage.resizeMode.cover}
         />
      </View>
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
