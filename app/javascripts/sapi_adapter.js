//TODO refactor
Checklist.SAPIAdapter = DS.Adapter.extend({

  findAll: function(store, type) {
    var url = this.url + type.collectionUrl;

    if($.browser.msie && window.XDomainRequest) {
      // Use Microsoft XDR
      var xdr = new XDomainRequest();
      xdr.contentType = "text/plain";
      xdr.open("get", url);
      xdr.onprogress = function(){};
      xdr.onerror = function(){};
      xdr.onload = function () {
        var JSON = $.parseJSON(xdr.responseText);
        if (JSON == null || typeof (JSON) == 'undefined'){
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
        data : {},
        success : function(data) {
          store.loadMany(type, data);
        },
        error : function(xhr, status, error) {}
      });
    }

  },
  findQuery: function(store, type, query, modelArray) {
    var url = this.url + type.collectionUrl;

    if($.browser.msie && window.XDomainRequest) {
      // Use Microsoft XDR
      var xdr = new XDomainRequest();
      xdr.contentType = "text/plain";
      url = url + '?' + $.param(query);
      xdr.open("get", url);
      xdr.onprogress = function(){};
      xdr.onerror = function(){};
      xdr.onload = function () {
        var JSON = $.parseJSON(xdr.responseText);
        if (JSON == null || typeof (JSON) == 'undefined'){
          JSON = $.parseJSON(data.firstChild.textContent);
        }
        modelArray.load(JSON);
      };
      
      xdr.send();
    } else {
      $.ajax({
        type : "GET",
        url : url,
        dataType : "json",
        data : query,
        success : function(data) {
          modelArray.load(data);
        },
        error : function(xhr, status, error) {}
      });
    }
  },

  findMany: function(store, type, ids) {
    var url = this.url + type.collectionUrl;
    url = url.fmt(ids.join(','));
//TODO do the IE thing
    jQuery.getJSON(url, function(data) {
      // data is an Array of Hashes in the same order as the original
      // Array of IDs. If your server returns a root, simply do something
      // like:
      // store.loadMany(type, ids, data.people)
      store.loadMany(type, ids, data);
    });
  }

});
