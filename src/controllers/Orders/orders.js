import { uuidV4 } from "../../util/uuid";
import web3 from "web3";

import * as backend from "../../backend";

const ordersKey = "orders";
const ordersStatusKey = "ordersStatus";

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

const orderFieldMapping = {
  longshort: "positionType",
  leverage: "positionLeverage",
  duration: "positionDuration"
};

const orderLocalizationMapping = {
  "longshort.currencypair.eth-usd": "ETH-USD",
  "longshort.duration.1-week": 60 * 24 * 7 * 1,
  "longshort.duration.2-week": 60 * 24 * 7 * 2,
  "longshort.duration.4-week": 60 * 24 * 7 * 4,
  "longshort.duration.6-week": 60 * 24 * 7 * 6,
  "longshort.duration.8-week": 60 * 24 * 7 * 8,
  "longshort.leverage.2": 2,
  "longshort.leverage.5": 5,
  "longshort.type.short": "SHORT",
  "longshort.type.long": "LONG"
};

export async function createOrder(data) {
  const order = Object.assign({}, JSON.parse(JSON.stringify(data)), {
    orderId: uuidV4(),
    dateCreated: Date.now()
  });
  setOrderStatus(order.orderId, 2);
  await storeOrder(order);

  backend.postOrder(prepareOrder(order));

  return order;
}

function prepareOrder(order) {
  const tempOrder = JSON.parse(JSON.stringify(order));

  delete tempOrder["templateId"];

  const newOrder = Object.keys(orderFieldMapping).reduce((obj, k) => {
    obj[orderFieldMapping[k]] = tempOrder[k];
    delete tempOrder[k];
    return obj;
  }, {});

  newOrder.orderIdHash = web3.utils.soliditySha3(tempOrder.orderId);

  const result = Object.assign(tempOrder, newOrder);

  return Object.keys(result).reduce((obj, k) => {
    let val;
    if ((val = orderLocalizationMapping[result[k]])) {
      obj[k] = val;
    } else {
      obj[k] = result[k];
    }
    return obj;
  }, {});
}

export async function storeOrder(order) {
  const orders = JSON.parse(localStorage.getItem(ordersKey) || "[]");
  orders.push(order);
  localStorage.setItem(ordersKey, JSON.stringify(orders));
}

export async function retrieveOrder(orderId) {
  const orders = JSON.parse(localStorage.getItem(ordersKey) || "[]");
  await new Promise(resolve => setTimeout(resolve, 1000));
  backend.getOrder(orderId);
  return orders.find(order => order.orderId === orderId);
}

export async function retrieveOpenOrders(orderId) {
  const orders = JSON.parse(localStorage.getItem(ordersKey) || "[]");
  await new Promise(resolve => setTimeout(resolve, 1000));
  return orders;
}

export async function getOrderStatus(orderId) {
  const ordersStatus = JSON.parse(
    localStorage.getItem(ordersStatusKey) || "{}"
  );
  return orderStatuses[ordersStatus[orderId]] || "order.status.unknown";
}

export function setOrderStatus(orderId, status) {
  const ordersStatus = JSON.parse(
    localStorage.getItem(ordersStatusKey) || "{}"
  );
  ordersStatus[orderId] = status;
  localStorage.setItem(ordersStatusKey, JSON.stringify(ordersStatus));
}
