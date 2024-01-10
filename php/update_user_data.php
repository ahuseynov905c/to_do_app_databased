<?php

/* This file allows users to update their data 
-- Este arachivo permite actualizar los datos del usuario*/
require("Conexion.php");


try{
    if(isset($_POST['id'])){
        $id = $_POST['id'];

        

            
            $query_get_data = "SELECT name, last_name, email FROM users where id=:id";

            $stmt = $con->prepare($query_get_data);

            $stmt->bindValue(":id",$id);

            $stmt->execute();

            $data = [];
            while($row=$stmt->fetch(PDO::FETCH_ASSOC)){

                $data[]=$row;
            }

            echo json_encode($data);

            $stmt->closeCursor();
        
    }


    else if(isset($_POST['query_type']) && $_POST['query_type']=="update_basic_data"){
        
        $name =$_POST['new_name'];
        $last_name = $_POST['new_last_name'];
        $email = $_POST['new_email'];
        $id = $_POST['id_to_update'];
        
       

            $update_query = "UPDATE users SET `name` = :name, `last_name` = :last_name, `email` = :email WHERE `id` = :id";
            
            $stmt = $con->prepare($update_query);

            $stmt->execute(array(
                ":name"=>$name,
                ":last_name"=>$last_name,
                ":email"=>$email,
                ":id"=>$id
            ));

            if($stmt->rowCount()!==0){

                echo json_encode([
                    "success"=>true,
                    "message"=>"Data has been updated succesfully"
                    
                ]);
            }
            $stmt->closeCursor();
    }

    else if(isset($_POST['id_to_check_password'])){
        

        
            $id=htmlentities(addslashes($_POST['id_to_check_password']));
        $password = htmlentities(addslashes($_POST['previous_password']));


        $get_password_query ="SELECT password from users where id=:id";

        
        $stmt = $con->prepare($get_password_query);

        $stmt->bindValue(":id",$id);
        
        $stmt->execute();
        $password_crypted="";
        
        while($row = $stmt->fetch(PDO::FETCH_ASSOC)){

            $password_crypted=$row['password'];
        }

        if(password_verify($password,$password_crypted)){

            echo json_encode([
                "password_correct"=>true,
                "message"=>"Correct password"
            ]);
        }else{
            echo json_encode([
                "password_correct"=>false,
                "message"=>"Incorrect password"
            ]);
        }

        $stmt->closeCursor();


    }

    else if(isset($_POST['query_type']) && $_POST['query_type']=="update_password"){

        
            $password = htmlentities(addslashes($_POST['new_password']));
            $id = htmlentities(addslashes($_POST['id_to_update_password']));
            $query_update_password = "UPDATE users set `password`=:npass where id=:id";
    
            $stmt = $con->prepare($query_update_password);
    
            $stmt->bindValue(":npass",password_hash($password,PASSWORD_BCRYPT));
    
            $stmt->bindValue(":id",$id);
            $stmt->execute();
    
            if($stmt->rowCount()!==0){
    
                echo json_encode([
                    "success"=>true,
                    "message"=>"Password has been succesfuly updated!"
                ]);
            }else{
                echo json_encode([
                    "success"=>false,
                    "message"=>"error changing the password"
                ]);
            }

            $stmt->closeCursor();
        
    }



    /* DELETE ACCOUNT */
}catch(PDOException $e){
    echo "Error, please refresh the page";
}
finally{
    $con=null;
}
    
?>