import Cookies from "js-cookie";
export function retrieveCookie() {
  const token = Cookies.get("WorkspaceAuth");
  if (!token) {
    localStorage.removeItem("Filters");
    window.location.reload();
    return;
  }
  return token;
}
export function getFirstLetters(str) {
  let logo = "";
  let nameArr = str.match(/\w+/g);
  if (nameArr.length === 1) {
    return logo.concat(nameArr[0].substring(0, 2)).toUpperCase();
  }
  return logo.concat(nameArr[0].charAt(0), nameArr[1].charAt(0)).toUpperCase();
}
