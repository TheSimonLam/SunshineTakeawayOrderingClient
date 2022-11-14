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
