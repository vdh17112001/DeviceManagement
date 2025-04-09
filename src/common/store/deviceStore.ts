import {makeAutoObservable} from 'mobx'
import {DeviceItemType} from '../../screens/DeviceList/utils/type'

class DeviceStore {
   deviceList: DeviceItemType[] = []
   deviceListTemp: DeviceItemType[] = []

   constructor() {
      makeAutoObservable(this)
   }

   setDeviceItem = (data: DeviceItemType[]) => {
      this.deviceList = [...data]
      this.deviceListTemp = [...data]
   }

   selectDeviceById = (id: string) => {
      const newData = this.deviceList.filter(item => {
         if (item.id === id) {
            item.selected = !item.selected
         }
         return item
      })
      this.deviceList = newData
      this.deviceListTemp = newData
   }

   removeItem = (id: string) => {
      const newData = this.deviceList.filter(item => item.id !== id)
      this.deviceList = newData
      this.deviceListTemp = newData
   }

   searchByKeyword = (key: string) => {
      this.deviceList = this.deviceListTemp.filter(v =>
         v.name.toLowerCase().includes(key.toLowerCase()),
      )
   }

   updateDevice = (item: DeviceItemType) => {
      const index = this.deviceList.findIndex(v => v.id === item.id)
      if (index !== -1) {
         this.deviceList[index] = item
         this.deviceListTemp[index] = item
      }
   }
}

const deviceStore = new DeviceStore()

export default deviceStore
