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
        
        
        
        $currentProperty = $_POST["currentProperty"];
        $currentUserEmail = $_POST["currentUserEmail"];
        
        
        echo("hola");
        $sql = "INSERT INTO is_favorite_of(id_user ,id_property)
                VALUES ('$currentUserEmail' , '$currentProperty')";
        $result= $conn ->query($sql);
        echo json_encode($result);
        
    }
?>





