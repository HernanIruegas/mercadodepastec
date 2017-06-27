$(document).ready(function(){
	$("#SearchhButton").on("click", validateFilter);
});

function ReloadMap(radioDistance){
		        var ITESM = {lat: 25.651565, lng: -100.28954};
		        var map = new google.maps.Map(document.getElementById('map'), {
		          zoom: 16,
		          center: ITESM		
		        });
		        var marker = new google.maps.Marker({
		          position: ITESM,
		          map: map,
		          icon: pinSymbol("#FFF")
		        });

                var cityCircle = new google.maps.Circle({
                strokeColor: '#61bd6c',
                strokeOpacity: 0.8,
                strokeWeight: 1,
                fillColor: '#61bd6c',
                fillOpacity: 0.30,
                map: map,
                center: ITESM,
                radius: parseInt(radioDistance) * 1.1
                });

		        filterProperties(map);
}

function validateFilter(){
	$minPrice = $("#minprecio").val();
	$maxPrice = $("#maxprecio").val();
    $cont = 0;
    if($minPrice == "") $("#minprecioError").show();
    else{$("#minprecioError").hide(); $cont++;}

    if($maxPrice == "") $("#maxprecioError").show();
    else{$("#maxprecioError").hide(); $cont++;}

    if($("#distance").val() == "") $("#distanceError").show();
    else{ $("#distanceError").hide(); $cont++;}

    if($("#rooms").val() == "") $("#roomsError").show();
    else{ $("#roomsError").hide(); $cont++;}

    if($cont == 4){
    	if(parseInt($minPrice) > parseInt($maxPrice)){
    		alert("Por favor ingrese un precio máximo mayor o igual al precio mínimo");
    	}else{
    		ReloadMap($("#distance").val());
    	}
    }
}

function pinSymbol(color) {
    return {
        path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
        fillColor: color,
        fillOpacity: 1,
        strokeColor: '#000',
        strokeWeight: 2,
        scale: 1,
   };
}

function filterProperties(map){
	var marker = [];
	var jsonToSend = {
						"minPrice" : parseInt($("#minprecio").val()),
						"maxPrice" : parseInt($("#maxprecio").val()),
						"maxDistance" : parseInt($("#distance").val()),
						"numRooms" : parseInt($("#rooms").val()),
						"tipo" : $("input[name='Tipo']:checked").val(),
						"parking" : $("input[name='Parking']:checked").val(),
						"amueblado" : $("input[name='chFurniture']:checked").val()
					};

		$.ajax({
                url: "PHP/filterProperties.php",
                type: "POST",
                data: jsonToSend,
                dataType: "json",
                contentType: "application/x-www-form-urlencoded",
                success: function(HayPropiedades){
                    var properties = HayPropiedades;
      	            var listaProperties = '<div class="row row3">'
                                       + '<div class="col-xs-2"></div>'
                                       + '<div class="col-xs-8"><b>' + properties.length + '</b> propiedades encontradas.</div>'
                                       + '<div class="col-xs-2"></div>'
                                       + '</div>';
	            for (var i = 0; i < properties.length; i++){
	            	marker[i] = new google.maps.Marker({
	            	position : new google.maps.LatLng(properties[i][14], properties[i][15]),
	            	map: map
	            	});
                    google.maps.event.addListener(marker[i], 'click', (function(marker, i) {
                return function(){

                var listaProperties = "";
                var tipoP;
                (properties[i][6] == 'C') ? tipoP = "Casa" : tipoP = "Departamento";
                var mascotasP;
                (properties[i][12] == '0') ? mascotasP = "No" : mascotasP = "Si";
                var contratoP;
                (properties[i][7] == '0') ? contratoP = "Sin plazo forzoso" : contratoP = properties[i][7] + " meses";
                var amuebladoP;
                if(properties[i][10] == "N") amuebladoP = "No"; else if(properties[i][10] == "Y") amuebladoP = "Si"; else amuebladoP = "Semi amueblado";
                var serviciosP = "";
                servicios = properties[i][8];
                if (servicios[0] == '1')  serviciosP += "-Agua"; if (servicios[1] == '1')  serviciosP += "  -Luz"; if (servicios[2] == '1')  serviciosP += "  -Gas";
                if (servicios[3] == '1')  serviciosP += "  -Internet"; if (servicios[4] == '1')  serviciosP += "  -Televisión"; if (servicios[5] == '1')  serviciosP += "  -Teléfono"; 
                if (servicios[6] == '1')  serviciosP += "  -Limpieza";
                listaProperties += '<div class="row row3">'
                                 + '<div class="col-xs-1"></div>'
                                 + '<div class="detail col-xs-10">'
                                 + '<img class="j3" src="uploads/' + properties[i][0] + '.jpg"  />'
                
                                 +  '<ul class="favFechaDir">' +
                                    '<li><i id="' + properties[i][0] + '" class="ion-ios-heart heart likeButt"></i></li>' +
                                    '<li class="ulInfo">Precio: $' + '<span id="pPrecio'+ [i] + '"' + '>' + properties[i][1] + ' MXN</span>' + '</li>' +
                                    '<li class="ulInfo">Dirección: ' + '<span id="pDireccion'+ [i] + '"' + '>' + properties[i][13] + '</span>' + '</li></ul>'
             
                                 +  '<ul class="caracteristicas">' +
                                    '<li>Cuartos: ' + '<span id="pCuartos'+ [i] + '"' + '>' + properties[i][2] + '</span>' + '</li>' +
                                    '<li>Baños: ' + '<span id="pBanos'+ [i] + '"' + '>' + properties[i][3] + '</span>' + '</li>' +
                                    '<li>Tipo: ' + '<span id="pTipo'+ [i] + '"' + '>' + tipoP + '</span>' + '</li></ul>'
               
                                 +  '<ul class="caracteristicas">' +
                                    '<li>Contrato: ' + '<span id="pContrato'+ [i] + '"' + '>' + contratoP + '</span>' + '</li>' +
                                    '<li>Distancia: ' + '<span id="pDistancia'+ [i] + '"' + '>' + properties[i][9] + ' metros</span>' + '</li>' +
                                    '<li>Mascotas: ' + '<span id="pMascotas'+ [i] + '"' + '>' + mascotasP + '</span>' + '</li></ul>'
                                    
              
                                 +  '<ul class="caracteristicas">' +
                                    '<li>Amueblado: ' + '<span id="pAmueblado'+ [i] + '"' + '>' + amuebladoP + '</span>' + '</li>' +
                                    '<li>Estacionamiento: ' + '<span id="pEstacionamiento'+ [i] + '"' + '>' + properties[i][11] + ' lugares</span>' + '</li>' +
                                    '<li><i class="ion-email"></i> ' + '<span id="pContacto'+ [i] + '"' + '>' + properties[i][4] + '</span>' + '</li></ul>'

                                 +  '<ul class="caracteristicas caracteristicas2">' +
                                    '<li>Servicios incluidos: ' + '<span id="pServicios'+ [i] + '"' + '>' + serviciosP + '</span>' + '</li></ul>'
                
                                 +  '<ul class="caracteristicas caracteristicas2">' +
                                    '<li>Descripción: ' + '<span id="pDescripcion'+ [i] + '"' + '>' + properties[i][5] + '</span>' + '</li></ul>'

                                
                
                                 + '</div><div class="col-xs-1"></div></div>';
                
                                 



                  $("#modalText").empty().append(listaProperties);
                  $(".likeButt").on("click", isFavorite);
                  var modal = document.getElementById('myModal');
                  // Get the <span> element that closes the modal
                  var span = document.getElementsByClassName("close")[0];
                  modal.style.display = "block";
                  span.onclick = function(){
                        modal.style.display = "none";
                    }
                    // When the user clicks anywhere outside of the modal, close it
                    window.onclick = function(event) {
                        if (event.target == modal) {
                            modal.style.display = "none";
                        }
                    }
              
                }
              })(marker[i], i));

	            	var tipoP;
                (properties[i][6] == 'C') ? tipoP = "Casa" : tipoP = "Departamento";
                var mascotasP;
                (properties[i][12] == '0') ? mascotasP = "No" : mascotasP = "Si";
                var contratoP;
                (properties[i][7] == '0') ? contratoP = "Sin plazo forzoso" : contratoP = properties[i][7] + " meses";
                var amuebladoP;
                if(properties[i][10] == "N") amuebladoP = "No"; else if(properties[i][10] == "Y") amuebladoP = "Si"; else amuebladoP = "Semi amueblado";
                var serviciosP = "";
                servicios = properties[i][8];
                if (servicios[0] == '1')  serviciosP += "-Agua"; if (servicios[1] == '1')  serviciosP += "  -Luz"; if (servicios[2] == '1')  serviciosP += "  -Gas";
                if (servicios[3] == '1')  serviciosP += "  -Internet"; if (servicios[4] == '1')  serviciosP += "  -Televisión"; if (servicios[5] == '1')  serviciosP += "  -Teléfono"; 
                if (servicios[6] == '1')  serviciosP += "  -Limpieza";
                listaProperties += '<div class="row row3">'
                                 + '<div class="col-xs-2"></div>'
                                 + '<div class="detail col-xs-8">'
                                 + '<img class="j3" src="uploads/' + properties[i][0] + '.jpg"  />'
                
                                 +  '<ul class="favFechaDir">' +
                                    '<li><i id="' + properties[i][0] + '" class="ion-ios-heart heart likeButt"></i></li>' +
                                    '<li class="ulInfo">Precio: $' + '<span id="pPrecio'+ [i] + '"' + '>' + properties[i][1] + ' MXN</span>' + '</li>' +
                                    '<li class="ulInfo">Dirección: ' + '<span id="pDireccion'+ [i] + '"' + '>' + properties[i][13] + '</span>' + '</li></ul>'
             
                                 +  '<ul class="caracteristicas">' +
                                    '<li>Cuartos: ' + '<span id="pCuartos'+ [i] + '"' + '>' + properties[i][2] + '</span>' + '</li>' +
                                    '<li>Baños: ' + '<span id="pBanos'+ [i] + '"' + '>' + properties[i][3] + '</span>' + '</li>' +
                                    '<li>Tipo: ' + '<span id="pTipo'+ [i] + '"' + '>' + tipoP + '</span>' + '</li></ul>'
               
                                 +  '<ul class="caracteristicas">' +
                                    '<li>Contrato: ' + '<span id="pContrato'+ [i] + '"' + '>' + contratoP + '</span>' + '</li>' +
                                    '<li>Distancia: ' + '<span id="pDistancia'+ [i] + '"' + '>' + properties[i][9] + ' metros</span>' + '</li>' +
                                    '<li>Mascotas: ' + '<span id="pMascotas'+ [i] + '"' + '>' + mascotasP + '</span>' + '</li></ul>'
                                    
              
                                 +  '<ul class="caracteristicas">' +
                                    '<li>Amueblado: ' + '<span id="pAmueblado'+ [i] + '"' + '>' + amuebladoP + '</span>' + '</li>' +
                                    '<li>Estacionamiento: ' + '<span id="pEstacionamiento'+ [i] + '"' + '>' + properties[i][11] + ' lugares</span>' + '</li>' +
                                    '<li><i class="ion-email"></i> ' + '<span id="pContacto'+ [i] + '"' + '>' + properties[i][4] + '</span>' + '</li></ul>'

                                 +  '<ul class="caracteristicas caracteristicas2">' +
                                    '<li>Servicios incluidos: ' + '<span id="pServicios'+ [i] + '"' + '>' + serviciosP + '</span>' + '</li></ul>'
                
                                 +  '<ul class="caracteristicas caracteristicas2">' +
                                    '<li>Descripción: ' + '<span id="pDescripcion'+ [i] + '"' + '>' + properties[i][5] + '</span>' + '</li></ul>'

                                
                
                                 + '</div><div class="col-xs-2"></div></div>';
	            }
	            alert("Propiedades encontradas: " + properties.length);

            $("#lista").empty().append(listaProperties);
            $(".likeButt").on("click", isFavorite);
                },
                error: function(NoHayPropiedades){
                    alert("NO HAY NADA");
                }
            });
}