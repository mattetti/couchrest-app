function(doc) {
  
  
  var duplicates = [];
  var db_time = 0.0;
  var amount_queries = (doc['queries'] ? doc.queries.length : 0 );
  if(doc['queries']){ 
    // duplicates
    var flattened_queries = doc.queries.map(function(query){ return (query['method'] + query['url'] + ((query['payload'] && query['payload']['keys']) ? query.payload.keys.join(', ') : '') ) }).sort();
    for (var i = 0; i < flattened_queries.length - 1; i += 1) {
      if (flattened_queries[i + 1] == flattened_queries[i]) {
              duplicates.push(flattened_queries[i]);
      };  
    };
    
    //db time
    doc.queries.forEach(function(query){ db_time += query['duration'] })
  };
  
  var rounded_db_time = Math.round(db_time*1000)/1000;
  
  emit(doc.started_at, {
    timestamp : doc.started_at,
    duration : doc.duration,
    url : doc.url,
    amount_queries : amount_queries,
    amount_duplicates : duplicates.length,
    db_time : rounded_db_time,
    potential_savings : Math.round(((db_time / amount_queries) * duplicates.length) *1000)/1000
  });    
};