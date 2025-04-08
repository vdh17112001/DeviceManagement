import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {useNavigate} from '../../common/hooks/useNavigate'
import {height, width} from '../../common/utils/dimensions'
import {MainStackParamList} from '../../navigation/MainStack'
import {StackName} from '../../contants/StackName'

export const Toolbar = ({
   routeName,
}: {
   routeName?: keyof MainStackParamList
}) => {
   const {container, text} = styles
   const navigation = useNavigate()

   const goBack = () => {
      navigation.canGoBack() && navigation.goBack()
   }

   const goTo = () => {
      routeName && navigation.navigate(routeName)
   }

   return (
      <View style={container}>
         <TouchableOpacity onPress={goBack}>
            <Text style={text}>Go back</Text>
         </TouchableOpacity>
         {routeName && (
            <TouchableOpacity onPress={goTo}>
               <Text style={text}>Go to {StackName[routeName]}</Text>
            </TouchableOpacity>
         )}
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      height: height * 0.07,
      width: width * 0.9,
      alignSelf: 'center',
      justifyContent: 'space-between',
      marginVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
   },
   text: {
      fontSize: 14,
   },
})
