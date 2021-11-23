const router = require('express').Router();
// 작성한 model을 연결
let Prescription = require('../models/prescription.model');

router.route('/:id').get( (req, res) => {
    // 저장된 모든 prescription를 가져온다 (mongoDB 명령)
    Prescription.find({ token: req.params.id})
        // json 형식으로 반환한다
        .then(prescription => res.json(prescription))
        .catch(err => res.status(400).json('Error: ' + err));
});

// 슬래시 뒤에 add가 오면 POST 요청 실행하도록
router.route('/add').post( (req, res) => {
    const issueDate = req.body.issueDate;
    const patientName = req.body.patientName;
    const residentRegistrationNumber = req.body.residentRegistrationNumber;
    const hospitalName = req.body.hospitalName;
    const hospitalPhoneNumber = req.body.hospitalPhoneNumber;
    const faxNumber = req.body.faxNumber;
    const email = req.body.email;
    const prescriptionDrug = req.body.prescriptionDrug;
    const prescriptionDosage = req.body.prescriptionDosage;
    const prescriptionFrequency = req.body.prescriptionFrequency;
    const prescriptionDays = req.body.prescriptionDays;
    const prescriptionUsage = req.body.prescriptionUsage;
    const injection = req.body.injection;
    const injectionDosage = req.body.injectionDosage;
    const injectionFrequency = req.body.injectionFrequency;
    const injectionDays = req.body.injectionDays;
    const injectionUsage = req.body.injectionUsage;
    const periodOfUse = req.body.periodOfUse;
    const memo = req.body.memo;
    const token = req.body.token;
    const findId = req.body.findId;

    // 위의 변수로 새로운 Prescription를 등록
    const newPrescription = new Prescription({
        issueDate,
        patientName,
        residentRegistrationNumber,
        hospitalName,
        hospitalPhoneNumber,
        faxNumber,
        email,
        prescriptionDrug,
        prescriptionDosage,
        prescriptionFrequency,
        prescriptionDays,
        prescriptionUsage,
        injection,
        injectionDosage,
        injectionFrequency,
        injectionDays,
        injectionUsage,
        periodOfUse,
        memo,
        token,
        findId
    });

    // .save로 db에 저장
    newPrescription.save()
        // 추가된 후 json으로 추가된 사용자 반환 그렇지 않으면 오류메세지
        .then(() => res.json('Prescription added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// id는 mongoDB에서 자동으로 생성되는 객체 id
router.route('/edit/:id').get( (req, res) => {
    // 해당 id에 대한 Prescription만 반환
    Prescription.findById(req.params.id)
        .then(prescription => res.json(prescription))
        .catch(err => res.status(400).json('Error:' + err));
});
// 위는 GET 요청이었지만 여기는 DELETE 요청
router.route('/:id').delete( (req, res) => {
    // id를 찾아서 데이터베이스에서 삭제    // params.id의 URL에서 바로 가져옴
    Prescription.findByIdAndDelete(req.params.id)
        .then(() => res.json("Prescription deleted!"))
        .catch(err => res.status(400).json('Error: ' + err));
});

// 해당 id의 정보를 UPDATE
router.route('/update/:id').post( (req, res) => {
    // id를 찾고    // URL을 매개변수로 전달
    Prescription.findById(req.params.id)
        .then(prescription => {
            // 기존에 DB에 있던거   // 새로운 정보를 기존 DB정보에 할당(이름을 똑같이 해주기)
            prescription.username = req.body.username;
            prescription.description = req.body.description;
            prescription.date = Date.parse(req.body.date);

            // DB에 저장
            prescription.save()
                .then(() => res.json('Prescription updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// 라우터 내보내기
module.exports = router;