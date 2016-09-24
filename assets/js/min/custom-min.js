$(function(){ParallaxScroll.init()});var ParallaxScroll={showLogs:!1,round:1e3,init:function(){return this._log("init"),this._inited?(this._log("Already Inited"),void(this._inited=!0)):(this._requestAnimationFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t,e){window.setTimeout(t,1e3/60)}}(),void this._onScroll(!0))},_inited:!1,_properties:["x","y","z","rotateX","rotateY","rotateZ","scaleX","scaleY","scaleZ","scale"],_requestAnimationFrame:null,_log:function(t){this.showLogs&&console.log("Parallax Scroll / "+t)},_onScroll:function(t){var e=$(document).scrollTop(),o=$(window).height();this._log("onScroll "+e),$("[data-parallax]").each($.proxy(function(n,i){var r=$(i),a=[],s=!1,l=r.data("style");void 0==l&&(l=r.attr("style")||"",r.data("style",l));var c=[r.data("parallax")],u;for(u=2;r.data("parallax"+u);u++)c.push(r.data("parallax-"+u));var d=c.length;for(u=0;d>u;u++){var p=c[u],h=p["from-scroll"];void 0==h&&(h=Math.max(0,$(i).offset().top-o)),h=0|h;var f=p.distance,m=p["to-scroll"];void 0==f&&void 0==m&&(f=o),f=Math.max(0|f,1);var y=p.easing,v=p["easing-return"];if(void 0!=y&&$.easing&&$.easing[y]||(y=null),void 0!=v&&$.easing&&$.easing[v]||(v=y),y){var g=p.duration;void 0==g&&(g=f),g=Math.max(0|g,1);var w=p["duration-return"];void 0==w&&(w=g),f=1;var b=r.data("current-time");void 0==b&&(b=0)}void 0==m&&(m=h+f),m=0|m;var j=p.smoothness;void 0==j&&(j=30),j=0|j,(t||0==j)&&(j=1),j=0|j;var Q=e;Q=Math.max(Q,h),Q=Math.min(Q,m),y&&(void 0==r.data("sens")&&r.data("sens","back"),Q>h&&("back"==r.data("sens")?(b=1,r.data("sens","go")):b++),m>Q&&("go"==r.data("sens")?(b=1,r.data("sens","back")):b++),t&&(b=g),r.data("current-time",b)),this._properties.map($.proxy(function(t){var e=0,o=p[t];if(void 0!=o){"scale"==t||"scaleX"==t||"scaleY"==t||"scaleZ"==t?e=1:o=0|o;var n=r.data("_"+t);void 0==n&&(n=e);var i=(o-e)*((Q-h)/(m-h))+e,l=n+(i-n)/j;if(y&&b>0&&g>=b){var c=e;"back"==r.data("sens")&&(c=o,o=-o,y=v,g=w),l=$.easing[y](null,b,c,o,g)}l=Math.ceil(l*this.round)/this.round,l==n&&i==o&&(l=o),a[t]||(a[t]=0),a[t]+=l,n!=a[t]&&(r.data("_"+t,a[t]),s=!0)}},this))}if(s){if(void 0!=a.z){var x=p.perspective;void 0==x&&(x=800);var k=r.parent();k.data("style")||k.data("style",k.attr("style")||""),k.attr("style","perspective:"+x+"px; -webkit-perspective:"+x+"px; "+k.data("style"))}void 0==a.scaleX&&(a.scaleX=1),void 0==a.scaleY&&(a.scaleY=1),void 0==a.scaleZ&&(a.scaleZ=1),void 0!=a.scale&&(a.scaleX*=a.scale,a.scaleY*=a.scale,a.scaleZ*=a.scale);var I="translate3d("+(a.x?a.x:0)+"px, "+(a.y?a.y:0)+"px, "+(a.z?a.z:0)+"px)",_="rotateX("+(a.rotateX?a.rotateX:0)+"deg) rotateY("+(a.rotateY?a.rotateY:0)+"deg) rotateZ("+(a.rotateZ?a.rotateZ:0)+"deg)",C="scaleX("+a.scaleX+") scaleY("+a.scaleY+") scaleZ("+a.scaleZ+")",S=I+" "+_+" "+C+";";this._log(S),r.attr("style","transform:"+S+" -webkit-transform:"+S+" "+l)}},this)),window.requestAnimationFrame?window.requestAnimationFrame($.proxy(this._onScroll,this,!1)):this._requestAnimationFrame($.proxy(this._onScroll,this,!1))}};!function($){function t(t,e){return t.toFixed(e.decimals)}$.fn.countTo=function(t){return t=t||{},$(this).each(function(){function e(t){var e=n.formatter.call(a,t,n);s.text(e)}function o(){c+=r,l++,e(c),"function"==typeof n.onUpdate&&n.onUpdate.call(a,c),l>=i&&(s.removeData("countTo"),clearInterval(u.interval),c=n.to,"function"==typeof n.onComplete&&n.onComplete.call(a,c))}var n=$.extend({},$.fn.countTo.defaults,{from:$(this).data("from"),to:$(this).data("to"),speed:$(this).data("speed"),refreshInterval:$(this).data("refresh-interval"),decimals:$(this).data("decimals")},t),i=Math.ceil(n.speed/n.refreshInterval),r=(n.to-n.from)/i,a=this,s=$(this),l=0,c=n.from,u=s.data("countTo")||{};s.data("countTo",u),u.interval&&clearInterval(u.interval),e(c),u.interval=setInterval(o,n.refreshInterval)})},$.fn.countTo.defaults={from:0,to:0,speed:1e3,refreshInterval:100,decimals:0,formatter:t,onUpdate:null,onComplete:null}}(jQuery),function(){var t;t=function(){function t(t,e){var o,n;if(this.options={target:"instafeed",get:"popular",resolution:"thumbnail",sortBy:"none",links:!0,mock:!1,useHttp:!1},"object"==typeof t)for(o in t)n=t[o],this.options[o]=n;this.context=null!=e?e:this,this.unique=this._genKey()}return t.prototype.hasNext=function(){return"string"==typeof this.context.nextUrl&&this.context.nextUrl.length>0},t.prototype.next=function(){return this.hasNext()?this.run(this.context.nextUrl):!1},t.prototype.run=function(e){var o,n,i;if("string"!=typeof this.options.clientId&&"string"!=typeof this.options.accessToken)throw new Error("Missing clientId or accessToken.");if("string"!=typeof this.options.accessToken&&"string"!=typeof this.options.clientId)throw new Error("Missing clientId or accessToken.");return null!=this.options.before&&"function"==typeof this.options.before&&this.options.before.call(this),"undefined"!=typeof document&&null!==document&&(i=document.createElement("script"),i.id="instafeed-fetcher",i.src=e||this._buildUrl(),o=document.getElementsByTagName("head"),o[0].appendChild(i),n="instafeedCache"+this.unique,window[n]=new t(this.options,this),window[n].unique=this.unique),!0},t.prototype.parse=function(t){var e,o,n,i,r,a,s,l,c,u,d,p,h,f,m,y,v,g,w,b,j,Q,x,k,I,_,C,S,T,E,N,O,B;if("object"!=typeof t){if(null!=this.options.error&&"function"==typeof this.options.error)return this.options.error.call(this,"Invalid JSON data"),!1;throw new Error("Invalid JSON response")}if(200!==t.meta.code){if(null!=this.options.error&&"function"==typeof this.options.error)return this.options.error.call(this,t.meta.error_message),!1;throw new Error("Error from Instagram: "+t.meta.error_message)}if(0===t.data.length){if(null!=this.options.error&&"function"==typeof this.options.error)return this.options.error.call(this,"No images were returned from Instagram"),!1;throw new Error("No images were returned from Instagram")}if(null!=this.options.success&&"function"==typeof this.options.success&&this.options.success.call(this,t),this.context.nextUrl="",null!=t.pagination&&(this.context.nextUrl=t.pagination.next_url),"none"!==this.options.sortBy)switch(N="random"===this.options.sortBy?["","random"]:this.options.sortBy.split("-"),E="least"===N[0],N[1]){case"random":t.data.sort(function(){return.5-Math.random()});break;case"recent":t.data=this._sortBy(t.data,"created_time",E);break;case"liked":t.data=this._sortBy(t.data,"likes.count",E);break;case"commented":t.data=this._sortBy(t.data,"comments.count",E);break;default:throw new Error("Invalid option for sortBy: '"+this.options.sortBy+"'.")}if("undefined"!=typeof document&&null!==document&&this.options.mock===!1){if(y=t.data,T=parseInt(this.options.limit,10),null!=this.options.limit&&y.length>T&&(y=y.slice(0,T)),s=document.createDocumentFragment(),null!=this.options.filter&&"function"==typeof this.options.filter&&(y=this._filter(y,this.options.filter)),null!=this.options.template&&"string"==typeof this.options.template){for(c="",f="",b="",B=document.createElement("div"),d=0,I=y.length;I>d;d++){if(p=y[d],h=p.images[this.options.resolution],"object"!=typeof h)throw a="No image found for resolution: "+this.options.resolution+".",new Error(a);j=h.width,g=h.height,w="square",j>g&&(w="landscape"),g>j&&(w="portrait"),m=h.url,u=window.location.protocol.indexOf("http")>=0,u&&!this.options.useHttp&&(m=m.replace(/https?:\/\//,"//")),f=this._makeTemplate(this.options.template,{model:p,id:p.id,link:p.link,type:p.type,image:m,width:j,height:g,orientation:w,caption:this._getObjectProperty(p,"caption.text"),likes:p.likes.count,comments:p.comments.count,location:this._getObjectProperty(p,"location.name")}),c+=f}for(B.innerHTML=c,i=[],n=0,o=B.childNodes.length;o>n;)i.push(B.childNodes[n]),n+=1;for(x=0,_=i.length;_>x;x++)S=i[x],s.appendChild(S)}else for(k=0,C=y.length;C>k;k++){if(p=y[k],v=document.createElement("img"),h=p.images[this.options.resolution],"object"!=typeof h)throw a="No image found for resolution: "+this.options.resolution+".",new Error(a);m=h.url,u=window.location.protocol.indexOf("http")>=0,u&&!this.options.useHttp&&(m=m.replace(/https?:\/\//,"//")),v.src=m,this.options.links===!0?(e=document.createElement("a"),e.href=p.link,e.appendChild(v),s.appendChild(e)):s.appendChild(v)}if(O=this.options.target,"string"==typeof O&&(O=document.getElementById(O)),null==O)throw a='No element with id="'+this.options.target+'" on page.',new Error(a);O.appendChild(s),l=document.getElementsByTagName("head")[0],l.removeChild(document.getElementById("instafeed-fetcher")),Q="instafeedCache"+this.unique,window[Q]=void 0;try{delete window[Q]}catch(q){r=q}}return null!=this.options.after&&"function"==typeof this.options.after&&this.options.after.call(this),!0},t.prototype._buildUrl=function(){var t,e,o;switch(t="https://api.instagram.com/v1",this.options.get){case"popular":e="media/popular";break;case"tagged":if(!this.options.tagName)throw new Error("No tag name specified. Use the 'tagName' option.");e="tags/"+this.options.tagName+"/media/recent";break;case"location":if(!this.options.locationId)throw new Error("No location specified. Use the 'locationId' option.");e="locations/"+this.options.locationId+"/media/recent";break;case"user":if(!this.options.userId)throw new Error("No user specified. Use the 'userId' option.");e="users/"+this.options.userId+"/media/recent";break;default:throw new Error("Invalid option for get: '"+this.options.get+"'.")}return o=t+"/"+e,o+=null!=this.options.accessToken?"?access_token="+this.options.accessToken:"?client_id="+this.options.clientId,null!=this.options.limit&&(o+="&count="+this.options.limit),o+="&callback=instafeedCache"+this.unique+".parse"},t.prototype._genKey=function(){var t;return t=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)},""+t()+t()+t()+t()},t.prototype._makeTemplate=function(t,e){var o,n,i,r,a;for(n=/(?:\{{2})([\w\[\]\.]+)(?:\}{2})/,o=t;n.test(o);)r=o.match(n)[1],a=null!=(i=this._getObjectProperty(e,r))?i:"",o=o.replace(n,""+a);return o},t.prototype._getObjectProperty=function(t,e){var o,n;for(e=e.replace(/\[(\w+)\]/g,".$1"),n=e.split(".");n.length;){if(o=n.shift(),!(null!=t&&o in t))return null;t=t[o]}return t},t.prototype._sortBy=function(t,e,o){var n;return n=function(t,n){var i,r;return i=this._getObjectProperty(t,e),r=this._getObjectProperty(n,e),o?i>r?1:-1:r>i?1:-1},t.sort(n.bind(this)),t},t.prototype._filter=function(t,e){var o,n,i,r,a;for(o=[],n=function(t){return e(t)?o.push(t):void 0},i=0,a=t.length;a>i;i++)r=t[i],n(r);return o},t}(),function(t,e){return"function"==typeof define&&define.amd?define([],e):"object"==typeof module&&module.exports?module.exports=e():t.Instafeed=e()}(this,function(){return t})}.call(this);var isMobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent),ajaxurl=meta.ajaxurl,move={onMove:function(){move.slideUp(),move.slideDown(),move.slideInLeft(),move.slideInRight()},isOnScreen:function(t){if(t.length){var e=jQuery(t),o=jQuery(window),n={top:o.scrollTop(),left:o.scrollLeft()};n.right=n.left+o.width(),n.bottom=n.top+o.height();var i=e.offset();return i.right=i.left+e.outerWidth(),i.bottom=i.top+e.outerHeight(),!(n.right<i.left||n.left>i.right||n.bottom<i.top||n.top>i.bottom)}},slideUp:function(){var t=jQuery('*[data-animation="slideUp"]');t.length>0&&t.each(function(){var t=jQuery(this);move.isOnScreen(t)?t.addClass("slideIn"):jQuery(window).scroll(function(){move.isOnScreen(t)&&t.addClass("slideIn")})})},slideDown:function(){var t=jQuery('*[data-animation="slideDown"]');t.length>0&&t.each(function(){var t=jQuery(this);move.isOnScreen(t)?t.addClass("slideIn"):jQuery(window).scroll(function(){move.isOnScreen(t)&&t.addClass("slideIn")})})},slideInLeft:function(){var t=jQuery('*[data-animation="slideInLeft"]');t.length>0&&t.each(function(){var t=jQuery(this),e=jQuery(this).parent();move.isOnScreen(e)?t.addClass("slideIn"):jQuery(window).scroll(function(){move.isOnScreen(e)&&t.addClass("slideIn")})})},slideInRight:function(){var t=jQuery('*[data-animation="slideInRight"]');t.length>0&&t.each(function(){var t=jQuery(this),e=jQuery(this).parent();move.isOnScreen(e)?t.addClass("slideIn"):jQuery(window).scroll(function(){move.isOnScreen(e)&&t.addClass("slideIn")})})}},init={onReady:function(){init.contactBtn(),init.instafeed(),init.scrollNav(),init.dropdown(),init.headerWrap(),init.linking()},linking:function(){jQuery(".app div").click(function(t){t.preventDefault();var e=jQuery(this).attr("data-href");window.open(e,"_blank").focus()})},headerWrap:function(){jQuery(".iphone h2").each(function(){var t=$(this);t.html(t.html().replace(/^(\w+)/,"<span>$1</span>"))})},dropdown:function(){removeClass=!1,jQuery("#dropdown button").click(function(t){t.preventDefault(),jQuery("#dropdown ul").addClass("show"),removeClass=!1}),jQuery("html").click(function(){removeClass&&jQuery("#dropdown ul").removeClass("show"),removeClass=!0}),jQuery("#dropdown ul li").click(function(t){t.preventDefault();var e=jQuery(this).attr("data-value"),o=jQuery(this).text();jQuery("#interest").val(e),jQuery("#dropdown ul").removeClass("show"),jQuery("#dropdown button").addClass("selected"),jQuery("#dropdown button").text(o),jQuery("#dropdown button").append('<i class="fa fa-angle-down"></i>')})},scrollNav:function(){jQuery(window).scroll(function(){var t=jQuery("#fbsection2").offset().top,e=jQuery(window).scrollTop();e>=t-100?jQuery(".navigation").addClass("in"):jQuery(".navigation").removeClass("in")}),jQuery(".navigation a").click(function(t){t.preventDefault();var e=jQuery(this).attr("href");jQuery("html, body").animate({scrollTop:jQuery(e).offset().top},1e3)})},instafeed:function(){var t=new Instafeed({get:"user",userId:"2622278571",clientId:"dd4f961a447e4aba84b74d409eb8363e",accessToken:"2622278571.dd4f961.2b3f7771342d428a808d8a72442c17ff",resolution:"standard_resolution",template:'<div><img src="{{image}}" alt="" /></div>',limit:60,sortBy:"most-recent"});t.run()},contactSubmit:function(){var t=jQuery("#contactfrm");return jQuery('<i class="fa fa-spinner fa-spin"></i>').prependTo(".btn-submit"),jQuery.ajax({url:ajaxurl,type:t.attr("method"),data:{firstname:jQuery("#firstname").val(),lastname:jQuery("#lastname").val(),company:jQuery("#company").val(),title:jQuery("#title").val(),emailaddress:jQuery("#emailaddress").val(),interest:jQuery("#interest").val(),message:jQuery("#message").val(),action:"sendContact"},dataType:"html",beforeSubmit:function(t,e,o){t.push({name:"nonce",value:meta.nonce})},success:function(t){init.contactResponse(t)}}),!1},contactResponse:function(t){jQuery(".btn-submit i").remove(),"Success"===t&&(jQuery(".btn-submit").replaceWith('<button class="btn btn-submit success"><i class="fa fa-check"></i></button>'),jQuery("input").val(""),jQuery("textarea").val(""),jQuery(".dropdown button").html('Area of interest <i class="fa fa-angle-down"></i>'),setTimeout(function(){jQuery(".btn-submit").replaceWith('<button class="btn btn-submit">Submit</button>')},2500)),"E"===t&&(jQuery(".btn-submit").replaceWith('<button class="btn btn-submit error"><i class="fa fa-ban"></i></button>'),setTimeout(function(){jQuery(".btn-submit").replaceWith('<button class="btn btn-submit">Submit</button>')},2500))},contactBtn:function(){jQuery("#contactfrm").submit(init.contactSubmit)}};isMobile||cbpFixedScrollLayout.init(),jQuery(document).ready(function(){move.onMove(),init.onReady()});