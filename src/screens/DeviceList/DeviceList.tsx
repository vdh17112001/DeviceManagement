import {observer} from 'mobx-react'
import {useCallback} from 'react'
import {View} from 'react-native'
import {DeviceListStyles} from './style'
import {SearchInput} from './components/Search'
import {DeviceItem} from './components/Item'
import {DeviceItemType} from './utils/type'
import {FlashList} from '@shopify/flash-list'
import deviceStore from '../../common/store/deviceStore'
import {height} from '../../common/utils/dimensions'

const DeviceList = () => {
  const {container} = DeviceListStyles
  const {deviceList} = deviceStore

  const renderList = useCallback(({item}: {item: DeviceItemType}) => {
    return <DeviceItem key={item.id} item={item} />
  }, [])

  return (
    <View style={container}>
      <SearchInput />
      <FlashList
        renderItem={renderList}
        data={deviceList}
        removeClippedSubviews
        keyExtractor={({id}: DeviceItemType) => {
          return id.toString()
        }}
        estimatedItemSize={height * 0.1}
      />
    </View>
  )
}

export default observer(DeviceList)
