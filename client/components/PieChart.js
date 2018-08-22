import React from 'react'
import { PieChart, Pie, Cell } from 'recharts'
import PropTypes from 'prop-types'
const RADIAN = Math.PI / 180;

function renderLabel(internalProps) {

  const { cx, cy, midAngle, innerRadius, outerRadius, index } = internalProps
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {index === 0 ? "Correct" : "Incorrect"}
    </text>
  )
}

class SimplePieChart extends React.Component {
  render() {
    const { totalCorrect, totalIncorrect } = this.props
    // this is the TOTAL CORRECT for the entire category and the TOTAL INCORRECT for the entire category

    const data = [
      { name: "Correct Responses", value: totalCorrect },
      { name: "Incorrect Responses", value: totalIncorrect }
    ]
    if (!totalCorrect && !totalIncorrect) {
      return (
        <div></div>
      )
    }
    else {

      return (
        <div id="pie-container">
          <div id="pie-chart">
            <PieChart
              width={250}
              height={300}
              onMouseEnter={this.onPieEnter}
            >
              <Pie
                dataKey="value"
                data={data}
                cx={120}
                cy={200}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                labelLine={true}
                label={true}
                isAnimationActive={false}
              >
                <Cell fill="#FFBB28" />
                <Cell fill="#FF8042" />
              </Pie>
            </PieChart>
          </div>
          <div id="pie-key">
            <h4 style={{ color: '#FFBB28', fontWeight: 'bold' }} >Correct Answers</h4>
            <h4 style={{ color: '#FF8042', fontWeight: 'bold' }} >Incorrect Answers</h4>
          </div>
          <br />
        </div>
      )
    }
  }
}
SimplePieChart.propTypes = {
  totalCorrect: PropTypes.number.isRequired,
  totalIncorrect: PropTypes.number.isRequired
}

export default SimplePieChart
