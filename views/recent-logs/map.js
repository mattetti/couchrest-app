function(doc) {
    emit(doc.started_at, {
      timestamp : doc.started_at,
      duration : doc.duration,
      url : doc.url,
      amount_queries : (doc['queries'] ? doc.queries.length : 0 )
    });    
};