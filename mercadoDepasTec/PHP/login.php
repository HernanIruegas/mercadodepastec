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
		$uEmail = $_POST["uEmail"];
		$uPassword = $_POST["uPassword"];

		$sql = "SELECT fName, lName, email
				FROM users 
				WHERE email = '$uEmail' AND passwrd = '$uPassword'";

		$result = $conn -> query($sql);

		if($result -> num_rows > 0){
			// Guardar cookie
			$remember = $_POST["remember"];
			if ($remember == "true"){
				setcookie("email", $uEmail, time() + 3600*24);
			}
			while($row = $result -> fetch_assoc()){
				$response = array("firstName" => $row["fName"], "lastName" => $row["lName"], "email" => $row["email"]);
				// Abrir y guardar datos en la sesion
				session_start();

				$_SESSION["firstName"] = $row["fName"];
				$_SESSION["lastName"] = $row["lName"];
				$_SESSION["email"] = $row["email"];
			}
			echo json_encode($response);
		}else{
			header("HTTP/1.1 406 User not found");
			die("Wrong credentials provided.");
		}
	}
?>