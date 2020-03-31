<?php

	if ( !isset($_GET["dbq"]) || !isset($_GET["sysdb"]) ||
		 !isset($_GET["qtags"]) || !isset($_GET["qtempo"]) ) {
		die('Parametros necessarios: qtags, qtempo, dbq, sysdb');
	}

	$qtags  = $_GET["qtags"];
	$qtempo = $_GET["qtempo"];
	$dbq    = $_GET["dbq"];
	$sysdb  = $_GET["sysdb"];
	//echo $qtags . "\n";
	//echo $qtempo . "\n";
	//echo $dbq . "\n";
	//echo $sysdb . "\n";

	if (!file_exists($dbq)) {
		die("Arquivo nao encontrado:".$dbq);
	 }
	 if (!file_exists($sysdb)) {
		die("Arquivo nao encontrado:".$sysdb);
	 }

	$connStr = 
			'odbc:Driver={Microsoft Access Driver (*.mdb, *.accdb)};' .
			'DBQ='.$dbq.';' . 
			'SystemDB='.$sysdb.';' . 
			'UID=MFCSUSER;' . 
			'PWD=;';
	//echo $connStr . "\n";	
	
	$dbh = new PDO($connStr);
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
	//$sql = "SELECT AgentName FROM Agents " .
	//        "WHERE ID < ? AND AgentName <> ?";
	//$sql = "SELECT PDatAVarTag, PDatTimeGMT, PDatValue FROM ProcessData";
	$query = 	"SELECT PDatAVarTag as ftag, PDatTimeGMT as ftmp, PDatValue as fvalor " .
				"FROM ProcessData " .
				"WHERE PDatAVarTag in (" . $qtags . ") " .
				"and PDatTimeGMT > " . $qtempo . " " .
				"ORDER BY PDatAVarTag, PDatTimeGMT";
	//echo $query . "\n";
	$sth = $dbh->prepare($query);
	
	$sth->execute();
	
	// Prepara dados para response:
	// arrays auxilia
	$arrResp = [];    // ex: [  t1 => [[hora_t1,valort1], [],...], 
					  //		t2 => [[hora_t2,valor_t2], [], ...], 
					  //        t3 => [[hora_t3,valor_t3], [], ...]  ]

	$serie = [];    // ex: [ [[hora_t1,valort1], [],...] ]
	$lastTag = '';
	$init = true;

	$debugCnt = 1;
	while ( $row = $sth->fetch(PDO::FETCH_OBJ ) ) {
		$curTag = $row->ftag; //$row->PDatAVarTag;
		if ($curTag != $lastTag) {
			// nova tag:
			//print_r( array($curTag => $serie) );
			if (!$init) {
				$arrResp = array_merge( $arrResp, array($lastTag => $serie) );
				//print_r($arrResp);
			}
			$serie = [];
			$lastTag = $curTag;
			$init = false;
		}
		// processa a row:
		$vals = [$row->ftmp*1000, (float)$row->fvalor]; //[$row->PDatTimeGMT, $row->PDatValue];
		array_push($serie, $vals);
	}
	// processa a ultima tag:
	if ($lastTag != '' && count($serie)>0 && !$init) {
		$arrResp = array_merge( $arrResp, array($lastTag => $serie) );
	}

	echo json_encode($arrResp);

?>
