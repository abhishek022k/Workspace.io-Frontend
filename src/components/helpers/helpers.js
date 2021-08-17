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
export function getFormattedDate(data){
  const date = new Date(data);
  const formattedDate = date.toLocaleDateString("en-GB", {day: "numeric",month: "short",year: "numeric"});
  return formattedDate;
}
export function getFormattedTime(data){
  const date = new Date(data);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}