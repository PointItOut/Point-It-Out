import React from 'react'
import { PieChart, Pie, Selector, Cell} from 'recharts'

const RADIAN = Math.PI / 180;

const SimplePieChart = props => {
  const { totalCorrect, totalIncorrect } = props
  // this is the TOTAL CORRECT for the entire category and the TOTAL INCORRECT for the entire category

  const data = [
    { name: "Correct Responses", value: totalCorrect },
    { name: "Incorrect Responses", value: totalIncorrect }
  ]

  return (
    <PieChart
      width={800}
      height={400}
    >
      <Pie data={data}
        cx={120}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
      >
        <Cell fill="#FFBB28"/>
        <Cell fill="#FF8042"/>

      </Pie>
    </PieChart>
  )
}


export default SimplePieChart
