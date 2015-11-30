/*
GTM Custom javascript Variable function

Analyzes the value of a DataLayer variable looking for different values in each page.
Each different value for the variable in a pageview will return "1". When the pageview use a value defined in another pageview during the session this function will return 0.
It is used to create custom metrics such as " uniqueCustomDimensionValueViews " (for example: uniquePageTypeViews, uniqueProductIDViews, etc. ) .
*/
function () { 

// CONFIG:
  
var ignoredReferrals = 'paypal.com,sermepa.com,transbank.cl'; // <<-- Copy from GA ignored referrals

var sessionMaxMinutes = 30;

var varName = 'pageSection';

var varValue = '{{dataLayer pageSection}}';

// END CONFIG
var sm = sessionMaxMinutes;
if (!varValue || varValue =='') varValue = 'not-set';var vnv = varName+'|'+varValue;if (!window.ikaue_cdm) window.ikaue_cdm = {}; if (window.ikaue_cdm[vnv]) return window.ikaue_cdm[vnv];
var cc = function (v,t,m) { var cn = 'ikaue_cdm'; if (typeof v != 'undefined') { if(!m) m=30; var d = new Date(); d.setTime(d.getTime() + (m*60000)); document.cookie = cn+'='+encodeURI(JSON.stringify(v))+';path=/;expires='+d.toUTCString();  } else { var re = new RegExp( cn+'=([^;]+)(;.+)?$'); var pd = document.cookie.match( re ); v = (pd && pd[1]) ? JSON.parse(decodeURI(pd[1])) : ''; } return v;};
var ns = function (ir) { 
  /* campaigns */ var uv = ( location.href.split('?',2)[1] ) ? location.href.split('?',2)[1] : ''; if ( uv.indexOf('utm_medium=') === false || uv.indexOf('utm_source=') === false || uv.indexOf('gclid=') === false ) return true;
  if ( document.referrer == '' ) return false;
  /* ignored referrals */ var d=location.href.split("/")[2].split(".").reverse();d=d[1]+"."+d[0];  if (!ir || !ir[0]) ir = [ d ]; else ir.push(d);
  for (var i=0;i<ir.length;i++){  if ( document.referrer.toLowerCase().indexOf(ir[i]) !== false) return false; } return true;
}
if  ( ns( ignoredReferrals.split(',') ) ) cc({},sm);
var d = cc() || {}; 
if ( d[vnv] ) { cc(d,sm); var r=0; } else { d[vnv] = 1; cc(d,sm); var r=1; } window.ikaue_cdm[vnv] = r; return r;
}