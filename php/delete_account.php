<?php
require("Conexion.php");


/* Delete the user account from database  --borrar la cuenta de usuario de la BD */
session_start();

try{

if(isset($_POST['id_to_delete'])){

    $id =$_POST['id_to_delete'];

        /* Due to the dependence of tasks table with the users , first we have to delete all the tasks 
        related with the specific user we want to delete */

        $query_delete_related_tasks = "DELETE FROM tasks where user=:idx";

        $stmt_t = $con->prepare($query_delete_related_tasks);

        $stmt_t->bindValue(":idx",$id);

        $stmt_t->execute();

        $stmt_t->closeCursor();


            /* After we have all tasks deleted, now we can proceed and delete the actual USER */
                $query_delete = "DELETE FROM users where id=:idx";

                $stmt = $con->prepare($query_delete);

                $stmt->bindValue(":idx",$id);

                $stmt->execute();


                    if($stmt->rowCount()!==0){
                        
                            session_destroy();
                                echo json_encode([
                                    "success"=>true,
                                    "message"=>"Your account has been deleted"
                                ]);
                        
                    }

                    $stmt->closeCursor();
    }

}catch(PDOException $e){
    echo "Error, please refresh the page";
}finally{
    $con=null;
    
}
    


?>