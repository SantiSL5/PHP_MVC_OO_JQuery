<?php
    $path = $_SERVER['DOCUMENT_ROOT'];
    include ($path . "/module/shop/model/DAOShop.php");

    switch($_GET['op']){
        case 'listall';
            try{
                $daoshop = new DAOShop();
            	$rdo = $daoshop->read_all_videogames();
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
        case 'details';
            try{
                $daoshop = new DAOShop();
            	$rdo = $daoshop->read_details($_GET['id']);
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
                $daoshop = new DAOShop();
            	$rdo = $daoshop->select_all_plataforms();
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
        case 'categories';
            try{
                $daoshop = new DAOShop();
            	$rdo = $daoshop->select_all_categories();
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
        case 'rangeslider';
            try{
                $daoshop = new DAOShop();
            	$rdo = $daoshop->rangeslider();
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
        // case 'viewup';
        //     try{
        //         $daoshop = new DAOShop();
        //     	$rdo = $daoshop->viewup($_GET['id']);
        //     }catch (Exception $e){
        //         $callback = 'index.php?page=503';
		// 	    die('<script>window.location.href="'.$callback .'";</script>');
        //     }
            
        //     if(!$rdo){
        //         echo json_encode("error");
        //         exit;
        //     }
        //     break;
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