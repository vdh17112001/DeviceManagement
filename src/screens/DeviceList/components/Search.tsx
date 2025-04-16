import { useState } from 'react'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'

import { inputStyle } from '../../../constants/FormInputStyles'

interface SearchInputProps extends TextInputProps {
   onSearch: (text: string) => void
}

let timeout: NodeJS.Timeout

export const SearchInput = (props: SearchInputProps) => {
   const [keyword, setKeyword] = useState('')
   const { input } = styles
   const { onSearch } = props

   const handleChange = (text: string) => {
      setKeyword(text)
      clearTimeout(timeout)
      timeout = setTimeout(() => onSearch(text), 500)
   }

   return (
      <TextInput
         {...props}
         style={input}
         value={keyword}
         onChangeText={handleChange}
         placeholder="Search item"
      />
   )
}

const styles = StyleSheet.create({
   input: {
      ...inputStyle,
      marginVertical: 20,
      alignSelf: 'center',
   },
})
