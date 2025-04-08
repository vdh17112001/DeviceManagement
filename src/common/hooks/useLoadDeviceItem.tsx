import {useEffect} from 'react'
import deviceStore from '../store/deviceStore'
import {generateDeviceItems} from '../../screens/DeviceList/utils/generateItem'

export const useLoadDeviceItem = () => {
  const {deviceList, setDeviceItem} = deviceStore

  useEffect(() => {
    const data = generateDeviceItems()
    setDeviceItem(data)
  }, [])

  useEffect(() => {
    console.log(`Hoang : ${deviceList}`)
  }, [deviceList])

  return {
    data: deviceList,
  }
}
