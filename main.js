"use strinct";
var request = require("request");

new Promise(function(resolve, reject) {
  var query = "select * where {?s <http://purl.org/jrrk#address> ?o ; a "
      + "<http://yafjp.org/terms/yav/1.0#Place>. filter strstarts (?o ,'横浜市')}";

  request.get({
    url : 'http://data.yafjp.org/sparql?query=' + encodeURIComponent(query),
    json : true
  }, function(error, response, json) {
    if (!error && response.statusCode == 200)
      resolve(json);
    else
      reject(error);
  });

}).then(function(json) {

  var promises = [];

  json.results.bindings.forEach(function(v) {
    promises.push(new Promise(function(resolve, reject) {
      var name = v.o.value;
      request.get({
        url : "http://geonames.jp/api/v1/query/" + encodeURIComponent("神奈川県" + name)
      }, function(error, response, txt) {
        if (!error && response.statusCode == 200)
          resolve({
            "@id" : v.s.value,
            "schema:containedInPlace" : txt
          });
        else {
          reject(error);
        }
      });
    }));
  });

  Promise.all(promises).then(function(a) {
    var jsonld = {
      "@context" : {
        "schema:containedInPlace" : {
          "@id" : "http://schema.org/containedInPlace",
          "@type" : "@id"
        }
      },
      "@graph" : a
    };
    console.log(JSON.stringify(jsonld, null, "  "));
  });

});
