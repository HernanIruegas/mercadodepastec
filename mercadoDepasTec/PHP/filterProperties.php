<?php
	header('Accept: application/json');
	header('Content-type: application/json');

	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "mercadodepastec2";

	$conn = new mysqli($servername, $username, $password, $dbname);

	if($conn -> connect_error){
		header("HTTP/1.1 500 Bad Connection to the DataBase");
		die("The server is down, please try again later.");
	}else{
		$minPrice = $_POST["minPrice"];
		$maxPrice = $_POST["maxPrice"];
		$maxDistance = $_POST["maxDistance"];
		$numRooms = $_POST["numRooms"];
		$tipo = $_POST["tipo"];
		$parking = $_POST["parking"];
		$amueblado = $_POST["amueblado"];

		$sqlTipo = " ";
		if($tipo != "T"){
			$sqlTipo = " AND chType = '$tipo'";
		}

		$sqlParking = " ";
		if($parking != "T"){
			$sqlParking = " AND iParking > 0";
		}

		$sqlAmueblado = " ";
		if($amueblado != "T"){
			$sqlAmueblado = " AND bFurniture = '$amueblado'";
		}

		$sql = "SELECT *
				FROM properties
				WHERE iPrice >= $minPrice AND iPrice <= $maxPrice AND iDistance <= $maxDistance AND iRooms = $numRooms" . $sqlTipo . $sqlParking . $sqlAmueblado;
		$result = $conn ->query($sql);
		//convierte datos en un arreglo
		while($row = $result->fetch_array()){
		  $rows[] = $row;
		}
		echo json_encode($rows);
	}





?>