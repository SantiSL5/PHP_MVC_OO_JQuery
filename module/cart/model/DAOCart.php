<?php
    $path = $_SERVER['DOCUMENT_ROOT'];
    include($path . "/model/connect.php");
    include($path . "/general/middleware/middleware.auth.php");
    require_once $path."/general/classes/JWT.php";
    $databaseConfig = include ($path . "/credentials/credentials.php");

    class DAOCart{

        function listCart(){
            $token=$_POST['token'];
            $token=decode($token);
            if ($token['invalid_token'] == true) {
                $result['invalid_token']=true;
            }else{
                $userid=$token['userid'];
                $sql = "SELECT c.idvideogame,c.cant,v.nombre,v.precio,v.img
                FROM cart c
                INNER JOIN videogames v
                ON v.id=c.idvideogame
                WHERE c.iduser=$userid";
                $conexion = connect::con();
                $res = mysqli_query($conexion, $sql);
                while($row = $res->fetch_array(MYSQLI_ASSOC)) {
                    $resArray[] = $row;
                }
                $result['cart_products']=$resArray;
                $result['invalid_token']=false;
                $result['token']=encode($userid);
                connect::close($conexion);
            }
            return $result;
        }

        function menuCart(){
            $token=$_POST['token'];
            $token=decode($token);
            if ($token['invalid_token'] == true) {
                $result['invalid_token']=true;
            }else{
                $userid=$token['userid'];
                $sql = "SELECT COUNT(*) numproducts
                FROM cart c
                INNER JOIN videogames v
                ON v.id=c.idvideogame
                WHERE c.iduser=$userid";
                $conexion = connect::con();
                $res = mysqli_query($conexion, $sql);
                $row = $res->fetch_assoc();
                $result['num_products']=$row['numproducts'];
                $result['invalid_token']=false;
                $result['token']=encode($userid);
                connect::close($conexion);
            }
            return $result;
        }


        function addQuant(){
            $token=$_POST['token'];
            $videogameid=$_POST['idproduct'];
            $token=decode($token);
            if ($token['invalid_token'] == true) {
                $result['invalid_token']=true;
            }else{
                $userid=$token['userid'];
                $sql = "CALL add_Quant($videogameid,$userid);";
                $conexion = connect::con();
                $res = mysqli_query($conexion, $sql);
                $row = $res->fetch_assoc();
                $result['result']=$row['result'];
                $result['quant']=$row['quant'];
                $result['invalid_token']=false;
                $result['token']=encode($userid);
                connect::close($conexion);
            }
            return $result;
        }

        function substQuant(){
            $token=$_POST['token'];
            $videogameid=$_POST['idproduct'];
            $token=decode($token);
            if ($token['invalid_token'] == true) {
                $result['invalid_token']=true;
            }else{
                $userid=$token['userid'];
                $sql = "CALL subst_Quant($videogameid,$userid);";
                $conexion = connect::con();
                $res = mysqli_query($conexion, $sql);
                $row = $res->fetch_assoc();
                $result['result']=$row['result'];
                $result['quant']=$row['quant'];
                $result['invalid_token']=false;
                $result['token']=encode($userid);
                connect::close($conexion);
            }
            return $result;
        }

        function totalCart(){
            $token=$_POST['token'];
            $token=decode($token);
            if ($token['invalid_token'] == true) {
                $result['invalid_token']=true;
            }else{
                $totalCart=0;
                $userid=$token['userid'];
                $sql = "CALL totalCart($userid)";
                $conexion = connect::con();
                $res = mysqli_query($conexion, $sql);
                $row = $res->fetch_assoc();
                $result['total_cart']=$row['totalCart'];
                $result['invalid_token']=false;
                $result['token']=encode($userid);
                connect::close($conexion);
            }
            return $result;
        }

        function checkout(){
            $token=$_POST['token'];
            $token=decode($token);
            if ($token['invalid_token'] == true) {
                $result['invalid_token']=true;
            }else{
                $totalCart=0;
                $userid=$token['userid'];
                $sql = "CALL order_complete($userid)";
                $conexion = connect::con();
                $res = mysqli_query($conexion, $sql);
                $result['invalid_token']=false;
                $result['token']=encode($userid);
                connect::close($conexion);
            }
            return $result;
        }
    }