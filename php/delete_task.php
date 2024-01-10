<?php

require("Conexion.php");

/*DELETE A SPECIFIC TASK  --Eliminar una tarea específica*/


    if(isset($_POST['task_to_delete'])){
        
    
        try{

            $id = $_POST['task_to_delete'];
            
                $query_remove_task = "DELETE FROM tasks where task_id=:id";

                $stmt= $con->prepare($query_remove_task);

                $stmt->bindValue(":id",$id);
                $stmt->execute();

                    if($stmt->rowCount()!==0){
                        echo json_encode([
                            "success"=>true,
                            "message"=>"TASK DELETED FROM DATABASE"
                        ]);

                        }
                    
                        $stmt->closeCursor();

        }catch(PDOException $e){
            echo "Error, please refresh the page";
        }
        finally{
            $con=null;
        }

}

?>