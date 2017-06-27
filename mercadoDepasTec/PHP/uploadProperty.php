<?php
	header('Accept: application/json');
	header('Content-type: application/json');//que tipo de formato le envio de respuesta a la llamdada ajax en el front end
    //variables usadas para la conexión a la base de datos
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "mercadodepastec2";

    $conn = new mysqli($servername, $username, $password, $dbname);
    
    if($conn -> connect_error){
        header("HTTP/1.1 300 Bad Connection to the Database");
        die("The server is down, please try again later");
    }else{  
        
        $direccion = $_POST["direccion"];
        $precio = $_POST["precio"];
        $cuartos = $_POST["cuartos"];
        $banos = $_POST["baños"];
        $contrato = $_POST["contrato"];
        $parking = $_POST["parking"];
        $pets = $_POST["pets"];
        $muebles = $_POST["muebles"];
        $tipo = $_POST["tipo"];
        $latitude = $_POST["latitude"];
        $longitude = $_POST["longitude"];
        $distance = $_POST["distance"];
        $servicios = $_POST["servicios"];
        $descripcion = $_POST["descripcion"];
        $currentUserEmail = $_POST["currentUserEmail"];
        
        $sql = "INSERT INTO properties(id_property, iPrice, iRooms, iBathrooms, id_owner, sDescripcion, chType, iContractTime, sServices, iDistance, bFurniture, iParking, bPets, location, latitude, longitude)
                VALUES ('', '$precio', '$cuartos', '$banos', '$currentUserEmail', '$descripcion', '$tipo', '$contrato', '$servicios', '$distance', '$muebles', '$parking', '$pets', '$direccion', '$latitude', '$longitude' )";
        
        $conn -> query($sql); 
        echo json_encode($conn->insert_id);       
    }
?>





