import {StyleSheet} from 'react-native'
import {height, width} from '../../common/utils/dimensions'
import {errText, inputStyle} from '../../contants/FormInputStyles'

export const CustomerInforStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  buttonSubmit: {
    width: width * 0.9,
    height: height * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  titleButton: {
    fontSize: 15,
    color: 'white',
  },
  navigationText: {
    fontSize: 15,
    color: 'black',
  },
  navigationButton: {
    alignSelf: 'flex-end',
    marginRight: 10,
  },
})

export const ControllerDateInputStyles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    ...inputStyle,
    justifyContent: 'center',
  },
  errorText: errText,
})
