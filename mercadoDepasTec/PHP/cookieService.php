<?php

	header('Content-type: application/json');

	if (isset($_COOKIE["email"]))
	{
		echo json_encode(array("email" => $_COOKIE["email"]));
	}
	else
	{
		header('HTTP/1.1 406 Cookie has not been set');
		die("There are not saved cookies yet.");
	}
?>