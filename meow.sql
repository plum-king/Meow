-- user
CREATE TABLE `user` (
  `user_id` varchar(10) NOT NULL,
  `name` varchar(10) NOT NULL,
  `nickname` varchar(20) NOT NULL,
  `password` varchar(70) DEFAULT NULL,
  `age` int NOT NULL,
  `gender` varchar(2) NOT NULL,
  `job` varchar(30) NOT NULL,
  `home` varchar(30) DEFAULT NULL,
  `introduction` varchar(80) DEFAULT NULL,
  `subs_num` int DEFAULT '0',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- place
CREATE TABLE `place` (
  `place_num` int NOT NULL AUTO_INCREMENT,
  `place_name` varchar(30) NOT NULL,
  `place_loc` varchar(30) NOT NULL,
  PRIMARY KEY (`place_num`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- menu
CREATE TABLE `menu` (
  `menu_name` varchar(15) NOT NULL,
  `price` int NOT NULL,
  `place_num` int NOT NULL,
  PRIMARY KEY (`place_num`,`menu_name`),
  CONSTRAINT `menu_ibfk_1` FOREIGN KEY (`place_num`) REFERENCES `place` (`place_num`) ON DELETE CASCADE,
  CONSTRAINT `menu_chk_1` CHECK ((`price` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- tag
CREATE TABLE `tag` (
  `tag_num` int NOT NULL AUTO_INCREMENT,
  `tag_cont` varchar(10) NOT NULL,
  PRIMARY KEY (`tag_num`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- subscribe
CREATE TABLE `subscribe` (
  `subs_num` int NOT NULL AUTO_INCREMENT,
  `user_id1` varchar(10) NOT NULL,
  `user_id2` varchar(10) NOT NULL,
  PRIMARY KEY (`subs_num`),
  KEY `user_id1` (`user_id1`),
  KEY `user_id2` (`user_id2`),
  CONSTRAINT `subscribe_ibfk_1` FOREIGN KEY (`user_id1`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `subscribe_ibfk_2` FOREIGN KEY (`user_id2`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- post
CREATE TABLE `post` (
  `post_num` int NOT NULL AUTO_INCREMENT,
  `receipt_photo` varchar(100) DEFAULT NULL,
  `place_photo` varchar(100) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `place_satisfy` int NOT NULL,
  `view_count` int NOT NULL,
  `place_num` int NOT NULL,
  `menu_name` varchar(30) NOT NULL,
  `user_id` varchar(10) NOT NULL,
  `tag_num` int NOT NULL,
  PRIMARY KEY (`post_num`),
  KEY `place_num` (`place_num`),
  KEY `user_id` (`user_id`),
  KEY `tag_num` (`tag_num`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`place_num`) REFERENCES `place` (`place_num`) ON DELETE CASCADE,
  CONSTRAINT `post_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `post_ibfk_3` FOREIGN KEY (`tag_num`) REFERENCES `tag` (`tag_num`) ON DELETE CASCADE,
  CONSTRAINT `post_chk_1` CHECK ((`place_satisfy` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- shortreview
CREATE TABLE `shortreview` (
  `review_num` int NOT NULL AUTO_INCREMENT,
  `post_num` int NOT NULL,
  `review_cont1` varchar(30) NOT NULL,
  `review_cont2` varchar(30) DEFAULT NULL,
  `review_cont3` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`review_num`,`post_num`),
  KEY `post_num` (`post_num`),
  CONSTRAINT `shortreview_ibfk_1` FOREIGN KEY (`post_num`) REFERENCES `post` (`post_num`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- satisfy
CREATE TABLE `satisfy` (
  `s_num` int NOT NULL AUTO_INCREMENT,
  `s_pct1` int NOT NULL,
  `s_pct2` int DEFAULT NULL,
  `s_pct3` int DEFAULT NULL,
  `post_num` int NOT NULL,
  `review_num` int NOT NULL,
  `user_id` varchar(10) NOT NULL,
  PRIMARY KEY (`s_num`,`post_num`,`review_num`),
  KEY `post_num` (`post_num`),
  KEY `review_num` (`review_num`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `satisfy_ibfk_1` FOREIGN KEY (`post_num`) REFERENCES `post` (`post_num`) ON DELETE CASCADE,
  CONSTRAINT `satisfy_ibfk_2` FOREIGN KEY (`review_num`) REFERENCES `shortreview` (`review_num`) ON DELETE CASCADE,
  CONSTRAINT `satisfy_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `satisfy_chk_1` CHECK ((`s_pct1` > 0)),
  CONSTRAINT `satisfy_chk_2` CHECK ((`s_pct2` > 0)),
  CONSTRAINT `satisfy_chk_3` CHECK ((`s_pct3` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- qna
CREATE TABLE `qna` (
  `qna_num` int NOT NULL AUTO_INCREMENT,
  `post_num` int NOT NULL,
  `qna_cont` varchar(50) NOT NULL,
  `qna_ans` varchar(50) DEFAULT NULL,
  `user_id` varchar(10) NOT NULL,
  PRIMARY KEY (`qna_num`,`post_num`),
  KEY `user_id` (`user_id`),
  KEY `post_num` (`post_num`),
  CONSTRAINT `qna_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `qna_ibfk_2` FOREIGN KEY (`post_num`) REFERENCES `post` (`post_num`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- scrap
CREATE TABLE `scrap` (
  `user_id` varchar(10) NOT NULL,
  `post_num` int NOT NULL,
  PRIMARY KEY (`user_id`,`post_num`),
  KEY `post_num` (`post_num`),
  CONSTRAINT `scrap_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `scrap_ibfk_2` FOREIGN KEY (`post_num`) REFERENCES `post` (`post_num`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;