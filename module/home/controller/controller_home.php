<?php
    $path = $_SERVER['DOCUMENT_ROOT'];
    include ($path . "/module/home/model/DAOHome.php");

    switch($_GET['op']){
        case 'carousel';
            try{
                $daohome = new DAOHome();
            	$rdo = $daohome->select_all_categories();
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
        case 'plataforms';
            try{
                $daohome = new DAOHome();
            	$rdo = $daohome->select_all_plataforms();
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
               
        // case 'read_modal':
        //     //echo $_GET["modal"]; 
        //     //exit;
        //     try{
        //         $daovideogame = new DAOVideogame();
        //         $rdo = $daovideogame->select_videogame($_GET['id']);
        //     }catch (Exception $e){
        //         echo json_encode("error");
        //         exit;
        //     }
            
        //     if(!$rdo){
        //         echo json_encode("error");
        //         exit;
        //     }else{
        //         $videogame=get_object_vars($rdo);
        //         echo json_encode($videogame);
        //         exit;
        //     }
        //     break;
        default;
            include("view/inc/error404.php");
            break;
    }