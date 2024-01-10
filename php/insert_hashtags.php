<?php
 require("Conexion.php");
 /* We save the hashtags in a new table called HASHTAGS, it has a foreign key that relates with TASKS table 
 --Guardamos los hashtagas en una nueva tabla denominada HASHTAGS, contiene una clave foránea que se relaciona con la table TASKS*/
try{
    $task_id = $_POST['task_id'];
    $hashtag = $_POST['hashtag'];
    $user_id = $_POST['user_id'];
        $insert_subtasks = "INSERT INTO hashtags (task_id,hashtag_name,user) 
        VALUES (:t_i,:s_n,:u_id)";
            $stmt= $con->prepare($insert_subtasks);
            $stmt->execute(array(
                ":t_i"=>$task_id,
                ":s_n"=>$hashtag,
                ":u_id"=>$user_id
            ));
                if($stmt->rowCount()!==0){
                    echo json_encode([
                        "success"=>true,
                        "message"=>"Hashtag inserted into database"
                    ]);
                }else{
                    echo json_encode([
                        "success"=>false,
                        "message"=>"Hashtag NOT inserted into database"
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