import React from 'react'


import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js'
import {Line} from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

function Chart2(props) {
	const data = {
		labels: ['6/12/22', '6/13/22', '6/14/22', '6/15/22', '6/16/22', '6/17/22', '6/18/22', '6/19/22', '6/20/22', '6/21/22', '6/22/22'],
		datasets:[
			{
				label: 'Price',
				data: [0.000012, 0.00002, 0.000027, 0.000021, 0.000043, 0.000048, 0.00005, 0.000047, 0.000051, 0.000062],
			}
		]

	}
	
	const options = {
		title: { display: true, text: "$CREDIT Chart:", fontSize: 25}

	}
	return(
		<div className="chart" style= {{backgroundColor: 'white'}}>
			<Line data={data} options={options} />
		</div>
	)
}

export default Chart2;

