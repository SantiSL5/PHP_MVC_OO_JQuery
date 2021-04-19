-- MySQL dump 10.13  Distrib 8.0.23, for Linux (x86_64)
--
-- Host: 172.18.0.2    Database: videogames
-- ------------------------------------------------------
-- Server version	5.6.51

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_name` varchar(45) NOT NULL,
  `img` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`category_name`),
  UNIQUE KEY `category_UNIQUE` (`category_name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('Accion','/module/home/view/img/accion.jpeg'),('Aventura','/module/home/view/img/aventura.jpeg'),('Carreras','/module/home/view/img/carreras.jpeg'),('Deporte','/module/home/view/img/deporte.jpeg'),('Estrategia','/module/home/view/img/estrategia.jpeg'),('Musica','/module/home/view/img/musica.jpeg'),('Puzzle','/module/home/view/img/puzzle.jpeg'),('Sandbox','/module/home/view/img/sandbox.jpg'),('Shooter','/module/home/view/img/shooter.jpeg'),('Simulacion','/module/home/view/img/simulacion.jpg');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorites` (
  `iduser` int(11) NOT NULL,
  `idvideogame` int(11) NOT NULL,
  PRIMARY KEY (`iduser`,`idvideogame`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
INSERT INTO `favorites` VALUES (33,1),(33,2),(38,1),(38,2),(38,3),(38,11);
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER insert_like
AFTER INSERT ON favorites 
FOR EACH ROW
BEGIN
	UPDATE videogames SET likes=(
		SELECT COUNT(*) FROM favorites
        WHERE idvideogame=NEW.idvideogame
    )
    WHERE id=NEW.idvideogame;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER delete_like
AFTER DELETE ON favorites 
FOR EACH ROW
BEGIN
	UPDATE videogames SET likes=(
		SELECT COUNT(*) FROM favorites
        WHERE idvideogame=OLD.idvideogame
    )
    WHERE id=OLD.idvideogame;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `plataform`
--

DROP TABLE IF EXISTS `plataform`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plataform` (
  `plataforma` varchar(45) NOT NULL,
  `img` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`plataforma`),
  UNIQUE KEY `plataforma_UNIQUE` (`plataforma`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plataform`
--

LOCK TABLES `plataform` WRITE;
/*!40000 ALTER TABLE `plataform` DISABLE KEYS */;
INSERT INTO `plataform` VALUES ('3DS','/module/home/view/img/general.png'),('DS','/module/home/view/img/general.png'),('PC','/module/home/view/img/general.png'),('PS1','/module/home/view/img/general.png'),('PS2','/module/home/view/img/general.png'),('PS3','/module/home/view/img/general.png'),('PS4','/module/home/view/img/general.png'),('PS5','/module/home/view/img/general.png'),('SWITCH','/module/home/view/img/general.png'),('WII','/module/home/view/img/general.png'),('XBOX1','/module/home/view/img/general.png'),('XBOX360','/module/home/view/img/general.png');
/*!40000 ALTER TABLE `plataform` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(150) NOT NULL,
  `type` varchar(45) DEFAULT NULL,
  `avatar` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'prueba','prueba@gmail.com','$2y$10$Yh.1tTWB2kn7B2jZxPhvFe2zeljlXlC78YCZq5A16JhNfygQvFFCi','client','https://www.gravatar.com/avatar/4d186321c1a7f0f354b297e8914ab240?s=40&d=identicon'),(15,'hola','hola@gmail.com','$2y$10$e.Fmrim/Ska0/m9d/2ElMOtupU9uspmDR7tWqFKZkaYvOcaKcx9iW','client','https://www.gravatar.com/avatar/4d186321c1a7f0f354b297e8914ab240?s=40&d=identicon'),(17,'holas','hola','$2y$10$2YDUXQDIxnmgh8pXBSb/6efPA.JkV7KsAY66Byl4V5HvA4xVl6b6.','client','https://www.gravatar.com/avatar/4d186321c1a7f0f354b297e8914ab240?s=40&d=identicon'),(24,'polo','f','$2y$10$9Nu.MBtiatqaleRu.JTuVu/GKTLiNu8Bi6fdtCUasiBs/fa9g6k4q','client','https://www.gravatar.com/avatar/8ebdd6fc3ed98bbde20903b3dbdc3a2a?s=40&d=identicon'),(25,'polon','polo@gmai.com','$2y$10$EWAwQJ58MvDvqL5.W8DSDujc6ERccv/WnVWpOz7j/Ku6jAKiPibJ2','client','https://www.gravatar.com/avatar/8ebdd6fc3ed98bbde20903b3dbdc3a2a?s=40&d=identicon'),(26,'colonizar','colonizar@gmai.com','$2y$10$7rhaB6jz8vpaD3moonBpH.wTG1pCUdnSpq8M3/MuUY3svPpZ5wzAe','client','https://www.gravatar.com/avatar/dcb0ea44f5ab8590ff019b5cbd83bacf?s=40&d=identicon'),(27,'cola','cola@gmail.com','$2y$10$eyAY3tq/.Zhr84qz9mV5eer0qcEW.nArs2kioP4rTRe8KbLslH89i','client','https://www.gravatar.com/avatar/be4ffca79aa3a06fab679676987c4706?s=40&d=identicon'),(28,'cola2','cola2@gmail.com','$2y$10$7VjhQv7JV8LvcErewUkWJe3xC6pM9onUzXiMYTj8H803GH3HmzC0G','client','https://www.gravatar.com/avatar/f236600adda04d0fc2465bf0ff746892?s=40&d=identicon'),(29,'cola3','cola3@gmail.com','$2y$10$XMpgYDuMxV6zx3U8i.jGiul3HbabzaBcIg78mk52CSGUuPOR4/Hfy','client','https://www.gravatar.com/avatar/dc34f49d3d01ef5c0b09ee53aa1e99a7?s=40&d=identicon'),(30,'cola4','cola4@gmail.com','$2y$10$96I2sCxmX7Y7fYEPiz.2MeRNELEX0ff8zPmZnbUeKssweCIK3XC3q','client','https://www.gravatar.com/avatar/3000c21f862ab983f6c48788f1151c60?s=40&d=identicon'),(31,'cola5','cola5@gmail.com','$2y$10$W98oowe57hvDmfsgr31.vuM75ddh/H0IWUCtXnvL.qFBbGinjP0yy','client','https://www.gravatar.com/avatar/ca36141701da17a8471318b47df5555f?s=40&d=identicon'),(32,'cola6','cola6@gmail.com','$2y$10$vp43zdEq.h.1Wepi1C6jyOakiOwzNBSE04Hd.GpYKT94M56JQIQsa','client','https://www.gravatar.com/avatar/c92b0cc6abace7a91df49fc17b2ede78?s=40&d=identicon'),(33,'SantiSL5','santi@gmail.com','$2y$10$AK4a5GflEIgchyZ2Alu.6uc6lz9wYcetlGNSXQuat7NfSAKfq25qi','client','https://www.gravatar.com/avatar/8446158d4d782fef31768f125f31b380?s=40&d=identicon'),(34,'Pepito','pepito@gmail.com','$2y$10$4SWtlLty23a9I4JBd5Qp/e49y0qDro5AB/QC.32HyjouTgiq69Nce','client','https://www.gravatar.com/avatar/42c58abd933c11304fcaa7a18cefaaaa?s=40&d=identicon'),(35,'Pepitoa','pepitoa@gmail.com','$2y$10$njD4oSxABxiAkMdD6AUi0OOOwfh1sdkbipa8TKszFki3j3j2m2BkG','client','https://www.gravatar.com/avatar/5858fa2c08dbc35afdfcb4f5e805553a?s=40&d=identicon'),(36,'manolo123','manolo123@gmail.com','$2y$10$vitlIfkTmNt9bKpy/93HaOJHcoLdOSyuquUjlyz99HDX3qkpPn4fW','client','https://www.gravatar.com/avatar/3d9bf31d2b2b6dbfc37089a346207c2b?s=40&d=identicon'),(37,'testo','testo@gmail.com','$2y$10$argJfOHW9a56Xc8FUDUfUeP5/KTVN1FSvu7L6L0MBCu/TcCiSjLem','client','https://www.gravatar.com/avatar/bcfc27ca60c827943de1055d7609e190?s=40&d=identicon'),(38,'testor','testor@gmail.com','$2y$10$GzEjCFvrGG/CYFN7ToglWufTox75EXKpnXmKAZjdEuQXkb8uUWRwO','client','https://www.gravatar.com/avatar/816927598c920225bc59c827f211696e?s=40&d=identicon');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `videogames`
--

DROP TABLE IF EXISTS `videogames`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `videogames` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(45) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `companyia` varchar(45) DEFAULT NULL,
  `fecha_salida` varchar(45) DEFAULT NULL,
  `clasificacion` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `generos` varchar(255) DEFAULT NULL,
  `plataforma` varchar(45) DEFAULT NULL,
  `precio` int(45) DEFAULT NULL,
  `descuento` varchar(45) DEFAULT NULL,
  `unidades` varchar(45) DEFAULT NULL,
  `img` varchar(45) DEFAULT NULL,
  `views` varchar(45) DEFAULT '0',
  `likes` varchar(45) DEFAULT '0',
  PRIMARY KEY (`id`,`code`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videogames`
--

LOCK TABLES `videogames` WRITE;
/*!40000 ALTER TABLE `videogames` DISABLE KEYS */;
INSERT INTO `videogames` VALUES (1,'123sasass','embestida','asdfasfd','17/01/2021','3','Nuevo','Accion:Shooter:Estrategia:Simulacion:Deporte:Carreras:Aventura:Sandbox:Musica:Puzzle','PC',30,'0','7','/module/shop/view/img/general.png','76','2'),(2,'123sesese','alalbamirar','dfadsf','16/01/2021','3','Nuevo','Accion:Shooter:Estrategia','PS4',40,'30','8','/module/shop/view/img/general.png','27','2'),(3,'321asdasd','dungeons','dsafjksadfhj','16/01/2021','3','Nuevo','Accion:Shooter:Estrategia:Carreras:Aventura:Sandbox','XBOX1',23,'40','10','/module/shop/view/img/general.png','1','1'),(4,'432asjsda','dragons','hsafdhjgdgiu','16/01/2021','12','Segunda Mano','Accion:Shooter:Estrategia:Aventura','XBOX360',43,'50','23','/module/shop/view/img/general.png','0','0'),(5,'321ghdhds','legueofbikes','gdsagshiu','22/01/2021','18','Nuevo','Accion:Simulacion:Deporte:Puzzle','DS',27,'20','15','/module/shop/view/img/general.png','0','0'),(6,'432jhdaho','olassalvajes','dasfhkjds','16/02/2021','16','Segunda Mano','Accion:Shooter:Simulacion:Carreras','3DS',54,'34','56','/module/shop/view/img/general.png','0','0'),(7,'341acdwes','festival','adsfsdaf','15/02/2021','3','Nuevo','Shooter:Simulacion:Carreras','SWITCH',75,'23','0','/module/shop/view/img/general.png','0','0'),(8,'531rgewsa','orotodo','sdafasdf','16/01/2021','16','Nuevo','Shooter:Estrategia:Simulacion','PS3',46,'25','35','/module/shop/view/img/general.png','0','0'),(9,'762gdhssa','mujasa','dsafasfd','23/01/2021','16','Nuevo','Shooter:Estrategia:Simulacion','PS2',34,'67','25','/module/shop/view/img/general.png','0','0'),(10,'432hdjskd','hidroworld','sdfsadfasfd','16/02/2021','16','Nuevo','Shooter:Estrategia:Simulacion','PS1',34,'25','64','/module/shop/view/img/general.png','0','0'),(11,'543dshsjk','naturaleza','sadfsadf','16/01/2021','16','Segunda Mano','Accion:Simulacion:Deporte','WII',25,'68','25','/module/shop/view/img/general.png','1','1'),(12,'314dshgsd','exploration','joepwa','17/02/2021','16','Nuevo','Accion:Simulacion:Deporte','PS5',35,'34','23','/module/shop/view/img/general.png','0','0'),(13,'124fjskgl','3Dentreteinment','asdfsdaf','17/02/2021','18','Segunda Mano','Shooter:Simulacion:Carreras','PS5',105,'53','24','/module/shop/view/img/general.png','0','0'),(14,'642haejcl','toroloco','asdfdsaf','17/02/2021','18','Segunda Mano','Accion:Simulacion:Deporte','DS',35,'32','25','/module/shop/view/img/general.png','0','0'),(15,'124fjskgp','corre','fasdea','17/02/2021','18','Nuevo','Shooter:Simulacion:Carreras','PS5',125,'32','53','/module/shop/view/img/general.png','0','0'),(16,'134fjsjrd','lupon','afdsf','17/02/2021','18','Segunda Mano','Accion:Simulacion:Deporte','WII',12,'12','12','/module/shop/view/img/general.png','0','0'),(17,'174fjsjrd','jurni','asdfdsaf','17/02/2021','18','Nuevo','Accion:Simulacion:Deporte','DS',67,'12','2','/module/shop/view/img/general.png','0','0');
/*!40000 ALTER TABLE `videogames` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'videogames'
--

--
-- Dumping routines for database 'videogames'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-19 12:29:07
