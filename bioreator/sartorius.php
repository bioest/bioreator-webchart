<!doctype html>
<html>

<head>
	<script src="https://cdn.zingchart.com/zingchart.min.js"></script>
	<script>
	zingchart.MODULESDIR = "https://cdn.zingchart.com/modules/";
	ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "ee6b7db5b51705a13dc2339db3edaf6d"];
	</script>
	<link rel="stylesheet" type="text/css" href="./bioreator/sartorius.css">
</head>

<body>
	<h2 align='center' style="line-height:1px"> Bioest - Fermentador Sartorius</h2>
	<!--<h2 align='center' style="line-height:10px">Fermentador Sartorius</h2> -->
	<div id='divBatches' class='select--container'>
		<label for="batches" style="margin-right:10px">Selecione o arquivo de batch:    </label>
		<select id="lbBatches">
		<!--<option value="a1">BIOSTAT_B_DCU_1 Jan 09 2020.mdb</option> -->
		</select>
	</div>
	<div id='sartChart'><a class="zc-ref" href="https://www.zingchart.com/"></a></div> 
	<div class="controls--container">
		<button id="btUpdate">Update</button>
		<button id="btReset">Reset</button>
		<button id="btPause">Pause</button>
		<button id="btStart">Start</button>
	</div>

	<div id='divTags' class="tags--container" background-color="yellow">
		<!--<p>tags container</p> -->
		<ul id='ulTags' class="checkboxes"> </ul>
	</div>
	<!--<div class="tooltip">Hover over me<span class="tooltiptext">Tooltip text</span>-->
</div>

	<script src="./bioreator/sartorius.js" type="module">></script>

</body>

</html>