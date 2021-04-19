<?php
    $path = $_SERVER['DOCUMENT_ROOT'];
    include($path . "/model/connect.php");
    include($path . "/general/middleware/middleware.php");
    require_once $path."/general/classes/JWT.php";
    $databaseConfig = include ($path . "/credentials/credentials.php");

    class DAOLogin{
        function register(){
            $username=$_POST['username'];
            $email=$_POST['email'];
            $pass=$_POST['password'];
            $type="client";
            $hashed_pass = password_hash($pass, PASSWORD_DEFAULT);
            $hashavatar= md5( strtolower( trim( $email ) ) );
            $avatar="https://www.gravatar.com/avatar/$hashavatar?s=40&d=identicon";
            $sql ="INSERT INTO users (username, email,password,type,avatar) VALUES ('$username','$email','$hashed_pass','$type', '$avatar')";
            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            connect::close($conexion);
            return $res;
        }

        function login(){
            $username_check=$_POST['username_login'];
            $pass_check=$_POST['password_login'];

            $sql = "SELECT * FROM users WHERE username='$username_check'";
            $conexion = connect::con();
            $res = mysqli_query($conexion, $sql);
            $row = $res->fetch_assoc();
            $username=$row['username'];
            $password=$row['password'];
            if ($username==$username_check) {
                if (password_verify($pass_check, $password)) {
                    $result['token'] = encode($username);
                    $result['correct_password']=true;
                    $result['username_created']=true;
                }else{
                    $result['correct_password']=false;
                    $result['username_created']=true;
                }
            } else {
                $result['username_created']=false;
                $result['correct_password']=false;
            }
            connect::close($conexion);
            return $result;
        }

        function menuinfo($token){
            $token=decode($token);
            if ($token['invalid_token'] == true) {
                $result['invalid_token']=true;
            }else{
                $username=$token['username'];
                $sql = "SELECT * FROM users WHERE username='$username'";
                $conexion = connect::con();
                $res = mysqli_query($conexion, $sql);
                $row = $res->fetch_assoc();
                $result['invalid_token']=false;
                $result['username']=$row['username'];
                $result['avatar']=$row['avatar'];
                $result['token']=encode($username);
                connect::close($conexion);
            }
            return $result;
        }
    }