"use strict"

import {config} from './config.js'
import {FTag, FTagPrior, FTagColor} from './configFTag.js'
import {sartChartConfig} from './configSartChart.js'

//-----------------------------------

const _gMAX_TAGS = 9    // numero maximo de tags no grafico. Limitado pelo ZingCharts
var _gtimer;            // timer de refresh dos dados do db de batch
var _gAcbTags= [];      // arranjo com os checkboxes dos tags
var _gBatchFName = '';  // nome do arquivo de batch .mdb
var _gLastTime = 0;     // Unix time da ultima atualizacao (com getDBData())


//reset pause start click events
document.getElementById('btUpdate').addEventListener('click', updateGraph);
document.getElementById('btReset').addEventListener('click', resetGraph);
document.getElementById('btPause').addEventListener('click', pauseGraph);
document.getElementById('btStart').addEventListener('click', startGraph);
document.getElementById('lbBatches').addEventListener('change', lbBatchesChangeEvent);

// disable 'update' button:
document.getElementById('btUpdate').disabled = true;

// pega nomes dos arquivo de batch:
var fBatches = listDir( config.batchesDirPath );


//getDBData(config);
//console.log(sartChartConfig)

zingchart.TOUCHZOOM = 'pinch';

zingchart.render({
	id: 'sartChart',
	data: sartChartConfig,
	height: '100%',
	width: '100%'
});




//console.log( FTag );
// cria os checkbox dos tags:
var numCheck =  0;   // numero de tags ligados (checked)
var idxCor   =  0;   // indice na matriz de cores FTagColor
Object.keys(FTag).forEach( tagKey => {
	var tag = FTag[tagKey];
	if (tag.descr != "") {
		var check = false;
		var cor   = 'black';
		// no maximo 9 checked - limitacao do zingchart
		if ( FTagPrior.some(e => e.str === tag.str) && numCheck <= _gMAX_TAGS ) {
			check = true;
			numCheck++;   
			cor = FTagColor[idxCor++];
		}
		var cb = createCheckbox("ulTags", tag.str, check, tag.des, tag.str+": "+tag.descr, cor);
		if (!cb.checked) {
			cb.disabled = true;
		}
		_gAcbTags.push(cb);
	}
})



// ----- Funcoes:

function getDBData(nomeDB, nomeSysDB, tags, qtempo) {
	// pega os dados para o grafico no servidor:

	//// NOME DO DB - stubs
	//var nomeDB = "D:\\tmp7\\Bioreator\\Database\\Batches\\BIOSTAT_B_DCU_1 Jan 09 2020.mdb"
	//var nomeSysDB = "D:\\tmp7\\Bioreator\\Database\\MFCSwin.mdw";
	//var tags = ['pH' , 'ACIDSUB' , 'ExCO2'];
	//var qtempo = 1578664310;
	//console.log(nomeDB)
	//console.log(nomeSysDB)
	//console.log(tags)
	//console.log(qtempo)
	
	var qtags = '';
	for (var i=0; i<tags.length; i++)
		qtags += "'"+tags[i]+"',"

	var xhr = new XMLHttpRequest();
	xhr.addEventListener("error", () => { console.error('xhr.onerror',e) })
	var getStr = '/bioest/bioreator/getDBData.php?qtags='+qtags+"&qtempo="+qtempo+"&dbq="+nomeDB+"&sysdb="+nomeSysDB
	//console.log(getStr)
	xhr.open( "GET", getStr );
	xhr.setRequestHeader("Content-Type", "application/json");

	xhr.addEventListener("load", function() {
	
		var data = JSON.parse(this.responseText)
		//console.log(data)
		//var d1 = data['ACIDSUB']
		//var d1 = (data['ACIDSUB']).map( (t)=>{ return [t[0]*1000,t[1]] } ).slice(14,100)
		//console.log(d1)
		var ftags = Object.keys(data)
		var numTags = ftags.length
		//console.log(ftags)

		var colors = {}
		_gAcbTags.forEach( (cb) => { 
			if (cb.checked) 
				colors[cb.name] = cb.nextSibling.style.color; 
		})
		//console.log(colors)

		// remove todos os plots
		for (var i = 0; i < 9; i++)	{
			zingchart.exec('sartChart', 'removeplot'), {
				plotindex: i
			}
		}

		ftags.forEach( (tag, idx) => {
			var cmpl = "" + ( (idx > 0)? "-"+(idx+1).toString() : "" )
			var scaley = 'scale-y' + cmpl

			//zingchart.exec('sartChart', 'modify', {
			//	"data": {
			//		[scaley]: {visible:false},
			//	}
			//})
			
			zingchart.exec('sartChart', 'addplot', {
				'data': {
					//'values': [ [1585336801*1000, 10.1], [1585336802*1000,11.1], [1585336803*1000,12.1] ],
					'values': data[tag],
					update: false,
					text: tag,
					scales: "scale-x, " + scaley,
					'line-color': colors[tag],
					marker: {
					'background-color': '#FFFFFF',
					size:1,
					'border-color': "#0000ff",
					'border-width': 0
					}
				}			
			}); 

			zingchart.exec('sartChart', 'update')
			
		});

	}); 

	xhr.send();
}
//-----------------------------------

// timer callback:
function timerCallback() {
	var time = new Date().getTime()
	var newValue = Math.floor((Math.random() * 50) + 1);
	//console.log(time, newValue)
	
	zingchart.exec('sartChart', 'appendseriesvalues', {
		plotindex: 0,
		values : [[time,newValue]]
	});
	var newValue = Math.floor((Math.random() * 50) + 1);
	zingchart.exec('sartChart', 'appendseriesvalues', {
		plotindex: 1,
		values : [[time,newValue]]
	});		
};
//-----------------------------------

// define control functions
function resetGraph() {
	zingchart.exec('sartChart', 'viewall');
}
//-----------------------------------
function pauseGraph() {
	console.log('PAUSE')
	_gtimer = clearInterval(_gtimer)
	zingchart.exec('sartChart', 'update')
}
//-----------------------------------
function startGraph() {
	_gtimer = setInterval( timerCallback, 1000)
	zingchart.exec('sartChart', 'update')
}
//-----------------------------------

function updateGraph() {
	// carrega os dados:
	//var ftags = ['pH' , 'ACIDSUB' , 'ExCO2'];
	// Monta os ftags:
	var ftags = []
	_gAcbTags.forEach( (cb) => {
		if (cb.checked) {
			ftags.push(cb.name)
		}
	})
	//console.log(ftags)
	//var qtempo = 1578664310;
	var qtempo = _gLastTime;
	getDBData(_gBatchFName, config.systemDB, ftags, qtempo);

	// disable 'update' button:
	document.getElementById('btUpdate').disabled = true;

	zingchart.exec('sartChart', 'update')
}
//-----------------------------------

function lbBatchesChangeEvent(lbEvCh) {
	var lbox = lbEvCh.target
	//console.log(lbEvCh)
	var idxSel = lbox.selectedIndex
	if (lbox.options[idxSel].text != "") {
		_gBatchFName = lbox.options[idxSel].text
		_gBatchFName = config.batchesDirPath + _gBatchFName
		//console.log(_gBatchFName)
		updateGraph();
		//document.getElementById('btUpdate').disabled = false;  // habilita botao de Update
	}
}	

//-----------------------------------


function fTagChangeEvent(cbEvCh) {
	// queue de cores:
	if (typeof fTagChangeEvent._queueCor == 'undefined')
		fTagChangeEvent._queueCor = [];

	var cbox = cbEvCh.target
	//console.log(cbEvCh)
	//console.log( typeof(cbox) )

	// numero de cbox checked DEPOIS do evento:
	var nchecked = 0;
	_gAcbTags.forEach( (ch, idx) => {(ch.checked) ? nchecked++ : 0;} );
	//console.log(nchecked)
	// label:
	var label = document.getElementById('idLb'+cbox.name);

	//document.querySelectorAll('*').forEach(function(node) {
	//	console.log( node.id )
	//});

	var oldCor = label.style.color;
	if (cbox.checked) {
		// Marcou o cb
		label.style.color = fTagChangeEvent._queueCor.shift()
	} else {
		//desmarcou o cb
		fTagChangeEvent._queueCor.push(oldCor);
		label.style.color = 'black';
	}
	if (nchecked >= _gMAX_TAGS) {
		// num max tags. Desabilita todos os outros:
		_gAcbTags.forEach( (cb) => {if(!cb.checked) cb.disabled=true;} )
	} else {
		// habilita todos:
		_gAcbTags.forEach( (cb) => {cb.disabled=false;} )
	}
	//	console.log(cbox.checked)
	
	// habilita 'update' button:
	document.getElementById('btUpdate').disabled = false;


}
//-----------------------------------

function createCheckbox(divId, cbName, cbChecked, cbLabel, cbTip, cbColor) {
	var myDiv = document.getElementById( divId ); 
              
	// creating checkbox element 
	var checkbox = document.createElement('input'); 
	  
	// Assigning the attributes 
	// to created checkbox 
	checkbox.type = "checkbox"; 
	checkbox.name = cbName; 
	checkbox.value = ""; 
	checkbox.id = "idCb"+cbName; 
	checkbox.checked = cbChecked;
	checkbox.title = cbTip;

	// event listener (para todos os checkbox):
	checkbox.addEventListener('change', fTagChangeEvent)
	  
	// creating label for checkbox 
	var label = document.createElement('label'); 
	  
	// assigning attributes for the created label tag  
	label.htmlFor = "idCb"+cbName; 
	label.id = 'idLb'+cbName;
	label.style.color = cbColor;
	  
	// appending the created text to the created label tag  
	label.appendChild(document.createTextNode(cbLabel)); 
	  

	// creating label for checkbox 
	var li = document.createElement('li'); 

	// appending the checkbox 
	// and label to div 
	li.appendChild(checkbox); 
	li.appendChild(label); 

	myDiv.appendChild(li);

	return checkbox
}
//-----------------------------------

function listDir(path)
{
	var xhr = new XMLHttpRequest();
	xhr.addEventListener("error", () => { console.error('xhr.onerror',e) })
	xhr.open( "GET", '/bioest/bioreator/listDir.php?path='+path );
	xhr.setRequestHeader("Content-Type", "application/json");

	xhr.addEventListener("load", function() {
		//console.log(this.responseText)
		// tem um ';' no final do responseText que nao sei de onde veio!!!!! Retirar:
		var response = this.responseText.substring(0,this.responseText.length -1)
		var data = JSON.parse(response)
		//var data = this.responseText
		var listbox='<option value="00"> </option>';  // cria um inicial invalido como marcador do listbox
		for(var i=0;i<data.length;i++){
			//console.log(data[i])
			listbox +='<option value="'+'A'+i+'">'+data[i]+'</option> ';
		}
		//console.log("")
		//console.log(listbox)
		document.getElementById('lbBatches').innerHTML=listbox;

	});
	xhr.send();

}
//-----------------------------------
//-----------------------------------
