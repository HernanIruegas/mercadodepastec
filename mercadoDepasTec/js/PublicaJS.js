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

    $("#PublishButton").on("click", validateProperty);


	

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


function validateProperty(){
    var cont=0;
    
    ($("#direccion").val() == "") ? $("#direccionError").show() : ($("#direccionError").hide(), cont++);
    ($("#precio").val() == "") ? $("#PrecioError").show() : ($("#PrecioError").hide(), cont++);
    ($("#qRooms").val() == "") ? $("#qRoomsError").show() : ($("#qRoomsError").hide(), cont++);
    ($("#qBath").val() == "") ? $("#qBathError").show() : ($("#qBathError").hide(), cont++);
    ($("#cTime").val() == "") ? $("#cTimeError").show() : ($("#cTimeError").hide(), cont++);
    ($("#qParking").val() == "") ? $("#qParkingError").show() : ($("#qParkingError").hide(), cont++);
    //pets confirmation
  		$petsInput = $("input[name='chPets']:checked").val();
   		($petsInput != "0" && $petsInput != "1" ) ? $("#chPetsError").show() : ($("#chPetsError").hide(), cont++);
    //furniture confirmation
  		$chFurnitureInput = $("input[name='chFurniture']:checked").val();
   		($chFurnitureInput != "Y" && $chFurnitureInput != "S" && $chFurnitureInput != "N") ? $("#chFurnitureError").show() : ($("#chFurnitureError").hide(), cont++);
    //type confirmation
  		$tipoInput = $("input[name='Tipo']:checked").val();
   		($tipoInput != "C" && $tipoInput != "D" ) ? $("#TipoError").show() : ($("#TipoError").hide(), cont++);
    if(cont == 9) {
        uploadProperty();
    }
}

/* CALCULAR DISTANCIA ENTRE PROPIEDAD Y TEC EN KM */
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg){
  return deg * (Math.PI/180)
}


//FUNCION PARA AGREGAR PROPIEDADES
function uploadProperty(){ 
    var latitude;
    var longitude;
    var distance;
    var services = "";


    
    /* string de servicios */
    $checkboxServicios = $("[name=servicios]");
    for($i = 0; $i < $checkboxServicios.length; $i++){
        ($checkboxServicios[$i].checked) ? services += "1" : services += "0";
    }
    
    $dir = $("#direccion").val();
	var geocoder = new google.maps.Geocoder();
    /* para conseguir latitude, longitude y distance*/
	geocoder.geocode({ 'address': $dir }, function (results, status){
        if (status == google.maps.GeocoderStatus.OK){
            latitude = results[0].geometry.location.lat();
            longitude = results[0].geometry.location.lng();
            $("#divPRUEBA").text($dir);
            distance = getDistanceFromLatLonInKm(25.650911,-100.288489,latitude,longitude) * 1000;
            
            var property = {
                "direccion": $dir,
                "precio": $("#precio").val(),
                "cuartos": $("#qRooms").val(),
                "baños": $("#qBath").val(),
                "contrato": $("#cTime").val(),
                "parking": $("#qParking").val(),
                "pets": $("input[name='chPets']:checked").val(),
                "muebles": $("input[name='chFurniture']:checked").val(),
                "tipo": $("input[name='Tipo']:checked").val(),
                "latitude": latitude,
                "longitude": longitude,
                "distance": distance,
                "servicios" : services,
                "descripcion" : $("#descripcion").val(),
                "currentUserEmail" : $("#currentUserEmail").val()
            };
        
            $.ajax({
                url: "PHP/uploadProperty.php",
                type: "POST",
                data: property,
                dataType: "json",
                contentType: "application/x-www-form-urlencoded",
                success: function(validRegister){
                    uploadPhoto(validRegister);
                    

                    
                },
                error: function(notValidRegister){
                    
                }
            });


        }
    });
}

function uploadPhoto(id_property){
    var file_data = $('#sortpicture').prop('files')[0];   
        var form_data = new FormData();                  
        form_data.append('file', file_data);
        form_data.append('id_property', id_property);
        $.ajax({
                    url: 'PHP/uploadImage.php', // point to server-side PHP script 
                    dataType: 'text',  // what to expect back from the PHP script, if anything
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: form_data,                         
                    type: 'post',
                    success: function(php_script_response){
                        location.replace("Encuentra.html");
                    }
         });
}

/*function createRegister(photopath){
    var id_property = photopath;
    id_property = id_property.substr(0, id_property.indexOf('.') === -1 ? id_property.length : id_property.indexOf('.'));
    var jsonToSend = {
                        "photopath" : photopath,
                        "id_property" : id_property
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

}*/