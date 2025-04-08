import {StyleSheet} from 'react-native'
import {inputStyle} from '../../contants/FormInputStyles'
import {height, width} from '../../common/utils/dimensions'

export const DeviceListStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export const SearchInputStyles = StyleSheet.create({
  input: {
    ...inputStyle,
    marginVertical: 20,
    alignSelf: 'center',
  },
})

export const DeviceItemStyle = StyleSheet.create({
  container: {
    height: height * 0.1,
    width: width * 0.9,
    borderWidth: 0.5,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  text: {
    fontSize: 14,
    color: 'black',
    padding: 10,
  },
  subView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
