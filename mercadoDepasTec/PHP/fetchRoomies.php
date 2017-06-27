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
        header("HTTP/1.1 500 Bad Connection to the Database");
        die("The server is down, please try again later");
    }else{
        
        $rentToPay = $_POST["rentToPay"];
        $currentUserEmail = $_POST["currentUserEmail"];
            
		$sql = "SELECT  *
				FROM users
                WHERE $rentToPay >= minWillingToPay AND $rentToPay <= maxWillingToPay AND email != '$currentUserEmail' ";
            
		$result = $conn ->query($sql);
        
		//convierte datos en un arreglo
		while($row = $result->fetch_array()){
		  $rows[] = $row;
		}
		echo json_encode($rows);
    }
?>






