import {useEffect, useState} from 'react'
import deviceStore from '../store/deviceStore'
import {generateDeviceItems} from '../../screens/DeviceList/utils/generateItem'

export const useDeviceList = () => {
   const [loadMore, setLoadMore] = useState(false)
   const [filter, setFilter] = useState('')
   const {
      deviceList,
      setDeviceItem,
      removeItem,
      selectDeviceById,
      searchByKeyword,
   } = deviceStore

   const genData = (limit?: number) => {
      const data = generateDeviceItems(limit)
      setDeviceItem(data, filter)
   }

   useEffect(() => {
      if (deviceList.length > 0) {
         return
      }
      genData() // gen 1000 item by default
   }, [])

   useEffect(() => {
      if (deviceList.length > 0 && loadMore) {
         genData(100) // gen 100 item
         setLoadMore(false)
      }
   }, [loadMore])

   return {
      deviceList,
      setDeviceItem,
      removeItem,
      selectDeviceById,
      searchByKeyword,
      setLoadMore,
      setFilter,
   }
}
