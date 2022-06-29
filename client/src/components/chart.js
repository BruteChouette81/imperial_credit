import React from 'react'


import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js'
import {Line} from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

function Chart2(props) {
	
	const options = {
		title: { display: true, text: "$CREDIT Chart:", fontSize: 25}

	}
	return(
		<div className="chart" style= {{backgroundColor: 'white', borderRadius: 15 + 'px'}}>
			<Line data={props.data} options={options} />
		</div>
	)
}

export default Chart2;

