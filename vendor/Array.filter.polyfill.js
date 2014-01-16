/**
 * Array.filter polyfil for IE8.
 *
 * https://gist.github.com/eliperelman/1031656
 */
[].filter || (Array.prototype.filter = // Use the native array filter method, if available.
  function(a, //a function to test each value of the array against. Truthy values will be put into the new array and falsy values will
    b, // placeholder
    c, // placeholder
    d, // placeholder
    e // placeholder
  ) {
      c = this; // cache the array
      d = []; // array to hold the new values which match the expression
      for (e in c) // for each value in the array,
        ~~e + '' == e && e >= 0 && // coerce the array position and if valid,
        a.call(b, c[e], +e, c) && // pass the current value into the expression and if truthy,
        d.push(c[e]); // add it to the new array

      return d // give back the new array
  })
