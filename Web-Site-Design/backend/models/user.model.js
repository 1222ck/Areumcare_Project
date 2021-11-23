const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// 스키마(db의 형식?) 설정
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 2
    },
    residentRegistrationNumber: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true }
}, {
    timestamps: true,
    collection: "HOSPITAL-A"
});

// .model로 스키마 등록
const User = mongoose.model('User', userSchema);

module.exports = User;