-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: k8a404.p.ssafy.io    Database: selog
-- ------------------------------------------------------
-- Server version	8.0.21

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
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `point` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (1,'furniture','Bedside_light_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/bedside_light_1.png',45),(2,'furniture','Black_chair_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/black_chair_1.png',125),(3,'electronics','Black_coffeemachine_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/black_coffeemachine_1.png',40),(4,'decoration','Black_cup_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/black_cup_1.png',20),(5,'furniture','Black_leather_sofa_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/black_leather_sofa_1.png',2000),(6,'electronics','Black_speaker_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/black_speaker_1.png',600),(7,'furniture','Black_teatable_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/black_teatable_1.png',450),(8,'furniture','Blue_bed','https://sellog.s3.ap-northeast-2.amazonaws.com/items/blue_bed.png',1500),(9,'furniture','Blue_chair_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/blue_chair_1.png',400),(10,'furniture','Blue_chair_2','https://sellog.s3.ap-northeast-2.amazonaws.com/items/blue_chair_2.png',230),(11,'furniture','Blue_sofa_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/blue_sofa_1.png',1800),(12,'furniture','Brown_table_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/brown_table_1.png',500),(13,'furniture','Brown_table_2','https://sellog.s3.ap-northeast-2.amazonaws.com/items/brown_table_2.png',475),(14,'furniture','Brown_table_3','https://sellog.s3.ap-northeast-2.amazonaws.com/items/brown_table_3.png',100),(15,'furniture','Brown_table_4','https://sellog.s3.ap-northeast-2.amazonaws.com/items/brown_table_4.png',2100),(16,'decoration','Coffee_cup_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/coffee_cup_1.png',80),(17,'decoration','Elec_guitar_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/elec_guitar_1.png',350),(18,'decoration','Elec_guitar_2','https://sellog.s3.ap-northeast-2.amazonaws.com/items/elec_guitar_2.png',350),(19,'decoration','Elec_guitar_3','https://sellog.s3.ap-northeast-2.amazonaws.com/items/elec_guitar_3.png',350),(20,'furniture','Giant_sofa_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/giant_sofa_1.png',3000),(21,'furniture','Green_sofa_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/green_sofa_1.png',200),(22,'appliance','Grey_bin_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/grey_bin_1.png',20),(23,'decoration','Group_guitar_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/group_guitar_1.png',1000),(24,'decoration','House_tree_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/house_tree_1.png',880),(25,'electronics','Imac_computer_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/imac_computer_1.png',1100),(26,'decoration','Katana_decoration_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/katana_decoration_1.png',1750),(27,'furniture','Leopard_chair_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/leopard_chair_1.png',1120),(28,'furniture','Low_table_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/low_table_1.png',1500),(29,'furniture','Marble_table_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/marble_table_1.png',1900),(30,'furniture','Marble_table_2','https://sellog.s3.ap-northeast-2.amazonaws.com/items/marble_table_2.png',2300),(31,'electronics','Old_computer_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/old_computer_1.png',370),(32,'electronics','Old_computer_2','https://sellog.s3.ap-northeast-2.amazonaws.com/items/old_computer_2.png',400),(33,'electronics','Old_microwave_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/old_microwave_1.png',100),(34,'electronics','Old_tv_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/old_tv_1.png',90),(35,'furniture','Orange_sofa_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/orange_sofa_1.png',220),(36,'decoration','Photo_frame_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/photo_frame_1.png',80),(37,'decoration','Photo_frame_2','https://sellog.s3.ap-northeast-2.amazonaws.com/items/photo_frame_2.png',80),(38,'furniture','Red_chair_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/red_chair_1.png',500),(39,'decoration','Red_lights_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/red_lights_1.png',80),(40,'furniture','Red_sofa_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/red_sofa_1.png',450),(41,'electronics','Red_telephone_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/red_telephone_1.png',30),(42,'electronics','Retro_arcadegame_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/retro_arcadegame_1.png',420),(43,'furniture','Round_table_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/round_table_1.png',450),(44,'electronics','Small_speaker_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/small_speaker_1.png',70),(45,'furniture','Stall_white_chair_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/stall_white_chair_1.png',100),(46,'decoration','Starwars_trooper_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/starwars_trooper_1.png',2300),(47,'decoration','Teddybear_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/teddybear_1.png',200),(48,'decoration','Tree_vase_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/tree_vase_1.png',300),(49,'decoration','Trooper_figure_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/trooper_figure_1.png',350),(50,'furniture','White_chair_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/white_chair_1.png',50),(51,'decoration','White_controller_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/white_controller_1.png',40),(52,'decoration','White_skeleton_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/white_skeleton_1.png',1300),(53,'furniture','White_sofa_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/white_sofa_1.png',500),(54,'furniture','White_table_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/white_table_1.png',1200),(55,'appliance','Wine_glass_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/wine_glass_1.png',10),(56,'furniture','Wood_chair_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/wood_chair_1.png',1300),(57,'furniture','Wood_desk_0','https://sellog.s3.ap-northeast-2.amazonaws.com/items/wood_desk_0.png',500),(58,'furniture','Wood_desk_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/wood_desk_1.png',230),(59,'furniture','Wood_desk_2','https://sellog.s3.ap-northeast-2.amazonaws.com/items/wood_desk_2.png',330),(60,'furniture','Wood_drawer_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/wood_drawer_1.png',500),(61,'furniture','Wood_shelve','https://sellog.s3.ap-northeast-2.amazonaws.com/items/wood_shelve.png',400),(62,'furniture','Wood_table_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/wood_table_1.png',1100),(63,'furniture','Yellow_sofa_1','https://sellog.s3.ap-northeast-2.amazonaws.com/items/yellow_sofa_1.png',1500);
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-19 10:23:49
