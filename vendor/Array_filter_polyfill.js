/**
 * Array.filter polyfil for IE8.
 *
 * https://gist.github.com/eliperelman/1031656
 */
[].filter || (Array.prototype.filter =
  function(a,
    b,
    c,
    d,
    e
  ) {
      c = this;
      d = [];
      for (e in c)
        ~~e + '' == e && e >= 0 &&
        a.call(b, c[e], +e, c) &&
        d.push(c[e]);

      return d
  });
