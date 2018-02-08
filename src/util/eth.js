import crypto from "crypto";

export function generateETHAddress() {
  const rs = crypto
    .randomBytes(Math.ceil(40 / 2))
    .toString("hex")
    .slice(0, 40);
  return "0x" + rs;
}

const validHex = /^(0x|0X)?[a-fA-F0-9]+$/;

export function validateAddress(withdrawAddress) {
  return withdrawAddress.length === 42 && validHex.test(withdrawAddress);
}
