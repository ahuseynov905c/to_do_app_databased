<?php

/* Conection to the database  --conexión a la base de datos*/
try{

    $con = new PDO("mysql:host=localhost;dbname=todo_app","root","");
    $con->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    $con->exec("SET CHARACTER SET utf8");
    
}
catch(PDOException $e){
    echo "error en conexion";
}

?>
