import { setOrderStatus } from "./orders";

export async function getProxyWalletForOrder(orderId) {
  const address = (await fetch(
    "http://localhost:8080/proxywallet/create"
  )).json();
  setOrderStatus(orderId, 3);
  return address;
}
