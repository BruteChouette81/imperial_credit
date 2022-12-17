import React from 'react'


import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js'
import {Line} from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

function Chart2(props) {
	
	return(
		<div className="chart" style= {{backgroundColor: 'white', borderRadius: 15 + 'px'}}>
			<Line data={props.data} />
		</div>
	)
}

export default Chart2;

