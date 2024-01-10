<?php

/* Handle logout logic --Gestiona la lógica de cierre de sesión */
session_start();

try{
    if(isset($_POST['action'])){
        if($_POST['action']=="logout"){
    
            session_unset();
            session_destroy();
            echo json_encode([
                "id_deleted"=>true
            ]);
            
        }
    }


}catch(PDOException $e){
    echo "Error, please refresh the page";
}finally{
    $con=null;
}

?>