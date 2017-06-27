$(document).ready(function(){
    
    $("#submitRent").on("click", findRoomies);
});

function findRoomies(){

    var jsonSend = {
      "rentToPay": $("#willingRent").val(),
      "currentUserEmail": $("#SessionEmail").val()
    };
        
    $.ajax({
        url : "PHP/fetchRoomies.php",
        type : "POST",
        data: jsonSend, 
        dataType : "json",
        contentType : "application/x-www-form-urlencoded",
        success : function(roomies){
   
            var listaRoomies = "";
            if(roomies != null) {
                
                for(var i = 0; i<roomies.length; i++){
                    listaRoomies += "<div class="+"roomie"+">" +
                                    '<p><i class="ion-person"></i>Nombre: ' + roomies[i][1] + " " + roomies[i][2] + "</p>" +  
                                    '<p><i class="ion-email"></i> Correo: ' + roomies[i][0] + "</p>" + 
                                    '<p><i class="ion-android-call"></i> Teléfono: ' + roomies[i][3] + "</p>" + 
                                    "</div>";
                }
                $("#listRoomies").append(listaRoomies);  
            }else{
                listaRoomies = " "; 
                $("#listRoomies").text(listaRoomies); 
            }          
        },
        error : function(errorMessage){
            console.log(errorMessage.responseText);
        }
    });
}









