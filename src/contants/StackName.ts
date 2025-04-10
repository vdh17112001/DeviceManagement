import {MainStackParamList} from '../navigation/MainStack'
import Receipt from '../screens/Receipt/Receipt'

export const StackName: Record<keyof MainStackParamList, string> = {
   CustomerInfor: 'Customer Infor',
   DeviceList: 'Device List',
   EditDevice: 'Edit Device',
   Summary: 'Sumary',
   Receipt: 'Receipt',
}
