import React, { useReducer, useCallback } from 'react'
import { View, Text, Dimensions } from 'react-native'
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit'
import { styles } from './styles'

interface ChartData {
   labels: string[]
   datasets: {
      data: number[]
      color?: (opacity: number) => string
      strokeWidth?: number
   }[]
}

interface State {
   selectedChart: 'line' | 'bar' | 'pie'
   lineData: ChartData
   barData: ChartData
   pieData: {
      name: string
      population: number
      color: string
      legendFontColor: string
      legendFontSize: number
   }[]
}

type Action = { type: 'SET_CHART_TYPE'; payload: State['selectedChart'] }

const initialState: State = {
   selectedChart: 'line',
   lineData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
         {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            strokeWidth: 2,
         },
      ],
   },
   barData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
         {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
         },
      ],
   },
   pieData: [
      {
         name: 'Seoul',
         population: 21500000,
         color: 'rgba(131, 167, 234, 1)',
         legendFontColor: '#7F7F7F',
         legendFontSize: 15,
      },
      {
         name: 'Toronto',
         population: 2800000,
         color: '#F00',
         legendFontColor: '#7F7F7F',
         legendFontSize: 15,
      },
      {
         name: 'Beijing',
         population: 527612,
         color: 'red',
         legendFontColor: '#7F7F7F',
         legendFontSize: 15,
      },
      {
         name: 'New York',
         population: 8538000,
         color: '#000000',
         legendFontColor: '#7F7F7F',
         legendFontSize: 15,
      },
      {
         name: 'Moscow',
         population: 11920000,
         color: 'rgb(0, 0, 255)',
         legendFontColor: '#7F7F7F',
         legendFontSize: 15,
      },
   ],
}

const reducer = (state: State, action: Action): State => {
   switch (action.type) {
      case 'SET_CHART_TYPE':
         return { ...state, selectedChart: action.payload }
      default:
         return state
   }
}

const screenWidth = Dimensions.get('window').width

const StatisticalChart: React.FC = () => {
   const [state, dispatch] = useReducer(reducer, initialState)

   const _renderChart = useCallback(() => {
      const chartConfig = {
         backgroundColor: '#ffffff',
         backgroundGradientFrom: '#ffffff',
         backgroundGradientTo: '#ffffff',
         decimalPlaces: 0,
         color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
         style: {
            borderRadius: 16,
         },
      }

      switch (state.selectedChart) {
         case 'line':
            return (
               <LineChart
                  data={state.lineData}
                  width={screenWidth}
                  height={220}
                  chartConfig={chartConfig}
                  bezier
                  style={styles.chart}
               />
            )
         case 'bar':
            return (
               <BarChart
                  data={state.barData}
                  width={screenWidth}
                  height={220}
                  chartConfig={chartConfig}
                  yAxisLabel=""
                  yAxisSuffix=""
                  style={styles.chart}
                  verticalLabelRotation={30}
               />
            )
         case 'pie':
            return (
               <PieChart
                  data={state.pieData}
                  width={screenWidth}
                  height={220}
                  chartConfig={chartConfig}
                  accessor="population"
                  backgroundColor="transparent"
                  paddingLeft="15"
                  style={styles.chart}
               />
            )
      }
   }, [state.selectedChart])

   return (
      <View style={styles.container}>
         <View style={styles.buttonContainer}>
            <Text
               style={[
                  styles.button,
                  state.selectedChart === 'line' && styles.activeButton,
               ]}
               onPress={() =>
                  dispatch({ type: 'SET_CHART_TYPE', payload: 'line' })
               }>
               Line Chart
            </Text>
            <Text
               style={[
                  styles.button,
                  state.selectedChart === 'bar' && styles.activeButton,
               ]}
               onPress={() =>
                  dispatch({ type: 'SET_CHART_TYPE', payload: 'bar' })
               }>
               Bar Chart
            </Text>
            <Text
               style={[
                  styles.button,
                  state.selectedChart === 'pie' && styles.activeButton,
               ]}
               onPress={() =>
                  dispatch({ type: 'SET_CHART_TYPE', payload: 'pie' })
               }>
               Pie Chart
            </Text>
         </View>
         {_renderChart()}
      </View>
   )
}

export default StatisticalChart
