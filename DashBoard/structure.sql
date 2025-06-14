/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.6.2-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: inventory_db
-- ------------------------------------------------------
-- Server version	11.6.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `borrow`
--
CREATE DATABASE inventory_db;
USE inventory_db;
DROP TABLE IF EXISTS `borrow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `borrow` (
  `t_user_FK` int(11) NOT NULL,
  `t_hardware_FK` varchar(100) NOT NULL,
  `Borrow_date` varchar(50) DEFAULT NULL,
  `Return_date` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`t_user_FK`,`t_hardware_FK`),
  KEY `t_hardware_FK` (`t_hardware_FK`),
  CONSTRAINT `borrow_ibfk_1` FOREIGN KEY (`t_user_FK`) REFERENCES `t_user` (`user_id`),
  CONSTRAINT `borrow_ibfk_2` FOREIGN KEY (`t_hardware_FK`) REFERENCES `t_hardware` (`Materiel_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_category`
--

DROP TABLE IF EXISTS `t_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_category` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_hardware`
--

DROP TABLE IF EXISTS `t_hardware`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_hardware` (
  `Materiel_id` varchar(100) NOT NULL,
  `Description` varchar(50) DEFAULT NULL,
  `Price` decimal(19,4) DEFAULT NULL,
  `brand` varchar(50) DEFAULT NULL,
  `manufacturer_number` int(11) DEFAULT NULL,
  `Buy_year` date DEFAULT NULL,
  `QR` varchar(20) DEFAULT NULL,
  `t_hardware_FK` varchar(100) NOT NULL,
  `t_supply_FK` int(11) NOT NULL,
  `t_category_FK` int(11) NOT NULL,
  `t_local_FK` int(11) NOT NULL,
  PRIMARY KEY (`Materiel_id`),
  UNIQUE KEY `QR` (`QR`),
  KEY `t_hardware_FK` (`t_hardware_FK`),
  KEY `t_supply_FK` (`t_supply_FK`),
  KEY `t_category_FK` (`t_category_FK`),
  KEY `t_local_FK` (`t_local_FK`),
  CONSTRAINT `t_hardware_ibfk_1` FOREIGN KEY (`t_hardware_FK`) REFERENCES `t_hardware` (`Materiel_id`),
  CONSTRAINT `t_hardware_ibfk_2` FOREIGN KEY (`t_supply_FK`) REFERENCES `t_supply` (`supply_id`),
  CONSTRAINT `t_hardware_ibfk_3` FOREIGN KEY (`t_category_FK`) REFERENCES `t_category` (`category_id`),
  CONSTRAINT `t_hardware_ibfk_4` FOREIGN KEY (`t_local_FK`) REFERENCES `t_local` (`Local_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_local`
--

DROP TABLE IF EXISTS `t_local`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_local` (
  `Local_id` int(11) NOT NULL AUTO_INCREMENT,
  `room` varchar(6) DEFAULT NULL,
  `Description` varchar(50) DEFAULT NULL,
  `Place_in_local` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Local_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_supply`
--

DROP TABLE IF EXISTS `t_supply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_supply` (
  `supply_id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`supply_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `t_user`
--

DROP TABLE IF EXISTS `t_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `t_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) DEFAULT NULL,
  `Type` varchar(50) DEFAULT NULL,
  `surname` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-06-04 13:59:44
