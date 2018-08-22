import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
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
    const { totalCorrect, totalIncorrect, userChart, categoryName } = this.props
    // this is the TOTAL CORRECT for the entire category and the TOTAL INCORRECT for the entire category
    const text = userChart ? `your overall performance in ${categoryName}:` : `users' performance in ${categoryName}:`

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
          <div id="pie-key">
            <h6 style={{ fontWeight: 'bold' }}>{text}</h6>
            <h4 style={{ color: '#FFBB28', fontWeight: 'bold', fontSize: '18px' }} >Correct Answers</h4>
            <h4 style={{ color: '#FF8042', fontWeight: 'bold', fontSize: '18px' }} >Incorrect Answers</h4>
          </div>
          <div id="pie-chart">
            <ResponsiveContainer width={250} height='100%' >
              <PieChart
                width={200}
                height={200}
                onMouseEnter={this.onPieEnter}
              >
                <Pie
                  dataKey="value"
                  data={data}
                  cx={120}
                  cy={100}
                  innerRadius={35}
                  outerRadius={55}
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
            </ResponsiveContainer>
          </div>
          <br />
        </div >
      )
    }
  }
}
SimplePieChart.propTypes = {
  totalCorrect: PropTypes.number.isRequired,
  totalIncorrect: PropTypes.number.isRequired
}

export default SimplePieChart
