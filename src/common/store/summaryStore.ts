import { makeAutoObservable } from 'mobx'

import { DeviceItemType } from '../../screens/DeviceList/utils/type'

export type DeviceItemSummaryType = DeviceItemType & {
   orderQuantity: number
}

export type QuantityListType = {
   id: string
   quantity: number
}
class SummaryStore {
   summaryList: DeviceItemSummaryType[] = []
   total: number = 0
   constructor() {
      makeAutoObservable(this)
   }

   setSummaryItem = (item: DeviceItemType) => {
      const index = this.summaryList.findIndex(v => v.id === item.id)
      if (index !== -1) {
         this.summaryList.splice(index, 1)
         return
      }
      const newItem: DeviceItemSummaryType = {
         ...item,
         orderQuantity: 1,
      }
      this.summaryList = [...this.summaryList, newItem]
   }

   removeSummaryItem = (id: string) => {
      this.summaryList = this.summaryList.filter(item => item.id !== id)
   }

   getTotal = () => {
      this.total = this.summaryList.reduce((acc, item) => {
         return (acc += item.fee * item.orderQuantity)
      }, 0)
   }

   updateOrderQuantity = (id: string, quantity: number) => {
      this.summaryList = this.summaryList.map(item => {
         if (item.id === id) {
            item.orderQuantity = quantity
         }
         return item
      })
   }

   clearSummary = () => {
      this.summaryList = []
      this.total = 0
   }

   getQuantityList = () => {
      return this.summaryList.reduce((acc: QuantityListType[], item) => {
         const data = {
            id: item.id,
            quantity: item.orderQuantity,
         }
         return [...acc, data]
      }, [])
   }
}

const summaryStore = new SummaryStore()

export default summaryStore
