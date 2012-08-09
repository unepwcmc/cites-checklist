/*
 * Application-wide custom helper methods
 */
Checklist.Helpers = {
  /*
   * Checks to see if the user's browser has localStorage capabilities
   *
   * http://mathiasbynens.be/notes/localstorage-pattern
   */
  storage: function() {
    var uid = new Date,
        storage,
        result;

    try {
      (storage = window.localStorage).setItem(uid, uid);
      result = storage.getItem(uid) == uid;
      storage.removeItem(uid);
      return result && storage;
    } catch(e) {}
  },
  /*
   * Generates a four character, unique identifier.
   *
   * Created for use in localStorage to remove the need to calculate the
   * last used ID.
   *
   * @return String four character random string
   */
  generateId: function() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  },

  /*
   * A reverse jQuery.param
   *   Based on https://gist.github.com/1025817
   *   Comments are from said gist
   *
   * @param String string of params to be converted in to Object
   * @returns Object param key/values as an Object
   */
  deparam: function(text) {
    // The object to be returned.
    var result = {};

    $.each(text.replace(/\+/g, ' ').split('&'), function(index, pair) {
      // The key=value pair.
      var kv = pair.split('=');
      // The key, URI-decoded.
      var key = decodeURIComponent(kv[0]);
      // Abort if there's no key.
      if ( !key ) { return; }
      // The value, URI-decoded. If value is missing, use empty string.
      var value = decodeURIComponent(kv[1] || '');
      // If key is more complex than 'foo', like 'a[]' or 'a[b][c]', split it
      // into its component parts.
      var keys = key.split('][');
      var last = keys.length - 1;
      // Used when key is complex.
      var i = 0;
      var current = result;

      // If the first keys part contains [ and the last ends with ], then []
      // are correctly balanced.
      if ( keys[0].indexOf('[') >= 0 && /\]$/.test(keys[last]) ) {
        // Remove the trailing ] from the last keys part.
        keys[last] = keys[last].replace(/\]$/, '');
        // Split first keys part into two parts on the [ and add them back onto
        // the beginning of the keys array.
        keys = keys.shift().split('[').concat(keys);
        // Since a key part was added, increment last.
        last++;
      } else {
        // Basic 'foo' style key.
        last = 0;
      }

      if ( last ) {
        // Complex key, like 'a[]' or 'a[b][c]'. At this point, the keys array
        // might look like ['a', ''] (array) or ['a', 'b', 'c'] (object).
        for ( ; i <= last; i++ ) {
          // If the current key part was specified, use that value as the array
          // index or object key. If omitted, assume an array and use the
          // array's length (effectively an array push).
          key = keys[i] !== '' ? keys[i] : current.length;
          if ( i < last ) {
            // If not the last key part, update the reference to the current
            // object/array, creating it if it doesn't already exist AND there's
            // a next key. If the next key is non-numeric and not empty string,
            // create an object, otherwise create an array.
            current = current[key] = current[key] || (isNaN(keys[i + 1]) ? {} : []);
          } else {
            // If the last key part, set the value.
            current[key] = value;
          }
        }
      } else {
        // Simple key.
        if ( $.isArray(result[key]) ) {
          // If the key already exists, and is an array, push the new value onto
          // the array.
          result[key].push(value);
        } else if ( key in result ) {
          // If the key already exists, and is NOT an array, turn it into an
          // array, pushing the new value onto it.
          result[key] = [result[key], value];
        } else {
          // Otherwise, just set the value.
          result[key] = value;
        }
      }
    });

    return result;
  },
}
