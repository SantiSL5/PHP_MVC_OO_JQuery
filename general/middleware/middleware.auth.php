<?php
    $path = $_SERVER['DOCUMENT_ROOT'];
    require_once $path."/general/classes/JWT.php";

    function decode($token){
        $path = $_SERVER['DOCUMENT_ROOT'];
        $databaseConfig = include ($path . "/credentials/credentials.php");
        $secret = $databaseConfig['secret'];
        $JWT = new JWT;
        $tokenjson=$JWT->decode($token,$secret);
        $tokendecoded=json_decode($tokenjson,true);
        $iat=$tokendecoded['iat'];
        $exp=$tokendecoded['exp'];
        $userid=$tokendecoded['userid'];
        if ($exp>=time()) {
            // echo ("true");
            $result['invalid_token']=false;
            $result['token']=encode($userid);
            $result['userid']=$userid;
        }else {
            $result['invalid_token']=true;
        }
        return $result;
    }

    function encode($userid){
        $path = $_SERVER['DOCUMENT_ROOT'];
        $databaseConfig = include ($path . "/credentials/credentials.php");
        $secret = $databaseConfig['secret'];
        ////////////////////////////////////////////////
        //https://github.com/miguelangel-nubla/JWT-PHP//
        ////////////////////////////////////////////////
        $header = '{"typ":"JWT", "alg":"HS256"}';
        $iat=time();
        $exp=time()+(60 * 60);

        $payload = '{
            "iat":'.$iat.', 
            "exp":'.$exp.',
            "userid":'.$userid.'
        }';
        $JWT = new JWT;
        $result = $JWT->encode($header, $payload, $secret);
        return $result;
    }
    
    // $hola=decode('eyJ0eXAiOiJKV1QiLCAiYWxnIjoiSFMyNTYifQ.ewogICAgICAgICAgICAiaWF0IjoxNjE4NDQzODQ2LCAKICAgICAgICAgICAgImV4cCI6MTYxODQ0NzQ0NiwKICAgICAgICAgICAgIm5hbWUiOiJTYW50aVNMNSIKICAgICAgICB9.9Xu15Ajx0PdJlw_vYugFgBVLi5bf5iVbwiXT4vLoAo8');
    // $data=decode($result,$secret);
    // var_dump($data);
    // echo $data['name'];
    // echo json_last_error();
?>