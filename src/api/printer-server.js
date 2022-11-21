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
  const { orderLines, customerName, totalPrice, arrivalTime } = body;

  device.open(function() {
    printer
      .font("a")
      .align("ct")
      .style("bu")
      .size(0.5, 0.5)
      .text("Sunshine Takeaway")
      .newLine()
      .size(1, 1)
      .align("lt")
      .text("Est. Time: " + arrivalTime)
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

    device.close();
  });
};
