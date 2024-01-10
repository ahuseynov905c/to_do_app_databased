<?php


require("Conexion.php");

/* This file generate tasks . It will be the most used file, because is the one that allow users to view their tasks
-- Este archivo genera tareas. Es el archivo más utilizado, porque es el que permite a los usuarios ver sus tareas.  */
 try{

if(isset($_POST['type']) && $_POST['type']=="all_tasks"){

    $user_id = $_POST['id'];
   

        $get_all_query = "SELECT * FROM tasks where user=:id ORDER BY task_limit_date ASC";

            $stmt = $con->prepare($get_all_query);

            $stmt->execute(array(
                ":id"=>$user_id
            ));
            $data = [];

                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){

                    $data[]=$row;

                }
                header('Content-Type: application/json');
                echo json_encode($data);

                $stmt->closeCursor();


    
}

if(isset($_POST['task_id'])){
   
    $task_id=$_POST['task_id'];

  
        $get_subtasks_query = "SELECT * FROM subtasks where task_id=:t_i ";


        $stmt = $con->prepare($get_subtasks_query);

        $stmt->bindValue(":t_i",$task_id);

        $stmt->execute();
        
        $all_subtasks=[];
        while($row= $stmt->fetch(PDO::FETCH_ASSOC)){
           
            $all_subtasks[]=$row;

            

        }
       

            echo json_encode($all_subtasks);

            $stmt->closeCursor();
       
    
}


 }catch(PDOException $e){
    echo "Error, please refresh the page";
}
finally{
    $con = null;
}
?>