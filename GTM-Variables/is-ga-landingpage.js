function () { // returns 1 if this pageview is a google analytics landing page

var cc = function (v,t) { var cn = 'gtm_lp'; if (typeof v != 'undefined') document.cookie = cn+'='+v+';path=/';  else { var re = new RegExp( cn+'=([^;]+)(;.+)?$'); var pd = document.cookie.match( re ); v = (pd && pd[1]) ? pd[1] : ''; } return v;};
var domain=location.href.split("/")[2].split(".").reverse();domain=domain[1]+"."+domain[0];
var uv = ( location.href.split('?',2)[1] ) ? location.href.split('?',2)[1] : ''; 
var reset = ( ( document.referrer != '' && document.referrer.toLowerCase().indexOf(domain) == -1) || uv.indexOf('utm_medium=') > -1 || uv.indexOf('utm_source=') > -1 );
if ( reset == true ) cc(''); 
if (cc()) return 0; else { cc('1'); return 1; }

}


 
 
 