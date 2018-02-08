import { uuidV4 } from "../../util/uuid";

export async function createOrder(data) {
  const order = Object.assign({}, JSON.parse(JSON.stringify(data)), {
    orderId: uuidV4()
  });
  await storeOrder(order);
  return order;
}

export async function storeOrder(order) {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));
}

export async function retrieveOrders() {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  await new Promise(resolve => setTimeout(resolve, 1000));
  return orders;
}

export async function retrieveOrder(orderId) {
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  await new Promise(resolve => setTimeout(resolve, 1000));
  return orders.find(order => order.orderId === orderId);
}
