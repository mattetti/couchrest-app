function(doc, req) { 
  // !json lib.templates.log
  // !code vendor/couchapp/path.js
  // !code vendor/couchapp/date.js
  // !code vendor/couchapp/template.js
  
  var total_durations =  0;
  doc.queries.forEach(function(query){ total_durations += query['duration']})
  var average_duration = Math.round((total_durations / doc.queries.length)*1000)/1000 + "s";
  var flattened_queries = doc.queries.map(function(query){ return (query['method'] + query['url'] + ((query['payload'] && query['payload']['keys']) ? query.payload.keys.join(', ') : '') ) }).sort();
  
  var duplicates = [];
  for (var i = 0; i < flattened_queries.length - 1; i += 1) {
          if (flattened_queries[i + 1] == flattened_queries[i]) {
                  duplicates.push(flattened_queries[i]);
          }
  }; 
  
  
  // we only show html
  var head = template(lib.templates.log.head, {
    title : ("Request Log: " + doc.url + " - " + doc.started_at),
    url : doc.url,
    duration : doc.duration,
    timestamp : doc.started_at,
    queries : doc.queries,
    average_duration : average_duration,
    total_queries : doc.queries.length,
    duplicate_queries : duplicates.length,
    index : listPath('index','recent-logs',{descending:true, limit:15})
  });
  var queries = "";
   doc.queries.forEach(function(query, index){
     queries += template(lib.templates.log.query, {
       index : index,
       method : query.method.toUpperCase(),
       duration : Math.round(query.duration*1000)/1000,
       rowClass : ((index%2 == 0) ? 'even' : 'odd'),
       uri : query.uri,
       keys : ((query['payload'] && query['payload']['keys']) ? query.payload.keys.join(', ') : '')
     })
   })
  var tail = template(lib.templates.log.tail, {})
  
  return (head + queries + tail )
}