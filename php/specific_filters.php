<?php
require("Conexion.php");

/* This file allows us to filter by IMPORTANCE, TASK FAMILY, TITLE, DESCRIPTION 
--Este archivo nos permite filtrar por importancia, tipo de tarea, título y descripción*/

try{

if(isset($_POST['query'])){

        
        $query = $_POST['query'];
        $filter = $_POST['filter'];
        $user_id = $_POST['user_id'];


            $query_search = "SELECT * FROM TASKS WHERE user=:usr_id AND $filter LIKE '%$query%'";

                $stmt=$con->prepare($query_search);

                $stmt->bindValue(":usr_id",$user_id);

            

                $stmt->execute();

                $result_array = [];
                
                    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){

                        $result_array[]=$row;


                    }

                        echo json_encode($result_array);
                    }

                    $stmt->closeCursor();
    


}
catch(PDOException $e){
    echo "Error, please refresh the page";
}
finally{
    $con=null;
}




?>