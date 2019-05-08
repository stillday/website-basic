/*************************************************/
/* cookie methods                                */
/*************************************************/
/*jshint ignore:start*/
/***
    Function that sets the cookie
    @argument cookieName : name of the new cookie
    @argument cookieValue : value of the new cookie
 */
function setCookie(cookieName, cookieValue) {
  cookieValue = typeof cookieValue !== "undefined" ? cookieValue : "true";
  var cookie_expires = new Date();
  cookie_expires.setDate(cookie_expires.getDate() + 365);
  document.cookie = cookieName + "=" + cookieValue + ';expires=' + cookie_expires.toGMTString() + ';path=/';
}
/***
    Function that sets the session cookie
    @argument cookieName : name of the new cookie
    @argument cookieValue : value of the new cookie
 */
function setSessionCookie(cookieName, cookieValue) {
  var newSessionCookie = cookieName + "=" + cookieValue + ";path=/";
  document.cookie = newSessionCookie;
}

/***
    Function that deletes the cookie
    @argument cookieName : name of the new cookie
 */
function deleteCookie(cookieName) {
  document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

/***
    Function that gets the value of the cookie with the given cookie name
    @argument cookieName : name of the cookie
 */
function getCookie(cookieName) {
  var name = cookieName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
/*jshint ignore:end*/
