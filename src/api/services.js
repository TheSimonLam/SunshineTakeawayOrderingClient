export const createOrder = async (orderDetails) => {
  const response = await fetch(
    "https://bso69w1t0k.execute-api.eu-west-2.amazonaws.com/order",
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderDetails),
    }
  );
  return await response.json();
};

export const printEscPos = async ({
  order,
  totalPrice,
  customerName,
  arrivalTime,
}) => {
  const orderLines = [];

  order.forEach((item) => {
    const orderLine = item.id
      ? item.id + " - " + item.name + " " + item.price.toFixed(2)
      : item.name + " " + item.price.toFixed(2);
    orderLines.push(orderLine);
    if (item.side) {
      orderLines.push(
        item.side.name + " (with meal) " + item.side.price.toFixed(2)
      );
    }
  });

  const printPayload = {
    orderLines,
    customerName,
    totalPrice: totalPrice.toFixed(2),
    arrivalTime,
  };

  const response = await fetch("http://localhost:4000/print", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(printPayload),
  });
  return await response.json();
};
