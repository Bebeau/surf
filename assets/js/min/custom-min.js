$(function(){ParallaxScroll.init()});var ParallaxScroll={showLogs:!1,round:1e3,init:function(){return this._log("init"),this._inited?(this._log("Already Inited"),void(this._inited=!0)):(this._requestAnimationFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(t,e){window.setTimeout(t,1e3/60)}}(),void this._onScroll(!0))},_inited:!1,_properties:["x","y","z","rotateX","rotateY","rotateZ","scaleX","scaleY","scaleZ","scale"],_requestAnimationFrame:null,_log:function(t){this.showLogs&&console.log("Parallax Scroll / "+t)},_onScroll:function(t){var e=$(document).scrollTop(),n=$(window).height();this._log("onScroll "+e),$("[data-parallax]").each($.proxy(function(o,i){var r=$(i),a=[],s=!1,l=r.data("style");void 0==l&&(l=r.attr("style")||"",r.data("style",l));var c=[r.data("parallax")],u;for(u=2;r.data("parallax"+u);u++)c.push(r.data("parallax-"+u));var d=c.length;for(u=0;d>u;u++){var h=c[u],p=h["from-scroll"];void 0==p&&(p=Math.max(0,$(i).offset().top-n)),p=0|p;var f=h.distance,m=h["to-scroll"];void 0==f&&void 0==m&&(f=n),f=Math.max(0|f,1);var y=h.easing,v=h["easing-return"];if(void 0!=y&&$.easing&&$.easing[y]||(y=null),void 0!=v&&$.easing&&$.easing[v]||(v=y),y){var g=h.duration;void 0==g&&(g=f),g=Math.max(0|g,1);var w=h["duration-return"];void 0==w&&(w=g),f=1;var b=r.data("current-time");void 0==b&&(b=0)}void 0==m&&(m=p+f),m=0|m;var j=h.smoothness;void 0==j&&(j=30),j=0|j,(t||0==j)&&(j=1),j=0|j;var Q=e;Q=Math.max(Q,p),Q=Math.min(Q,m),y&&(void 0==r.data("sens")&&r.data("sens","back"),Q>p&&("back"==r.data("sens")?(b=1,r.data("sens","go")):b++),m>Q&&("go"==r.data("sens")?(b=1,r.data("sens","back")):b++),t&&(b=g),r.data("current-time",b)),this._properties.map($.proxy(function(t){var e=0,n=h[t];if(void 0!=n){"scale"==t||"scaleX"==t||"scaleY"==t||"scaleZ"==t?e=1:n=0|n;var o=r.data("_"+t);void 0==o&&(o=e);var i=(n-e)*((Q-p)/(m-p))+e,l=o+(i-o)/j;if(y&&b>0&&g>=b){var c=e;"back"==r.data("sens")&&(c=n,n=-n,y=v,g=w),l=$.easing[y](null,b,c,n,g)}l=Math.ceil(l*this.round)/this.round,l==o&&i==n&&(l=n),a[t]||(a[t]=0),a[t]+=l,o!=a[t]&&(r.data("_"+t,a[t]),s=!0)}},this))}if(s){if(void 0!=a.z){var x=h.perspective;void 0==x&&(x=800);var I=r.parent();I.data("style")||I.data("style",I.attr("style")||""),I.attr("style","perspective:"+x+"px; -webkit-perspective:"+x+"px; "+I.data("style"))}void 0==a.scaleX&&(a.scaleX=1),void 0==a.scaleY&&(a.scaleY=1),void 0==a.scaleZ&&(a.scaleZ=1),void 0!=a.scale&&(a.scaleX*=a.scale,a.scaleY*=a.scale,a.scaleZ*=a.scale);var _="translate3d("+(a.x?a.x:0)+"px, "+(a.y?a.y:0)+"px, "+(a.z?a.z:0)+"px)",k="rotateX("+(a.rotateX?a.rotateX:0)+"deg) rotateY("+(a.rotateY?a.rotateY:0)+"deg) rotateZ("+(a.rotateZ?a.rotateZ:0)+"deg)",C="scaleX("+a.scaleX+") scaleY("+a.scaleY+") scaleZ("+a.scaleZ+")",S=_+" "+k+" "+C+";";this._log(S),r.attr("style","transform:"+S+" -webkit-transform:"+S+" "+l)}},this)),window.requestAnimationFrame?window.requestAnimationFrame($.proxy(this._onScroll,this,!1)):this._requestAnimationFrame($.proxy(this._onScroll,this,!1))}};!function($){function t(t,e){return t.toFixed(e.decimals)}$.fn.countTo=function(t){return t=t||{},$(this).each(function(){function e(t){var e=o.formatter.call(a,t,o);s.text(e)}function n(){c+=r,l++,e(c),"function"==typeof o.onUpdate&&o.onUpdate.call(a,c),l>=i&&(s.removeData("countTo"),clearInterval(u.interval),c=o.to,"function"==typeof o.onComplete&&o.onComplete.call(a,c))}var o=$.extend({},$.fn.countTo.defaults,{from:$(this).data("from"),to:$(this).data("to"),speed:$(this).data("speed"),refreshInterval:$(this).data("refresh-interval"),decimals:$(this).data("decimals")},t),i=Math.ceil(o.speed/o.refreshInterval),r=(o.to-o.from)/i,a=this,s=$(this),l=0,c=o.from,u=s.data("countTo")||{};s.data("countTo",u),u.interval&&clearInterval(u.interval),e(c),u.interval=setInterval(n,o.refreshInterval)})},$.fn.countTo.defaults={from:0,to:0,speed:1e3,refreshInterval:100,decimals:0,formatter:t,onUpdate:null,onComplete:null}}(jQuery),function(){var t;t=function(){function t(t,e){var n,o;if(this.options={target:"instafeed",get:"popular",resolution:"thumbnail",sortBy:"none",links:!0,mock:!1,useHttp:!1},"object"==typeof t)for(n in t)o=t[n],this.options[n]=o;this.context=null!=e?e:this,this.unique=this._genKey()}return t.prototype.hasNext=function(){return"string"==typeof this.context.nextUrl&&this.context.nextUrl.length>0},t.prototype.next=function(){return this.hasNext()?this.run(this.context.nextUrl):!1},t.prototype.run=function(e){var n,o,i;if("string"!=typeof this.options.clientId&&"string"!=typeof this.options.accessToken)throw new Error("Missing clientId or accessToken.");if("string"!=typeof this.options.accessToken&&"string"!=typeof this.options.clientId)throw new Error("Missing clientId or accessToken.");return null!=this.options.before&&"function"==typeof this.options.before&&this.options.before.call(this),"undefined"!=typeof document&&null!==document&&(i=document.createElement("script"),i.id="instafeed-fetcher",i.src=e||this._buildUrl(),n=document.getElementsByTagName("head"),n[0].appendChild(i),o="instafeedCache"+this.unique,window[o]=new t(this.options,this),window[o].unique=this.unique),!0},t.prototype.parse=function(t){var e,n,o,i,r,a,s,l,c,u,d,h,p,f,m,y,v,g,w,b,j,Q,x,I,_,k,C,S,T,E,N,O,q;if("object"!=typeof t){if(null!=this.options.error&&"function"==typeof this.options.error)return this.options.error.call(this,"Invalid JSON data"),!1;throw new Error("Invalid JSON response")}if(200!==t.meta.code){if(null!=this.options.error&&"function"==typeof this.options.error)return this.options.error.call(this,t.meta.error_message),!1;throw new Error("Error from Instagram: "+t.meta.error_message)}if(0===t.data.length){if(null!=this.options.error&&"function"==typeof this.options.error)return this.options.error.call(this,"No images were returned from Instagram"),!1;throw new Error("No images were returned from Instagram")}if(null!=this.options.success&&"function"==typeof this.options.success&&this.options.success.call(this,t),this.context.nextUrl="",null!=t.pagination&&(this.context.nextUrl=t.pagination.next_url),"none"!==this.options.sortBy)switch(N="random"===this.options.sortBy?["","random"]:this.options.sortBy.split("-"),E="least"===N[0],N[1]){case"random":t.data.sort(function(){return.5-Math.random()});break;case"recent":t.data=this._sortBy(t.data,"created_time",E);break;case"liked":t.data=this._sortBy(t.data,"likes.count",E);break;case"commented":t.data=this._sortBy(t.data,"comments.count",E);break;default:throw new Error("Invalid option for sortBy: '"+this.options.sortBy+"'.")}if("undefined"!=typeof document&&null!==document&&this.options.mock===!1){if(y=t.data,T=parseInt(this.options.limit,10),null!=this.options.limit&&y.length>T&&(y=y.slice(0,T)),s=document.createDocumentFragment(),null!=this.options.filter&&"function"==typeof this.options.filter&&(y=this._filter(y,this.options.filter)),null!=this.options.template&&"string"==typeof this.options.template){for(c="",f="",b="",q=document.createElement("div"),d=0,_=y.length;_>d;d++){if(h=y[d],p=h.images[this.options.resolution],"object"!=typeof p)throw a="No image found for resolution: "+this.options.resolution+".",new Error(a);j=p.width,g=p.height,w="square",j>g&&(w="landscape"),g>j&&(w="portrait"),m=p.url,u=window.location.protocol.indexOf("http")>=0,u&&!this.options.useHttp&&(m=m.replace(/https?:\/\//,"//")),f=this._makeTemplate(this.options.template,{model:h,id:h.id,link:h.link,type:h.type,image:m,width:j,height:g,orientation:w,caption:this._getObjectProperty(h,"caption.text"),likes:h.likes.count,comments:h.comments.count,location:this._getObjectProperty(h,"location.name")}),c+=f}for(q.innerHTML=c,i=[],o=0,n=q.childNodes.length;n>o;)i.push(q.childNodes[o]),o+=1;for(x=0,k=i.length;k>x;x++)S=i[x],s.appendChild(S)}else for(I=0,C=y.length;C>I;I++){if(h=y[I],v=document.createElement("img"),p=h.images[this.options.resolution],"object"!=typeof p)throw a="No image found for resolution: "+this.options.resolution+".",new Error(a);m=p.url,u=window.location.protocol.indexOf("http")>=0,u&&!this.options.useHttp&&(m=m.replace(/https?:\/\//,"//")),v.src=m,this.options.links===!0?(e=document.createElement("a"),e.href=h.link,e.appendChild(v),s.appendChild(e)):s.appendChild(v)}if(O=this.options.target,"string"==typeof O&&(O=document.getElementById(O)),null==O)throw a='No element with id="'+this.options.target+'" on page.',new Error(a);O.appendChild(s),l=document.getElementsByTagName("head")[0],l.removeChild(document.getElementById("instafeed-fetcher")),Q="instafeedCache"+this.unique,window[Q]=void 0;try{delete window[Q]}catch(B){r=B}}return null!=this.options.after&&"function"==typeof this.options.after&&this.options.after.call(this),!0},t.prototype._buildUrl=function(){var t,e,n;switch(t="https://api.instagram.com/v1",this.options.get){case"popular":e="media/popular";break;case"tagged":if(!this.options.tagName)throw new Error("No tag name specified. Use the 'tagName' option.");e="tags/"+this.options.tagName+"/media/recent";break;case"location":if(!this.options.locationId)throw new Error("No location specified. Use the 'locationId' option.");e="locations/"+this.options.locationId+"/media/recent";break;case"user":if(!this.options.userId)throw new Error("No user specified. Use the 'userId' option.");e="users/"+this.options.userId+"/media/recent";break;default:throw new Error("Invalid option for get: '"+this.options.get+"'.")}return n=t+"/"+e,n+=null!=this.options.accessToken?"?access_token="+this.options.accessToken:"?client_id="+this.options.clientId,null!=this.options.limit&&(n+="&count="+this.options.limit),n+="&callback=instafeedCache"+this.unique+".parse"},t.prototype._genKey=function(){var t;return t=function(){return(65536*(1+Math.random())|0).toString(16).substring(1)},""+t()+t()+t()+t()},t.prototype._makeTemplate=function(t,e){var n,o,i,r,a;for(o=/(?:\{{2})([\w\[\]\.]+)(?:\}{2})/,n=t;o.test(n);)r=n.match(o)[1],a=null!=(i=this._getObjectProperty(e,r))?i:"",n=n.replace(o,""+a);return n},t.prototype._getObjectProperty=function(t,e){var n,o;for(e=e.replace(/\[(\w+)\]/g,".$1"),o=e.split(".");o.length;){if(n=o.shift(),!(null!=t&&n in t))return null;t=t[n]}return t},t.prototype._sortBy=function(t,e,n){var o;return o=function(t,o){var i,r;return i=this._getObjectProperty(t,e),r=this._getObjectProperty(o,e),n?i>r?1:-1:r>i?1:-1},t.sort(o.bind(this)),t},t.prototype._filter=function(t,e){var n,o,i,r,a;for(n=[],o=function(t){return e(t)?n.push(t):void 0},i=0,a=t.length;a>i;i++)r=t[i],o(r);return n},t}(),function(t,e){return"function"==typeof define&&define.amd?define([],e):"object"==typeof module&&module.exports?module.exports=e():t.Instafeed=e()}(this,function(){return t})}.call(this);var isMobile=/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent),ajaxurl=meta.ajaxurl,move={onMove:function(){move.slideUp(),move.slideDown(),move.slideInLeft(),move.slideInRight()},isOnScreen:function(t){if(t.length){var e=jQuery(t),n=jQuery(window),o={top:n.scrollTop(),left:n.scrollLeft()};o.right=o.left+n.width(),o.bottom=o.top+n.height();var i=e.offset();return i.right=i.left+e.outerWidth(),i.bottom=i.top+e.outerHeight(),!(o.right<i.left||o.left>i.right||o.bottom<i.top||o.top>i.bottom)}},slideUp:function(){var t=jQuery('*[data-animation="slideUp"]');t.length>0&&t.each(function(){var t=jQuery(this);move.isOnScreen(t)?t.addClass("slideIn"):jQuery(window).scroll(function(){move.isOnScreen(t)&&t.addClass("slideIn")})})},slideDown:function(){var t=jQuery('*[data-animation="slideDown"]');t.length>0&&t.each(function(){var t=jQuery(this);move.isOnScreen(t)?t.addClass("slideIn"):jQuery(window).scroll(function(){move.isOnScreen(t)&&t.addClass("slideIn")})})},slideInLeft:function(){var t=jQuery('*[data-animation="slideInLeft"]');t.length>0&&t.each(function(){var t=jQuery(this),e=jQuery(this).parent();move.isOnScreen(e)?t.addClass("slideIn"):jQuery(window).scroll(function(){move.isOnScreen(e)&&t.addClass("slideIn")})})},slideInRight:function(){var t=jQuery('*[data-animation="slideInRight"]');t.length>0&&t.each(function(){var t=jQuery(this),e=jQuery(this).parent();move.isOnScreen(e)?t.addClass("slideIn"):jQuery(window).scroll(function(){move.isOnScreen(e)&&t.addClass("slideIn")})})}},init={onReady:function(){init.contactBtn(),init.instafeed(),init.scrollNav(),init.dropdown(),init.SVG(),init.animateList()},animateList:function(){jQuery("section").each(function(){move.isOnScreen(jQuery(this))?jQuery(this).find("li").each(function(t){jQuery(this).delay(200*t).queue(function(){jQuery(this).addClass("in")})}):jQuery(window).scroll(function(){jQuery(this).find("li").each(function(t){jQuery(this).delay(200*t).queue(function(){jQuery(this).addClass("in")})})})})},SVG:function(){jQuery("img.svg").each(function(){var t=jQuery(this),e=t.attr("id"),n=t.attr("class"),o=t.attr("src");jQuery.get(o,function(o){var i=jQuery(o).find("svg");"undefined"!=typeof e&&(i=i.attr("id",e)),"undefined"!=typeof n&&(i=i.attr("class",n+" replaced-svg")),i=i.removeAttr("xmlns:a"),t.replaceWith(i)},"xml")})},dropdown:function(){removeClass=!1,jQuery("#dropdown button").click(function(t){t.preventDefault(),jQuery("#dropdown ul").addClass("show"),removeClass=!1}),jQuery("html").click(function(){removeClass&&jQuery("#dropdown ul").removeClass("show"),removeClass=!0}),jQuery("#dropdown ul li").click(function(t){t.preventDefault();var e=jQuery(this).attr("data-value"),n=jQuery(this).text();jQuery("#interest").val(e),jQuery("#dropdown ul").removeClass("show"),jQuery("#dropdown button").addClass("selected"),jQuery("#dropdown button").text(n),jQuery("#dropdown button").append('<i class="fa fa-angle-down"></i>')})},scrollNav:function(){jQuery(window).scroll(function(){var t=jQuery("#fbsection2").offset().top,e=jQuery(window).scrollTop();e>=t?jQuery(".navigation").addClass("in"):jQuery(".navigation").removeClass("in")}),jQuery(".navigation a").click(function(t){t.preventDefault();var e=jQuery(this).attr("href");jQuery("html, body").animate({scrollTop:jQuery(e).offset().top},1e3)})},instafeed:function(){var t=new Instafeed({get:"user",userId:"2278857975",clientId:"1e27e8e0732142e98517bc10f8abf989",accessToken:"1385988408.1e27e8e.13cd0c2c1238429ca9d5cec911d06a09",resolution:"standard_resolution",template:'<div><img src="{{image}}" alt="" /></div>',limit:20,sortBy:"most-recent"});t.run()},contactSubmit:function(){var t=jQuery("#contactfrm");return jQuery('<i class="fa fa-spinner fa-spin"></i>').prependTo(".btn-submit"),jQuery.ajax({url:ajaxurl,type:t.attr("method"),data:{firstname:jQuery("#firstname").val(),lastname:jQuery("#lastname").val(),company:jQuery("#company").val(),title:jQuery("#title").val(),emailaddress:jQuery("#emailaddress").val(),interest:jQuery("#interest").val(),message:jQuery("#message").val(),action:"sendContact"},dataType:"html",beforeSubmit:function(t,e,n){t.push({name:"nonce",value:meta.nonce})},success:function(t){init.contactResponse(t)}}),!1},contactResponse:function(t){jQuery(".btn-submit i").remove(),"Success"===t&&(jQuery(".btn-submit").replaceWith('<button class="btn btn-submit success"><i class="fa fa-check"></i></button>'),jQuery("input").val(""),jQuery("textarea").val(""),jQuery(".dropdown button").html('Area of interest <i class="fa fa-angle-down"></i>'),setTimeout(function(){jQuery(".btn-submit").replaceWith('<button class="btn btn-submit">Submit</button>')},2500)),"E"===t&&(jQuery(".btn-submit").replaceWith('<button class="btn btn-submit error"><i class="fa fa-ban"></i></button>'),setTimeout(function(){jQuery(".btn-submit").replaceWith('<button class="btn btn-submit">Submit</button>')},2500))},contactBtn:function(){jQuery("#contactfrm").submit(init.contactSubmit)}};jQuery(document).ready(function(){move.onMove(),init.onReady()});