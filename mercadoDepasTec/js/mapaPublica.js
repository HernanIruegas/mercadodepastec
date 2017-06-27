$(document).ready(function(){
	$("#direccion").oninput = autoCompletar();
	$("#createMap").on("click", initialize);
});

function autoCompletar(){
		var options = {
					  componentRestrictions: {country: "mx"}
					  };
        var input = document.getElementById('direccion');
        var autocomplete = new google.maps.places.Autocomplete(input, options);
}

function initialize(){
	    var directionsDisplay;
	    var directionsService = new google.maps.DirectionsService();
	    var map;
        directionsDisplay = new google.maps.DirectionsRenderer();
        var ITESM = new google.maps.LatLng(25.651565, -100.28954);
        var mapOptions = {
            zoom: 7,
            center: ITESM
        };
        map = new google.maps.Map(document.getElementById('map'), mapOptions);
        directionsDisplay.setMap(map);

        $dir = $("#direccion").val();				
        var geocoder = new google.maps.Geocoder();
        var latitude;
        var longitude;
		geocoder.geocode({ 'address': $dir }, function (results, status){
					        if (status == google.maps.GeocoderStatus.OK){
					            latitude = results[0].geometry.location.lat();
					            longitude = results[0].geometry.location.lng();
								var ITESM = new google.maps.LatLng(25.651565, -100.28954);
								var end = new google.maps.LatLng(latitude, longitude);
								var bounds = new google.maps.LatLngBounds();
						        bounds.extend(ITESM);
						        bounds.extend(end);
						        map.fitBounds(bounds);
						        var request = {
						            origin: ITESM,
						            destination: end,
						            travelMode: google.maps.TravelMode.DRIVING
						        };
						        directionsService.route(request, function (response, status) {
						            if (status == google.maps.DirectionsStatus.OK) {
						                directionsDisplay.setDirections(response);
						                directionsDisplay.setMap(map);
						            }else{
						                alert("Directions Request from " + ITESM.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
						            }
						        });
					        }
		});    
}
    
