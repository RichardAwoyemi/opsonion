/* eslint-disable no-undef,@typescript-eslint/no-unused-expressions */
'use strict';

$(function () {
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;

    // noinspection CommaExpressionJS
    (i[r] =
      i[r] ||
      function () {
        (i[r].q = i[r].q || []).push(arguments);
      }),
      (i[r].l = 1 * new Date());

    // noinspection CommaExpressionJS
    (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);

    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

  ga('create', 'UA-134173321-1', 'auto');
  ga('send', 'pageview');

  page.config({
    disableAOSonMobile: true,
    smoothScroll: false,
  });
});
