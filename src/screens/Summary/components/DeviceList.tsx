import { observer } from 'mobx-react'

import { StyleSheet, View } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { height, width } from '../../../common/utils/dimensions'
import { useEffect, useState } from 'react'
import deviceStore from '../../../common/store/deviceStore'
import summaryStore, {
   DeviceItemSummaryType,
} from '../../../common/store/summaryStore'
import { DeviceItem } from './DeviceItem'
import { ModalRemove } from '../../../components/Overlay/ModalRemove'

const DeviceList = () => {
   const { container } = styles
   const { getDeviceImageById, selectDeviceById } = deviceStore
   const { summaryList, removeSummaryItem, updateOrderQuantity, getTotal } =
      summaryStore
   const [removeId, setRemoveId] = useState('')

   useEffect(() => {
      getTotal()
   }, [])

   const _onRemove = () => {
      setRemoveId('')
      removeSummaryItem(removeId)
      selectDeviceById(removeId)
      getTotal()
   }

   const _onUpdate = (value: number, id: string) => {
      if (!value) {
         setRemoveId(id)
         return
      }
      updateOrderQuantity(id, value)
      getTotal()
   }

   const renderList = ({ item }: { item: DeviceItemSummaryType }) => {
      const { id } = item
      const img = getDeviceImageById(id)
      return (
         <DeviceItem
            item={item}
            img={img || ''}
            onUpdate={value => _onUpdate(value, id)}
         />
      )
   }

   return (
      <View style={container}>
         <FlashList
            renderItem={renderList}
            data={summaryList}
            removeClippedSubviews
            keyExtractor={({ id }: DeviceItemSummaryType) => id.toString()}
            estimatedItemSize={height * 0.1}
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
