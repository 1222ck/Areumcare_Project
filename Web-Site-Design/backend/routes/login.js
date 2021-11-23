const router = require('express').Router();

let Hospital = require('../models/login.model');

router.route("/login").post( (req, res)=> {
    const { ID, password} = req.body
    Hospital.findOne({ ID: ID}, (err, hospital) => {
        if(hospital){
            if(password === hospital.password ) {
                res.send({message: "Welcome to AreumCare!", location: "/admin/tables", hospital: hospital})
            } else {
                res.send({ message: "패스워드를 다시 확인하세요!", location: "/"})
            }
        } else {
            res.send({message: "회원가입 먼저 해주세요!", location: "/"})
        }
    })
});

router.route("/register").post( (req, res)=> {
    const { Hname, ID, password, BLN, Tel} = req.body
    console.log(Hname, ID, password, BLN, Tel)
    Hospital.findOne({ID: ID}, (err, hospital) => {
        if(hospital){
            res.send({message: "이미 회원입니다!"})
        } else {
            const hospital = new Hospital({
                Hname,
                ID,
                password,
                BLN,
                Tel,
            })
            hospital.save(err => {
                if(err) {
                    res.send(err)
                } else {
                    res.send( { message: "회원가입이 완료되었습니다 :)", location: "/" })
                }
            })
        }
    })
});
router.route('/read').get( async (req, res) => {
  TestModel.find({}, (err, result) => {
    if (err) {
      res.send(err)
    }
    res.send(result);
  })

});

module.exports = router;