/*
 Navicat Premium Data Transfer

 Source Server         : 我的数据库
 Source Server Type    : MySQL
 Source Server Version : 50553
 Source Host           : localhost:3306
 Source Schema         : essayserver

 Target Server Type    : MySQL
 Target Server Version : 50553
 File Encoding         : 65001

 Date: 05/05/2021 20:50:48
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_esperanto_ci NOT NULL,
  `password` varchar(20) CHARACTER SET utf8 COLLATE utf8_esperanto_ci NOT NULL,
  `id` bigint(100) NOT NULL AUTO_INCREMENT,
  `createtime` bigint(15) NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_esperanto_ci NULL DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_esperanto_ci NOT NULL,
  `descpt` varchar(100) CHARACTER SET utf8 COLLATE utf8_esperanto_ci NULL DEFAULT NULL,
  `colum` varchar(255) CHARACTER SET utf8 COLLATE utf8_esperanto_ci NULL DEFAULT NULL,
  `columnid` bigint(100) UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 10098 CHARACTER SET = utf8 COLLATE = utf8_esperanto_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
