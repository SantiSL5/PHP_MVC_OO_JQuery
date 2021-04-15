<?php
    function valida_user($user) {
        $sql = "SELECT * FROM users WHERE username='$user'";

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);
        $row = $res->fetch_assoc();
        $result=$row['username'];
        
        if ($result==$user) {
            return false;
        } else {
            return true;
        }
    }

    function valida_email($email) {
        $sql = "SELECT * FROM users WHERE email='$email'";

        $conexion = connect::con();
        $res = mysqli_query($conexion, $sql);
        connect::close($conexion);
        $row = $res->fetch_assoc();
        $result=$row['email'];
        
        if ($result==$email) {
            return false;
        } else {
            return true;
        }
    }

    function validate($user,$email){
        $check['username'] = valida_user($user);
        $check['email'] = valida_email($email);

        return $check;
    }