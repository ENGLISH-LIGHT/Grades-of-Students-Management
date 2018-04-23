/*
Navicat MySQL Data Transfer

Source Server         : LightMySQL
Source Server Version : 50721
Source Host           : localhost:3306
Source Database       : stu_grade_manage

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2018-04-22 20:34:31
*/

/*SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `tb_class`
-- ----------------------------
DROP TABLE IF EXISTS `tb_class`;
CREATE TABLE `tb_class` (
  `Cno` varchar(10) NOT NULL COMMENT '班级-class',
  `Mno` varchar(10) NOT NULL,
  `CstuCount` int(11) NOT NULL,
  PRIMARY KEY (`Cno`),
  KEY `Mno` (`Mno`),
  CONSTRAINT `Mno` FOREIGN KEY (`Mno`) REFERENCES `tb_maj` (`Mno`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_class
-- ----------------------------

-- ----------------------------
-- Table structure for `tb_grade`
-- ----------------------------
DROP TABLE IF EXISTS `tb_grade`;
CREATE TABLE `tb_grade` (
  `Sno` varchar(10) NOT NULL,
  `Lno` varchar(10) NOT NULL,
  `Gscore` float NOT NULL,
  `GGPA` decimal(3,3) NOT NULL COMMENT '成绩-grade',
  PRIMARY KEY (`Sno`,`Lno`),
  KEY `GLno` (`Lno`),
  CONSTRAINT `GLno` FOREIGN KEY (`Lno`) REFERENCES `tb_lesson` (`Lno`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `GSno` FOREIGN KEY (`Sno`) REFERENCES `tb_stu` (`Sno`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_grade
-- ----------------------------

-- ----------------------------
-- Table structure for `tb_lesson`
-- ----------------------------
DROP TABLE IF EXISTS `tb_lesson`;
CREATE TABLE `tb_lesson` (
  `Lno` varchar(10) NOT NULL COMMENT '课程-Lesson',
  `Tno` varchar(10) NOT NULL,
  `Lname` varchar(20) NOT NULL,
  `Lroom` varchar(20) NOT NULL,
  `Lscore` decimal(1,1) NOT NULL,
  PRIMARY KEY (`Lno`),
  KEY `Tno` (`Tno`),
  CONSTRAINT `Tno` FOREIGN KEY (`Tno`) REFERENCES `tb_teacher` (`Tno`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_lesson
-- ----------------------------

-- ----------------------------
-- Table structure for `tb_maj`
-- ----------------------------
DROP TABLE IF EXISTS `tb_maj`;
CREATE TABLE `tb_maj` (
  `Mno` varchar(10) NOT NULL,
  `Uno` varchar(10) NOT NULL COMMENT '专业-major',
  `Mname` varchar(30) NOT NULL,
  `MshortName` varchar(10) NOT NULL COMMENT '专业信息',
  PRIMARY KEY (`Mno`),
  KEY `Uno` (`Uno`),
  CONSTRAINT `Uno` FOREIGN KEY (`Uno`) REFERENCES `tb_uni` (`Uno`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_maj
-- ----------------------------

-- ----------------------------
-- Table structure for `tb_stu`
-- ----------------------------
DROP TABLE IF EXISTS `tb_stu`;
CREATE TABLE `tb_stu` (
  `Sno` varchar(10) NOT NULL COMMENT '学生-student',
  `Cno` varchar(10) NOT NULL,
  `Sidenti` varchar(18) NOT NULL,
  `Sname` varchar(10) NOT NULL,
  `Sage` int(11) NOT NULL,
  `SGPA` decimal(1,1) DEFAULT NULL,
  `ShaveScore` decimal(3,1) DEFAULT NULL,
  PRIMARY KEY (`Sno`),
  KEY `Cno` (`Cno`),
  KEY `Sidenti` (`Sidenti`),
  CONSTRAINT `Cno` FOREIGN KEY (`Cno`) REFERENCES `tb_class` (`Cno`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Sidenti` FOREIGN KEY (`Sidenti`) REFERENCES `tb_stuothers` (`Sidenti`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_stu
-- ----------------------------

-- ----------------------------
-- Table structure for `tb_stuothers`
-- ----------------------------
DROP TABLE IF EXISTS `tb_stuothers`;
CREATE TABLE `tb_stuothers` (
  `Sidenti` varchar(18) NOT NULL,
  `Stel` varchar(20) NOT NULL,
  `SQQ` varchar(12) DEFAULT NULL,
  `Swechat` varchar(30) DEFAULT NULL,
  `Semail` varchar(30) DEFAULT NULL,
  `Saddr` varchar(150) NOT NULL,
  `SnativePlace` varchar(30) NOT NULL,
  `SdadName` varchar(10) NOT NULL,
  `SmumName` varchar(10) NOT NULL,
  `SdadTel` varchar(20) NOT NULL,
  `SmumTel` varchar(20) NOT NULL,
  `Sremarks` varchar(500) DEFAULT NULL,
  `SheadImg` varchar(100) DEFAULT NULL COMMENT '学生-student',
  PRIMARY KEY (`Sidenti`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_stuothers
-- ----------------------------

-- ----------------------------
-- Table structure for `tb_teacher`
-- ----------------------------
DROP TABLE IF EXISTS `tb_teacher`;
CREATE TABLE `tb_teacher` (
  `Tno` varchar(10) NOT NULL,
  `Sno` varchar(10) NOT NULL,
  `Cno` varchar(10) NOT NULL,
  `Tname` varchar(10) NOT NULL,
  `Tsex` varchar(2) NOT NULL,
  `Ttel` varchar(15) NOT NULL,
  `Temail` varchar(30) NOT NULL,
  `Tremarks` varchar(500) DEFAULT NULL COMMENT '老师-teacher',
  PRIMARY KEY (`Tno`),
  KEY `Sno` (`Sno`),
  KEY `TCno` (`Cno`),
  CONSTRAINT `Sno` FOREIGN KEY (`Sno`) REFERENCES `tb_stu` (`Sno`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `TCno` FOREIGN KEY (`Cno`) REFERENCES `tb_class` (`Cno`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_teacher
-- ----------------------------

-- ----------------------------
-- Table structure for `tb_uni`
-- ----------------------------
DROP TABLE IF EXISTS `tb_uni`;
CREATE TABLE `tb_uni` (
  `Uno` varchar(10) NOT NULL,
  `Uname` varchar(30) NOT NULL COMMENT '学院-University',
  PRIMARY KEY (`Uno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_uni
-- ----------------------------
