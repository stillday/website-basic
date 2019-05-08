/*************************************************/
/* COOKIE POLICY                                 */
/*************************************************/

// this variable should hold the Google Tag Manager Id for this website
//---------------------------------------------
/*jshint ignore:start*/
// var gtmId = "UA-60612560-7";
var gtagId = "UA-60612560-7";
/*jshint ignore:end*/


// this variable is the name of the cookie that should be set, and should be unique for this project
//---------------------------------------------
var cookieId = "PrimTrioCookieState";


// an enum that holds the names of the different variables, so we know that for cookie plan, option "0" is "functionality" etc..
//---------------------------------------------
var cookiePlanEnum = {
  0: "functionality",
  1: "statistic",
};


// variable that holds the current state of our cookie plan. Initially, it is all checked
//---------------------------------------------
var cookiePlan = {
  statistic: false,
  functionality: false
};


// function that initializes the GoogleTagManager
//---------------------------------------------
/*jshint ignore:start*/
function initGtm() {
  (function (w, d, s, l, i) { w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' }); var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f); })(window, document, 'script', 'dataLayer', gtmId);
}
/*jshint ignore:end*/

// function that initialize the google ana..
// -----------------------------------------------
function initGtagJs() {
  // create and load the script that fetches the gtag.js
  var gtagScript = document.createElement('script');
  gtagScript.async = 1;
  gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + gtagId;

  var firstScriptInDocument = document.getElementsByTagName('script')[0];
  firstScriptInDocument.parentNode.insertBefore(gtagScript, firstScriptInDocument);

  // add the first event
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  gtag('js', new Date());
  gtag('config', gtagId);
}



// function initSocialWall() {
//   var iframeSrc = $('.js-social-frame').data('iframe-url');
//   $('.js-social-frame').append('<iframe allowfullscreen="" id="wallsio-iframe" src="' + iframeSrc + '" title="Social Media Feed" style="border:0;height:1100px;width:100%"></iframe>');
//   $('.js-social-feed').show();
// }


// Function that disables the GoogleTagManager
//---------------------------------------------
function disableGtm() {
  window.dataLayer = null;
  //window['ga-disable-UA-XXX-XXX'] = true;
}


// Function that uses the cookiePlan object and initializes/disables all cookies/tools according to the state of the cookiePlan object
//---------------------------------------------
function setCookiePlan() {
  // initially set the session cookie for this
  setSessionCookie(cookieId, "no");

  // functional cookies allowed
  if (cookiePlan.functionality === true && cookiePlan.statistic === true) {
    setCookie(cookieId, "1");
    initGtagJs();
    // initGtm();
    // initSocialWall();

    $('.js-cookie-notification').fadeOut();
  }
  else {
    if (cookiePlan.functionality === true && cookiePlan.statistic === false) {
      setCookie(cookieId, "0");

      $('.js-cookie-notification').fadeOut();
    }
  }
}

$(function () {
  // check for cookie and show cookie overlay if necessary
  $(window).on('load', function () {
    var cookiePolicyState = getCookie(cookieId);

    switch (cookiePolicyState) {
      case "":
        // this is the initial state
        cookiePlan = {
          statistic: false,
          functionality: false
        };
        $('.js-cookie-notification').fadeIn();
        break;

      case "no":
        // if cookie policy state is set to no cookies, just make all false in the cookiePlan and call "setCookiePlan()"
        cookiePlan = {
          statistic: false,
          functionality: false
        };
        setCookiePlan();
        break;

      case "0":
        cookiePlan = {
          statistic: false,
          functionality: true
        };
        setCookiePlan();
        break;

      case "1":
        cookiePlan = {
          statistic: true,
          functionality: true
        };
        setCookiePlan();
        break;

      default:
        // this is the initial state
        cookiePlan = {
          statistic: false,
          functionality: false
        };
        $('.js-cookie-notification').fadeIn();
        break;
    }
  });

  // reject cookies on button click
  $('.js-reject-cookies').on('click', function () {
    cookiePlan = {
      statistic: false,
      functionality: true
    };

    setCookiePlan();
  });

  // accept cookies on button click
  $('.js-accept-cookies').on('click', function () {
    cookiePlan = {
      statistic: true,
      functionality: true
    };

    setCookiePlan();
  });
});
