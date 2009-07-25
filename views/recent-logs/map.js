function(doc) {
  var duplicates = [];
  if(doc['queries']){
    var flattened_queries = doc.queries.map(function(query){ return (query['method'] + query['url'] + ((query['payload'] && query['payload']['keys']) ? query.payload.keys.join(', ') : '') ) }).sort();
    for (var i = 0; i < flattened_queries.length - 1; i += 1) {
      if (flattened_queries[i + 1] == flattened_queries[i]) {
              duplicates.push(flattened_queries[i]);
      };  
    };
  };
  
  emit(doc.started_at, {
    timestamp : doc.started_at,
    duration : doc.duration,
    url : doc.url,
    amount_queries : (doc['queries'] ? doc.queries.length : 0 ),
    amount_duplicates : duplicates.length
  });    
};