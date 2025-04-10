import {observer} from 'mobx-react'

import {StyleSheet, View} from 'react-native'
import {FlashList} from '@shopify/flash-list'
import {height, width} from '../../../common/utils/dimensions'
import {useEffect, useState} from 'react'
import deviceStore from '../../../common/store/deviceStore'
import summaryStore, {
   DeviveItemSummaryType,
} from '../../../common/store/summaryStore'
import {DeviceItem} from './DeviceItem'
import {ModalRemove} from '../../../components/Overlay/ModalRemove'

const DeviceList = () => {
   const {container} = styles
   const {getDeviceImageById, selectDeviceById} = deviceStore
   const {summaryList, removeSummaryItem, updateOrderQuantity, getTotal} =
      summaryStore
   const [removeId, setRemoveId] = useState('')

   useEffect(() => {
      getTotal()
   }, [])

   useEffect(() => {
      console.log(`Hoang: DeviceList in Summary render `)
   })

   const _onRemove = () => {
      setRemoveId('')
      removeSummaryItem(removeId)
      selectDeviceById(removeId)
      getTotal()
   }

   const renderList = ({item}: {item: DeviveItemSummaryType}) => {
      const img = getDeviceImageById(item.id)
      return (
         <DeviceItem
            item={item}
            img={img || ''}
            onUpdate={value => {
               if (!value) {
                  setRemoveId(item.id)
                  return
               }
               updateOrderQuantity(item.id, value)
               getTotal()
            }}
         />
      )
   }

   return (
      <View style={container}>
         <FlashList
            renderItem={renderList}
            data={summaryList}
            removeClippedSubviews
            keyExtractor={({id}: DeviveItemSummaryType) => id.toString()}
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
