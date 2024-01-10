
<?php

require("../Conexion.php");


if(isset($_POST['set_language'])){

    $lang = $_POST['set_language'];
    $id=$_POST['id'];

    try{

        
        
        
        $update_query = "UPDATE users SET lang=:lang WHERE id=:id";

        $stmt= $con->prepare($update_query);

        $stmt->bindValue(":lang",$lang);
        $stmt->bindValue(":id",$id);


        $stmt->execute();

        if($stmt->rowCount()!==0){

            echo json_encode([
                "success"=>true
            ]);
           
        }
    }catch(PDOException $e){

        echo json_encode([
            "success"=>false
        ]);
       
    }finally{
        $con=null;
    }
    
}
    
    


?>