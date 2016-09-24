// Parallax
$(function(){ParallaxScroll.init()});var ParallaxScroll={showLogs:!1,round:1e3,init:function(){return this._log("init"),this._inited?(this._log("Already Inited"),void(this._inited=!0)):(this._requestAnimationFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a,t){window.setTimeout(a,1e3/60)}}(),void this._onScroll(!0))},_inited:!1,_properties:["x","y","z","rotateX","rotateY","rotateZ","scaleX","scaleY","scaleZ","scale"],_requestAnimationFrame:null,_log:function(a){this.showLogs&&console.log("Parallax Scroll / "+a)},_onScroll:function(a){var t=$(document).scrollTop(),e=$(window).height();this._log("onScroll "+t),$("[data-parallax]").each($.proxy(function(i,o){var s=$(o),r=[],n=!1,l=s.data("style");void 0==l&&(l=s.attr("style")||"",s.data("style",l));var d=[s.data("parallax")],c;for(c=2;s.data("parallax"+c);c++)d.push(s.data("parallax-"+c));var v=d.length;for(c=0;v>c;c++){var m=d[c],u=m["from-scroll"];void 0==u&&(u=Math.max(0,$(o).offset().top-e)),u=0|u;var h=m.distance,p=m["to-scroll"];void 0==h&&void 0==p&&(h=e),h=Math.max(0|h,1);var w=m.easing,x=m["easing-return"];if(void 0!=w&&$.easing&&$.easing[w]||(w=null),void 0!=x&&$.easing&&$.easing[x]||(x=w),w){var g=m.duration;void 0==g&&(g=h),g=Math.max(0|g,1);var f=m["duration-return"];void 0==f&&(f=g),h=1;var _=s.data("current-time");void 0==_&&(_=0)}void 0==p&&(p=u+h),p=0|p;var y=m.smoothness;void 0==y&&(y=30),y=0|y,(a||0==y)&&(y=1),y=0|y;var A=t;A=Math.max(A,u),A=Math.min(A,p),w&&(void 0==s.data("sens")&&s.data("sens","back"),A>u&&("back"==s.data("sens")?(_=1,s.data("sens","go")):_++),p>A&&("go"==s.data("sens")?(_=1,s.data("sens","back")):_++),a&&(_=g),s.data("current-time",_)),this._properties.map($.proxy(function(a){var t=0,e=m[a];if(void 0!=e){"scale"==a||"scaleX"==a||"scaleY"==a||"scaleZ"==a?t=1:e=0|e;var i=s.data("_"+a);void 0==i&&(i=t);var o=(e-t)*((A-u)/(p-u))+t,l=i+(o-i)/y;if(w&&_>0&&g>=_){var d=t;"back"==s.data("sens")&&(d=e,e=-e,w=x,g=f),l=$.easing[w](null,_,d,e,g)}l=Math.ceil(l*this.round)/this.round,l==i&&o==e&&(l=e),r[a]||(r[a]=0),r[a]+=l,i!=r[a]&&(s.data("_"+a,r[a]),n=!0)}},this))}if(n){if(void 0!=r.z){var X=m.perspective;void 0==X&&(X=800);var Y=s.parent();Y.data("style")||Y.data("style",Y.attr("style")||""),Y.attr("style","perspective:"+X+"px; -webkit-perspective:"+X+"px; "+Y.data("style"))}void 0==r.scaleX&&(r.scaleX=1),void 0==r.scaleY&&(r.scaleY=1),void 0==r.scaleZ&&(r.scaleZ=1),void 0!=r.scale&&(r.scaleX*=r.scale,r.scaleY*=r.scale,r.scaleZ*=r.scale);var Z="translate3d("+(r.x?r.x:0)+"px, "+(r.y?r.y:0)+"px, "+(r.z?r.z:0)+"px)",q="rotateX("+(r.rotateX?r.rotateX:0)+"deg) rotateY("+(r.rotateY?r.rotateY:0)+"deg) rotateZ("+(r.rotateZ?r.rotateZ:0)+"deg)",F="scaleX("+r.scaleX+") scaleY("+r.scaleY+") scaleZ("+r.scaleZ+")",S=Z+" "+q+" "+F+";";this._log(S),s.attr("style","transform:"+S+" -webkit-transform:"+S+" "+l)}},this)),window.requestAnimationFrame?window.requestAnimationFrame($.proxy(this._onScroll,this,!1)):this._requestAnimationFrame($.proxy(this._onScroll,this,!1))}};
// Add Count.js
!function($){function t(t,e){return t.toFixed(e.decimals)}$.fn.countTo=function(t){return t=t||{},$(this).each(function(){function e(t){var e=n.formatter.call(l,t,n);f.text(e)}function a(){c+=r,i++,e(c),"function"==typeof n.onUpdate&&n.onUpdate.call(l,c),i>=o&&(f.removeData("countTo"),clearInterval(s.interval),c=n.to,"function"==typeof n.onComplete&&n.onComplete.call(l,c))}var n=$.extend({},$.fn.countTo.defaults,{from:$(this).data("from"),to:$(this).data("to"),speed:$(this).data("speed"),refreshInterval:$(this).data("refresh-interval"),decimals:$(this).data("decimals")},t),o=Math.ceil(n.speed/n.refreshInterval),r=(n.to-n.from)/o,l=this,f=$(this),i=0,c=n.from,s=f.data("countTo")||{};f.data("countTo",s),s.interval&&clearInterval(s.interval),e(c),s.interval=setInterval(a,n.refreshInterval)})},$.fn.countTo.defaults={from:0,to:0,speed:1e3,refreshInterval:100,decimals:0,formatter:t,onUpdate:null,onComplete:null}}(jQuery);
// Instafeed
(function(){var e;e=function(){function e(e,t){var n,r;this.options={target:"instafeed",get:"popular",resolution:"thumbnail",sortBy:"none",links:!0,mock:!1,useHttp:!1};if(typeof e=="object")for(n in e)r=e[n],this.options[n]=r;this.context=t!=null?t:this,this.unique=this._genKey()}return e.prototype.hasNext=function(){return typeof this.context.nextUrl=="string"&&this.context.nextUrl.length>0},e.prototype.next=function(){return this.hasNext()?this.run(this.context.nextUrl):!1},e.prototype.run=function(t){var n,r,i;if(typeof this.options.clientId!="string"&&typeof this.options.accessToken!="string")throw new Error("Missing clientId or accessToken.");if(typeof this.options.accessToken!="string"&&typeof this.options.clientId!="string")throw new Error("Missing clientId or accessToken.");return this.options.before!=null&&typeof this.options.before=="function"&&this.options.before.call(this),typeof document!="undefined"&&document!==null&&(i=document.createElement("script"),i.id="instafeed-fetcher",i.src=t||this._buildUrl(),n=document.getElementsByTagName("head"),n[0].appendChild(i),r="instafeedCache"+this.unique,window[r]=new e(this.options,this),window[r].unique=this.unique),!0},e.prototype.parse=function(e){var t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x,T,N,C,k,L,A,O,M,_,D;if(typeof e!="object"){if(this.options.error!=null&&typeof this.options.error=="function")return this.options.error.call(this,"Invalid JSON data"),!1;throw new Error("Invalid JSON response")}if(e.meta.code!==200){if(this.options.error!=null&&typeof this.options.error=="function")return this.options.error.call(this,e.meta.error_message),!1;throw new Error("Error from Instagram: "+e.meta.error_message)}if(e.data.length===0){if(this.options.error!=null&&typeof this.options.error=="function")return this.options.error.call(this,"No images were returned from Instagram"),!1;throw new Error("No images were returned from Instagram")}this.options.success!=null&&typeof this.options.success=="function"&&this.options.success.call(this,e),this.context.nextUrl="",e.pagination!=null&&(this.context.nextUrl=e.pagination.next_url);if(this.options.sortBy!=="none"){this.options.sortBy==="random"?M=["","random"]:M=this.options.sortBy.split("-"),O=M[0]==="least"?!0:!1;switch(M[1]){case"random":e.data.sort(function(){return.5-Math.random()});break;case"recent":e.data=this._sortBy(e.data,"created_time",O);break;case"liked":e.data=this._sortBy(e.data,"likes.count",O);break;case"commented":e.data=this._sortBy(e.data,"comments.count",O);break;default:throw new Error("Invalid option for sortBy: '"+this.options.sortBy+"'.")}}if(typeof document!="undefined"&&document!==null&&this.options.mock===!1){m=e.data,A=parseInt(this.options.limit,10),this.options.limit!=null&&m.length>A&&(m=m.slice(0,A)),u=document.createDocumentFragment(),this.options.filter!=null&&typeof this.options.filter=="function"&&(m=this._filter(m,this.options.filter));if(this.options.template!=null&&typeof this.options.template=="string"){f="",d="",w="",D=document.createElement("div");for(c=0,N=m.length;c<N;c++){h=m[c],p=h.images[this.options.resolution];if(typeof p!="object")throw o="No image found for resolution: "+this.options.resolution+".",new Error(o);E=p.width,y=p.height,b="square",E>y&&(b="landscape"),E<y&&(b="portrait"),v=p.url,l=window.location.protocol.indexOf("http")>=0,l&&!this.options.useHttp&&(v=v.replace(/https?:\/\//,"//")),d=this._makeTemplate(this.options.template,{model:h,id:h.id,link:h.link,type:h.type,image:v,width:E,height:y,orientation:b,caption:this._getObjectProperty(h,"caption.text"),likes:h.likes.count,comments:h.comments.count,location:this._getObjectProperty(h,"location.name")}),f+=d}D.innerHTML=f,i=[],r=0,n=D.childNodes.length;while(r<n)i.push(D.childNodes[r]),r+=1;for(x=0,C=i.length;x<C;x++)L=i[x],u.appendChild(L)}else for(T=0,k=m.length;T<k;T++){h=m[T],g=document.createElement("img"),p=h.images[this.options.resolution];if(typeof p!="object")throw o="No image found for resolution: "+this.options.resolution+".",new Error(o);v=p.url,l=window.location.protocol.indexOf("http")>=0,l&&!this.options.useHttp&&(v=v.replace(/https?:\/\//,"//")),g.src=v,this.options.links===!0?(t=document.createElement("a"),t.href=h.link,t.appendChild(g),u.appendChild(t)):u.appendChild(g)}_=this.options.target,typeof _=="string"&&(_=document.getElementById(_));if(_==null)throw o='No element with id="'+this.options.target+'" on page.',new Error(o);_.appendChild(u),a=document.getElementsByTagName("head")[0],a.removeChild(document.getElementById("instafeed-fetcher")),S="instafeedCache"+this.unique,window[S]=void 0;try{delete window[S]}catch(P){s=P}}return this.options.after!=null&&typeof this.options.after=="function"&&this.options.after.call(this),!0},e.prototype._buildUrl=function(){var e,t,n;e="https://api.instagram.com/v1";switch(this.options.get){case"popular":t="media/popular";break;case"tagged":if(!this.options.tagName)throw new Error("No tag name specified. Use the 'tagName' option.");t="tags/"+this.options.tagName+"/media/recent";break;case"location":if(!this.options.locationId)throw new Error("No location specified. Use the 'locationId' option.");t="locations/"+this.options.locationId+"/media/recent";break;case"user":if(!this.options.userId)throw new Error("No user specified. Use the 'userId' option.");t="users/"+this.options.userId+"/media/recent";break;default:throw new Error("Invalid option for get: '"+this.options.get+"'.")}return n=e+"/"+t,this.options.accessToken!=null?n+="?access_token="+this.options.accessToken:n+="?client_id="+this.options.clientId,this.options.limit!=null&&(n+="&count="+this.options.limit),n+="&callback=instafeedCache"+this.unique+".parse",n},e.prototype._genKey=function(){var e;return e=function(){return((1+Math.random())*65536|0).toString(16).substring(1)},""+e()+e()+e()+e()},e.prototype._makeTemplate=function(e,t){var n,r,i,s,o;r=/(?:\{{2})([\w\[\]\.]+)(?:\}{2})/,n=e;while(r.test(n))s=n.match(r)[1],o=(i=this._getObjectProperty(t,s))!=null?i:"",n=n.replace(r,""+o);return n},e.prototype._getObjectProperty=function(e,t){var n,r;t=t.replace(/\[(\w+)\]/g,".$1"),r=t.split(".");while(r.length){n=r.shift();if(!(e!=null&&n in e))return null;e=e[n]}return e},e.prototype._sortBy=function(e,t,n){var r;return r=function(e,r){var i,s;return i=this._getObjectProperty(e,t),s=this._getObjectProperty(r,t),n?i>s?1:-1:i<s?1:-1},e.sort(r.bind(this)),e},e.prototype._filter=function(e,t){var n,r,i,s,o;n=[],r=function(e){if(t(e))return n.push(e)};for(i=0,o=e.length;i<o;i++)s=e[i],r(s);return n},e}(),function(e,t){return typeof define=="function"&&define.amd?define([],t):typeof module=="object"&&module.exports?module.exports=t():e.Instafeed=t()}(this,function(){return e})}).call(this);

// check to make sure it is not loaded on mobile device
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
var ajaxurl = meta.ajaxurl;

var move = {
	onMove: function() {
		move.slideUp();
		move.slideDown();
		move.slideInLeft();
		move.slideInRight();
	},
	isOnScreen: function(elem) {
		if(elem.length) {
			var item = jQuery(elem);
			var win = jQuery(window);
		    var viewport = {
		        top : win.scrollTop(),
		        left : win.scrollLeft()
		    };
		    viewport.right = viewport.left + win.width();
		    viewport.bottom = viewport.top + win.height();
		 
		    var bounds = item.offset();
		    bounds.right = bounds.left + item.outerWidth();
		    bounds.bottom = bounds.top + item.outerHeight();
		 
		    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
		}
	},
	slideUp: function() {
		var fadeWrap = jQuery('*[data-animation="slideUp"]');
		if(fadeWrap.length > 0) {
			fadeWrap.each(function(){
				var text = jQuery(this);
				if(move.isOnScreen(text)) {
					text.addClass("slideIn");
				} else {
					jQuery(window).scroll(function(){
						if(move.isOnScreen(text)) {
							text.addClass("slideIn");
						}
					});
				}
			});
		}
	},
	slideDown: function() {
		var slideDownWrap = jQuery('*[data-animation="slideDown"]');
		if(slideDownWrap.length > 0){
			slideDownWrap.each(function(){
				var slide = jQuery(this);
				if(move.isOnScreen(slide)) {
					slide.addClass("slideIn");
				} else {
					jQuery(window).scroll(function(){
						if(move.isOnScreen(slide)) {
							slide.addClass("slideIn");
						}
					});
				}
			});
		}
	},
	slideInLeft: function() {
		var wrap = jQuery('*[data-animation="slideInLeft"]');
		if(wrap.length > 0){
			wrap.each(function(){
				var section = jQuery(this);
				var parent = jQuery(this).parent();
				if(move.isOnScreen(parent)) {
					section.addClass("slideIn");
				} else {
					jQuery(window).scroll(function(){
						if(move.isOnScreen(parent)) {
							section.addClass("slideIn");
						}
					});
				}
			});
		}
	},
	slideInRight: function() {
		var wrap = jQuery('*[data-animation="slideInRight"]');
		if(wrap.length > 0){
			wrap.each(function(){
				var section = jQuery(this);
				var parent = jQuery(this).parent();
				if(move.isOnScreen(parent)) {
					section.addClass("slideIn");
				} else {
					jQuery(window).scroll(function(){
						if(move.isOnScreen(parent)) {
							section.addClass("slideIn");
						}
					});
				}
			});
		}
	}
};

var init = {
	onReady: function(){
		init.contactBtn();
		init.instafeed();
		init.scrollNav();
		init.dropdown();
		init.SVG();
		init.headerWrap();
		init.linking();
	},
	linking: function() {
		jQuery('.app div').click(function(e){
			e.preventDefault();
			var link = jQuery(this).attr("data-href");
			// jQuery(window).attr('location',link);
			window.open(link, '_blank').focus();
		});
	},
	headerWrap: function() {
		jQuery('.iphone h2').each(function(){
		     var me = $(this);
		     me.html(me.html().replace(/^(\w+)/, '<span>$1</span>'));
		});
	},
	SVG: function() {
	    jQuery('img.svg').each(function() {
	        var jQueryimg = jQuery(this);
	        var imgID = jQueryimg.attr('id');
	        var imgClass = jQueryimg.attr('class');
	        var imgURL = jQueryimg.attr('src');

	        jQuery.get(imgURL, function(data) {
	            // Get the SVG tag, ignore the rest
	            var jQuerysvg = jQuery(data).find('svg');

	            // Add replaced image's ID to the new SVG
	            if(typeof imgID !== 'undefined') {
	                jQuerysvg = jQuerysvg.attr('id', imgID);
	            }
	            // Add replaced image's classes to the new SVG
	            if(typeof imgClass !== 'undefined') {
	                jQuerysvg = jQuerysvg.attr('class', imgClass+' replaced-svg');
	            }

	            // Remove any invalid XML tags as per http://validator.w3.org
	            jQuerysvg = jQuerysvg.removeAttr('xmlns:a');

	            // Replace image with new SVG
	            jQueryimg.replaceWith(jQuerysvg);

	        }, 'xml');

	    });
	},
	dropdown: function() {
		removeClass = false;
		jQuery('#dropdown button').click(function(e){
			e.preventDefault();
			jQuery('#dropdown ul').addClass("show");
			removeClass = false;
		});
		jQuery("html").click(function () {
		    if (removeClass) {
		        jQuery("#dropdown ul").removeClass('show');
		    }
		    removeClass = true;
		});
		jQuery('#dropdown ul li').click(function(e) {
			e.preventDefault();
			var value = jQuery(this).attr("data-value");
			var text = jQuery(this).text();
			jQuery('#interest').val(value);
			jQuery('#dropdown ul').removeClass("show");
			jQuery('#dropdown button').addClass("selected");
			jQuery('#dropdown button').text(text);
			jQuery('#dropdown button').append('<i class="fa fa-angle-down"></i>');
		});
	},
	scrollNav: function() {
		jQuery(window).scroll(function() {
		    var height = jQuery('#fbsection2').offset().top;
		    var scroll = jQuery(window).scrollTop();
		    if (scroll >= height - 100) {
		        jQuery(".navigation").addClass('in');
		    } else {
		    	jQuery(".navigation").removeClass('in');
		    }
		});
		jQuery('.navigation a').click(function(e){
			e.preventDefault();
			var hash = jQuery(this).attr("href");
			jQuery('html, body').animate({
		        scrollTop: jQuery(hash).offset().top
		    }, 1000);
		});
	},
	instafeed: function() {
		var userFeed = new Instafeed({
            get: 'user',
            userId: '2622278571',
            clientId: 'dd4f961a447e4aba84b74d409eb8363e',
            accessToken: '2622278571.dd4f961.2b3f7771342d428a808d8a72442c17ff',
            resolution: 'standard_resolution',
            template: '<div><img src="{{image}}" alt="" /></div>',
            limit: 60,
            sortBy: 'most-recent'
        });
        userFeed.run();
	},
	contactSubmit: function() {
		var Frm = jQuery('#contactfrm');
    	jQuery('<i class="fa fa-spinner fa-spin"></i>').prependTo('.btn-submit');
        jQuery.ajax({
            url: ajaxurl,
            type: Frm.attr('method'),
            data: {
            	firstname: jQuery('#firstname').val(),
            	lastname: jQuery('#lastname').val(),
            	emailaddress: jQuery('#emailaddress').val(),
            	interest: jQuery('#interest').val(),
            	message: jQuery('#message').val(),
            	action: 'sendContact'
            },
            dataType: 'html',
            beforeSubmit : function(arr, $form, options) {
	            arr.push( { "name" : "nonce", "value" : meta.nonce });
	        },
            success: function(data) {
            	init.contactResponse(data);
            }
        });
        return false;
	},
	contactResponse: function(response) {
        jQuery('.btn-submit i').remove();
        if (response === "Success") {
        	jQuery('.btn-submit').replaceWith('<button class="btn btn-submit success"><i class="fa fa-check"></i></button>');
            jQuery("input").val("");
            jQuery("textarea").val("");
            jQuery('.dropdown button').html('Area of interest <i class="fa fa-angle-down"></i>');
            setTimeout(
            	function() {
            		jQuery('.btn-submit').replaceWith('<button class="btn btn-submit">Submit</button>');
            	}, 2500
        	);
        }
        if (response === "E") {
         	jQuery('.btn-submit').replaceWith('<button class="btn btn-submit error"><i class="fa fa-ban"></i></button>');
         	setTimeout(
            	function() {
            		jQuery('.btn-submit').replaceWith('<button class="btn btn-submit">Submit</button>');
            	}, 2500
        	);
        }
	},
	contactBtn: function() {
		jQuery('#contactfrm').submit(init.contactSubmit);
	},
};

jQuery(document).ready(function() {
	move.onMove();
	init.onReady();
});