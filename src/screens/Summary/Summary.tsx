import {StyleSheet, View} from 'react-native'
import {DisplayCustomer} from './components/DisplayCustomer'
import {Toolbar} from '../../components/Header/Toolbar'
import DeviceList from './components/DeviceList'
import {TotalView} from './components/TotalView'
import {useNavigate} from '../../common/hooks/useNavigate'
import {useEffect} from 'react'

const Summary = () => {
   const {container} = styles

   useEffect(() => {
      console.log(`Hoang: Summary render`)
   })
   return (
      <View style={container}>
         <Toolbar />
         <DisplayCustomer />
         <DeviceList />
         <TotalView />
      </View>
   )
}

export default Summary

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 10,
   },
})
