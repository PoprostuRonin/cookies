/*
Cookie alert
Original repository: https://github.com/PoprostuRonin/cookies
http://poprosturonin.com
*/

var langDefault = '<span style="font-size: 11px;">This website use cookies</span><br>' +
'This website uses cookies for statistic and . You can change cookie settings in your browser.';

var lang = [];
lang['pl'] = '<span style="font-size: 11px;">Ta strona wykorzystuje pliki cookies</span><br>' +
'Pliki cookies są wykorzystywane w celach statystycznych i reklamowych. Korzystając z tej strony zgadasz się na ich użycie zgodnie z ustawieniami swojej przeglądarki';

document.addEventListener("DOMContentLoaded", function() {
  /* Check if user has seen this alert before */
  var hasSeen = false;
  var cookies = document.cookie.split(';');
  for(var i = 0; i < cookies.length; i++) {
      var c = cookies[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf("cookieAlert=") == 0) {
          hasSeen = true;
          break;
      }
  }

  if(hasSeen)
    return false;

  var container = document.createElement('div');
  var link = document.createElement('a');
  var image = document.createElement('img');

  var containerStyle = 'font-size: 13px; z-index: 1000; width: 100%; overflow: scroll; box-sizing: border-box; padding: 5px 10px; opacity: 0.8; position: fixed; bottom: 0; left: 0; background-color: #000; color: #FFF;'
  var linkStyle = 'position: absolute; right: 10px; top: 5px; cursor: pointer;';

  image.setAttribute('src','https://poprosturonin.github.io/cookies/close.png')
  container.setAttribute('id', 'cookieinfo');
  container.setAttribute('class', 'cookie-alert cookie-info cookies'); //Let filters do their job
  container.setAttribute('style', containerStyle);
  link.setAttribute('style', linkStyle);

  var language = window.navigator.userLanguage || window.navigator.language;
  console.log(language);
  if(language in lang) {
    container.innerHTML = lang[language];
  }
  else {
    container.innerHTML = langDefault;
  }

  link.appendChild(image);
  container.appendChild(link);

  /* Callback */
  function clickHandler(e) {
    if (e.preventDefault) {
        e.preventDefault();
    } else {
        e.returnValue = false;
    }

    /* Create cookie that user saw the alert */
    var date = new Date();
    date.setTime(date.getTime() + (3*360*24*60*60*1000)); //3 years
    var expires = "expires=" + date.toUTCString();
    document.cookie = "cookieAlert" + "=" + "seen" + "; " + expires;

    /* Animation for alert */
    var interval = window.setInterval(function() {
        container.style.opacity -= 0.01;

        if (container.style.opacity <= 0.02) {
            document.body.removeChild(container);
            window.clearInterval(interval);
        }
    }, 4);
  }

  /* Container is a big button, but link pretends to be one */
  if (container.addEventListener) {
      container.addEventListener('click', clickHandler);
  } else {
      container.attachEvent('onclick', clickHandler);
  }

  document.body.appendChild(container);
});
