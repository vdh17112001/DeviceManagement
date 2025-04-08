import {MMKV} from 'react-native-mmkv'

const mmkv = new MMKV()

export const mmkvAdapter = {
  getItem: async (key: string): Promise<string | null> => {
    return mmkv.getString(key) ?? null
  },
  setItem: async (key: string, value: string): Promise<void> => {
    mmkv.set(key, value)
  },
  removeItem: async (key: string): Promise<void> => {
    mmkv.delete(key)
  },
}
