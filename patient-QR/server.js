const express = require("express");
const bodyParser = require("body-parser");
const app = express(); //express 방식 사용
const qrCode = require("qrcode");
const MongoClient = require("mongodb").MongoClient; //몽고디비 사용
const url =
  "mongodb://areumteam:areumcare1234%21@3.38.102.194:27017/AREUM-CARE?authSource=admin"; //사용 디비 URL

var port = process.env.PORT || 4000; //사용 포트 번호

// ejs는 reder로 불러오기 때문에 파일 경로를 이렇게 서버쪽에 적어줘야 함
app.use(express.static(__dirname + '/img'));
app.use(express.static(__dirname + '/css'));

// server와 browser가 연결될때까지 기다리기
app.listen(port, function () {
  console.log("listening on 4000");
});

//몽고랑 연결짓기
MongoClient.connect(
  url,
  {
    useUnifiedTopology: true,
  },
  (err, database) => {
    if (err) {
      console.error("MongoDB 연결 실패", err);
      return;
    }
    console.log("Connected to Database");
    const db = database.db("AREUM-CARE"); //AREUM-CARE라는 디비의
    const userCollection = db.collection("Prescription"); //Prescription 컬렉션 사용 지정

    // app.use , app.get , app.post, app.listen 사용해서 db작업하기
    app.set("view engine", "ejs"); //ejs로 뷰 사용
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static("public"));
    app.use(bodyParser.json()); //json형태

    // '/'주소로 get 요청이 오면 index.ejs로 연결 후 화면 출력
    app.get("/", (req, res) => {
      res.render("index.ejs");
      console.log("인덱스페이지");
    });

    // '/'에서 post방식으로 req.body에 들어오는 값(병원제공 findId) 디비에서 찾고 있다면 find.ejs로 render
    app.get("/prescription", (req, res) => {
      userCollection //= db.collection("Prescription")
      .findOne({ findId: req.query.findId }) //body에 들어오는 값(입력창 id)을 찾아라
      .then((result) => {
        //그 후 결과값(result)이
        if (result == null) {
          //null 이라면 {IsUser(ejs에서 동작하기위함): false} 이고 {qrRes(큐알 생성):false}
          result = { IsUser: false };
          result.qrRes = false;
        } else if (result.findId === req.query.findId) {
            console.log(result);
            //result값(body에 들어오는 값 찾은 결과값)과 body(입력값)의 findId값이 같다면
            result.IsUser = true; //ejs에서 값을 받아오기 위함
            var qrmaker =
              // result.patientName + " / " + result.residentRegistrationNumber; //qr 생성(환자이름+주민번호)
              "http://localhost:4000/prescription?findId=" + req.query.findId
              
            let testUrl = ""; //qr생성 하는 함수
            qrCode.toDataURL(
              qrmaker,
              {
                errorCorrectionLevel: "H",
              },
              (err, url) => {
                res.render("find.ejs", { prescription: result, qrUrl: url }); //생성한 큐알 값을 find.ejs에 뿌려줌
              }
            );
          }
          if (err) {
            throw err; //에러나면 에러뿌리기
          }
        })
        .catch((error) => console.error(error)); //에러시 콘솔에 로그 뿌리기
    });
  }
);
