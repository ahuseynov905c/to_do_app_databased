<?php
require("Conexion.php");

/* This PHP script allows us to retrieve tasks based on the STATE / DATE / or simply by the user ID  
--Permite devolver tareas basándonos en su estado, fecha o por el ID del usuario*/
try{

    /* Get tasks based on STATE */
    if(isset($_POST['type']) ){ 

        $id = $_POST['id'];
        $filter = $_POST['type'];

            $query_not_started = "SELECT * FROM tasks where task_state=:stat and user=:id ORDER BY task_limit_date ASC";

                $stmt = $con->prepare($query_not_started);

                $stmt->bindValue(":stat",$filter);
                $stmt->bindValue(":id",$id);
                $stmt->execute();

                $tasks_array = [];

                    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){

                        $tasks_array[]=$row;
                    }

                        echo json_encode($tasks_array);
                        $stmt->closeCursor();
    
}

/* Get tasks based on ID (all tasks) */
if(isset($_POST['get_all_tasks'])){

    $id_of_user_2 = $_POST['id'];

    $query_not_started = "SELECT * FROM tasks where user=:id ORDER BY task_limit_date ASC";

        $stmt = $con->prepare($query_not_started);

        $stmt->bindValue(":id",$id_of_user_2);

        $stmt->execute();

        $tasks_array = [];

            while($row = $stmt->fetch(PDO::FETCH_ASSOC)){

                $tasks_array[]=$row;
            }


            echo json_encode($tasks_array);
            $stmt->closeCursor();
}


/* Get tasks based on DATE */
if(isset($_POST['months'])){

    $id_of_user=$_POST['id_of_the_user'];

        $query_all= "SELECT * FROM tasks where user=:id";

            $stmt = $con->prepare($query_all);
            $stmt->bindValue(":id",$id_of_user);

            
            
            $stmt->execute();

            $tasks_array = [];

                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){

                    $tasks_array[]=$row;
                }


                    echo json_encode($tasks_array);
                    $stmt->closeCursor();

    


}

}
catch(PDOException $e){
    echo "Error, please refresh the page";
}finally{
    $con=null;
}


/* SPECIFIC FILTERS */



?>