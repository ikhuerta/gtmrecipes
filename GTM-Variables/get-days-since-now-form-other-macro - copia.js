function() {
  // gets macro with format YYYY-MM-DD and calc days since today
  var date = '{{dataLayer macroName}}'.split(/-/g);
  if (date[1] && date[2]) { date = new Date( date[0],date[1]-1,date[2]); return Math.floor( (new Date()-date)/(24*60*60*1000) );  }
  else return '(not set)';
}