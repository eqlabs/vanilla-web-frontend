import { uuidV4 } from "../../util/uuid";
import { generateETHAddress } from "../../util/eth";

export async function createOrder(data) {
  const order = Object.assign({}, JSON.parse(JSON.stringify(data)), {
    orderId: uuidV4(),
    dateCreated: Date.now()
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

export async function getProxyWalletForOrder(orderId) {
  const proxyWallets = JSON.parse(localStorage.getItem("proxyWallets") || "[]");
  let proxyWallet = proxyWallets.find(pw => pw.orderId === orderId);
  if (!proxyWallet) {
    proxyWallet = {
      orderId,
      address: generateETHAddress()
    };
    proxyWallets.push(proxyWallet);
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
  localStorage.setItem("proxyWallets", JSON.stringify(proxyWallets));
  return proxyWallet.address;
}
