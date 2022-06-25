const { PrismaClient } = require("@prisma/client");
const express = require("express");

//const router = require("express").Router();
const app = express();

const prisma = new PrismaClient();
app.listen("8080", () => {
  console.log("works");
});
app.use(express.json()); //convert every request into JSON

// GET phonebook
app.get("/phonebook", async (req, res, next) => {
  try {
    const phonebook = await prisma.contactData.findMany({});
    res.json({ phonebook }); //passing data in json format
  } catch (error) {
    next(error);
  }
});

// POST data to phonebook
app.post("/phonebook", async (req, res, next) => {
  try {
    const contactData = await prisma.contactData.create({
      data: req.body,
    });
    const phonebook = await prisma.contactData.findMany({});
    res.json({ phonebook });
  } catch (error) {
    next(error);
  }
});

// GET specific contact data
app.get("/phonebook/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const contactData = await prisma.contactData.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.json({ contactData });
  } catch (error) {
    next(error);
  }
});

//DELETE specific contact data

app.delete("/phonebook/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contactData = await prisma.contactData.delete({
      where: {
        id: Number(id),
      },
    });
    const phonebook = await prisma.contactData.findMany({});
    res.json({ phonebook });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//UPDATE specific contact data
app.patch("/phonebook/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const contactData = await prisma.contactData.update({
      where: {
        id: Number(id),
      },
      data: req.body,
    });

    const phonebook = await prisma.contactData.findMany({});
    res.json({ phonebook });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/*
app.get("/users", (req, res) => {
  const userData = ["hello", "how", "are", "you", "doing"];
  res.send({ userData: userData });
});

app.post("/create-user", (req, res) => {
  console.log(req.body);
  res.send("New User" + req.body.lorem);
});

app.listen(8080, () => {
  console.log("listen to 8080");
});

*/

//HEADER NAME INVALID
