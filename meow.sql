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

-- insert data

-- user 관련 데이터
INSERT INTO user(user_id, name, nickname, password, age, gender, job, home, introduction) VALUES ("jisoo", "황지수", "지수", "$2b$10$4o12hQoXCDyOECQyAuAQzeG4VS5rySlZFYwNFpmC0bp5kHqk7fITC", 20, "여", "학생", "고양시", "안녕하세요");
INSERT INTO user(user_id, name, nickname, password, age, gender, job) VALUES ('wyoung', '최우영', '우영', '$2b$10$n8aTq1ZP1MXLYyQwt9hGNubHZvhy.UOp.KvsatprrcxR66WU93Dbe', 20, '여', '학생');
INSERT INTO user(user_id, name, nickname, password, age, gender, job) VALUES ('uran', '김유란', '유란', '$2b$10$RZngKubvAvBEoj6TZhBYL.v5x4ICT6GDRPRtY8xiJst/QUs9UQ3J6', 10, '여', '학생');

-- tag 관련 데이터
INSERT INTO tag(tag_num, tag_cont) VALUES (1, "삼겹살 맛집");
INSERT INTO tag(tag_num, tag_cont) VALUES (2, "철판볶음 맛집");
INSERT INTO tag(tag_num, tag_cont) VALUES (3, "가성비 별로");
INSERT INTO tag(tag_num, tag_cont) VALUES (4, "꿔바로우 맛집");
INSERT INTO tag(tag_num, tag_cont) VALUES (5, "화려한 인테리어");
INSERT INTO tag(tag_num, tag_cont) VALUES (6, "가성비 맛집");
INSERT INTO tag(tag_num, tag_cont) VALUES (7, "유명한 닭갈비 맛집");
INSERT INTO tag(tag_num, tag_cont) VALUES (8, "딤섬 맛집");
INSERT INTO tag(tag_num, tag_cont) VALUES (9, "김밥이 엄청 큼");
INSERT INTO tag(tag_num, tag_cont) VALUES (10, "코다차야느낌의일식당");
INSERT INTO tag(tag_num, tag_cont) VALUES (11, "내부가 크고 쾌적함");

-- place 관련 데이터
INSERT INTO place VALUES (1, "김과장고깃집", "경기 성남시 수정구 산성대로255번길 14-1");
INSERT INTO place VALUES (2, "누들스", "서울 광진구 능동로 92");
INSERT INTO place VALUES (3, "도우터", "서울 광진구 아차산로31길 40");
INSERT INTO place VALUES (4, "라라면가", "서울 성북구 동소문로22길 57-25");
INSERT INTO place VALUES (5, "미가훠궈양고기", "경기 용인시 수지구 풍덕천로140번길 15");
INSERT INTO place VALUES (6, "버거파크", "서울 성북구 동소문로22길 56");
INSERT INTO place VALUES (7, "비와별닭갈비", "경기 용인시 수지구 성복2로 38");
INSERT INTO place VALUES (8, "빠오즈푸",  "서울 광진구 광나루로 373");
INSERT INTO place VALUES (9, "수아당", "서울 성북구 동소문로20가길 33");
INSERT INTO place VALUES (10, "요루히루", "경기 용인시 기흥구 죽전로15번길 15-6");
INSERT INTO place VALUES (11, "이모네집", "강원 양양군 서면 약수길 35");

-- menu 관련 데이터
INSERT INTO menu VALUES ("삼겹살", 8900, 1);
INSERT INTO menu VALUES ("팟타이", 7500, 2);
INSERT INTO menu VALUES ("브런치 플레이트", 21800, 3);
INSERT INTO menu VALUES ("황도꿔바로우", 9500, 4);
INSERT INTO menu VALUES ("훠궈B세트", 59000, 5);
INSERT INTO menu VALUES ("머쉬룸치즈버거세트", 8160, 6);
INSERT INTO menu VALUES ("닭갈비 커플세트", 31000, 7);
INSERT INTO menu VALUES ("고기빠오즈", 7000, 8);
INSERT INTO menu VALUES ("치치불 김밥", 5000, 9);
INSERT INTO menu VALUES ("연어아보카도동", 18000, 10);
INSERT INTO menu VALUES ("이모네 정식", 18000, 11);

-- post 관련 데이터
INSERT INTO post(post_num, receipt_photo, place_photo, place_satisfy, view_count, place_num, menu_name, user_id, tag_num) VALUES (1, "/images/김과장 고깃집 영수증1655523606774.jpg", "/images/김과장 고깃집1655523606758.jpg", 88, 0, 1, "삼겹살", "uran", 1);
INSERT INTO post(post_num, receipt_photo, place_photo, place_satisfy, view_count, place_num, menu_name, user_id, tag_num) VALUES (2, "/images/누들스 영수증1655524211176.jpg", "/images/누들스1655524211161.jpg", 99, 0, 2, "팟타이", "uran", 2);
INSERT INTO post(post_num, receipt_photo, place_photo, place_satisfy, view_count, place_num, menu_name, user_id, tag_num) VALUES (3, "/images/도우터 영수증1655524556399.jpg", "/images/도우터1655524556336.jpg", 84, 0, 3, "브런치 플레이트", "uran", 3);
INSERT INTO post(post_num, receipt_photo, place_photo, place_satisfy, view_count, place_num, menu_name, user_id, tag_num) VALUES (4, "/images/라라면가 영수증1655525105709.png", "/images/라라면가1655525105693.png", 88, 0, 4, "황도꿔바로우", "wyoung", 4);
INSERT INTO post(post_num, receipt_photo, place_photo, place_satisfy, view_count, place_num, menu_name, user_id, tag_num) VALUES (5, "/images/미가훠궈양고기 영수증1655526835826.jpg", "/images/미가훠궈양고기1655526835823.jpg", 80, 0, 5, "훠궈B세트", "wyoung", 5);
INSERT INTO post(post_num, receipt_photo, place_photo, place_satisfy, view_count, place_num, menu_name, user_id, tag_num) VALUES (6, "/images/버거파크 영수증1655525032068.jpg", "/images/버거파크 음식 사진1655525032046.jpg", 93, 0, 6, "머쉬룸치즈버거세트", "wyoung", 6);
INSERT INTO post(post_num, receipt_photo, place_photo, place_satisfy, view_count, place_num, menu_name, user_id, tag_num) VALUES (7, "/images/비와별닭갈비 영수증1655524352898.jpg", "/images/비와별닭갈비1655524352893.jpg", 77, 0, 7, "닭갈비 커플세트", "wyoung", 7);
INSERT INTO post(post_num, receipt_photo, place_photo, place_satisfy, view_count, place_num, menu_name, user_id, tag_num) VALUES (8, "/images/빠오즈푸 영수증1655523951177.jpg", "/images/빠오즈푸1655523951146.jpg", 89, 0, 8, "고기빠오즈", "jisoo", 8);
INSERT INTO post(post_num, receipt_photo, place_photo, place_satisfy, view_count, place_num, menu_name, user_id, tag_num) VALUES (9, "/images/수아당 영수증1655524056707.jpg", "/images/수아당1655524056679.png", 90, 0, 9, "치치불 김밥", "jisoo", 9);
INSERT INTO post(post_num, receipt_photo, place_photo, place_satisfy, view_count, place_num, menu_name, user_id, tag_num) VALUES (10, "/images/요루히루 영수증1655524453816.png", "/images/요루히루1655524453805.png", 70, 0, 10, "연어아보카도동", "jisoo", 10);
INSERT INTO post(post_num, receipt_photo, place_photo, place_satisfy, view_count, place_num, menu_name, user_id, tag_num) VALUES (11, "/images/이모네집 영수증1655524211020.jpg", "/images/이모네집1655524210986.jpg", 78, 0, 11, "이모네 정식", "jisoo", 11);

-- shortreview 관련 데이터
INSERT INTO shortreview(review_num, post_num, review_cont1, review_cont2, review_cont3) VALUES (1, 1, "삼겹살이랑 항정살 맛집", "골목길에 있어 찾기 어려움", "음식이 빨리 나옴");
INSERT INTO shortreview(review_num, post_num, review_cont1, review_cont2, review_cont3) VALUES (2, 2, "가성비가 좋아요", "양이 넘쳐요", "음식 간이 세요");
INSERT INTO shortreview(review_num, post_num, review_cont1, review_cont2, review_cont3) VALUES (3, 3, "다양한 메뉴가 있음", "플레이팅이 예쁨", "분위기가 깔끔함");
INSERT INTO shortreview(review_num, post_num, review_cont1, review_cont2, review_cont3) VALUES (4, 4, "꿔바로우 겉바속촉", "매장이 깔끔함", "사장님이 친절하세요");
INSERT INTO shortreview(review_num, post_num, review_cont1, review_cont2, review_cont3) VALUES (5, 5, "꿔바로우 맛있음", "분위기가 좋아요", "웨이팅 줄이 길다");
INSERT INTO shortreview(review_num, post_num, review_cont1, review_cont2, review_cont3) VALUES (6, 6, "가성비가 좋음", "양이 많음", "분위기가 쾌적함");
INSERT INTO shortreview(review_num, post_num, review_cont1, review_cont2, review_cont3) VALUES (7, 7, "모짜렐라 치즈랑 같이 먹으면 맛있음", "볶음밥이 맛있음", "음식 간이 적당함");
INSERT INTO shortreview(review_num, post_num, review_cont1, review_cont2, review_cont3) VALUES (8, 8, "호불호 갈릴 수 있음", "가성비 좋다", "개인적으로는 맛있음");
INSERT INTO shortreview(review_num, post_num, review_cont1, review_cont2, review_cont3) VALUES (9, 9, "양이 많음", "가성비 좋다", "간단히 먹기 좋다");
INSERT INTO shortreview(review_num, post_num, review_cont1, review_cont2, review_cont3) VALUES (10, 10, "의자가 붙어있어 불편함", "가격이 비쌈", "연어 많이 못먹으면 먹기 힘들듯");
INSERT INTO shortreview(review_num, post_num, review_cont1, review_cont2, review_cont3) VALUES (11, 11, "한정식 좋아한다면 무난하게 잘 먹을 수 있음", "반찬 수가 많음", "가족들이랑 오기 좋음");