<?php
/* Handles the insertion of a task in the database 
--Gestiona la introducción de la tarea creada a la base de datos. */
include("conexion.php");

try{

    $user = $_POST['user'];
    $title = $_POST['title'];
    $description = $_POST['description'];
    $type = $_POST['task_type'];
    $flag = $_POST['flag'];
    $date_limit = $_POST['date'];
    $state = $_POST['state'];

        $query_insert_task = "INSERT INTO tasks (user,task_title,task_description,task_type,task_flag,task_creation_date,task_limit_date,task_state)
            values (:u,:t,:t_d,:t_t,:t_f,NOW(),:t_l_d,:s)";

                $stmt = $con->prepare($query_insert_task);
                
                $stmt->execute(array(
                    ":u"=>$user,
                    ":t"=>$title,
                    ":t_d"=>$description,
                    ":t_t"=>$type,
                    ":t_f"=>$flag,
                    ":t_l_d"=>$date_limit,
                    "s"=>$state
                ));

                $task_id = $con->lastInsertId();

                    if($stmt->rowCount()!=0){
                        echo json_encode([
                            "success"=>true,
                            "message"=>"Task added to database",
                            "task_id"=>$task_id
                        ]);
                    }else{
                        echo json_encode([
                            "success"=>false,
                            "message"=>"Task has not been added to database . ERROR",
                            
                            
                        ]);
                    }

                    $stmt->closeCursor();


}
catch(PDOException $e){
    echo $e->getLine();
}
finally{
    $con=null;
}

?>