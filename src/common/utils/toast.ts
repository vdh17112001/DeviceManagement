import Toast, {ToastShowParams} from 'react-native-toast-message'

export const showToast = (
   msg: string,
   type: ToastShowParams['type'] = 'success',
) => {
   Toast.show({
      type: type,
      text1: msg,
   })
}
