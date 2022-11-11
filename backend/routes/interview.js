var express = require("express");
const Interviews = require("../models/Interview");
var scheduleRouter = express.Router();
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const Participants = require("../models/participant");
/* GET users listing. */
const sendEmail = async(email , date , st ,et) => {
console.log(email);
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
 service:'gmail',
 host:'smtp.gmail.com',
 port:465,
  auth: {
    user: 'swarnimgupta2000@gmail', // generated ethereal user
    pass: 'symzwzqstefvxczv', // generated ethereal password
  },
});
transporter.sendMail({
  from: 'swarnimgupta2000@gmail', // sender address
  to: {email}, // list of receivers
  subject: "Interview", // Subject line
  html: `<b>Hola! Your Interview is Scheduled with Us on ${new Date(date).toLocaleDateString()} from ${new Date(st).toLocaleTimeString()} to ${new Date(et).toLocaleTimeString()}</b>`, // html body
},(err , info) => {
  if(err)
  console.log(err);
  else
  console.log(info);
})
}
scheduleRouter.post("/addinterview", async (req, res) => {
  const { selected, date, st, et, title } = req.body;
  console.log(date, st, et, title);
  try {
    let doc = await Interviews.find({
      $or: [
        { $and: [{ StartTime: { $lte: st } }, { EndTime: { $gte: st } }] },
        { $and: [{ StartTime: { $lte: et } }, { EndTime: { $gte: et } }] },
      ],
    });
    console.log(doc);
    if (doc.length != 0) return res.send({ error: "Time Slot is Unavailable" });
    const interview = new Interviews({
      Date: date,
      StartTime: st,
      EndTime: et,
      Participant: selected,
      Reason: title,
    });
    const inter = await interview.save();
    const doc2 = await Participants.find({Name : selected});
    console.log(doc2);
    // let email = doc2[0].Email;
    // console.log(email);
    // await sendEmail(email , date , st , et);
    return res.json(inter);
  } catch (err) {
    console.log(err);
  }
});

scheduleRouter.get("/allinterview", (req, res) => {
  Interviews.find()
    .then((data) => {
      res.json(data);
    })
    .catch((e) => {
      console.log(e);
    });
});

scheduleRouter.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("HEL:LLO", id);
    const doc = await Interviews.findByIdAndDelete(id);
    const doc2 = await Interviews.find()
    res.json(doc2);
  } catch (err) {
    console.log(err);
  }
});
module.exports = scheduleRouter;
