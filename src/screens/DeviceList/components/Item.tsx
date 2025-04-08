import {Text, View} from 'react-native'
import {DeviceItemType} from '../utils/type'
import {DeviceItemStyle} from '../style'

export const DeviceItem = ({item}: {item: DeviceItemType}) => {
  const {name, quantity, fee} = item
  const {container, text, subView} = DeviceItemStyle
  return (
    <View style={container}>
      <Text style={text}>{name}</Text>
      <View style={subView}>
        <Text style={text}>Fee: {fee}</Text>
        <Text style={text}>Quantity: {quantity}</Text>
      </View>
    </View>
  )
}
