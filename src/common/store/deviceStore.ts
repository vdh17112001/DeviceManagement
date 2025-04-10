import {makeAutoObservable} from 'mobx'
import {DeviceItemType} from '../../screens/DeviceList/utils/type'
import {Asset} from 'react-native-image-picker'

export type ImageList = {
   id: string
   img: Asset
}

class DeviceStore {
   deviceList: DeviceItemType[] = []
   deviceListTemp: DeviceItemType[] = []
   deviceImageList: ImageList[] = []

   constructor() {
      makeAutoObservable(this)
   }

   setDeviceItem = (data: DeviceItemType[], key: string) => {
      const addMore = [...this.deviceListTemp, ...data]
      const newData = addMore.filter(v =>
         v.name.toLowerCase().includes(key.toLowerCase()),
      )
      this.deviceList = [...newData]
      this.deviceListTemp = addMore
   }

   selectDeviceById = (id: string) => {
      this.deviceList = this.deviceList.map(v => {
         if (v.id === id) {
            return {
               ...v,
               selected: !v.selected,
            }
         }
         return v
      })

      this.deviceListTemp = this.deviceListTemp.map(v => {
         if (v.id === id) {
            return {
               ...v,
               selected: !v.selected,
            }
         }
         return v
      })
   }

   removeItem = (id: string) => {
      this.deviceList = this.deviceList.filter(item => item.id !== id)
      this.deviceListTemp = this.deviceListTemp.filter(item => item.id !== id)
      this.deviceImageList = this.deviceImageList.filter(item => item.id !== id)
   }

   searchByKeyword = (key: string) => {
      this.deviceList = this.deviceListTemp.filter(v =>
         v.name.toLowerCase().includes(key.toLowerCase()),
      )
   }

   updateDevice = (item: DeviceItemType) => {
      const index = this.deviceList.findIndex(v => v.id === item.id)
      const indexListTemp = this.deviceListTemp.findIndex(v => v.id === item.id)
      if (index !== -1) {
         this.deviceList[index] = item
      }
      if (indexListTemp !== -1) {
         this.deviceListTemp[indexListTemp] = item
      }
   }

   uploadImageToDevice = (idDevice: string, data: ImageList[]) => {
      const newData = this.deviceImageList.filter(v => v.id !== idDevice)
      this.deviceImageList = [...newData, ...data]
   }

   updateImageInDevice = (idDevice: string, data: ImageList[]) => {
      const newData = this.deviceImageList.filter(v => v.id !== idDevice)
      this.deviceImageList = [...newData, ...data]
   }

   getDeviceImageById = (id: string) => {
      return this.deviceImageList.filter(v => v.id === id)
   }

   getDeviceByListId = (id: string[]) => {
      return this.deviceList.filter(v => id.includes(v.id))
   }
}

const deviceStore = new DeviceStore()

export default deviceStore
