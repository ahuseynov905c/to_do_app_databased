<?php

require("conexion.php");

/* Handle login logic  --Gestiona la lógica de inicio de sesión*/
session_start();
try{
    
    if(isset($_REQUEST['email_login'])){

        $email = $_REQUEST['email_login'];
        $password = $_REQUEST['password_login'];

    }

    $query_checkPasword = "SELECT id, password,name,last_name FROM users where email=:em";

        $stmt= $con->prepare($query_checkPasword);

        $stmt->bindValue(":em",$email);

        $stmt->execute();

        $send_id="";
        $send_name="";
        $send_last_name="";
        $pass_crypted="";

        while($row= $stmt->fetch()){
            $send_id=$row[0];
            $pass_crypted=$row[1];
            $send_name=$row[2];
            $send_last_name=$row[3];
        }


            /* Verify crypted and uncrypted */

            if(password_verify($password,$pass_crypted)){
                
                $_SESSION['id']=$send_id;
                echo json_encode([
                    "success"=>true,
                    "message"=>"User registered in database",
                    "id"=>$send_id,
                    "name"=>$send_name,
                    "last_name"=>$send_last_name,
                    "sess"=>$_SESSION['id']
                ]);
            }else{
                echo json_encode([
                    "success"=>false,
                    "message"=>"User not registered in database",

                ]);
            }
            
            $stmt->closeCursor();
}
catch(PDOException $e){
    echo $e;
}
finally{
    $con=null;
}
?>