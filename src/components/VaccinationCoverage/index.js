// Write your code here

import {
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {coverageData} = props
  console.log(coverageData)

  const dataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return `${number.toString()}k`
  }

  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart data={coverageData} margin={{top: 5}}>
        <XAxis dataKey="vaccineDate" tick={{stroke: 'grey', strokeWidth: 1}} />
        <YAxis
          tickFormatter={dataFormatter}
          tick={{stroke: 'grey', strokeWidth: 0}}
        />
        <Legend wrappedStyle={{padding: 30}} />
        <Bar dataKey="dose1" name="Dose1" fill="#2d87bb" barSize="20%" />
        <Bar dataKey="dose2" name="Dose2" fill=" #f54394" barSize="20%" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default VaccinationCoverage
