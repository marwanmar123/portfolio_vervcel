const express = require("express");
const route = express.Router();
const nodemailer = require("nodemailer");
const Contact = require("../Models/Contact");
const Category = require("../Models/Category");

route.get("/contacts", async (req, res) => {
  try {
    const getContacts = await Contact.find();
    res.status(200).json(getContacts);
  } catch (er) {
    res.status(500).json({ message: er.message });
  }
});

route.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const transportor = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "youcode098@gmail.com",
        pass: "wbexxuiwrxhkyzlq",
      },
    });

    const emailContent = {
      from: email,
      to: "youcode098@gmail.com",
      subject: `mail mn 3nd ${name}`,
      html: `
                <h1>${name}</h1>
                <p>${email}</p>
                <p>${message}</p>
            `,
    };

    const createContact = new Contact({ name, email, message });
    const saveContact = await createContact.save();

    const emailInfos = await transportor.sendMail(emailContent);
    console.log("email:", emailInfos.response);

    res.status(200).json({ saveContact, message: "message mcha " });
  } catch (er) {
    res.status(500).json({ message: er.message });
  }
});

module.exports = route;
