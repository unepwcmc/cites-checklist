Checklist.SAPIAdapter = DS.Adapter.extend({
  findAll: function(store, type) {
    var url = this.url + type.collectionUrl;
/*
    jQuery.getJSON(url, {format: 'json', jsoncallback: '?'}, function(data) {
      // data is an Array of Hashes in the same order as the original
      // Array of IDs. If your server returns a root, simply do something
      // like:
      // store.loadMany(type, ids, data.people)
      store.loadMany(type, data);
    });
*/

    if($.browser.msie && window.XDomainRequest) {
      alert('hello');
      // Use Microsoft XDR
      var xdr = new XDomainRequest();
      xdr.open("get", url);
      xdr.onerror = function(){
        alert('error');
      }
      xdr.onload = function () {
        var JSON = $.parseJSON(xdr.responseText);
        if (JSON == null || typeof (JSON) == 'undefined')
        {
            JSON = $.parseJSON(data.firstChild.textContent);
        }
        store.loadMany(type, JSON);
      };
      xdr.send();
    } else {
      $.ajax({
        type : "GET",
        url : url,
        dataType : "json",
        data : {
          format : 'json',
          jsoncallback : '?'
        },
        //cache: false, // don't cache the result
        //contentType: "application/json", //tell the server we're looking for json
        success : function(data) {
          store.loadMany(type, data);
        },
        error : function(xhr, status, error) {
          alert(xhr.status);
        }
      });
    }

  },
  findQuery: function(store, type, query, modelArray) {
    var url = this.url + type.collectionUrl;
    jQuery.getJSON(url, $.extend(query, {format: 'json', jsoncallback: '?'}), function(data) {
        // data is expected to be an Array of Hashes, in an order
        // determined by the server. This order may be specified in
        // the query, and will be reflected in the view.
        //
        // If your server returns a root, simply do something like:
        // modelArray.load(data.people)
        modelArray.load(data);
    });
  }
});