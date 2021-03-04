<?php

$path = $_SERVER['DOCUMENT_ROOT'];
include ($path . "/module/menu/model/DAOMenu.php");

switch($_GET['op']){
    case 'autoComplete';
        try{
            $daomenu = new DAOMenu();
            $rdo = $daomenu->search();
        }catch (Exception $e){
            $callback = 'index.php?page=503';
            die('<script>window.location.href="'.$callback .'";</script>');
        }
        
        if(!$rdo){
            echo json_encode("error");
            exit;
        }else{
            echo json_encode($rdo);
            exit;
        }
        break;    
    default;
        include("view/inc/error404.php");
        break;
}