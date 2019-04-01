/*
Navicat MySQL Data Transfer

Source Server         : admin
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : sxu_db

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2019-04-01 22:05:39
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `course`
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `is_del` int(11) NOT NULL DEFAULT '0',
  `library_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1080177 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES ('1080176', '大也课堂', '0', '103428');

-- ----------------------------
-- Table structure for `question`
-- ----------------------------
DROP TABLE IF EXISTS `question`;
CREATE TABLE `question` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teacherId` int(11) DEFAULT NULL,
  `pic_content` text,
  `answer_content` text,
  `answer_duration` int(11) DEFAULT '5',
  `answer_type` varchar(255) DEFAULT NULL,
  `answers` varchar(255) DEFAULT NULL,
  `content` text,
  `difficult_level` int(11) DEFAULT NULL,
  `chapter_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `strict` int(11) DEFAULT NULL,
  `case_sensitive` int(11) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `answerOpen` int(11) DEFAULT NULL,
  `openTime` timestamp NULL DEFAULT NULL,
  `lastOpenTime` timestamp NULL DEFAULT NULL,
  `summary` varchar(255) DEFAULT NULL,
  `choice` varchar(255) DEFAULT NULL,
  `answer_count` int(11) DEFAULT '0',
  `count_ratio` int(11) DEFAULT '0',
  `serial_number` varchar(255) DEFAULT '0000',
  `type` int(11) DEFAULT NULL,
  `is_answered` int(11) DEFAULT '0' COMMENT '是否启用过',
  `create_time` timestamp NULL DEFAULT NULL,
  `is_item_score` int(11) DEFAULT '0',
  `is_del` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of question
-- ----------------------------
INSERT INTO `question` VALUES ('26', null, '{\"0\":\"\",\"1\":\"\",\"2\":\"\",\"3\":\"\"}', '{\"0\":\"1\",\"1\":\"2\",\"2\":\"3\",\"3\":\"4\"}', null, '0※1', 'A', '<p>1111</p>', '1', '0', '1080176', '0', '0', '190301', null, null, null, null, null, '0', '0', '190301', '1', '0', null, null, '0');
INSERT INTO `question` VALUES ('27', null, '{\"0\":\"\",\"1\":\"\",\"2\":\"\",\"3\":\"\"}', '{\"0\":\"1\",\"1\":\"2\",\"2\":\"3\",\"3\":\"4\"}', null, '0※1', 'C', '<p>ddddddd</p>', '1', '0', '1080176', '0', '0', '190302', null, null, null, null, null, '0', '0', '190302', '1', '0', null, null, '0');
INSERT INTO `question` VALUES ('28', null, '{\"0\":\"\",\"1\":\"\",\"2\":\"\",\"3\":\"\",\"4\":\"\"}', '{\"0\":\"1\",\"1\":\"2\",\"2\":\"33\",\"3\":\"44\",\"4\":\"3\"}', null, '0※1', 'D', '<p>11111</p>', '1', '0', '1080176', '0', '0', '190303', null, null, null, null, null, '0', '0', '190303', '1', '0', null, null, '0');
INSERT INTO `question` VALUES ('29', null, '{\"0\":\"\",\"1\":\"\",\"2\":\"\",\"3\":\"\"}', '{\"0\":\"12\",\"1\":\"1\",\"2\":\"11\",\"3\":\"3\"}', null, '0※1', 'C', '<p>1111</p>', '1', '0', '1080176', '0', '0', '190304', null, null, null, null, null, '0', '0', '190304', '1', '0', null, null, '0');
INSERT INTO `question` VALUES ('30', null, '{\"0\":\"\",\"1\":\"\"}', '{\"0\":\"是\",\"1\":\"否\"}', null, '0※1', 'A', '<p>1111</p>', '1', '0', '1080176', '0', '0', '190305', null, null, null, null, null, '0', '0', '190305', '9', '0', null, null, '0');
INSERT INTO `question` VALUES ('31', null, '{\"0\":\"\",\"1\":\"\",\"2\":\"\",\"3\":\"\"}', '{\"0\":\"1\",\"1\":\"4\",\"2\":\"2\",\"3\":\"5\"}', null, '0※1', 'C', '<p>ere</p>', '1', '0', '1080176', '0', '0', '190306', null, null, null, null, null, '0', '0', '190306', '1', '0', null, null, '0');
INSERT INTO `question` VALUES ('32', null, '{\"0\":\"\",\"1\":\"\",\"2\":\"\",\"3\":\"\"}', '{\"0\":\"1\",\"1\":\"2\",\"2\":\"3\",\"3\":\"4\"}', null, '0※1', 'A', '<p>1111111</p>', '1', '0', '1080176', '0', '0', '190307', null, null, null, null, null, '0', '0', '190307', '1', '0', null, null, '0');
INSERT INTO `question` VALUES ('33', null, '{}', '{}', null, '0※1', '1111※1222', '<p>啊实打实水水____</p><hr><p>____</p>', '1', '0', '1080176', '0', '0', '190308', null, null, null, null, null, '0', '0', '190308', '2', '0', null, '0', '0');
INSERT INTO `question` VALUES ('34', null, '{}', '{}', '3', '0※1', '', '<p>顶顶顶顶顶顶点点滴滴水水水水</p>', '1', '0', '1080176', '0', '0', '190309', null, null, null, null, null, '0', '0', '190309', '11', '0', null, '0', '1');

-- ----------------------------
-- Table structure for `seat`
-- ----------------------------
DROP TABLE IF EXISTS `seat`;
CREATE TABLE `seat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `courseId` int(11) DEFAULT NULL,
  `seatArray` text,
  `courseAddress` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of seat
-- ----------------------------

-- ----------------------------
-- Table structure for `sign`
-- ----------------------------
DROP TABLE IF EXISTS `sign`;
CREATE TABLE `sign` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isGps` int(11) NOT NULL DEFAULT '0',
  `sign_student_count` int(11) NOT NULL DEFAULT '0',
  `ratio` int(11) NOT NULL DEFAULT '0' COMMENT '出勤率',
  `is_del` int(11) NOT NULL DEFAULT '0' COMMENT '删除标记，1：删除，0：未删除',
  `close_time` timestamp NULL DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `isQr` int(11) DEFAULT '0',
  `duration` int(11) DEFAULT NULL,
  `order` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sign
-- ----------------------------
INSERT INTO `sign` VALUES ('1', '2019-03-09 19:16:38', '1', '0', '0', '0', '2019-03-12 23:57:45', '1', '0', null, null);
INSERT INTO `sign` VALUES ('2', '2019-03-09 19:25:31', '1', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('3', '2019-03-09 19:48:16', '0', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('4', '2019-03-09 19:57:39', '1', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('5', '2019-03-09 20:01:03', '0', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('6', '2019-03-10 19:29:52', '1', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('7', '2019-03-11 22:31:21', '1', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('8', '2019-03-11 22:32:12', '0', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('9', '2019-03-11 22:32:37', '1', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('10', '2019-03-11 22:42:14', '1', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('11', '2019-03-11 22:44:49', '1', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('12', '2019-03-11 22:46:09', '0', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('13', '2019-03-11 22:53:20', '1', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('14', '2019-03-11 22:56:12', '1', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('15', '2019-03-11 22:56:56', '1', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('16', '2019-03-11 22:59:53', '1', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('17', '2019-03-11 23:14:36', '0', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('18', '2019-03-11 23:21:01', '0', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('19', '2019-03-11 23:25:07', '1', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('20', '2019-03-11 23:26:34', '1', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('21', '2019-03-11 23:43:08', '1', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('22', '2019-03-11 23:48:18', '1', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('23', '2019-03-11 23:49:12', '1', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('24', '2019-03-11 23:54:12', '1', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('25', '2019-03-11 23:58:56', '1', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('26', '2019-03-11 23:59:33', '1', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('27', '2019-03-12 00:00:14', '1', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('28', '2019-03-12 23:05:43', '1', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('29', '2019-03-12 23:13:06', '1', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('30', '2019-03-12 23:15:27', '1', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('31', '2019-03-12 23:18:51', '1', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('32', '2019-03-12 23:21:35', '1', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('33', '2019-03-12 23:23:42', '1', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('34', '2019-03-12 23:28:23', '1', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('35', '2019-03-12 23:34:02', '1', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('36', '2019-03-12 23:41:28', '1', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('37', '2019-03-12 23:42:57', '1', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('38', '2019-03-12 23:46:11', '1', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('39', '2019-03-12 23:54:00', '1', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('40', '2019-03-12 23:57:40', '1', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('41', '2019-03-13 00:04:21', '1', '0', '0', '0', '2019-03-13 00:04:27', '1', '0', null, null);
INSERT INTO `sign` VALUES ('42', '2019-03-13 00:08:40', '1', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('43', '2019-03-13 00:08:40', '1', '0', '0', '0', '2019-03-13 00:08:45', '1', '0', null, null);
INSERT INTO `sign` VALUES ('44', '2019-03-13 00:12:03', '1', '0', '0', '0', '2019-03-13 00:12:09', '1', '0', null, null);
INSERT INTO `sign` VALUES ('45', '2019-03-13 00:13:49', '1', '0', '0', '0', '2019-03-13 00:13:51', '1', '0', null, null);
INSERT INTO `sign` VALUES ('46', '2019-03-13 00:15:56', '1', '0', '0', '0', '2019-03-13 00:16:03', '1', '0', null, null);
INSERT INTO `sign` VALUES ('47', '2019-03-13 00:17:12', '1', '0', '0', '0', '2019-03-13 00:17:17', '1', '0', null, null);
INSERT INTO `sign` VALUES ('48', '2019-03-13 00:17:58', '1', '0', '0', '0', '2019-03-13 00:18:03', '1', '0', null, null);
INSERT INTO `sign` VALUES ('49', '2019-03-13 00:30:15', '0', '0', '0', '0', '2019-03-13 00:30:20', '1', '0', null, null);
INSERT INTO `sign` VALUES ('50', '2019-03-13 00:30:22', '1', '0', '0', '0', '2019-03-13 00:30:27', '1', '0', null, null);
INSERT INTO `sign` VALUES ('51', '2019-03-13 00:30:31', '0', '0', '0', '0', '2019-03-13 00:30:41', '1', '0', null, null);
INSERT INTO `sign` VALUES ('52', '2019-03-13 00:32:26', '0', '0', '0', '0', '2019-03-13 00:32:34', '1', '0', null, null);
INSERT INTO `sign` VALUES ('53', '2019-03-13 00:33:59', '0', '0', '0', '0', '2019-03-13 00:34:03', '1', '0', null, null);
INSERT INTO `sign` VALUES ('54', '2019-03-13 00:34:56', '1', '0', '0', '0', '2019-03-13 00:34:59', '1', '0', null, null);
INSERT INTO `sign` VALUES ('55', '2019-03-13 00:37:55', '0', '0', '0', '0', '2019-03-13 00:38:00', '1', '0', null, null);
INSERT INTO `sign` VALUES ('56', '2019-03-13 00:40:07', '0', '0', '0', '0', '2019-03-13 00:40:10', '1', '0', null, null);
INSERT INTO `sign` VALUES ('57', '2019-03-13 00:45:01', '0', '0', '0', '0', '2019-03-13 00:45:06', '1', '0', null, null);
INSERT INTO `sign` VALUES ('58', '2019-03-13 00:50:02', '0', '0', '0', '0', '2019-03-13 00:50:07', '1', '0', null, null);
INSERT INTO `sign` VALUES ('59', '2019-03-13 00:51:07', '0', '0', '0', '0', '2019-03-13 00:51:11', '1', '0', null, null);
INSERT INTO `sign` VALUES ('60', '2019-03-13 01:02:22', '0', '0', '0', '0', '2019-03-13 01:02:28', '1', '0', null, null);
INSERT INTO `sign` VALUES ('61', '2019-03-13 01:02:31', '0', '0', '0', '0', '2019-03-13 01:02:34', '1', '0', null, null);
INSERT INTO `sign` VALUES ('62', '2019-03-13 01:05:04', '0', '0', '0', '0', '2019-03-13 01:05:07', '1', '0', null, null);
INSERT INTO `sign` VALUES ('63', '2019-03-13 01:08:12', '1', '0', '0', '0', '2019-03-13 01:08:13', '1', '0', null, null);
INSERT INTO `sign` VALUES ('64', '2019-03-13 01:13:17', '0', '0', '0', '0', '2019-03-13 01:13:20', '1', '0', null, null);
INSERT INTO `sign` VALUES ('65', '2019-03-13 01:14:45', '0', '0', '0', '0', '2019-03-13 01:14:46', '1', '0', null, null);
INSERT INTO `sign` VALUES ('66', '2019-03-13 01:15:41', '0', '0', '0', '0', '2019-03-13 01:15:50', '1', '0', null, null);
INSERT INTO `sign` VALUES ('67', '2019-03-13 01:17:43', '0', '0', '0', '0', '2019-03-13 01:17:47', '1', '0', null, null);
INSERT INTO `sign` VALUES ('68', '2019-03-13 01:20:19', '0', '0', '0', '0', '2019-03-13 01:20:23', '1', '0', null, null);
INSERT INTO `sign` VALUES ('69', '2019-03-13 01:21:35', '0', '0', '0', '0', '2019-03-13 01:21:39', '1', '0', null, null);
INSERT INTO `sign` VALUES ('70', '2019-03-13 01:21:51', '0', '0', '0', '0', '2019-03-13 01:21:53', '1', '0', null, null);
INSERT INTO `sign` VALUES ('71', '2019-03-13 01:22:13', '0', '0', '0', '0', '2019-03-13 01:22:14', '1', '0', null, null);
INSERT INTO `sign` VALUES ('72', '2019-03-13 01:22:54', '0', '0', '0', '0', '2019-03-13 01:22:56', '1', '0', null, null);
INSERT INTO `sign` VALUES ('73', '2019-03-13 01:23:30', '0', '0', '0', '0', '2019-03-13 01:23:34', '1', '0', null, null);
INSERT INTO `sign` VALUES ('74', '2019-03-13 01:23:59', '0', '0', '0', '0', '2019-03-13 01:24:00', '1', '0', null, null);
INSERT INTO `sign` VALUES ('75', '2019-03-13 01:28:07', '0', '0', '0', '0', '2019-03-13 01:28:10', '1', '0', null, null);
INSERT INTO `sign` VALUES ('76', '2019-03-13 01:30:07', '0', '0', '0', '0', '2019-03-13 01:30:10', '1', '0', null, null);
INSERT INTO `sign` VALUES ('77', '2019-03-13 01:34:27', '0', '0', '0', '0', '2019-03-13 01:34:32', '1', '0', null, null);
INSERT INTO `sign` VALUES ('78', '2019-03-13 01:34:52', '0', '0', '0', '0', '2019-03-13 01:34:57', '1', '0', null, null);
INSERT INTO `sign` VALUES ('79', '2019-03-13 01:35:02', '1', '0', '0', '0', '2019-03-13 01:35:36', '1', '0', null, null);
INSERT INTO `sign` VALUES ('80', '2019-03-13 01:36:02', '0', '0', '0', '0', '2019-03-13 01:36:05', '1', '0', null, null);
INSERT INTO `sign` VALUES ('81', '2019-03-13 10:25:40', '0', '0', '0', '0', '2019-03-13 10:25:52', '1', '0', null, null);
INSERT INTO `sign` VALUES ('82', '2019-03-13 10:25:57', '1', '0', '0', '0', '2019-03-13 10:26:02', '1', '0', null, null);
INSERT INTO `sign` VALUES ('83', '2019-03-13 10:26:53', '0', '0', '0', '0', '2019-03-13 10:27:05', '1', '0', null, null);
INSERT INTO `sign` VALUES ('84', '2019-03-13 10:27:14', '0', '0', '0', '0', '2019-03-13 10:27:17', '1', '0', null, null);
INSERT INTO `sign` VALUES ('85', '2019-03-13 10:29:02', '0', '0', '0', '0', '2019-03-13 10:29:08', '1', '0', null, null);
INSERT INTO `sign` VALUES ('86', '2019-03-13 10:46:40', '0', '0', '0', '0', '2019-03-13 10:46:48', '1', '0', null, null);
INSERT INTO `sign` VALUES ('87', '2019-03-13 10:46:56', '1', '0', '0', '0', '2019-03-13 10:47:02', '1', '0', null, null);
INSERT INTO `sign` VALUES ('88', '2019-03-13 11:18:03', '0', '0', '0', '0', '2019-03-13 11:18:13', '1', '0', null, null);
INSERT INTO `sign` VALUES ('89', '2019-03-13 11:18:19', '1', '0', '0', '0', '2019-03-13 11:18:24', '1', '0', null, null);
INSERT INTO `sign` VALUES ('90', '2019-03-14 22:28:51', '0', '0', '0', '0', '2019-03-14 22:28:56', '1', '0', null, null);
INSERT INTO `sign` VALUES ('91', '2019-03-14 22:44:11', '0', '0', '0', '0', '2019-03-14 22:44:23', '1', '0', null, null);
INSERT INTO `sign` VALUES ('92', '2019-03-14 22:46:45', '1', '0', '0', '0', '2019-03-14 22:46:48', '1', '0', null, null);
INSERT INTO `sign` VALUES ('93', '2019-03-14 23:23:51', '0', '0', '0', '0', '2019-03-14 23:23:58', '1', '0', null, null);
INSERT INTO `sign` VALUES ('94', '2019-03-14 23:29:30', '0', '0', '0', '0', '2019-03-14 23:29:35', '1', '0', null, null);
INSERT INTO `sign` VALUES ('95', '2019-03-16 15:22:13', '0', '0', '0', '0', null, '1', '0', null, null);
INSERT INTO `sign` VALUES ('96', '2019-03-16 17:12:00', '0', '0', '0', '0', '2019-03-16 17:12:07', '1080176', '0', '7', null);
INSERT INTO `sign` VALUES ('97', '2019-03-16 17:44:58', '0', '0', '0', '0', '2019-03-16 17:45:01', '1080176', '0', '43', null);
INSERT INTO `sign` VALUES ('98', '2019-03-16 18:44:30', '1', '0', '0', '0', '2019-03-16 18:44:39', '1080176', '0', '9', null);
INSERT INTO `sign` VALUES ('99', '2019-03-16 18:48:51', '0', '0', '0', '0', '2019-03-16 18:48:58', '1080176', '0', '7', null);
INSERT INTO `sign` VALUES ('100', '2019-03-16 18:51:23', '0', '0', '0', '0', '2019-03-16 18:51:31', '1080176', '0', '8', null);
INSERT INTO `sign` VALUES ('101', '2019-03-16 18:52:49', '0', '0', '0', '0', '2019-03-16 18:53:15', '1080176', '0', '66', null);
INSERT INTO `sign` VALUES ('102', '2019-03-16 18:53:24', '0', '0', '0', '0', null, '1080176', '0', null, null);
INSERT INTO `sign` VALUES ('103', '2019-03-17 16:52:19', '0', '0', '0', '0', '2019-03-17 16:52:26', '1080176', '0', '7', null);
INSERT INTO `sign` VALUES ('104', '2019-03-17 19:16:40', '0', '0', '0', '0', '2019-03-17 19:16:42', '1080176', '0', '2', null);

-- ----------------------------
-- Table structure for `student`
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `teamId` int(11) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `courseId` int(11) DEFAULT NULL,
  `is_del` int(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES ('1', 'lhz', '1', 'http://www.baidu.com', '1', '0');
DROP TRIGGER IF EXISTS `auto_sn`;
DELIMITER ;;
CREATE TRIGGER `auto_sn` BEFORE INSERT ON `question` FOR EACH ROW BEGIN
  DECLARE
  n INT;
  SELECT
         IFNULL(MAX(RIGHT(serial_number,2)),0) INTO n
  from
       question
  WHERE
      MID(serial_number,1,4) = MID(DATE_FORMAT(now(),'%Y%m'),3,6);

  SET NEW.serial_number = CONCAT(
      MID(DATE_FORMAT(now(),'%Y%m'),3,6),
      RIGHT (101 + n,2)
  );

  SET NEW.code = CONCAT(
      MID(DATE_FORMAT(now(),'%Y%m'),3,6),
      RIGHT (101 + n,2)
  );

END
;;
DELIMITER ;
