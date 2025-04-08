import {observer} from 'mobx-react'
import {useCallback, useEffect} from 'react'
import {StyleSheet, View} from 'react-native'
import {SearchInput} from './components/Search'
import {DeviceItem} from './components/Item'
import {DeviceItemType} from './utils/type'
import {FlashList} from '@shopify/flash-list'
import deviceStore from '../../common/store/deviceStore'
import {height} from '../../common/utils/dimensions'
import {generateDeviceItems} from './utils/generateItem'
import {Toolbar} from '../../components/Header/Toolbar'
import summaryStore from '../../common/store/summaryStore'

const DeviceList = () => {
   const {container} = styles
   const {deviceList, setDeviceItem, removeItem, selectDeviceById} = deviceStore
   const {setSummaryItem, removeSummaryItem} = summaryStore

   useEffect(() => {
      if (deviceList.length > 0) {
         return
      }
      const data = generateDeviceItems()
      setDeviceItem(data)
   }, [setDeviceItem])

   const _handleSelectItem = (item: DeviceItemType) => {
      selectDeviceById(item.id)
      setSummaryItem(item)

      console.log('Hoang: item ', item.selected)
   }

   const _removeItem = (id: string) => {
      removeItem(id)
      removeSummaryItem(id)
   }

   const renderList = useCallback(
      ({item}: {item: DeviceItemType}) => {
         return (
            <DeviceItem
               onPress={() => _handleSelectItem(item)}
               onDelete={() => _removeItem(item.id)}
               key={item.id}
               item={item}
            />
         )
      },
      [deviceList],
   )

   return (
      <View style={container}>
         <Toolbar />
         <SearchInput onSearch={() => {}} />
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

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
})
