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

export const printEscPos = async (order) => {
  const response = await fetch(
    "http://localhost:4000/print",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    }
  );
  return await response.json();
};
