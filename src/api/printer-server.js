"use strict";
const path = require("path");
const escpos = require("escpos");
escpos.Network = require("escpos-network");

const device = new escpos.Network("192.168.1.99");
const options = { encoding: "GB18030" };
const printer = new escpos.Printer(device, options);

var bodyParser = require("body-parser");
var app = require("express")();
var http = require("http").Server(app);
var cors = require("cors");
app.use(cors());
app.use(bodyParser.json());

const port = 4000;

app.post("/print", (req, res) => {
  res.json({ status: "success" });
  print(req.body);
});

http.listen(port, () => {
  console.log(`Printer: http://localhost:${port}`);
});

const print = (body) => {
  // Body looks like this:
  // [
  //   {
  //     id: 112,
  //     name: 'Chicken Chow Mein',
  //     price: 6.5,
  //     sideIncluded: false,
  //     uuid: '623854da-2f73-4b9c-a840-487904aac0bc'
  //   },
  //   {
  //     id: 114,
  //     name: 'Char Siu Chow Mein',
  //     price: 6.6,
  //     sideIncluded: false,
  //     uuid: '2727ea83-8f13-4769-be82-8283d4be6a28'
  //   }
  // ]

  device.open(function() {
    printer
      .font("a")
      .align("ct")
      .style("bu")
      .size(1, 1)
      .text('this is a test')
      // .cut()
      .close();
  });
};
