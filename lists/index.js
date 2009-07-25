
function(head, row, req, info) { 
  // !json lib.templates.index
  // !code vendor/couchapp/path.js
  // !code vendor/couchapp/date.js
  // !code vendor/couchapp/template.js

  var indexPath = listPath('index','recent-logs',{descending:true, limit:50});
  // var feedPath = listPath('index','recent-logs',{descending:true, limit:5, format:"atom"});
  return respondWith(req, {
    html : function() { 
      if (head) {
        return template(lib.templates.index.head, {title : 'Latest logs'})
      } else if (row) {
        var log = row.value;
    
        return template(lib.templates.index.row, {
          timestamp : log.timestamp,
          url : log.url,
          duration : log.duration,
          amount_queries : log.amount_queries,
          duplicates : log.amount_duplicates,
          link : showPath('log', row.id),
        });
      } else {
        return template(lib.templates.index.tail, {})
      }    
    }
  })
};