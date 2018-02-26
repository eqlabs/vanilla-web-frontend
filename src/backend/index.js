export function postOrder(order) {
  return fetch("http://localhost:7000/orders", {
    method: "POST",
    body: JSON.stringify({ order }),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  }).then(res => res.json());
}

export function getOrder(orderId) {
  return fetch(`http://localhost:7000/orders/${orderId}`).then(res =>
    res.json()
  );
}
