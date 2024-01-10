<?php
/* Handles the registration of the user
--Gestiona el registro del usuario */
require("conexion.php");

try {
    if(isset($_POST['is_registered_email'])){

        
        $check_availability_of_this_address=$_POST['is_registered_email'];
        $query = "SELECT email from users";

        $stmt= $con->prepare($query);


        $stmt->execute();


        $is_available=true;

        while($row= $stmt->fetch(PDO::FETCH_ASSOC)){
            
            if($check_availability_of_this_address===$row["email"]){
                $is_available=false;
            }
        }

        echo json_encode($is_available);
        



    }

    if (isset($_REQUEST['name']) && isset($_REQUEST['last_name']) && isset($_REQUEST['email']) && isset($_REQUEST['password'])) {

        $name =$_REQUEST['name'];
        $last_name =$_REQUEST['last_name'];
        $email =$_REQUEST['email'];
        $password =$_REQUEST['password'];

        $query_insert = "INSERT INTO users (name,last_name,email,password,creation_date,last_edit_date) 
                values (:fn,:sn,:em,:pass,NOW(),NOW())";

            $stmt = $con->prepare($query_insert);

            $stmt->bindValue(":fn", $name);
            $stmt->bindValue(":sn", $last_name);
            $stmt->bindValue(":em", $email);
            $stmt->bindValue(":pass", password_hash($password, PASSWORD_BCRYPT));

            $stmt->execute();

                if ($stmt->rowCount() != 0) {

                    $response = [
                        "success" => true,
                        "message" => "User inserted"
                    ];
                    echo json_encode($response);
                }
            
            }

            $stmt->closeCursor();
    
}catch (PDOException $e) {
    $response = [
        "success" => false,
        "message" => "User not inserted. Unexpected error"
    ];
    echo json_encode($response);
} finally {
    $con = null;
}
