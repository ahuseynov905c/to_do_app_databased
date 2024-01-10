<?php

/* This file allows to filter (SPECIFIC TASKS) by hashtags and subtasks 
--Este archivo nos permite filtrar por tareas específicas (hashtags y subtareas)*/
require("Conexion.php");

try{

    /* FILTER BY HASHTAGS */
if(isset($_POST['filter']) && $_POST['filter']==="hashtags"){
        
    
    $query = $_POST['query'];
    $filter = $_POST['filter'];
    $user_id = $_POST['user_id'];

        $query_search_hashtags=  "SELECT * FROM hashtags JOIN tasks ON tasks.task_id = hashtags.task_id WHERE hashtags.user=:usr_id AND hashtag_name LIKE '$query'";

   
        $stmt= $con->prepare($query_search_hashtags);
        
        $stmt->bindValue(":usr_id",$user_id);


        $stmt->execute();

        $result_array = [];

            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){

                $result_array[]=$row;


            }

                echo json_encode($result_array);

                $stmt->closeCursor();
    
}

/* FILTER BY SUBTASKS */
else if(isset($_POST['filter']) && $_POST['filter']==="subtasks"){
    
    $query = $_POST['query'];
    $filter = $_POST['filter'];
    $user_id = $_POST['user_id'];

        $query_search_hashtags="SELECT * FROM subtasks JOIN tasks ON tasks.task_id = subtasks.task_id WHERE subtasks.user=:usr_id AND subtask_name LIKE '$query'";

   
            $stmt= $con->prepare($query_search_hashtags);
            
            $stmt->bindValue(":usr_id",$user_id);


            $stmt->execute();
            $result_array = [];

                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){

                    $result_array[]=$row;


                }

                echo json_encode($result_array);
                
                $stmt->closeCursor();
    
}

}catch(PDOException $e){
    echo "Error, please refresh the page";
}finally{
    $con=null;
}
?>