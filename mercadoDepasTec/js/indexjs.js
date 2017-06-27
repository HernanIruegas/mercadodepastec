$(document).ready(function(){
    // Acción para verificar que la sesión sigue activa
    $.ajax({
        url : "PHP/sessionService.php",
        type : "GET",
        dataType : "json",
        success : function(sessionJson){
            $("#LogButtons").hide();
            $("#LoggedInButtons").show();
            $("#LoggedNombre").text(sessionJson.fName + " " + sessionJson.lName);
            $("#currentUserEmail").val(sessionJson.email); 
        },
        error : function(errorMessage){
            console.log(errorMessage.responseText);

        }
    });

	$("#submitForm1").on("click", validateSignUp); //Funcion de validar datos y crear cuenta.
	$("#submitForm2").on("click", validateLogIn); //Funcion de validar datos e iniciar sesión
	$("#LogOutButton").on("click", logOut); //Funcion para cerrar la sesión
	menuFunctionality();


	

	// Acción para cargar las cookies previamente guardadas
	$.ajax({
		url : "PHP/cookieService.php",
		type : "GET",
		dataType : "json",
		success : function(cookieJson){
			$("#emaillogin").val(cookieJson.email);
		},
		error : function(errorMessage){
			console.log(errorMessage.responseText);
		}

	});
});

function validateSignUp(){
		var cont = 0;
		//Nombre
		($("#nombre").val() == "") ? $("#nameError").show() : 
									 ($("#nameError").hide(), cont++);
		//Apellido
		($("#apellido").val() == "") ? $("#lastnameError").show() :
									   ($("#lastnameError").hide(), cont++);
		//Email
    	($("#Email").val() == "") ? $("#EmailError").show() :
        					        ($("#EmailError").hide(), cont++);

        //Telefono
        ($("#telefono").val() == "") ? $("#TelefonoError").show() :
        							  ($("#TelefonoError").hide(), cont++);
    	//Password
		($("#pwd").val() == "") ? $("#passwordError").show() :
        						  ($("#passwordError").hide(), cont++);
        //Password confirmation
        if($("#pwd2").val() == ""){
        	$("#passwordError2").show();
        }else{
        	$("#passwordError2").hide();
        	console.log("Entra al primer else");
        	if($("#pwd").val() == $("#pwd2").val()){
        		$("#wrongpassword").hide();
        		cont++;
        		console.log("Entra al if despues del else");
        	}else{
        		$("#wrongpassword").show();
        		console.log("Entra al else despues del else");
        	}
        }				  
   		//Gender confirmation
  		$GenderInput = $("input[name='gender']:checked").val();
   		($GenderInput != "M" && $GenderInput != "F" ) ? $("#genderError").show() :
   										        		($("#genderError").hide(), cont++);

   		
   		if(cont == 7) SignUp(); 
}



function validateLogIn(){
		var cont = 0;
		//Correo
		($("#emaillogin").val() == "") ? $("#correologinerror").show() :
									     ($("#correologinerror").hide(), cont++);
		//Password
		($("#pwdlogin").val() == "") ? $("#pwdloginerror").show() :
									   ($("#pwdloginerror").hide(), cont++);

		if(cont == 2) LogIn();
}

function SignUp(){
		var jsonSignUp = {
						 	"uNombre" : $("#nombre").val(),
						 	"uApellidos" : $("#apellido").val(),
						 	"uCorreo" : $("#email").val(),
							"uTelefono" : $("#telefono").val(),
						 	"uPwd" : $("#pwd").val(),
						 	"uGender" : $("input[name='gender']:checked").val(),
                            "minWillingRent" : $("#MinRentToPay").val(),
                            "maxWillingRent" : $("#MaxRentToPay").val()
						 };
		$.ajax({
			url: "PHP/signup.php",
			type: "POST",
			data : jsonSignUp,
			dataType: "json",
			contentType : "application/x-www-form-urlencoded",
			success: function(jsonSignUp){
				alert("Correo ya dado de alta");
			},
			error : function(SiSePudo){
				location.reload();
			}
		})
}

function LogIn(){
		var rememberMe = $("#rememberMe").is(":checked");
		var jsonToSend = {
							"uEmail" : $("#emaillogin").val() ,
							"uPassword" : $("#pwdlogin").val(),
							"remember" : rememberMe
						 };
		$.ajax({
			url: "PHP/login.php",
			type: "POST",
			data : jsonToSend,
			dataType: "json",
			contentType : "application/x-www-form-urlencoded",
			success: function(jsonReceived){
				console.log("Todo bien");
				location.reload();

			},
			error : function(errorMessage){
				console.log("Algo mal");
				alert(errorMessage.responseText);
			}
		})
}

function logOut(){
	// Acción para el botón de logout
		$.ajax({
			url : "PHP/deleteSession.php",
			type : "GET",
			dataType : "json",
			success : function(sessionJson){
				window.location.replace("index.html");
			},
			error : function(errorMessage){
				window.location.replace("index.html");
			}
		});
}

function menuFunctionality(){
	$("#subnav > li").on("click",function(){
		$(".selected").removeClass("selected");
		var $currentSelection = $(".currentSelection");
		$currentSelection.removeClass("currentSelection");
		$currentSelection.addClass("hiddenSection");

		var currentSection = $(this).attr("class");
        if(currentSection == "Mapa" || currentSection =="Lista"){
            $("#filtros").show();
        }else{
            $("#filtros").hide();
        }
		$("#" + currentSection).addClass("currentSelection").removeClass("hiddenSection");
		$(this).addClass("selected");
	});
}