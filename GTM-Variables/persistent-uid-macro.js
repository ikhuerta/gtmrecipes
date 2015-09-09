function() {
// Macro for persistent &uid data with cookies

    uid = {{dataLayer user}}); // <-- write here your GTM var with the &uid

	if ( uid && uid != '(not set)' && uid != 'false' ) { var d = new Date(); document.cookie = 'p_ui=' + uid + '; expires='+d.setTime(d.getTime()+63072000000).toGMTString()+'; path=/'; return uid; }
    else { var re = new RegExp( 'p_uid=([^;]+)(;.+)?$'); var pd = document.cookie.match( re ); var v = (pd && pd[1]) ? pd[1] : false;	if (v) return v; else return;  }
}