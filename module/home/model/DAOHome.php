<?php
    $path = $_SERVER['DOCUMENT_ROOT'];
    include($path . "/model/connect.php");

    class DAOHome{
        function select_all_categories(){
            $sql = "SELECT * FROM category";
            
            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);
            while($row = $res->fetch_array(MYSQLI_ASSOC)) {
                $resArray[] = $row;
            }
            return $resArray;
        }
        function select_all_plataforms(){
            $sql = "SELECT * FROM plataform";
            
            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);
            while($row = $res->fetch_array(MYSQLI_ASSOC)) {
                $resArray[] = $row;
            }
            return $resArray;
        }
    }