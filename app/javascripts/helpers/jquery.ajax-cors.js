(function($) {
  $.ajaxCors = function(url, type, query, dataType, context, success) {
    if ($.browser.msie && window.XDomainRequest) {
      url = url + '?' + $.param(query);

      // Use Microsoft XDR
      var xdr = new XDomainRequest();
      xdr.open(type, url);

      xdr.onprogress = function(){};
      xdr.onerror = function(){};
      xdr.onload = function () {
        var JSON = $.parseJSON(xdr.responseText);
        if (JSON === null || typeof (JSON) == 'undefined'){
          JSON = $.parseJSON(data.firstChild.textContent);
        }

        success.call(context, JSON);
      };

      xdr.send();
    } else {
      if (/^post$/i.test(type)) {
        $.post(url, query, function(data) {
          success.call(context, data);
        });
      } else {
        $.ajax({
          type : type,
          url : url,
          dataType : dataType,
          data : query,
          success : function(data) {
            success.call(context, data);
          }
        });
      }
    }
  };
})(jQuery);
