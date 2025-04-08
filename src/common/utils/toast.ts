import Toast from 'react-native-toast-message'

export const showToastSuccess = (msg: string) => {
   Toast.show({
      type: 'success',
      text1: msg,
   })
}
