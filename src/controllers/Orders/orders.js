import { uuidV4 } from "../../util/uuid";
import { generateETHAddress } from "../../util/eth";

const ordersKey = "orders";
const ordersStatusKey = "ordersStatus";
const proxyWalletsKey = "proxyWallets";

const orderStatuses = {
  0: "order.status.unknown",
  1: "order.status.waiting-for-verification",
  2: "order.status.waiting-for-proxywallet",
  3: "order.status.waiting-for-deposit",
  4: "order.status.waiting-for-matching",
  5: "order.status.matched",
  6: "order.status.partially-matched",
  7: "order.status.waiting-for-closing",
  8: "order.status.closed",
  9: "order.status.cancelled",
  10: "order.status.refunded"
};

export async function createOrder(data) {
  const order = Object.assign({}, JSON.parse(JSON.stringify(data)), {
    orderId: uuidV4(),
    dateCreated: Date.now()
  });
  setOrderStatus(order.orderId, 2);
  await storeOrder(order);
  return order;
}

export async function storeOrder(order) {
  const orders = JSON.parse(localStorage.getItem(ordersKey) || "[]");
  orders.push(order);
  localStorage.setItem(ordersKey, JSON.stringify(orders));
}

export async function retrieveOrders() {
  const orders = JSON.parse(localStorage.getItem(ordersKey) || "[]");
  await new Promise(resolve => setTimeout(resolve, 1000));
  return orders;
}

export async function retrieveOrder(orderId) {
  const orders = JSON.parse(localStorage.getItem(ordersKey) || "[]");
  await new Promise(resolve => setTimeout(resolve, 1000));
  return orders.find(order => order.orderId === orderId);
}

export function setOrderStatus(orderId, status) {
  const ordersStatus = JSON.parse(
    localStorage.getItem(ordersStatusKey) || "{}"
  );
  // eslint-disable-next-line
  ordersStatus[orderId] = status;
  localStorage.setItem(ordersStatusKey, JSON.stringify(ordersStatus));
}

export async function getOrderStatus(orderId) {
  const ordersStatus = JSON.parse(
    localStorage.getItem(ordersStatusKey) || "{}"
  );
  // eslint-disable-next-line
  return orderStatuses[ordersStatus[orderId]] || "order.status.unknown";
}

export async function getProxyWalletForOrder(orderId) {
  const proxyWallets = JSON.parse(
    localStorage.getItem(proxyWalletsKey) || "[]"
  );
  let proxyWallet = proxyWallets.find(pw => pw.orderId === orderId);
  if (!proxyWallet) {
    proxyWallet = {
      orderId,
      address: generateETHAddress()
    };
    proxyWallets.push(proxyWallet);
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
  localStorage.setItem(proxyWalletsKey, JSON.stringify(proxyWallets));
  setOrderStatus(orderId, 3);
  return proxyWallet.address;
}
