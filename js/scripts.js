!function e(t,o,n){function r(i,s){if(!o[i]){if(!t[i]){var c="function"==typeof require&&require;if(!s&&c)return c(i,!0);if(a)return a(i,!0);throw new Error("Cannot find module '"+i+"'")}var l=o[i]={exports:{}};t[i][0].call(l.exports,function(e){var o=t[i][1][e];return r(o?o:e)},l,l.exports,e,t,o,n)}return o[i].exports}for(var a="function"==typeof require&&require,i=0;i<n.length;i++)r(n[i]);return r}({1:[function(){var e=function(){var t=$("html");return{init:function(){t.removeClass("no-js").addClass("js"),e.setHeight(),e.rgbaClock(),e.hexClock(),e.waypointInit(),enquire.register("screen and (min-width: 768px)",{match:function(){e.enableSkrollr()},unmatch:function(){e.disableSkrollr()}},!0)},waypointInit:function(){function e(e,o,n){$(e).waypoint(function(){t(),$(o).toggleClass("active")},{offset:n})}function t(){var e=$("nav a");e.removeClass("active")}var o=$("header").height();e(".home",".nav-home",o),e(".about",".nav-about",o),e(".cv",".nav-cv",o),e(".portfolio",".nav-portfolio",o),e(".contact",".nav-contact",o)},rgbaClock:function(){function e(){var t,o,n,r,a=$(".rgbaClock"),i=1,s=new Date,c=s.getHours(),l=s.getMinutes(),u=s.getSeconds();o=Math.floor(c/24*255),n=Math.floor(l/60*255),r=Math.floor(u/60*255),t="rgba("+o+", "+n+", "+r+", 1)",a.css("background-color",t),$("#rgba, #rgbaValue").text(t),setTimeout(e,1e3*i)}e()},hexClock:function(){function e(){var t,o,n=$(".hexClock"),r=1,a=new Date,i=a.getHours(),s=a.getMinutes(),c=a.getSeconds();9>=i&&(i="0"+i),9>=s&&(s="0"+s),9>=c&&(c="0"+c),t="#"+i+s+c,o=i+":"+s+":"+c,n.css("background-color",t),$("#hexValue").text(o+" = "+t),setTimeout(e,1e3*r)}e()},buildPortfolio:function(t){var o=$(t.thingtoshow);o.find("img").attr("src",t.mainimgpath),o.lightbox_me({centered:!0,overlayCSS:{background:"black",opacity:.8}}),"#flickr-feed"===t.thingtoshow&&e.getFlickrStream()},setHeight:function(){var e=$(".home");e.css("height",window.innerHeight)},enableSkrollr:function(){var t=navigator.userAgent.toLowerCase().indexOf("firefox")>-1;if(!Modernizr.touch||t){skrollr.init({forceHeight:!1})}else e.disableSkrollr(),$(".gap, .smallgap, .hireme").css("background-color",$("footer").css("background-color"))},disableSkrollr:function(){var e=skrollr.init();e.destroy(),$(".gap, .smallgap, .hireme").css("background-color",$("footer").css("background-color"))},scrollPageToElem:function(e,t,o){"number"!=typeof t&&(t=0),"number"!=typeof o&&(o=1e3),$("html, body").animate({scrollTop:$(e).offset().top-0},1e3)},sendContactForm:function(e){function t(){r.val("").removeClass("error"),n.val("Message Sent!"),$(".successMsgText").show(),$(".errorMsgText").hide()}function o(e,t){$(t).addClass("error").siblings(".errorMsg").text(e).show(),$(".successMsgText").hide(),$(".errorMsgText").show(),n.val("Send Message")}var n=$('input[name="submit"]'),r=$("#contactForm input, #contactForm textarea");n.val("Sending Message..."),$(".errorMsg, .errorMsgText").hide(),r.removeClass("error"),$.ajax({type:"POST",url:"inc/CJMsendEmail.php",data:e,dataType:"json",encode:!0,success:function(e){e.success?t():e.errors.name?o(e.errors.name,$("#name")):e.errors.email?o(e.errors.email,$("#email")):e.errors.message&&o(e.errors.message,$("#message"))},error:function(){$(".errorMsgText").show()}})}}}();$(document.body).on("goto-section",function(t,o){void 0!==t&&t.preventDefault(),e.scrollPageToElem("#"+o.gotoid,$("header").height())}).on("view-portfolio",function(t,o){e.buildPortfolio(o),void 0!==t&&t.preventDefault()}).on("view-workhistory",function(e,t){void 0!==e&&e.preventDefault();var o=$("#fullHistoryText"),n=$("#fullWorkHistory");n.stop().fadeToggle(function(){o.text(n.is(":visible")?t.txtclose:t.txtopen)})}),$("#contactForm").submit(function(t){void 0!==t&&t.preventDefault();var o={name:$('input[name="name"]').val(),email:$('input[name="email"]').val(),subject:$('input[name="subject"]').val(),message:$('textarea[name="message"]').val(),botTrap:$('input[name="botTrap"]').val()};return e.sendContactForm(o),!1}),function(){$(document.body).on("click","*[data-model][data-action]",function(e){var t=$(this),o=t.data(),n=o.events?o.events:"click",r=new RegExp("(^|\\s)"+e.type+"(\\s|$)");r.test(n)&&t.trigger(o.action+"-"+o.model,[o,e])}),_.mixin({compileTemplate:function(e,t,o){if("object"==typeof e&&"string"==typeof t&&"object"==typeof o){var n=e[t];if("function"==typeof n)return n(o);throw new Error("fetchTemplates must be called before compileTemplate")}},fetchTemplates:function(e,t,o){var n={};return t=t?"?hash="+t:"",_.each(e,function(e,o){$.ajax({url:e+t,success:function(e){n[o]=_.template(e.replace(/\r\n|\r\n\s|\r|\r\s|\n|\n\s|\s{2}/g,""))},dataType:"text"})}),"function"==typeof o&&o(n),n},removeWhitespace:function(e){return e.replace(/\r\n|\r\n\s|\r|\r\s|\n|\n\s|\s{2}/g,"")},fetchTemplate:function(e,t,o){if(void 0===e||"string"!=typeof e||""===e.trim())throw new Error("Underscore Mixin: fetchTemplate() requires templatePath as a non-empty String.");void 0===t&&(t=""),"function"!=typeof o&&(o=function(){}),$.ajax({url:e+t,success:function(e){o(_.template(e.replace(/\r\n|\r\n\s|\r|\r\s|\n|\n\s|\s{2}/g,"")))},dataType:"text"})}}),window.Template=function(e,t){this.isFetching=!1,this.onReady=[],this.path=e,this.hash=t,this._render=null},window.Template.prototype.preload=function(){var e=this;return null===e._render&&_.fetchTemplate(e.path,e.hash,function(t){e._render=t;for(var o=0,n=e.onReady.length;n>o;o++)e.onReady[o].call(e);e.onReady.length=0}),e},window.Template.prototype.render=function(e,t){var o=this;null===o._render?(o.onReady.push(function(){t(o._render(e))}),o.isFetching||(o.isFetching=!0,o.preload())):t(o._render(e))}}(),e.init()},{}]},{},[1]);