const router = require('express').Router();

// 작성한 model을 연결
let User = require('../models/user.model');

router.route('/').get( (req, res) => {
    // 저장된 모든 User를 가져온다 (mongoDB 명령)
    User.find()
        // json 형식으로 반환한다
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// 슬래시 뒤에 add가 오면 POST 요청 실행
router.route('/add').post( (req, res) => {
    const username = req.body.username;
    const residentRegistrationNumber = req.body.residentRegistrationNumber;
    const patientPhoneNumber = req.body.patientPhoneNumber;
    const address = req.body.address;
    
    // 위의 변수로 새로운 User를 등록
    const newUser = new User({
        username,
        residentRegistrationNumber,
        patientPhoneNumber,
        address
    });

    // .save로 db에 저장
    newUser.save()
        // 추가된 후 json으로 추가된 사용자 반환 그렇지 않으면 오류메세지
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// id는 mongoDB에서 자동으로 생성되는 객체 id
router.route('/:id').get( (req, res) => {
    // 해당 id에 대한 User만 반환
    User.findById(req.params.id)
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error:' + err));
});

// 해당 id의 정보를 UPDATE
router.route('/update/:id').post( (req, res) => {
    // id를 찾고    // URL을 매개변수로 전달
    User.findById(req.params.id)
        .then(users => {
            // 기존에 DB에 있던거   // 새로운 정보를 기존 DB정보에 할당(이름을 똑같이 해주기)
            users.username = req.body.username;
            users.residentRegistrationNumber = Date.parse(req.body.residentRegistrationNumber);
            users.phoneNumber = req.body.phoneNumber;
            users.address = req.body.address;

            // DB에 저장
            users.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// 라우터 내보내기
module.exports = router;