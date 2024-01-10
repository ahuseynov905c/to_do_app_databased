<?php
 require("Conexion.php");

  /* We save the subtasks in a new table called SUBTASKS, it has a foreign key that relates with TASKS table 
  --Guardamos una subtarea en una nueva table llamada SUBTAREAS, contiene una clave foránea que se relaciona con la tabla TASKS*/

try{

    $task_id = $_POST['task_id'];
    $subtask = $_POST['subtask'];
    $user_id = $_POST['id'];

    $insert_subtasks = "INSERT INTO subtasks (task_id,subtask_name,user) 
        VALUES (:t_i,:s_n,:u_id)";

        $stmt= $con->prepare($insert_subtasks);

        $stmt->execute(array(
            
            ":t_i"=>$task_id,
            ":s_n"=>$subtask,
            ":u_id"=>$user_id
        ));

            if($stmt->rowCount()!==0){

                echo json_encode([
                    "success"=>true,
                    "message"=>"Subtask inserted into database"
                ]);
            }else{
                echo json_encode([
                    "success"=>false,
                    "message"=>"Task NOT inserted into database"
                ]);
            }
            
            $stmt->closeCursor();


}catch(PDOException $e){
    echo json_encode([
        "success"=>false,
        "message"=>"An error ocurred ".$e->getMessage()
    ]);
}finally{
    $con=null;
}
?>