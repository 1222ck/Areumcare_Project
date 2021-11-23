const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hospitalSchema = new Schema({
    Hname: {
    type: String,
    require: true,
  },
  ID: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  BLN: {
    type: Number,
    require: true
  },
  Tel: {
    type: Number,
    require: true
  }
}, {
    timestamps: true,
    collection: "Hospital Login Info"
});

const Hospital = new mongoose.model("Hospital", hospitalSchema)

module.exports = Hospital;