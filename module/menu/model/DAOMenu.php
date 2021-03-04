<?php
    $path = $_SERVER['DOCUMENT_ROOT'];
    include($path . "/model/connect.php");

    class DAOMenu{
        function search(){
            $nombre=$_POST['nombre'];
            $sql = "SELECT DISTINCT nombre FROM videogames WHERE nombre LIKE '%$nombre%'";
            
            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);
            while($row = $res->fetch_array(MYSQLI_ASSOC)) {
                $resArray[] = $row;
            }
            return $resArray;
        }
    }