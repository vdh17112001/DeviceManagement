import { observer } from 'mobx-react'
import { useCallback, useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SearchInput } from './components/Search'
import { DeviceItem } from './components/Item'
import { DeviceItemType } from './utils/type'
import { FlashList } from '@shopify/flash-list'
import { height, width } from '../../common/utils/dimensions'
import { Toolbar } from '../../components/Header/Toolbar'
import summaryStore from '../../common/store/summaryStore'
import { useDeviceList } from '../../common/hooks/useDeviceList'

const DeviceList = () => {
   const { container, amount, subView } = styles

   const {
      deviceList,
      removeItem,
      searchByKeyword,
      setFilter,
      setLoadMore,
      selectDeviceById,
      getDeviceImageListById,
   } = useDeviceList()

   const { setSummaryItem, removeSummaryItem } = summaryStore

   const _handleSelectItem = (item: DeviceItemType) => {
      if (!item.quantity) {
         return
      }
      selectDeviceById(item.id)
      setSummaryItem(item)
   }

   const _removeItem = (id: string) => {
      removeItem(id)
      removeSummaryItem(id)
   }

   const renderList = useCallback(
      ({ item }: { item: DeviceItemType }) => {
         const { id } = item
         const img = getDeviceImageListById(id)
         return (
            <DeviceItem
               onSelect={() => _handleSelectItem(item)}
               onDelete={() => _removeItem(id)}
               key={id}
               item={item}
               img={img.length ? img[0].img.uri : ''}
            />
         )
      },
      [deviceList],
   )

   const _onSearch = (key: string) => {
      searchByKeyword(key)
      setFilter(key)
   }

   const selectedListLength = useMemo(
      () => deviceList.filter(v => v.selected).length,
      [deviceList],
   )

   return (
      <View style={container}>
         <Toolbar routeName="Summary" disableNext={!selectedListLength} />
         <SearchInput onSearch={_onSearch} />
         <View style={subView}>
            <Text style={amount}>Amount of device: {deviceList.length}</Text>
            <Text style={amount}>Select: {selectedListLength}</Text>
         </View>

         <FlashList
            renderItem={renderList}
            data={deviceList}
            removeClippedSubviews
            keyExtractor={({ id }: DeviceItemType) => id.toString()}
            estimatedItemSize={height * 0.1}
            onEndReachedThreshold={0.9}
            onEndReached={() => setLoadMore(true)}
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
