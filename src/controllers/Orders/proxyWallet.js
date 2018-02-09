import { generateETHAddress } from "../../util/eth";
import { setOrderStatus } from "./orders";

const proxyWalletsKey = "proxyWallets";

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
