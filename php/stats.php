<?php

require("Conexion.php");


/* This file allows us to get the STATS of the current user 
    -- Este archivo nos permite obtener las estadísticas del usuario*/

try {
    $id = $_POST['id'];

        $query = "SELECT * FROM tasks where user=:id";

            $stmt = $con->prepare($query);

            $stmt->bindValue(":id", $id);
            $stmt->execute();

            $count_total = 0;

                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

                    $count_total++;
                }
                    $stmt->closeCursor();



    /* Not started tasks */
    $query = "SELECT * FROM tasks where task_state=:not_started AND user=:id";

        $stmt = $con->prepare($query);

        $stmt->bindValue(":not_started", "not_started");

        $stmt->bindValue(":id", $id);
        $stmt->execute();

        $count_not_started = 0;

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

                $count_not_started++;
            }
                $stmt->closeCursor();





    /* Pending tasks */
    $query = "SELECT * FROM tasks where task_state=:pending AND user=:id";

        $stmt = $con->prepare($query);


        $stmt->bindValue(":id", $id);
        $stmt->bindValue(":pending", "pending");

        $stmt->execute();

        $count_pending = 0;

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

                $count_pending++;
            }
                $stmt->closeCursor();




    /* Completed tasks */
    $query = "SELECT * FROM tasks where task_state=:completed AND user=:id";

        $stmt = $con->prepare($query);

        $stmt->bindValue(":id", $id);
        $stmt->bindValue(":completed", "completed");

        $stmt->execute();

        $count_completed = 0;

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

                $count_completed++;
            }
                $stmt->closeCursor();


    /* Completed tasks */
    $query = "SELECT * FROM tasks where task_state=:expired AND user=:id";

        $stmt = $con->prepare($query);

        $stmt->bindValue(":id", $id);
        $stmt->bindValue(":expired", "expired");

        $stmt->execute();

        $count_expired = 0;

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

                $count_expired++;
            }
                $stmt->closeCursor();



    /* today tasks */

    $query = "SELECT * FROM tasks where DATE(task_limit_date) = CURDATE() AND user=:id";

        $stmt = $con->prepare($query);

        $stmt->bindValue(":id", $id);


        $stmt->execute();

        $count_today = 0;

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

                $count_today++;
            }
                $stmt->closeCursor();


    /* ALL SUBTASKS CREATED BY EACH USER */

    $query = "SELECT * FROM subtasks where user=:id";

        $stmt = $con->prepare($query);

        $stmt->bindValue(":id", $id);

        $stmt->execute();

        $count_subtasks = 0;

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

                $count_subtasks++;
            }
                $stmt->closeCursor();

    /* ALL HASHTAGS CREATED BY EACH USER */

    $query = "SELECT * FROM hashtags where user=:id";

        $stmt = $con->prepare($query);

        $stmt->bindValue(":id", $id);

        $stmt->execute();

        $count_hashtags = 0;

            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {

                $count_hashtags++;
            }
                $stmt->closeCursor();


    

            /* Retrieval of an array with all the data */
            
    echo json_encode([
        "all" => $count_total,
        "not_started" => $count_not_started,
        "pending" => $count_pending,
        "completed" => $count_completed,
        "expired" => $count_expired,
        "today" => $count_today,
        "subtasks" => $count_subtasks,
        "hashtags" => $count_hashtags
    ]);


} catch (PDOException $e) {
    echo "Error, please refresh the page";
} finally {
    $stmt->closeCursor();
    $con = null;
    
}
