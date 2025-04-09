import {observer} from 'mobx-react'

import {StyleSheet, Text, View} from 'react-native'
import {FlashList} from '@shopify/flash-list'
import {DeviceItemType} from '../../DeviceList/utils/type'
import {height, width} from '../../../common/utils/dimensions'

const DeviceList = () => {
   const {container, amount, subView} = styles

   const renderList = ({item}: {item: DeviceItemType}) => {
      return <></>
   }

   return (
      <View style={container}>
         <FlashList
            renderItem={renderList}
            data={[]}
            removeClippedSubviews
            keyExtractor={({id}: DeviceItemType) => id.toString()}
            estimatedItemSize={height * 0.1}
         />
      </View>
   )
}

export default observer(DeviceList)

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   amount: {},
   subView: {
      flexDirection: 'row',
      width: width * 0.9,
      justifyContent: 'space-between',
      alignSelf: 'center',
   },
})
