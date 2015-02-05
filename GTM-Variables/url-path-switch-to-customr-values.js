function () { 
// use only the lines you need

var u = document.location.pathname + document.location.search; 
var e = '{{dataLayer pageError}}'; // 503 or 404 send to dataLayer
var s = '{{dataLayer searchQuery}}'; // search query
var us = '{{dataLayer userId}}'; // user ID

/* alter url on 404/503 pages */ 
if  ( e != 'undefined' e != '(not set)' && e != '' && e != 'false' && e != '[object Object]' )
  u = '/errors/{{system error}}?url=' + u + '&ref=' + document.referrer;

/* add domain to url */ 
u = document.location.hostname + u;

/* add (http) to url. */ 
if (location.protocol == 'https:') u = '(https)'+u;

// add query is search is by POST
if  ( s != 'undefined' && s != '(not set)' && s != '' && s != 'false' && s != '[object Object]' )
{
  var c = ( u.indexOf("?") ) "&" : "?";
  u += c + "search="+s;
}

// add if user is logged
if  ( us != 'undefined' && us != '(not set)' && us != '' && us != 'false' && us != '[object Object]' )
u = '(logged)'+u;

/* add hash/anchor to url */ 
u = u + document.location.hash;


// url example: (logged)(https)www.mydomain.com/mypage.html?search=myquery#result2  
return u;

}}