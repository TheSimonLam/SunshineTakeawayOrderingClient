async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 8000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);
  return response;
}

export const createOrder = async (orderDetails) => {
  const response = await fetch(
    "https://bso69w1t0k.execute-api.eu-west-2.amazonaws.com/order",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderDetails),
    }
  );
  return await response.json();
};

export const getOrders = async ({ fromTimestamp, toTimestamp, orderState }) => {
  const response = await fetch(
    `https://bso69w1t0k.execute-api.eu-west-2.amazonaws.com/orders/${fromTimestamp}/${toTimestamp}/${orderState}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  return await response.json();
};

export const printEscPos = async ({
  HOST_IP,
  order,
  totalPrice,
  customerName,
  arrivalTime,
}) => {
  const orderLines = [];

  order.forEach((item) => {
    let orderLine = item.id ? "1-" + item.id : item.name;

    // Adding the NOTE: for meals with id's
    if (item.id && item.name.includes("(NOTE:")) {
      const noteIndex = item.name.indexOf("(NOTE:");
      const note = item.name.substr(noteIndex, item.name.length - 1);
      orderLine += " " + note;
    }

    orderLine += " (" + item.price.toFixed(2) + ")";

    orderLines.push(orderLine);
    if (item.side) {
      orderLines.push(
        "with " + item.side.name + " (" + item.side.price.toFixed(2) + ")"
      );
    }
  });

  const printPayload = {
    orderLines,
    customerName,
    totalPrice: totalPrice.toFixed(2),
    arrivalTime,
  };

  const response = await fetchWithTimeout(`http://${HOST_IP}:4000/print`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(printPayload),
  });
  return await response.json();
};
