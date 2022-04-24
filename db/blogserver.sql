/*
 Navicat Premium Data Transfer

 Source Server         : admin
 Source Server Type    : MySQL
 Source Server Version : 80025
 Source Host           : localhost:3306
 Source Schema         : blogserver

 Target Server Type    : MySQL
 Target Server Version : 80025
 File Encoding         : 65001

 Date: 24/04/2022 15:56:42
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '文章ID',
  `title` varchar(255) NOT NULL COMMENT '文章标题',
  `arcontext` longtext COMMENT '文章内容',
  `createtime` datetime DEFAULT NULL COMMENT '创建时间',
  `userid` int DEFAULT NULL COMMENT '用户ID',
  `state` int DEFAULT '0' COMMENT '删除状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of article
-- ----------------------------
BEGIN;
INSERT INTO `article` (`id`, `title`, `arcontext`, `createtime`, `userid`, `state`) VALUES (1, 'vue入门', '<h1>测试vue</h1>', '2022-04-23 18:44:21', 1002, 0);
INSERT INTO `article` (`id`, `title`, `arcontext`, `createtime`, `userid`, `state`) VALUES (2, 'vue入门', '<h1>测试vue</h1>', '2022-04-23 19:21:44', 1002, 0);
INSERT INTO `article` (`id`, `title`, `arcontext`, `createtime`, `userid`, `state`) VALUES (3, 'vue入门', '<h1>测试vue</h1>', '2022-04-23 19:22:02', 1002, 0);
INSERT INTO `article` (`id`, `title`, `arcontext`, `createtime`, `userid`, `state`) VALUES (4, 'vue入门', '<h1>测试vue</h1>', '2022-04-23 19:23:49', 1002, 0);
INSERT INTO `article` (`id`, `title`, `arcontext`, `createtime`, `userid`, `state`) VALUES (5, 'vue入门', '<h1>测试vue</h1>', '2022-04-23 19:30:35', 1002, 0);
INSERT INTO `article` (`id`, `title`, `arcontext`, `createtime`, `userid`, `state`) VALUES (6, 'react入门', '<h1>JXL</h1>', '2022-04-23 19:55:08', 1002, 0);
COMMIT;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '评论id',
  `cocontext` varchar(255) DEFAULT NULL COMMENT '评论内容',
  `userid` int NOT NULL COMMENT '用户ID',
  `articleid` int NOT NULL COMMENT '文章ID',
  `createtime` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of comment
-- ----------------------------
BEGIN;
INSERT INTO `comment` (`id`, `cocontext`, `userid`, `articleid`, `createtime`) VALUES (1, '测试01', 1002, 6, '2022-04-24 15:05:07');
INSERT INTO `comment` (`id`, `cocontext`, `userid`, `articleid`, `createtime`) VALUES (2, '测试02', 1002, 7, '2022-04-07 15:16:48');
INSERT INTO `comment` (`id`, `cocontext`, `userid`, `articleid`, `createtime`) VALUES (3, 'ces03', 1003, 6, '2022-04-05 15:19:14');
INSERT INTO `comment` (`id`, `cocontext`, `userid`, `articleid`, `createtime`) VALUES (4, 'ces04', 1004, 6, '2022-04-15 15:19:30');
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `nickname` varchar(255) NOT NULL COMMENT '用户昵称',
  `headimg` varchar(255) DEFAULT NULL COMMENT '用户头像',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1009 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` (`id`, `username`, `password`, `nickname`, `headimg`) VALUES (1002, 'admin2', 'a6d08e7766a732e6e9036d5e973ef640', '羡羡2', 'https://gitee.com/xyhcodefilter/pic-go/raw/d514d8913c873b3c86329cb7d6f0cfbd18abab95/image/202204212057941.png');
INSERT INTO `user` (`id`, `username`, `password`, `nickname`, `headimg`) VALUES (1003, 'admin3', 'a6d08e7766a732e6e9036d5e973ef640', '羡羡3', NULL);
INSERT INTO `user` (`id`, `username`, `password`, `nickname`, `headimg`) VALUES (1004, 'admin4', 'a6d08e7766a732e6e9036d5e973ef640', '羡羡4', NULL);
INSERT INTO `user` (`id`, `username`, `password`, `nickname`, `headimg`) VALUES (1005, 'admin5', 'a6d08e7766a732e6e9036d5e973ef640', '羡羡5', NULL);
INSERT INTO `user` (`id`, `username`, `password`, `nickname`, `headimg`) VALUES (1006, 'admin6', 'a6d08e7766a732e6e9036d5e973ef640', '羡羡6', 'https://gitee.com/xyhcodefilter/pic-go/raw/d514d8913c873b3c86329cb7d6f0cfbd18abab95/image/202204212057941.png');
INSERT INTO `user` (`id`, `username`, `password`, `nickname`, `headimg`) VALUES (1007, 'admin7', 'a6d08e7766a732e6e9036d5e973ef640', '羡羡7', 'https://gitee.com/xyhcodefilter/pic-go/raw/d514d8913c873b3c86329cb7d6f0cfbd18abab95/image/202204212057941.png');
INSERT INTO `user` (`id`, `username`, `password`, `nickname`, `headimg`) VALUES (1008, 'admin8', 'a6d08e7766a732e6e9036d5e973ef640', '羡羡8', 'https://gitee.com/xyhcodefilter/pic-go/raw/d514d8913c873b3c86329cb7d6f0cfbd18abab95/image/202204212057941.png');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
