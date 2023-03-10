const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

// send mail from testing acc
const signup = async (req, res) => {
  // create testAccount
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using default SMTP protocol
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let message = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  };

  transporter
    .sendMail(message)
    .then((info) => {
      return res.status(201).json({
        msg: "receive email",
        info: info.messageId,
        preview: nodemailer.getTestMessageUrl(info),
      });
    })
    .catch((e) => {
      return res.status(500).json({ e });
    });

  //   res.status(201).json("signup done");
};

// send mail from real gmail acc
const getbill = (req, res) => {
  const { userEmail } = req.body;

  let config = {
    service: "gmail",
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  };
  let transporter = nodemailer.createTransport(config);

  let mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Vanshul",
      link: "https://mailgen.js/",
    },
  });
  let response = {
    body: {
      name: "friend",
      intro: "Your Exams have arrived!",
      table: {
        data: [
          {
            exam: "SEPM",
            date: "14/3/23",
            shift: "morning",
          },
          {
            exam: "AI",
            date: "15/3/23",
            shift: "morning",
          },
          {
            exam: "WSN",
            date: "16/3/23",
            shift: "morning",
          },
        ],
      },
      outro:
        "looking for research papers on flutter to complete college's mundane task",
    },
  };

  let mail = mailGenerator.generate(response);

  let message = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: "Alert 😱",
    html: mail,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        msg: "received an email?",
      });
    })
    .catch((e) => {
      return res.status(500).json({ e });
    });

  //   res.status(201).json("getBill done");
};
module.exports = {
  signup,
  getbill,
};
