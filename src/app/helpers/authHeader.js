export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
  const header = JSON.parse(localStorage.getItem('header'));
  if (user && header) {
    return { headers: header };
  }
  return {};
}

export function paymentHeader(refId, subKey, data) {
  return {
    headers: {
      'X-Reference-Id': refId,
      'Ocp-Apim-Subscription-Key': subKey,
    },
    body: JSON.stringify(data),
  };
}
