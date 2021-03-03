<?php
    $path = $_SERVER['DOCUMENT_ROOT'];
    include($path . "/model/connect.php");

    class DAOShop{
        function read_all_videogames(){
            $minrange=$_POST['minrange'];
            $maxrange=$_POST['maxrange'];
            $plataform=$_POST['plataform'];
            $age=$_POST['age'];
            $genero=$_POST['genero'];
            $sql2 = "SELECT COUNT(*) count FROM videogames WHERE precio BETWEEN $minrange AND $maxrange AND plataforma LIKE '%$plataform%' AND clasificacion LIKE '%$age%' AND generos LIKE '%$genero%'";
            $sql = "SELECT * FROM videogames WHERE precio BETWEEN $minrange AND $maxrange AND plataforma LIKE '%$plataform%' AND clasificacion LIKE '%$age%' AND generos LIKE '%$genero%'";
            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            $res2 =mysqli_query($conexion, $sql2);
            connect::close($conexion);
            while($row = $res->fetch_array(MYSQLI_ASSOC)) {
                $resArray[] = $row;
            }
            while($row2 = $res2->fetch_array(MYSQLI_ASSOC)) {
                $resArray2[] = $row2;
            }
            if ($resArray) {
                return $resArray;
            }else {
                return $resArray2;
            }
        }

        function read_details($videogame){
            $sql = "SELECT * FROM videogames WHERE id='$videogame'";
            $sql2 ="UPDATE videogames SET views=views+1 WHERE id='$videogame'";
            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            mysqli_query($conexion, $sql2);
            connect::close($conexion);
            while($row = $res->fetch_array(MYSQLI_ASSOC)) {
                $resArray[] = $row;
            }
            return $resArray;
        }

        function rangeslider(){
            $sql = "SELECT MAX(precio) maxim, MIN(precio) minim FROM videogames;";
            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);
            while($row = $res->fetch_array(MYSQLI_ASSOC)) {
                $resArray[] = $row;
            }
            return $resArray;
        }

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
        // function viewup($videogame) {
            
        //     $conexion = connect::con();
        //     $res = mysqli_query($conexion, $sql);
        //     connect::close($conexion);
        // }
    }