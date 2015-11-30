/*
GTM Custom javascript Variable function

Analyzes the value of a DataLayer variable looking for a match with a given Regex .
The first pageview during a session of GA that matches with the regex returns 1, the other pageviews returns 0.
It is used to create customized metric in GA to measure sessions who view this kind of page. (For example: productViewSessions)
*/
function () { 

// CONFIG:
  
var ignoredReferrals = 'paypal.com,sermepa.com,transbank.cl'; // <<-- Copy from GA ignored referrals

var sessionMaxMinutes = 30; // <-- Default session time in GA is 30 minutes

var varName = 'homePageSessions'; // <-- Each GTM Custom Javascript Variable must use a different varName

var varValue = '{{pageType}}'; 

var mustRegexWith = 'home'; 
  
// END CONFIG
var sm = sessionMaxMinutes;
if (!varValue || varValue =='') return 0; if (!window.ikaue_cdv) window.ikaue_cdv = {}; if (window.ikaue_cdv[varName]) return window.ikaue_cdv[varName];
var cc = function (v,t,m) { var cn = 'ikaue_cdv'; if (typeof v != 'undefined') { if(!m) m=30; var d = new Date(); d.setTime(d.getTime() + (m*60000)); document.cookie = cn+'='+encodeURI(JSON.stringify(v))+';path=/;expires='+d.toUTCString();  } else { var re = new RegExp( cn+'=([^;]+)(;.+)?$'); var pd = document.cookie.match( re ); v = (pd && pd[1]) ? JSON.parse(decodeURI(pd[1])) : ''; } return v;};
var ns = function (ir) { 
  /* campaigns */ var uv = ( location.href.split('?',2)[1] ) ? location.href.split('?',2)[1] : ''; if ( uv.indexOf('utm_medium=') === false || uv.indexOf('utm_source=') === false || uv.indexOf('gclid=') === false) return true;
  if ( document.referrer == '' ) return false;
  /* ignored referrals */ var d=location.href.split("/")[2].split(".").reverse();d=d[1]+"."+d[0];  if (!ir || !ir[0]) ir = [ d ]; else ir.push(d);
  for (var i=0;i<ir.length;i++){  if ( document.referrer.toLowerCase().indexOf(ir[i]) !== false) return false; } return true;
}
if  ( ns( ignoredReferrals.split(',') ) ) cc({},sm);
var d = cc() || {}; 
if ( d[varName] ) { var r=0; } 
else { var re = new RegExp( mustRegexWith );if (varValue.match( re ) ) { d[varName] = 1; cc(d,sm); var r=1; } else r=0;} 
window.ikaue_cdv[varName] = r; return r;
}
