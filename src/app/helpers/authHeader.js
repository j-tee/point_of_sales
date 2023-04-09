export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
  const header = JSON.parse(localStorage.getItem('header'));
  if (user && header) {
    return { headers: header };
  }
  return {};
}
