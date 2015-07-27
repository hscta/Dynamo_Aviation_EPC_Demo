# Host: bajajPrj.db.11965675.hostedresource.com  (Version: 5.5.43-37.2-log)
# Date: 2015-07-27 18:58:27
# Generator: MySQL-Front 5.3  (Build 4.205)

/*!40101 SET NAMES latin1 */;

#
# Structure for table "asc"
#

DROP TABLE IF EXISTS `asc`;
CREATE TABLE `asc` (
  `asc_id` int(11) NOT NULL AUTO_INCREMENT,
  `dealer_id` int(11) NOT NULL,
  `asc_name` varchar(255) NOT NULL,
  `asc_email` varchar(255) NOT NULL,
  `asc_username` varchar(255) NOT NULL,
  `asc_password` varchar(255) NOT NULL,
  `asc_service_advisor_name` varchar(255) NOT NULL,
  `asc_service_advisor_mobile` bigint(20) NOT NULL,
  `active` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`asc_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

#
# Data for table "asc"
#

/*!40000 ALTER TABLE `asc` DISABLE KEYS */;
INSERT INTO `asc` VALUES (5,3,'BK Automobiles','bkauto@bajaj.com','ascuser','ascuser','PartsManager',2147483647,1);
/*!40000 ALTER TABLE `asc` ENABLE KEYS */;

#
# Structure for table "bulletin"
#

DROP TABLE IF EXISTS `bulletin`;
CREATE TABLE `bulletin` (
  `bulletin_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `bulletin_type_name` varchar(255) NOT NULL,
  `active` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`bulletin_type_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

#
# Data for table "bulletin"
#

/*!40000 ALTER TABLE `bulletin` DISABLE KEYS */;
INSERT INTO `bulletin` VALUES (1,'Service Bulletin',1),(2,'Product Bulletin',1);
/*!40000 ALTER TABLE `bulletin` ENABLE KEYS */;

#
# Structure for table "container_prd"
#

DROP TABLE IF EXISTS `container_prd`;
CREATE TABLE `container_prd` (
  `indent_no` varchar(30) NOT NULL,
  `container_no` varchar(30) NOT NULL,
  `seal_no` varchar(30) NOT NULL,
  `vehicle_no` varchar(30) NOT NULL,
  `lr_no` varchar(30) NOT NULL,
  `lr_date` date NOT NULL,
  `transporter_name` varchar(30) NOT NULL,
  `transporter_id` varchar(30) NOT NULL,
  `transaction_id` varchar(30) NOT NULL,
  UNIQUE KEY `lr_no` (`lr_no`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

#
# Data for table "container_prd"
#

INSERT INTO `container_prd` VALUES ('5148826','HLXU83756411c','HAPAGLLOYD1366476','MH46AF3141','15059','2019-03-20','JAYSHREE LOGISTICS PVT. LTD.','112248','T5059'),('5148826','HLXU8375643','HAPAGLLOYD1366478','MH46AF3682','15060','2019-03-20','JAYSHREE LOGISTICS PVT. LTD.','112248','T5060'),('5148826','HLXU8375643','HAPAGLLOYD1366475','MH43E242','15062','2019-03-20','JAYSHREE LOGISTICS PVT. LTD.','112248','T5062'),('5148826','HLXU6438300','HAPAGLLOYD1366477','MH46AF271','15063','2019-03-20','JAYSHREE LOGISTICS PVT. LTD.','112248','T5063'),('5148826','HLXU123456','SUDHIR123456789101','MH46H5693','15064','2019-03-20','JAYSHREE LOGISTICS PVT. LTD.','112248','T5064'),('5149060','TCNU7174545','','NL01D9619','176998','2007-03-20','SATISH CARGO MOVERS','101881',''),('5149066','HLXU3689','HLBU1278135','NL01D3958','176999','2007-03-20','SATISH CARGO MOVERS','101881','T6999'),('5149195','KMTU9247746','','MH43U6013','42897','2004-03-20','SHREENATHJI LOGISTICS','111521',''),('5149067','HLBU1278135','HLBU1278135','MH43U4970','43867','2014-03-20','SHREENATHJI LOGISTICS','111521','T3867'),('5148938','MH12KP0284333','SL12KP0284333','MH12KP0284','919','2028-03-20','SHREE GANESH LOGISTICS','113075','T0009');

#
# Structure for table "dealers"
#

DROP TABLE IF EXISTS `dealers`;
CREATE TABLE `dealers` (
  `dealer_id` int(11) NOT NULL AUTO_INCREMENT,
  `dealer_name` varchar(255) NOT NULL,
  `dealer_email` varchar(255) NOT NULL,
  `dealer_username` varchar(255) NOT NULL,
  `dealer_password` varchar(255) NOT NULL,
  `dealer_service_advisor_name` varchar(255) NOT NULL,
  `dealer_service_advisor_mobile` bigint(20) NOT NULL,
  `active` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`dealer_id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

#
# Data for table "dealers"
#

/*!40000 ALTER TABLE `dealers` DISABLE KEYS */;
INSERT INTO `dealers` VALUES (2,'Dealer','dealer@bajaj.com','dealer_1','dealer1','Karthik',9880747586,1),(8,'Giriraj','dealer_11411@gmail.com','Sangamner','test?123','Test_1',9880747576,1);
/*!40000 ALTER TABLE `dealers` ENABLE KEYS */;

#
# Structure for table "groups"
#

DROP TABLE IF EXISTS `groups`;
CREATE TABLE `groups` (
  `group_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_type_id` int(11) NOT NULL,
  `revision` varchar(30) NOT NULL,
  `group_name` varchar(255) NOT NULL,
  `group_desc` longtext NOT NULL,
  `eco_num` varchar(255) NOT NULL,
  `active` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`group_id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

#
# Data for table "groups"
#

/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES (8,1,'0.9','Pulsar 200NS V0.9','Revision Update','U13JUCHA0176',1),(9,1,'1.0','Pulsar 200NS V1','Revision Update','U13JUCHA0177',1),(11,2,'0.5','Discover 100ES V0.5','Revision Update','U12JUCHA0010',1),(14,1,'1.0','Pulsar 200NS V1','Rocker Shaft Update','',1),(15,1,'1.0','Pulsar 200NS V1','ROCKET SHAFT ARM Part update JF512111','',1),(16,1,'1.0','Pulsar 200NS V1','ROCKET SHAFT ARM Part update JF512111','',1);
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;

#
# Structure for table "groups_details"
#

DROP TABLE IF EXISTS `groups_details`;
CREATE TABLE `groups_details` (
  `group_details_id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `spare_id` int(11) NOT NULL,
  `changed` int(11) NOT NULL DEFAULT '0',
  `url` varchar(255) NOT NULL,
  `existing_part` varchar(255) NOT NULL,
  `new_part` varchar(255) NOT NULL,
  `dateofchange` varchar(255) NOT NULL,
  `active` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`group_details_id`)
) ENGINE=MyISAM AUTO_INCREMENT=65 DEFAULT CHARSET=latin1;

#
# Data for table "groups_details"
#

/*!40000 ALTER TABLE `groups_details` DISABLE KEYS */;
INSERT INTO `groups_details` VALUES (9,8,9,0,'','','','',1),(10,8,10,0,'','','','',1),(11,8,11,0,'','','','',1),(12,8,12,0,'','','','',1),(13,8,13,0,'','','','',1),(14,8,14,0,'','','','',1),(15,8,15,0,'','','','',1),(16,8,16,1,'pulsar/Pulsar 180 SPC_REV04_ MAY 14.pdf','-','-','-',1),(17,8,17,0,'','','','',1),(18,8,18,0,'','','','',1),(19,8,19,0,'','','','',1),(20,8,20,0,'','','','',1),(21,8,21,0,'','','','',1),(22,8,23,0,'','','','',1),(23,8,24,0,'','','','',1),(24,9,9,1,'frame/Bajaj_Pulsar_NS200_Cylinder_Head_Assembly.htm','JF511133','JF511207','Sep 11 2014',1),(25,9,26,0,'','','','',1),(26,9,27,0,'','','','',1),(27,9,28,0,'','','','',1),(28,9,29,0,'','','','',1),(29,9,30,0,'','','','',1),(30,9,31,0,'','','','',1),(31,9,32,0,'','','','',1),(32,9,33,0,'','','','',1),(33,9,34,0,'','','','',1),(34,9,35,0,'','','','',1),(35,9,36,0,'','','','',1),(36,9,37,0,'','','','',1),(37,9,39,0,'','','','',1),(38,9,40,0,'','','','',1),(39,10,9,0,'','','','',1),(40,10,10,0,'','','','',1),(41,11,41,0,'','','','',1),(42,11,42,0,'','','','',1),(43,11,43,1,'discover/Discover 125ST, T & 100T SPC_REV_04_JAN_14.pdf','-','-','-',1),(44,11,44,0,'','','','',1),(45,11,45,0,'','','','',1),(46,11,46,0,'','','','',1),(47,11,47,0,'','','','',1),(48,11,48,0,'','','','',1),(49,11,49,0,'','','','',1),(50,11,50,0,'','','','',1),(51,11,51,0,'','','','',1),(52,11,52,0,'','','','',1),(53,11,53,0,'','','','',1),(54,11,55,0,'','','','',1),(55,11,56,0,'','','','',1),(56,12,11,0,'','','','',1),(57,12,10,0,'','','','',1),(58,12,9,0,'','','','',1),(59,12,13,0,'','','','',1),(60,13,11,0,'','','','',1),(61,13,10,0,'','','','',1),(62,14,9,0,'','','','',1),(63,15,11,0,'','','','',1),(64,16,11,0,'','','','',1);
/*!40000 ALTER TABLE `groups_details` ENABLE KEYS */;

#
# Structure for table "groups_vins"
#

DROP TABLE IF EXISTS `groups_vins`;
CREATE TABLE `groups_vins` (
  `group_vins_id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `vin_num` varchar(255) NOT NULL,
  `active` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`group_vins_id`)
) ENGINE=MyISAM AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;

#
# Data for table "groups_vins"
#

/*!40000 ALTER TABLE `groups_vins` DISABLE KEYS */;
INSERT INTO `groups_vins` VALUES (11,8,'MD2A11CZ6EC',1),(12,8,'MD2A12DZ0EC',1),(13,8,'MD2A11CZXEC',1),(14,8,'MD2A11CZ0EW',1),(15,8,'MD2A18AZ8EW',1),(16,9,'MD2A13EZ5EC',1),(17,9,'MD2A13EZ1EC',1),(18,9,'MD2A13EZ0EC',1),(19,9,'MD2A12DZ7EC',1),(20,9,'MD2A12DZ4EC',1),(21,9,'MD2A11CZ4EC',1),(22,9,'MD2A18AZ7EP',1),(23,9,'MD2A18AZ0EP',1),(24,9,'MD2A13EZ9EC',1),(25,10,'test',1),(26,11,'MD2A11CZ6EC',1),(27,11,'MD2A11CZ6EC',1),(28,11,'MD2A11CZ5EW',1),(29,11,'MD2A11CZ2EC',1),(30,11,'MD2A11CZ1EC',1),(31,11,'MD2A11CZ0EW',1),(32,11,'MD2A11CZ0EC',1),(33,11,'MD2A22EZ0EC',1),(34,11,'MD2A57BZ4EW',1),(35,11,'MD2A57BZ2EW',1),(36,11,'MD2A57AZ9ER',1),(37,12,'MD2A13EZ1EC',1),(38,12,'MD2A13EZ1EC',1),(39,12,'MD2A13EZ1EC',1),(40,12,'MD2A13EZ1EC',1),(41,12,'MD2A13EZ1EC',1),(42,12,'MD2A13EZ1EC',1),(43,12,'MD2A13EZ1EC',1),(44,12,'MD2A13EZ1EC',1),(45,13,'MD2A12DZ4EC',1),(46,13,'',1),(47,13,'MD2A18AZ0EP',1),(48,14,'M206',1),(49,15,'MDA2A13Z1EF',1),(50,16,'MDA2A13Z1EF',1);
/*!40000 ALTER TABLE `groups_vins` ENABLE KEYS */;

#
# Structure for table "noticeboards"
#

DROP TABLE IF EXISTS `noticeboards`;
CREATE TABLE `noticeboards` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `url` varchar(255) NOT NULL,
  `notice_desc` longtext NOT NULL,
  `active` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

#
# Data for table "noticeboards"
#

/*!40000 ALTER TABLE `noticeboards` DISABLE KEYS */;
INSERT INTO `noticeboards` VALUES (5,'2014-08-09 01:43:04','../img/notice_board/1407528784_banner2.png','',1),(11,'2014-09-11 15:51:04','../img/notice_board/1410430864_ktm_launch.jpg','Bajaj Auto launched two supersport motorcycles on Tuesday from Austrian partner KTM&#039;s stable — RC 390 and RC 200',1),(12,'2015-05-02 05:33:44','../img/notice_board/1430570024_download.jpg','Ready to Race',1);
/*!40000 ALTER TABLE `noticeboards` ENABLE KEYS */;

#
# Structure for table "product"
#

DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_type_id` int(11) NOT NULL,
  `product` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `active` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`product_id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

#
# Data for table "product"
#

/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (2,1,'Pulsar 200NS','../img/product/1407663561_pulsar.png',1),(3,2,'Discover 100T','../img/product/1407663561_discover.png',1),(5,4,'Platina','../img/product/1408382242_bajaj-platina-2013-1-28-20-47-9.png',1),(6,5,'Avenger','../img/product/1408382264_Bajaj Avenger DTS-I.png',1),(7,6,'Ninja','../img/product/1408382296_ninja250r_320x240.png',1);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;

#
# Structure for table "product_categories"
#

DROP TABLE IF EXISTS `product_categories`;
CREATE TABLE `product_categories` (
  `product_category_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_category` varchar(255) NOT NULL,
  `active` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`product_category_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

#
# Data for table "product_categories"
#

/*!40000 ALTER TABLE `product_categories` DISABLE KEYS */;
INSERT INTO `product_categories` VALUES (3,'Two Wheelers',1),(4,'Commercial Vehicles',0);
/*!40000 ALTER TABLE `product_categories` ENABLE KEYS */;

#
# Structure for table "product_types"
#

DROP TABLE IF EXISTS `product_types`;
CREATE TABLE `product_types` (
  `product_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_category_id` int(11) NOT NULL,
  `product_type` varchar(255) NOT NULL,
  `active` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`product_type_id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

#
# Data for table "product_types"
#

/*!40000 ALTER TABLE `product_types` DISABLE KEYS */;
INSERT INTO `product_types` VALUES (1,3,'3700 NS',1),(2,3,'3200',1),(4,3,'3100',1),(5,3,'3800',1),(6,3,'3900',1);
/*!40000 ALTER TABLE `product_types` ENABLE KEYS */;

#
# Structure for table "spares"
#

DROP TABLE IF EXISTS `spares`;
CREATE TABLE `spares` (
  `spare_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_type_id` int(11) NOT NULL,
  `spare_name` varchar(255) NOT NULL,
  `spare_url` longtext NOT NULL,
  `spare_desc` longtext NOT NULL,
  `active` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`spare_id`)
) ENGINE=MyISAM AUTO_INCREMENT=58 DEFAULT CHARSET=latin1;

#
# Data for table "spares"
#

/*!40000 ALTER TABLE `spares` DISABLE KEYS */;
INSERT INTO `spares` VALUES (9,1,'Cylinder Valve 0.9','../img/spares/1407603036_1Cylinder Valve.png','Cylinder Valve',1),(10,1,'Cover Cylinder Head 0.9','../img/spares/1407603105_4Cover Cylinder Head.png','Cover Cylinder Head',1),(11,1,'Cylinder Head 0.9','../img/spares/1407603146_3Clutch Assembly.png','Cylinder Head',1),(12,1,'Camp Shaft 0.9','../img/spares/1407603211_4Cover Cylinder Head.png','Camp Shaft',1),(13,1,'Cylinder and Piston 0.9','../img/spares/1407603223_5Crank Shaft.png','Cylinder and Piston',1),(14,1,'Crank Shaft 0.9','../img/spares/1407603243_6Cylinder and Piston.png','Crank Shaft',1),(15,1,'Transmission 0.9','../img/spares/1407603255_7Cylinder Head.png','Transmission',1),(16,1,'Engine Assembly and Crank Case 0.9','../img/spares/1407603266_8Engine Assembly and Crank Case.png','Engine Assembly and Crank Case',1),(17,1,'Clutch Assembly 0.9','../img/spares/1407603276_9Front Hub.png','Clutch Assembly',1),(18,1,'Silencer Assembly 0.9','../img/spares/1407603285_10Handle Bar.png','Silencer Assembly',1),(19,1,'Front Hub 0.9','../img/spares/1407603293_11Head Lamp and Fairing.png','Front Hub',1),(20,1,'Handle Bar 0.9','../img/spares/1407603301_12Meter Assembly.png','Handle Bar',1),(21,1,'Meter Assembly 0.9','../img/spares/1407603312_13Silencer Assembly .png','Meter Assembly',1),(22,1,'Headlamp and Fairing 0.9','../img/spares/1407603321_14Tool Kit.png','Headlamp and Fairing',0),(23,1,'Headlamp and Fairing 0.9','../img/spares/1407603377_15Transmission.png','Headlamp and Fairing',1),(24,1,'Toolkit 0.9','../img/spares/1407603387_14Tool Kit.png','Toolkit',1),(26,1,'Cover Cylinder Head 1.0','../img/spares/1407603105_4Cover Cylinder Head.png','Cover Cylinder Head',1),(27,1,'Cylinder Head 1.0','../img/spares/1407603146_3Clutch Assembly.png','Cylinder Head',1),(28,1,'Camp Shaft 1.0','../img/spares/1407603211_4Cover Cylinder Head.png','Camp Shaft',1),(29,1,'Cylinder and Piston 1.0','../img/spares/1407603223_5Crank Shaft.png','Cylinder and Piston',1),(30,1,'Crank Shaft 1.0','../img/spares/1407603243_6Cylinder and Piston.png','Crank Shaft',1),(31,1,'Transmission 1.0','../img/spares/1407603255_7Cylinder Head.png','Transmission',1),(32,1,'Engine Assembly and Crank Case 1.0','../img/spares/1407603266_8Engine Assembly and Crank Case.png','Engine Assembly and Crank Case',1),(33,1,'Clutch Assembly 1.0','../img/spares/1407603276_9Front Hub.png','Clutch Assembly',1),(34,1,'Silencer Assembly 1.0','../img/spares/1407603285_10Handle Bar.png','Silencer Assembly',1),(35,1,'Front Hub 1.0','../img/spares/1407603293_11Head Lamp and Fairing.png','Front Hub',1),(36,1,'Handle Bar 1.0','../img/spares/1407603301_12Meter Assembly.png','Handle Bar',1),(37,1,'Meter Assembly  1.0','../img/spares/1407603312_13Silencer Assembly .png','Meter Assembly',1),(39,1,'Headlamp and Fairing 1.0','../img/spares/1407603377_15Transmission.png','Headlamp and Fairing',1),(40,1,'Toolkit 1.0','../img/spares/1407603387_14Tool Kit.png','Toolkit',1),(41,2,'Carburator 0.5','../img/spares/1407603266_8Engine Assembly and Crank Case.png','Carburator',1),(42,2,'Cover Cylinder Head 0.5','../img/spares/1407603105_4Cover Cylinder Head.png','Cover Cylinder Head',1),(43,2,'Cylinder Head 0.5','../img/spares/1407603146_3Clutch Assembly.png','Cylinder Head',1),(44,2,'Camp Shaft 0.5','../img/spares/1407603211_4Cover Cylinder Head.png','Camp Shaft',1),(45,2,'Cylinder and Piston 0.5','../img/spares/1407603223_5Crank Shaft.png','Cylinder and Piston',1),(46,2,'Crank Shaft 0.5','../img/spares/1407603243_6Cylinder and Piston.png','Crank Shaft',1),(47,2,'Transmission 0.5','../img/spares/1407603255_7Cylinder Head.png','Transmission',1),(48,2,'Cylinder Valve 0.5','../img/spares/1407603036_1Cylinder Valve.png','Cylinder Valve',1),(49,2,'Clutch Assembly 0.5','../img/spares/1407603276_9Front Hub.png','Clutch Assembly',1),(50,2,'Silencer Assembly 0.5','../img/spares/1407603285_10Handle Bar.png','Silencer Assembly',1),(51,2,'Front Hub 0.5','../img/spares/1407603293_11Head Lamp and Fairing.png','Front Hub',1),(52,2,'Handle Bar 0.5','../img/spares/1407603301_12Meter Assembly.png','Handle Bar',1),(53,2,'Meter Assembly 0.5','../img/spares/1407603312_13Silencer Assembly .png','Meter Assembly',1),(54,2,'Headlamp and Fairing 0.5','../img/spares/1407603321_14Tool Kit.png','Headlamp and Fairing',0),(55,2,'Headlamp and Fairing 0.5','../img/spares/1407603377_15Transmission.png','Headlamp and Fairing',1),(56,2,'Toolkit 0.5','../img/spares/1407603387_14Tool Kit.png','Toolkit',1);
/*!40000 ALTER TABLE `spares` ENABLE KEYS */;

#
# Structure for table "techfiles"
#

DROP TABLE IF EXISTS `techfiles`;
CREATE TABLE `techfiles` (
  `techfiles_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_type_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `bulletin_type_id` int(11) NOT NULL,
  `service_bulletin_id` varchar(255) NOT NULL,
  `service_bulletin_desc` longtext NOT NULL,
  `plates` longtext NOT NULL,
  `service_document_url` varchar(255) NOT NULL,
  `service_document_url_french` varchar(255) NOT NULL,
  `service_document_url_kannada` varchar(255) NOT NULL,
  `date_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `active` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`techfiles_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

#
# Data for table "techfiles"
#

/*!40000 ALTER TABLE `techfiles` DISABLE KEYS */;
INSERT INTO `techfiles` VALUES (2,2,11,1,'A17','Modification on Discover 100ES','Mag cover with DTS-i decals','../technicals/1407611943_en_A-17-Modification on Discover100-ES & Mag cover with DTS-i decals.pdf','../technicals/1407611943_fr_A-17-Modification on Discover100-ES & Mag cover with DTS-i decals.pdf','../technicals/1407611943_ka_A-17-Modification on Discover100-ES & Mag cover with DTS-i decals.pdf','2014-08-09 23:49:31',1),(3,2,11,1,'A18','Introduction of Discover 100 ES with Spoke Wheels','Spoke Wheels','../technicals/1407612126_A-18-Introduction of Discover 100 ES with Spoke Wheels.pdf','','','2014-08-16 23:49:48',1),(4,1,9,2,'B12','Pulsar 200NS Owners Manual','N.A.','../technicals/1407672871_Bajaj-Pulsar-200NS-Owners Manual.pdf','','','2014-08-18 23:49:00',1),(6,5,14,1,'asd','test','Fuel Level','../technicals/en_1419852159_New Microsoft Word Document.docx','../technicals/fr_1419852159_','../technicals/ka_1419852159_','2014-12-29 04:23:42',0);
/*!40000 ALTER TABLE `techfiles` ENABLE KEYS */;

#
# Structure for table "user_role"
#

DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role` (
  `user_role_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_type_id` int(11) NOT NULL,
  `user_role` varchar(255) NOT NULL,
  `active` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`user_role_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

#
# Data for table "user_role"
#

/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (1,3,'Spares Advisor',1),(2,3,'Spares Staff1',1),(3,4,'ASC Advisor',1),(4,4,'ASC Staff1',1);
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;

#
# Structure for table "user_type"
#

DROP TABLE IF EXISTS `user_type`;
CREATE TABLE `user_type` (
  `user_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_type` varchar(255) NOT NULL,
  `active` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`user_type_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

#
# Data for table "user_type"
#

/*!40000 ALTER TABLE `user_type` DISABLE KEYS */;
INSERT INTO `user_type` VALUES (1,'Super Admin',1),(2,'Admin',1),(3,'Dealer',1),(4,'ASC',1);
/*!40000 ALTER TABLE `user_type` ENABLE KEYS */;

#
# Structure for table "users"
#

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `ID` mediumint(9) NOT NULL AUTO_INCREMENT,
  `username` varchar(60) DEFAULT NULL,
  `password` varchar(60) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `date_add` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `mobile` bigint(20) NOT NULL,
  `admin` int(1) NOT NULL DEFAULT '0',
  `role` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=71 DEFAULT CHARSET=latin1;

#
# Data for table "users"
#

/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'superadmin','ee10c315eba2c75b403ea99136f5b48d','Naveen Shankar','naveen.shankar@gladminds.co','2014-09-11 12:50:52',9862567890,1,1),(60,'staff','ee10c315eba2c75b403ea99136f5b48d','Sudhir','sudhir.patil@gladminds.co','2014-09-11 16:06:59',9883338987,3,1),(61,'admin','ee10c315eba2c75b403ea99136f5b48d','Farzana','farzana.r@gladminds.co','2014-09-11 16:06:40',9287390867,2,1),(62,'deb','ee10c315eba2c75b403ea99136f5b48d','Debaranjan Hazarika','dhazarika@bajajauto.co.in','2014-09-11 16:10:04',2147483647,2,2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
