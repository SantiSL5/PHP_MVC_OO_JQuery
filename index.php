<?php
    if ((isset($_GET['page'])) && ($_GET['page']==="controller_videogame") ){
		include("view/inc/top_page_videogame.php");
	}else if((isset($_GET['page'])) && ($_GET['page']==="homepage") ){
		include("view/inc/top_page_home.php");
	}else if((isset($_GET['page'])) && ($_GET['page']==="shop") ){
		include("view/inc/top_page_shop.php");
	}else if((isset($_GET['page'])) && ($_GET['page']==="login") ){
		include("view/inc/top_page_login.php");
	}else if((isset($_GET['page'])) && ($_GET['page']==="register") ){
		include("view/inc/top_page_register.php");
	}else if((isset($_GET['page'])) && ($_GET['page']==="cart") ){
		include("view/inc/top_page_cart.php");
	}else{
		include("view/inc/top_page_home.php");
	}
	// session_start();
?>
<div id="wrapper">		
    <div id="header">    	
    	<?php
    	    include("view/inc/header.php");
    	?>        
    </div>  
    <div id="menu">
		<?php
		    include("view/inc/menu.php");
		?>
    </div>	
    <?php 
	    include("view/inc/pages.php"); 
	?>        
    <br style="clear:both;" />
    <div id="footer">   	   
	    <?php
	        include("view/inc/footer.php");
	    ?>        
    </div>
</div>
<?php
    include("view/inc/bottom_page.php");
?>
    