<?php

require("Conexion.php");

/* This file allows users to update the state of each task they have
-- Este archivo permite a los usuarios actualizar el estado de cada tarea que tienen*/

       
     try{

        if(isset($_POST['update_state'])){
                
            $id = $_POST['update_state'];
            $pending = $_POST['newstate'];

                
                $query_update_state = "UPDATE tasks set task_state=:st WHERE task_id=:id";

                    $stmt= $con->prepare($query_update_state);

                    $stmt->bindValue(":st",$pending);
                    $stmt->bindValue(":id",$id);
                    

                    $stmt->execute();

                        if($stmt->rowCount()!==0){

                            echo json_encode([
                                "success"=>true,
                                "message"=>"Task state has been updated",
                                "id"=>$id
                            ]);
                        }

                        $stmt->closeCursor();

        }

        }catch(PDOException $e){
            echo $e->getLine();
        }
        finally{
            $con=null;
        }


?>