import Svg, {Path} from 'react-native-svg'

export const CheckIcon = () => {
   return (
      <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
         <Path
            d="M6 12L10 16L18 8"
            stroke="#2ECC71"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
         />
      </Svg>
   )
}
