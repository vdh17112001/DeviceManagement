import {makeAutoObservable} from 'mobx'
import {DeviceItemType} from '../../screens/DeviceList/utils/type'
import {generateDeviceItems} from '../../screens/DeviceList/utils/generateItem'

class DeviceStore {
  deviceList: DeviceItemType[] = generateDeviceItems()
  deviceListTemp: DeviceItemType[] = []
  constructor() {
    makeAutoObservable(this)
  }

  setDeviceItem = (data: DeviceItemType[]) => {}

  selectItem = (index: number) => {
    const data = this.deviceList[index]

    if (!data) {
      return
    }
    data.status = !data.status
  }

  getSelectItem = () => {
    return this.deviceList.map(v => !!v.status)
  }
}

const deviceStore = new DeviceStore()
console.log(`Hoang: create new device store`)

export default deviceStore
