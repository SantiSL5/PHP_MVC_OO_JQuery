<?php

$path = $_SERVER['DOCUMENT_ROOT'];
include ($path . "/module/cart/model/DAOCart.php");

switch($_GET['op']){
    case 'listCart';
        try{
            $daocart = new DAOCart();
            $rdo = $daocart->listCart();
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
    case 'menuCart';
        try{
            $daocart = new DAOCart();
            $rdo = $daocart->menuCart();
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
    case 'addCart';
        try{
            $daocart = new DAOCart();
            $rdo = $daocart->addCart();
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
    case 'totalCart';
        try{
            $daocart = new DAOCart();
            $rdo = $daocart->totalCart();
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
    case 'addQuant';
        try{
            $daocart = new DAOCart();
            $rdo = $daocart->addQuant();
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
    case 'substQuant';
        try{
            $daocart = new DAOCart();
            $rdo = $daocart->substQuant();
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
    case 'checkout';
        try{
            $daocart = new DAOCart();
            $rdo = $daocart->checkout();
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