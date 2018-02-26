import { setOrderStatus } from "./orders";

export async function getProxyWalletForOrder(orderId) {
  const address = (await fetch("http://localhost:7000/proxywallets")).json();
  if (address) setOrderStatus(orderId, 3);
  return address;
}
