const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// 스키마(db의 형식?) 설정
const prescriptionSchema = new Schema({
    issueDate: {type: String, required: true},
    patientName: { type: String, required: true},
    residentRegistrationNumber: { type: String, required: true},
    hospitalName: { type: String, required: true},
    hospitalPhoneNumber: { type: String, required: true}, 
    faxNumber: { type: String, required: true}, 
    email: { type: String, required: true}, 
    prescriptionDrug: { type: String, required: true}, 
    prescriptionDosage: { type: String, required: true}, 
    prescriptionFrequency: { type: String, required: true}, 
    prescriptionDays: { type: String, required: true}, 
    prescriptionUsage: { type: String, required: true}, 
    injection: { type: String, required: true}, 
    injectionDosage: { type: String, required: true}, 
    injectionFrequency: { type: String, required: true}, 
    injectionDays: { type: String, required: true}, 
    injectionUsage: { type: String, required: true}, 
    periodOfUse: { type: String, required: true}, 
    memo: { type: String},
    token: { type: String, required: true},
    findId: {type: String, require: true}
}, {
    timestamps: true,
    collection: "Prescription"
});

// .model로 스키마 등록
const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;