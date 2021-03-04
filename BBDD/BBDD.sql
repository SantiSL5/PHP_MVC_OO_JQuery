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
  PRIMARY KEY (`id`,`code`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videogames`
--

LOCK TABLES `videogames` WRITE;
/*!40000 ALTER TABLE `videogames` DISABLE KEYS */;
INSERT INTO `videogames` VALUES (1,'123sasass','embestida','asdfasfd','17/01/2021','3','Nuevo','Accion:Shooter:Estrategia:Simulacion:Deporte:Carreras:Aventura:Sandbox:Musica:Puzzle','PC',30,'0','7','/module/shop/view/img/general.png','45'),(2,'123sesese','alalbamirar','dfadsf','16/01/2021','3','Nuevo','Accion:Shooter:Estrategia','PS4',40,'30','8','/module/shop/view/img/general.png','3'),(3,'321asdasd','dungeons','dsafjksadfhj','16/01/2021','3','Nuevo','Accion:Shooter:Estrategia:Carreras:Aventura:Sandbox','XBOX1',23,'40','10','/module/shop/view/img/general.png','1'),(4,'432asjsda','dragons','hsafdhjgdgiu','16/01/2021','12','Segunda Mano','Accion:Shooter:Estrategia:Aventura','XBOX360',43,'50','23','/module/shop/view/img/general.png','0'),(5,'321ghdhds','legueofbikes','gdsagshiu','22/01/2021','18','Nuevo','Accion:Simulacion:Deporte:Puzzle','DS',27,'20','15','/module/shop/view/img/general.png','0'),(6,'432jhdaho','olassalvajes','dasfhkjds','16/02/2021','16','Segunda Mano','Accion:Shooter:Simulacion:Carreras','3DS',54,'34','56','/module/shop/view/img/general.png','0'),(7,'341acdwes','festival','adsfsdaf','15/02/2021','3','Nuevo','Shooter:Simulacion:Carreras','SWITCH',75,'23','0','/module/shop/view/img/general.png','0'),(8,'531rgewsa','orotodo','sdafasdf','16/01/2021','16','Nuevo','Shooter:Estrategia:Simulacion','PS3',46,'25','35','/module/shop/view/img/general.png','0'),(9,'762gdhssa','mujasa','dsafasfd','23/01/2021','16','Nuevo','Shooter:Estrategia:Simulacion','PS2',34,'67','25','/module/shop/view/img/general.png','0'),(10,'432hdjskd','hidroworld','sdfsadfasfd','16/02/2021','16','Nuevo','Shooter:Estrategia:Simulacion','PS1',34,'25','64','/module/shop/view/img/general.png','0'),(11,'543dshsjk','naturaleza','sadfsadf','16/01/2021','16','Segunda Mano','Accion:Simulacion:Deporte','WII',25,'68','25','/module/shop/view/img/general.png','0'),(12,'314dshgsd','exploration','joepwa','17/02/2021','16','Nuevo','Accion:Simulacion:Deporte','PS5',35,'34','23','/module/shop/view/img/general.png','0'),(13,'124fjskgl','3Dentreteinment','asdfsdaf','17/02/2021','18','Segunda Mano','Shooter:Simulacion:Carreras','PS5',105,'53','24','/module/shop/view/img/general.png','0'),(14,'642haejcl','toroloco','asdfdsaf','17/02/2021','18','Segunda Mano','Accion:Simulacion:Deporte','DS',35,'32','25','/module/shop/view/img/general.png','0'),(15,'124fjskgp','corre','fasdea','17/02/2021','18','Nuevo','Shooter:Simulacion:Carreras','PS5',125,'32','53','/module/shop/view/img/general.png','0'),(16,'134fjsjrd','lupon','afdsf','17/02/2021','18','Segunda Mano','Accion:Simulacion:Deporte','WII',12,'12','12','/module/shop/view/img/general.png','0'),(17,'174fjsjrd','jurni','asdfdsaf','17/02/2021','18','Nuevo','Accion:Simulacion:Deporte','DS',67,'12','2','/module/shop/view/img/general.png','0');
/*!40000 ALTER TABLE `videogames` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-04 14:14:08
