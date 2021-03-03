<?php
	switch($_GET['page']){
		case "homepage";
			include("module/home/view/home.html");
			break;
		case "controller_videogame";
			include("module/videogames/controller/".$_GET['page'].".php");
			break;
		case "services";
			include("module/services/".$_GET['page'].".html");
			break;
		case "aboutus";
			include("module/aboutus/".$_GET['page'].".html");
			break;
		case "contact";
			include("module/contact/".$_GET['page'].".html");
			break;
		case "shop";
			include("module/shop/view/".$_GET['page'].".html");
			break;
		case "error404";
			include("view/inc/error404.php");
			break;
		case "error503";
			include("view/inc/error503.php");
			break;
		default;
			include("module/home/view/home.html");
			break;
	}
?>