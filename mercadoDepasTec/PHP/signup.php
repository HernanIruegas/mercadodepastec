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
		
		$uCorreo = $_POST["uCorreo"];

		$sql = "SELECT email 
				FROM users 
				WHERE email = '$uCorreo'";

		$result = $conn -> query($sql);

		if($result -> num_rows > 0){

			while($row = $result -> fetch_assoc()){
				$response = array("firstName" => $row["fName"], "lastName" => $row["lName"]);
			}
			echo json_encode($response);
		}else{
			$uNombre = $_POST["uNombre"];
			$uApellidos = $_POST["uApellidos"];
			$uTelefono = $_POST["uTelefono"];
			$uPwd = $_POST["uPwd"];
			$uGender = $_POST["uGender"];
            $uMinRent = $_POST["minWillingRent"];
            $uMaxRent = $_POST["maxWillingRent"];
                
			$sql = "INSERT INTO users (email, fName, lName, phone, passwrd, image, gender, minWillingToPay, maxWillingToPay) VALUES ('$uCorreo', '$uNombre', '$uApellidos', '$uTelefono', '$uPwd', '', '$uGender', '$uMinRent', '$uMaxRent')";
			if(mysqli_query($conn, $sql)){
				// Abrir y guardar datos en la sesion
				session_start();
				$_SESSION["firstName"] = $uNombre;
				$_SESSION["lastName"] = $uApellidos;
				$_SESSION["email"] = $uCorreo;
			}else{
				header('HTTP/1.1 500 Bad connection, something went wrong while saving your data, please try again later');
			    die("Error: " . $sql . "\n" . mysqli_error($conn));
			}
		}
	}
?>