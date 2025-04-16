import { useEffect, useState, useCallback, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'

import { FlashList } from '@shopify/flash-list'
import { observer } from 'mobx-react'

import deviceStore from '../../../common/store/deviceStore'
import summaryStore, {
   DeviceItemSummaryType,
} from '../../../common/store/summaryStore'
import { height, width } from '../../../common/utils/dimensions'
import { ModalRemove } from '../../../components/Overlay/ModalRemove'
import { DeviceItem } from './DeviceItem'

const DeviceList = () => {
   const { container } = styles
   const { getDeviceImageById, selectDeviceById } = deviceStore
   const { summaryList, removeSummaryItem, updateOrderQuantity, getTotal } =
      summaryStore
   const [removeId, setRemoveId] = useState<string>('')

   useEffect(() => {
      getTotal()
   }, [getTotal])

   const _onRemove = useCallback(() => {
      if (!removeId) return
      setRemoveId('')
      removeSummaryItem(removeId)
      selectDeviceById(removeId)
      getTotal()
   }, [removeId, removeSummaryItem, selectDeviceById, getTotal])

   const _onUpdate = useCallback((value: number, id: string) => {
      if (!value) {
         setRemoveId(id)
         return
      }
      updateOrderQuantity(id, value)
      getTotal()
   }, [updateOrderQuantity, getTotal])

   const renderList = useCallback(({ item }: { item: DeviceItemSummaryType }) => {
      const { id } = item
      const img = getDeviceImageById(id)
      return (
         <DeviceItem
            item={item}
            img={img || ''}
            onUpdate={value => _onUpdate(value, id)}
         />
      )
   }, [getDeviceImageById, _onUpdate])

   const keyExtractor = useCallback((item: DeviceItemSummaryType) => item.id.toString(), [])

   const estimatedItemSize = useMemo(() => height * 0.1, [height])

   return (
      <View style={container}>
         <FlashList
            renderItem={renderList}
            data={summaryList}
            removeClippedSubviews={true}
            keyExtractor={keyExtractor}
            estimatedItemSize={estimatedItemSize}
            showsVerticalScrollIndicator={false}
         />

         {!!removeId && (
            <ModalRemove
               content="Are you sure you want to remove this device from summary ?"
               onRemove={_onRemove}
               onClose={() => setRemoveId('')}
            />
         )}
      </View>
   )
}

export default observer(DeviceList)

const styles = StyleSheet.create({
   container: {
      width: width * 0.9,
      marginTop: 10,
      height: height * 0.44,
      alignSelf: 'center',
   },
})
