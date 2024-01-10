<?php
Require("Conexion.php");

/* Handles the data required to generate the pdf
--Gestiona los datos requeridos para generar el pdf */
try{

    if(isset($_POST['id'])){

        $id = $_POST['id'];
    
        $query ="SELECT * FROM users where id=:id";
        
        $stmt=$con->prepare($query);
    
        $stmt->bindValue(":id",$id);
    
        $stmt->execute();
    
    
            /* ARRAY 1 */
            $user_data =[];
    
            while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                $user_data[]=$row;
            }
        
        $stmt->closeCursor();
    
    
        /* -------------------------------------------------------- */
        
        /* Now we get hashtags */
    
        $query2 = "SELECT * FROM hashtags where user=:id";
        $stmt=$con->prepare($query2);
    
        $stmt->bindValue(":id",$id);
    
        $stmt->execute();
    
    
            /* ARRAY 2 */
            $hashtags =[];
    
            while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                $hashtags[]=$row;
            }
        
        $stmt->closeCursor();
    
        /* -------------------------------------------------------- */
        
        /* Now we get subtasks */
    
        $query3 = "SELECT * FROM subtasks where user=:id";
        $stmt=$con->prepare($query3);
    
        $stmt->bindValue(":id",$id);
    
        $stmt->execute();
    
    
            /* ARRAY 3 */
            $subtasks =[];
    
            while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                $subtasks[]=$row;
            }
        
        $stmt->closeCursor();
    
        /* -------------------------------------------------------- */
        
        /* Now we get tasks */
        
        $query4 = "SELECT * FROM tasks where user=:id";
    
        $stmt=$con->prepare($query4);
    
        
        $stmt->bindValue(":id",$id);
    
        $stmt->execute();
    
    
            /* ARRAY 4 */
            $tasks =[];
            $count_total=0;
    
            while($row=$stmt->fetch(PDO::FETCH_ASSOC)){
                $tasks[]=$row;
                $count_total++;
            }
        
        $stmt->closeCursor();
    
    /* -------------------------------------------------------- */
        
       

        /* WE RETURN DATA */
        
        echo json_encode([$user_data,$hashtags,$subtasks,$tasks,$count_total]);
    
    }



}catch(PDOException $e){
    echo $e->getLine();
}finally{
    $con=null;
}

?>