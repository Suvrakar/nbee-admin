require('dotenv').config()
const express = require('express')
require('express-async-errors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path');
const nodemailer = require('nodemailer');

// const usersRouter = require('./src/routers/users.router')
const mailer = require('./src/routers/mailer.router')
const adminRouter = require('./src/routers/admin.router')

const MONGO_URL = 'mongodb+srv://suvra123:01711536682Suv@nutriotionbee.qqsv8.mongodb.net/nutriotionBee?retryWrites=true&w=majority';
const PORT = process.env.PORT || 4040;

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())


app.set('view-engine', 'ejs')
app.set('views', path.join(__dirname, './views'));


// app.use('/users', usersRouter)
app.use('/mail', mailer)
app.use('/admin', adminRouter)


app.get('/', (req, res) => res.send('Hello World!'))


app.get('/mailsend', (req, res) => {
  res.render("emailsend.ejs");
})

app.post('/mailsend', (req, res) => {

  try {
    const mailAddress = req.body.email;
    console.log(mailAddress, "kire baal mail addess");
    var mailTransporter = nodemailer.createTransport({
      host: "nutritionbee.net",
      port: 465,
      auth: {
        user: "info@nutritionbee.net",
        pass: "01770677688Suv"
      }
    });

    const sendRegMail = () => {
      const mailOptions = {
        from: 'info@nutritionbee.net',
        to: `${mailAddress}`,
        subject: 'Your Enrolment for NBEE101 has been Granted!',
        html: "<p>Dear Participant,<br><br> Kudos! You have successfully enrolled in our online course named Basic Diet Plan. Your access has been granted. From now on you can continue learning from this course anytime. If you found any difficulties, please knock at our page Nutrition Bee. Page link - https://www.facebook.com/nutritionbee </p><p>Best Regards</p> <img src=`https://course.nutritionbee.net/mainlogo.png` width=`100px`>"
      };

      mailTransporter.sendMail(mailOptions, function (err, data) {
        if (err) {
          console.log(err);
        } else {
          console.log('Email sent successfully');
        }
      });

    }
    sendRegMail();
    res.render(`emailsend.ejs`);
    // res.send("Sent")
  }
  catch (err) {
    console.log(err);
  }

})



const run = async () => {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true
  })
  await app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`)
  })
}

run()
