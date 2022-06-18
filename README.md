# MEOW
📝 게시글 형식으로 정보를 공유할 수 있는 SNS 형태의 맛집 추천 서비스 📝

<br/>

## PART1) 이미 삽입해둔 데이터가 있는 GCP에 접근하여 서비스 사용하기
1️⃣ Git Clone하기
``` bash
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
```js
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "35.232.161.189",
  port: "3306",
  user: "teamtwo",
  password: "password",
  database: "meow",
  dateStrings: "date",
});

module.exports = pool;
```

5️⃣ 서버를 키고 애플리케이션에 접근하기(80번 포트)
```bash
sudo node app
```

6️⃣ ip주소로 MEOW 서비스 이용 가능


## PART2) 데이터베이스부터 구축하고 빈 환경에서 서비스 시작하기

[발표자료]

https://www.canva.com/design/DAFDqRWl4rI/view?utm_content=DAFDqRWl4rI&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink
