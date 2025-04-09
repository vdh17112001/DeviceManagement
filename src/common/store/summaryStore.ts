import {makeAutoObservable} from 'mobx'
import {DeviceItemType} from '../../screens/DeviceList/utils/type'

class SummaryStore {
   summaryList: string[] = []

   constructor() {
      makeAutoObservable(this)
   }

   setSummaryItem = (id: string) => {
      const index = this.summaryList.findIndex(v => v === id)
      if (index !== -1) {
         this.summaryList.splice(index, 1)
         return
      }
      this.summaryList = [...this.summaryList, id]
   }

   removeSummaryItem = (id: string) => {
      this.summaryList = this.summaryList.filter(item => item !== id)
   }
}

const summaryStore = new SummaryStore()

export default summaryStore
