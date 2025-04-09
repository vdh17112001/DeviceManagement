import {makeAutoObservable} from 'mobx'
import {DeviceItemType} from '../../screens/DeviceList/utils/type'

class SummaryStore {
   summaryList: DeviceItemType[] = []

   constructor() {
      makeAutoObservable(this)
   }

   setSummaryItem = (data: DeviceItemType) => {
      const index = this.summaryList.findIndex(v => v.id === data.id)
      if (index !== -1) {
         this.summaryList.splice(index, 1)
         return
      }
      this.summaryList = [...this.summaryList, data]
   }

   removeSummaryItem = (id: string) => {
      this.summaryList = this.summaryList.filter(item => item.id !== id)
   }
}

const summaryStore = new SummaryStore()

export default summaryStore
