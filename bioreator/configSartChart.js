// config sartChart
// arquivo configuracao grafico Zingchart

// otimo exemplo:
//https://app.zingsoft.com/view/1R7BM9TR

//https://www.zingchart.com/docs/api/methods
//https://www.zingchart.com/docs/api/json-configuration

var sartChartConfig = {
	gui: {
		contextMenu: {
			position: 'right',
			docked: true,
			alpha: 0.9,
			item: {
				textAlpha: 1
			},
			button: {
				visible: true
			}
		}
	},
	type: 'line',
	borderColor: "#cccccc",
	borderWidth: 1,
	borderRadius: 2,
	plot: {
		aspect: 'spline'
	},
	plotarea: {
		//marginTop: 1,
		margin: 'dynamic'
	},
	utc: true,
	timezone: -3,
	//title: {
	//	text: 'Fermentador Sartorius',
	//	adjustLayout: true,
	//	align: 'center',
	//	marginLeft: '0%'
	//},
	/*legend: {
		draggable: true,
		backgroundColor: 'transparent',
		header: {
			//text: "Facility N",
			//backgroundColor: '#f0f0f0'
		},
		marker: {
			visible: false
		},
		//item: {
		//  margin: '5 17 2 0',
		//  padding: '3 3 3 3',
		//  fontColor: '#fff',
		//  cursor: 'hand'
		//},
		verticalAlign: 'middle',
		borderWidth: 0
	},*/
	scaleX: {
		//step: 'day', //set step for scale
		//step: '1 minute',
		//step: 'minute',
		//itemsOverlap: true,
		maxItems: 5,
		zooming: true,
		transform: {
			type: 'date',
			all: "%d%M%Y<br>%G:%i:%s",
			itemsOverlap: false
		}
	},
	preview: {
		adjustLayout: true,
		//live: true
		//live: false
	},
	crosshairX: {
		shared: true,
		lineColor: "#23211E",
		//lineColor: '#555',
		scaleLabel: {
			backgroundColor: "#E3DEDA",
			fontColor: "#414042"
		},			
		plotLabel: {
			fontSize: 10,
			backgroundColor: '#fff',
			multiple: true,
			borderWidth: 2,
			borderRadius: 2,
		},
		marker: {
			size: 1,
			borderWidth: 1,
			borderColor: '#fff'
		}
	},
	tooltip: {
		visible: true
	},
	'scale-y'  : {visible: false,},
	'scale-y-2': {visible: false,},
	'scale-y-3': {visible: false,},
	'scale-y-4': {visible: false,},
	'scale-y-5': {visible: false,},
	'scale-y-6': {visible: false,},
	'scale-y-7': {visible: false,},
	'scale-y-8': {visible: false,},
	'scale-y-9': {visible: false,},

};


export {sartChartConfig};