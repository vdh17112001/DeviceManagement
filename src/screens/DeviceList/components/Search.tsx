import {useState} from 'react'
import {TextInput, TextInputProps} from 'react-native'
import {debounce} from '../../../common/utils/debounce'
import {SearchInputStyles} from '../style'

type SearchInput = TextInputProps

export const SearchInput = (props: SearchInput) => {
   const [keyword, setKeyword] = useState('')
   const {input} = SearchInputStyles
   const onSearch = () => {}

   const handleChange = (text: string) => {
      setKeyword(text)
      debounce(onSearch, 400)
   }
   return (
      <TextInput
         style={input}
         value={keyword}
         {...props}
         onChangeText={handleChange}
         placeholder="Search item"
      />
   )
}
