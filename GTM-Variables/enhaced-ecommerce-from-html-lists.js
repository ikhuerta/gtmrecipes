// Get Enhanced Ecommerce Impressions, Clicks and AddCart actions from HTML lists
/* 
How to setup GTM:

1. Copy this code as a custom javascript macro/variable
2. Edit all your GA pageview tags (but not events) and check in more settings  the  enhanced ecommerce options. Set the new macro as custom macro. 
3. Create the rules to dectect GTM events: "ecommerce-click" & "ecommerce-addcart"
4. Assign a GA event to this new GTM events with enhanced ecommerce data in normal mode (get data from dataLayer)

*/

// TODO: CREATE COOKIE LAST-PRODUCT-CLICK y LAST-PROMO-CLICK for next steps (view, addcart, checkout and purchase)

function () { 
if (window.jQuery){


// Define your config lists.
// - One Object per list
// - Use Jquery selects to access the info
// - Use "constant:" to write a constant as value
// - Use "constant:{yourMacroName}" to write a macro as value (with double { and } ) 
// - Use "dataLayer:" to access a dataLayer value without macro
// - Use "JquerySelect@attribute" to get an attribute name, "html" or "data-*" value from a html tag.
// - Use "@attribute" to get an attribute name, "html" or "data-*" value from the list item html tag.
var config = [{
	type : 'promo', // productlist, productdetail or promo
	urlFilter : '/noalimentacion/HomeTecnologia',
	listname : 'constant:Carousel',
	positionTemplate : 'carousel: %',
	positionStartsWith : 'constant:1',
	block : '.carousel.slide',
	element : '.item',
	id : false,
	name : 'img@alt',
	linksToView : 'a',
	linksToViewWaitSendEvent : true
},{
	type : 'productlist', // productlist, productdetail or promo
	urlFilter : false,
	listname : 'constant:Productos Destacados',
	positionStartsWith : 'constant:1',
	block : 'div.articles-rail:eq(0)',
	element : '.article',
	id : false,
	name : 'a.link',
	category : false,
	brand : false,
	variant : false,
	price : '.new-price',
	linksToView : 'a.link',
	linksToViewWaitSendEvent : true,
	linksToAddChart : 'form a.btn'
},{
	type : 'productdetail', // productlist, productdetail or promo
	urlFilter : '-[0-9][0-9]{4}$',
	block : 'div.article',
	element : '.product',
	id : false,
	name : 'a.link',
	category : false,
	brand : false,
	variant : false,
	price : '.new-price',
	linksToAddChart : 'form a.btn'
},];

// NOT CHANGE BELOW THIS LINE --------------------------------------------

var _dlget = function (n) { return _dlget.o.get(n);}; for (id in window.google_tag_manager) if (id.substring(0,4) == 'GTM-') { _dlget.o = window.google_tag_manager[id].dataLayer; break;}

var _get = function (s,c) { // helper
 if (!s) return null;
 else if (s.toLowerCase().substring(0,10) == 'datalayer:') return _dlget(s.substring(10));
 else if (s.toLowerCase().substring(0,9) == 'constant:') return s.substring(9);
 else {
  s = s.split('@');
  var e = ( !s[0] ) ? jQuery(c) : jQuery(s[0],c);  
  if (s[1] && s[1] == 'html') return e.html().trim() || '';
  else if (s[1] && s[1] == 'text') return e.text().trim() || '';
  else if (s[1] && s[1].substring(0,5) == 'data-') return (e(s[0],c).data(s[1].substring(5))+'').trim() || '';
  else if (s[1]) return e.attr(s[1]).trim() || '';
  else return e.text().trim() || '';
 }
}



var l = [];var b = [];var v =[];
for(var il=0;il<config.length;il++) {

if (config[il].urlFilter) { config[il].urlFilter = new RegExp(config[il].urlFilter, "i"); config[il].urlFilter = config[il].urlFilter.exec( location.pathname );} 
else config[il].urlFilter = true;

var c = jQuery( config[il].block + ' ' + config[il].element);
if (c[0] && config[il].urlFilter ) {
    var co = config[il];
	if (!co.type) co.type='productlist';
	if (!co.urlFilter) co.urlFilter='.*';
	if (!co.positionTemplate) co.positionTemplate='%';
	for (var i=0;i<c.length;i++)
	{
		var p = $(c[i]);
		var product = {
		   'list': (co.type != 'productlist') ? '' : _get(co.listname),
		   'creative': (co.type != 'promo') ? '' : _get(co.listname, p),
		   'position': (co.type == 'productdetail') ? '' : co.positionTemplate.replace('%',(_get(co.positionStartsWith)*1)+i),
		   'id': _get(co.id, p),
		   'name': _get(co.name, p),
		   'category': _get(co.category, p),
		   'brand': _get(co.brand, p),
		   'variant': _get(co.variant, p)
		};
		if (co.type == 'productlist') l.push(product);
		else if (co.type == 'productdetail') v.push(product);
		else if (co.type == 'promo') b.push(product);
		
		// click event
		if ( !jQuery(co.linksToView,p).data('ecommerce-product') && co.linksToView )
		{
			var lv = jQuery(co.linksToView,p);
			lv.data('ecommerce-action', (co.type == 'product') ? 'click/products' : 'promoClick/promotions' );
			lv.data('ecommerce-product',product);
			lv.data('ecommerce-callback',co.linksToViewWaitSendEvent);
			jQuery(co.linksToView,p).click(function (e) {  

				var dh = $(this).attr('href');
				var da = ($(this).data('ecommerce-action')+'').split('/');var daa=da[0];var dap=da[1];
				var dp = $(this).data('ecommerce-product');
				var dc = $(this).data('ecommerce-callback');
				var o = { 'event': 'ecommerce-'+daa, 'ecommerce': {} };
				o.ecommerce[daa] =  { 'actionField': {'list': dp.list}};
				o.ecommerce[daa][dap] = [dp]; 
				if ( dc ) o.eventCallback = function() { document.location = dh; }
				dataLayer.push( o );
				console.log(o);
				console.log(dp);
			});
		}
		// addCart event
		if ( !jQuery(co.linksToAddChart,p).data('ecommerce-product') && co.linksToAddChart )
		{
			var lv = jQuery(co.linksToAddChart,p);
			lv.data('ecommerce-product',product);
			jQuery(co.linksToAddChart,p).click(function (e) {  

				var dh = $(this).attr('href');
				var dp = $(this).data('ecommerce-product');
				var o = {'event': 'ecommerce-addCart','ecommerce': { 'add': { 'actionField': {'list': dp.list}, 'products': [dp] } } };
				dataLayer.push( o );
				console.log(o);
				console.log(dp);

			});
		}
	}
}//if
}//for

console.log('promos:');
console.log(b);
console.log('lists:');
console.log(l);
console.log('details:');
console.log(v);

return {'ecommerce':{ 
'impressions': l, 
'promoView': {'promotions' : b},
'detail' : { 'actionField' : { 'list' : '' }, products : v }
}};

}//if
}//function