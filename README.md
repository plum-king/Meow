# MEOW

> 📝 게시글 형식으로 정보를 공유할 수 있는 SNS 형태의 맛집 추천 서비스 📝

> 카카오맵 api를 사용하기 때문에 애플리케이션 등록을 위해 ip주소를 알려주세요!

<br>

### 프로젝트 내용
---
- 게시글 형식의 맛집 추천 서비스를 제공하고자 한다. 자신이 경험한 맛집과 관련된 유익한 정보를 사진, 짧은 글, 태그, 종합적 만족도 평가 등을 포함한 게시글을 통해 다른 사람들과 공유할 수 있는 서비스이다.
- 짧은 글 후기는 맛집과 관련된 정보를 쉽고 빠르게 파악할 수 있도록 돕는다.

<br/>

**[ PART1 ] 이미 삽입해둔 데이터가 있는 GCP에 접근하여 서비스 사용하기**

<br />

1️⃣ Git Clone하기

```bash
git clone https://github.com/plum-king/Meow.git
```

2️⃣ MEOW 프로젝트 폴더로 이동하기

```bash
cd Meow/
```

3️⃣ 필요한 모듈 설치하기

```bash
npm install
```

4️⃣ 데이터베이스 관련 정보(db.js) app.js와 같은 위치에 저장하기

```bash
vi db.js
```

db.js는 메뉴얼을 참고해주세요!

<br>

5️⃣ 서버를 키고 애플리케이션에 접근하기(80번 포트)

```bash
sudo node app
```

6️⃣ 현재 사용 중인 서버 ip주소로 MEOW 서비스 이용하기

<br>

**[ PART 2 ] 데이터베이스부터 구축하고 빈 환경에서 서비스 시작하기**

<br>

1️⃣ Git Clone하기

```bash
git clone https://github.com/plum-king/Meow.git
```

2️⃣ MEOW 프로젝트 폴더로 이동하기

```bash
cd Meow/
```

3️⃣ 필요한 모듈 설치하기

```bash
npm install
```

4️⃣ 데이터베이스 구축하기 (mysql server)
```bash
mysql -uroot -p
```
```sql
create database meow;
use meow;
source meow.sql
```

5️⃣ 데이터베이스 관련 정보(db.js) app.js와 같은 위치에 저장하기

```bash
vi db.js
```

```js
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "sql서버ip",
  port: "3306",
  user: "root가 아닌 유저",
  password: "해당 유저 비밀번호",
  database: "meow",
  dateStrings: "date",
});

module.exports = pool;
```

6️⃣ 서버를 키고 애플리케이션에 접근하기(80번 포트)

```bash
sudo node app
```

7️⃣ 현재 사용 중인 서버 ip주소로 MEOW 서비스 이용하기

<br>

### 📖 발표자료
---
[발표자료 보러가기](https://www.canva.com/design/DAFDqRWl4rI/view?utm_content=DAFDqRWl4rI&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink)

<br>

### 🎞 데모영상
---
[데모영상 보러가기](https://drive.google.com/file/d/1enbgJmbLRfVr7QisZcTZz7ukfqYkfTpt/view?usp=sharing)
