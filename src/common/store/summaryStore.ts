import {makeAutoObservable} from 'mobx'
import {DeviceItemType} from '../../screens/DeviceList/utils/type'

class SummaryStore {
   summaryList: DeviceItemType[] = []

   constructor() {
      makeAutoObservable(this)
   }

   setSummaryItem = (data: DeviceItemType) => {
      this.summaryList = [...this.summaryList, data]
   }

   removeSummaryItem = (id: string) => {
      this.summaryList = this.summaryList.filter(item => item.id !== id)
   }
}

const summaryStore = new SummaryStore()
console.log('Hoang: create new summary store')

export default summaryStore
