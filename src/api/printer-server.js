"use strict";
const path = require("path");
const escpos = require("escpos");
escpos.Network = require("escpos-network");

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
  const device = new escpos.Network("192.168.1.101");
  const options = { encoding: "GB18030" };
  const printer = new escpos.Printer(device, options);
  const { orderLines, customerName, totalPrice, arrivalTime } = body;

  device.open(function() {
    printer
      .font("b")
      .align("ct")
      .newLine()
      .size(1, 1)
      .align("rt")
      .text(arrivalTime)
      .align("lt")
      .newLine();

    orderLines.forEach((orderLine) => {
      printer
        .text(orderLine)
        .newLine()
        .newLine();
    });

    printer
      .newLine()
      .text("Price: " + totalPrice)
      .newLine()
      .text("Name: " + customerName)
      .newLine()
      .newLine()
      .cut();

    printer
      .font("b")
      .align("ct")
      .newLine()
      .size(1, 1)
      .align("rt")
      .text(arrivalTime)
      .align("lt")
      .newLine();

    orderLines.forEach((orderLine) => {
      printer
        .text(orderLine)
        .newLine()
        .newLine();
    });

    printer
      .newLine()
      .text("Price: " + totalPrice)
      .newLine()
      .text("Name: " + customerName)
      .newLine()
      .newLine()
      .cut()
      .close();
  });
};
