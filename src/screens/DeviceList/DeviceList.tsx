import {observer} from 'mobx-react'
import {useCallback, useEffect} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {SearchInput} from './components/Search'
import {DeviceItem} from './components/Item'
import {DeviceItemType} from './utils/type'
import {FlashList} from '@shopify/flash-list'
import deviceStore from '../../common/store/deviceStore'
import {height, width} from '../../common/utils/dimensions'
import {generateDeviceItems} from './utils/generateItem'
import {Toolbar} from '../../components/Header/Toolbar'
import summaryStore from '../../common/store/summaryStore'

const DeviceList = () => {
   const {container, amount, subView} = styles
   const {
      deviceList,
      setDeviceItem,
      removeItem,
      selectDeviceById,
      searchByKeyword,
   } = deviceStore
   const {summaryList, setSummaryItem, removeSummaryItem} = summaryStore

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
   }

   const _removeItem = (id: string) => {
      removeItem(id)
      removeSummaryItem(id)
   }

   const renderList = useCallback(
      ({item}: {item: DeviceItemType}) => {
         return (
            <DeviceItem
               onSelect={() => _handleSelectItem(item)}
               onDelete={() => _removeItem(item.id)}
               key={item.id}
               item={item}
            />
         )
      },
      [deviceList],
   )

   const _onSearch = (key: string) => {
      searchByKeyword(key)
   }

   return (
      <View style={container}>
         <Toolbar routeName="CustomerInfor" />
         <SearchInput onSearch={_onSearch} />
         <View style={subView}>
            <Text style={amount}>Amount of device: {deviceList.length}</Text>
            <Text style={amount}>Select: {summaryList.length}</Text>
         </View>

         <FlashList
            renderItem={renderList}
            data={deviceList}
            removeClippedSubviews
            keyExtractor={({id}: DeviceItemType) => id.toString()}
            estimatedItemSize={height * 0.1}
            onEndReachedThreshold={0.9}
            onEndReached={() => {
               console.log(`Hoang: end reached`)
            }}
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
