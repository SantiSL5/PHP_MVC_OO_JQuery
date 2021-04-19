<?php
    $path = $_SERVER['DOCUMENT_ROOT'];
    include($path . "/model/connect.php");
    include($path . "/general/middleware/middleware.php");
    require_once $path."/general/classes/JWT.php";
    $databaseConfig = include ($path . "/credentials/credentials.php");

    class DAOShop{
        function read_all_videogames(){
            $minrange=$_POST['minrange'];
            $maxrange=$_POST['maxrange'];
            $plataform=$_POST['plataform'];
            $age=$_POST['age'];
            $genero=$_POST['genero'];
            $nombre=$_POST['search'];
            $sql2 = "SELECT COUNT(id) count FROM videogames WHERE plataforma LIKE '%$plataform%' AND clasificacion LIKE '%$age%' AND generos LIKE '%$genero%' AND nombre LIKE '$nombre' ORDER BY views";
            $sql = "SELECT * FROM videogames WHERE precio BETWEEN $minrange AND $maxrange AND plataforma LIKE '%$plataform%' AND clasificacion LIKE '%$age%' AND generos LIKE '%$genero%' AND nombre LIKE '%$nombre%' ORDER BY views DESC";
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

            if (!$resArray) {
                return $resArray2;
            }else{

                $resArraytotal[] = array_merge($resArray2,$resArray);  
                return $resArraytotal[0];
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

        function showlike(){
            $token=$_POST['token'];
            $idproduct=$_POST['idproduct'];
            $token=decode($token);
            if ($token['invalid_token'] == true) {
                $result['invalid_token']=true;
            }else{
                $username=$token['username'];
                $sql = "SELECT u.username,f.idvideogame
                FROM users u 
                INNER JOIN favorites f 
                ON u.id=f.iduser
                WHERE u.username='$username' && f.idvideogame=$idproduct";
                $conexion = connect::con();
                $res = mysqli_query($conexion, $sql);
                $row = $res->fetch_assoc();
                if ($row['username']==$username && $row['idvideogame']==$idproduct) {
                    $result['like']=true;
                }else {
                    $result['like']=false;
                }
                $result['invalid_token']=false;
                $result['token']=encode($username);
                connect::close($conexion);
            }
            return $result;
        }

        function like(){
            $token=$_POST['token'];
            $idproduct=$_POST['idproduct'];
            $token=decode($token);
            if ($token['invalid_token'] == true) {
                $result['invalid_token']=true;
            }else{
                $username=$token['username'];
                $sql = "SELECT COUNT(*) AS 'check'
                FROM users u 
                INNER JOIN favorites f 
                ON u.id=f.iduser
                WHERE u.username='$username' && f.idvideogame=$idproduct";
                $sql2 = "SELECT id
                FROM users
                WHERE username='$username'";
                $conexion = connect::con();
                $res = mysqli_query($conexion, $sql);
                $row = $res->fetch_assoc();
                $res2 = mysqli_query($conexion, $sql2);
                $row2 = $res2->fetch_assoc();
                $iduser=$row2['id'];
                if ($row['check']==0) {
                    // echo("user:".$iduser."pro: ".$idproduct);
                    $sql3="INSERT INTO favorites (iduser, idvideogame) VALUES ($iduser,$idproduct)";
                    $result['like']=true;
                }else {
                    $sql3="DELETE FROM favorites WHERE iduser=$iduser && idvideogame=$idproduct";
                    $result['like']=false;
                }
                $res3 = mysqli_query($conexion, $sql3);
                $result['invalid_token']=false;
                $result['token']=encode($username);
                connect::close($conexion);
            }
            return $result;
        }
        // function viewup($videogame) {
            
        //     $conexion = connect::con();
        //     $res = mysqli_query($conexion, $sql);
        //     connect::close($conexion);
        // }
    }