import {makeAutoObservable} from 'mobx'
import {DeviceItemType} from '../../screens/DeviceList/utils/type'

type ImageList = Record<string, string[]>

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
      this.deviceList = this.deviceList.filter(v => {
         if (v.id === id) {
            v.selected = !v.selected
         }
         return v
      })

      this.deviceListTemp = this.deviceListTemp.filter(v => {
         if (v.id === id) {
            v.selected = !v.selected
         }
         return v
      })
   }

   removeItem = (id: string) => {
      const newData = this.deviceList.filter(item => item.id !== id)
      this.deviceList = newData
      this.deviceListTemp = newData
   }

   searchByKeyword = (key: string) => {
      const data = this.deviceListTemp.filter(v =>
         v.name.toLowerCase().includes(key.toLowerCase()),
      )
      this.deviceList = [...data]
   }

   updateDevice = (item: DeviceItemType) => {
      const index = this.deviceList.findIndex(v => v.id === item.id)
      if (index !== -1) {
         this.deviceList[index] = item
         this.deviceListTemp[index] = item
      }
   }

   uploadImageToDevice = (id: string, uri: string) => {
      const imgList = this.deviceImageList
      const device = imgList.filter(v => !!v[id])
      if (!imgList.length || !device.length) {
         imgList.push({
            [`${id}`]: [uri],
         })
      } else {
         device[0][id].push(uri)
      }

      this.deviceImageList = [...this.deviceImageList]
   }

   getImageList = (id: string) => {
      const data = this.deviceImageList.filter(v => v[id])
      return !data ? [] : data[0][id]
   }
}

const deviceStore = new DeviceStore()

export default deviceStore
