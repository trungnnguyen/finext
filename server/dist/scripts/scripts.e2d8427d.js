window.jQuery||alert("The jQuery library must be included before the smoothscroll.js file.  The plugin will not work propery."),function(a){function b(a){return"object"==typeof a?a:{top:a,left:a}}var c=a.scrollTo=function(b,c,d){a(window).scrollTo(b,c,d)};c.defaults={axis:"xy",duration:parseFloat(a.fn.jquery)>=1.3?0:1,limit:!0},c.window=function(){return a(window)._scrollable()},a.fn._scrollable=function(){return this.map(function(){var b=this,c=!b.nodeName||-1!=a.inArray(b.nodeName.toLowerCase(),["iframe","#document","html","body"]);if(!c)return b;var d=(b.contentWindow||b).document||b.ownerDocument||b;return/webkit/i.test(navigator.userAgent)||"BackCompat"==d.compatMode?d.body:d.documentElement})},a.fn.scrollTo=function(d,e,f){return"object"==typeof e&&(f=e,e=0),"function"==typeof f&&(f={onAfter:f}),"max"==d&&(d=9e9),f=a.extend({},c.defaults,f),e=e||f.duration,f.queue=f.queue&&f.axis.length>1,f.queue&&(e/=2),f.offset=b(f.offset),f.over=b(f.over),this._scrollable().each(function(){function g(a){j.animate(l,e,f.easing,a&&function(){a.call(this,d,f)})}if(null!=d){var h,i=this,j=a(i),k=d,l={},m=j.is("html,body");switch(typeof k){case"number":case"string":if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(k)){k=b(k);break}if(k=a(k,this),!k.length)return;case"object":(k.is||k.style)&&(h=(k=a(k)).offset())}a.each(f.axis.split(""),function(a,b){var d="x"==b?"Left":"Top",e=d.toLowerCase(),n="scroll"+d,o=i[n],p=c.max(i,b);if(h)l[n]=h[e]+(m?0:o-j.offset()[e]),f.margin&&(l[n]-=parseInt(k.css("margin"+d))||0,l[n]-=parseInt(k.css("border"+d+"Width"))||0),l[n]+=f.offset[e]||0,f.over[e]&&(l[n]+=k["x"==b?"width":"height"]()*f.over[e]);else{var q=k[e];l[n]=q.slice&&"%"==q.slice(-1)?parseFloat(q)/100*p:q}f.limit&&/^\d+$/.test(l[n])&&(l[n]=l[n]<=0?0:Math.min(l[n],p)),!a&&f.queue&&(o!=l[n]&&g(f.onAfterFirst),delete l[n])}),g(f.onAfter)}}).end()},c.max=function(b,c){var d="x"==c?"Width":"Height",e="scroll"+d;if(!a(b).is("html,body"))return b[e]-a(b)[d.toLowerCase()]();var f="client"+d,g=b.ownerDocument.documentElement,h=b.ownerDocument.body;return Math.max(g[e],h[e])-Math.min(g[f],h[f])}}(jQuery),function(a){function b(b,c,d){var e=c.hash.slice(1),f=document.getElementById(e)||document.getElementsByName(e)[0];if(f){b&&b.preventDefault();var g=a(d.target);if(!(d.lock&&g.is(":animated")||d.onBefore&&!1===d.onBefore(b,f,g))){if(d.stop&&g._scrollable().stop(!0),d.hash){var b=f.id==e?"id":"name",h=a("<a> </a>").attr(b,e).css({position:"absolute",top:a(window).scrollTop(),left:a(window).scrollLeft()});f[b]="",a("body").prepend(h),location=c.hash,h.remove(),f[b]=e}g.scrollTo(f,d).trigger("notify.serialScroll",[f])}}}var c=location.href.replace(/#.*/,""),d=a.localScroll=function(b){a("body").localScroll(b)};d.defaults={duration:1e3,axis:"y",event:"click",stop:!0,target:window,reset:!0},d.hash=function(c){if(location.hash){if(c=a.extend({},d.defaults,c),c.hash=!1,c.reset){var e=c.duration;delete c.duration,a(c.target).scrollTo(0,c),c.duration=e}b(0,location,c)}},a.fn.localScroll=function(e){function f(){return!(!this.href||!this.hash||this.href.replace(this.hash,"")!=c||e.filter&&!a(this).is(e.filter))}return e=a.extend({},d.defaults,e),e.lazy?this.bind(e.event,function(c){var d=a([c.target,c.target.parentNode]).filter(f)[0];d&&b(c,d,e)}):this.find("a,area").filter(f).bind(e.event,function(a){b(a,this,e)}).end().end()}}(jQuery),jQuery(function(a){a.localScroll({filter:".smoothScroll"})});var app=angular.module("confeaApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ngDropdowns","mobile-angular-ui","firebase"]).constant("FIREBASE_URL","https://finext.firebaseio.com/");app.config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/home.html",controller:""}).when("/input",{templateUrl:"views/input.html",controller:"InputCtrl",resolve:{user:["Auth",function(a){return a.resolveUser()}]}}).when("/users/:userId",{templateUrl:"views/profile.html",controller:"ProfileCtrl",resolve:{user:["Auth",function(a){return a.resolveUser()}]}}).when("/signup",{templateUrl:"views/signup.html",controller:"AuthCtrl"}).when("/login",{templateUrl:"views/login.html",controller:"AuthCtrl",resolve:{user:["Auth",function(a){return a.resolveUser()}]}}).when("/results",{templateUrl:"views/results.html",controller:"ResultCtrl",resolve:{user:["Auth",function(a){return a.resolveUser()}]}}).when("/graph",{templateUrl:"views/graph.html",controller:"GraphCtrl",resolve:{user:["Auth",function(a){return a.resolveUser()}]}}).otherwise({redirectTo:"/"})}]),app.controller("InputCtrl",["$scope","$location","$rootScope","ModelSync","Auth",function(a,b,c,d,e){a.signedIn=e.signedIn,e.signedIn()&&(c.user=e.user),"undefined"==typeof c.model&&(c.model={length:"",breadth:"",thickness:"",density:"",elasticity:"",poisson:"",divx:"",divy:""},c.model.loadData={},c.model.loadData.loadTypeSelected={},c.model.loadData.loadValue={},c.model.endTypeSelected={},c.model.elementTypeSelected={}),a.endTypeOptions=[{text:"Simply Supported",value:1},{text:"Fixed",value:2},{text:"Beam Supported",value:3}],a.loadTypeOptions=[{text:"Concentrated at Center",value:1},{text:"UDL",value:2}],a.elementTypeOptions=[{text:"4-Noded",value:1},{text:"8-Noded",value:2}],a.contextTypeOptions=[{text:"Use Context",value:0},{text:"Use Default",value:1}],a.contextTypeSelected={},a.solve=function(){c.model.creator=a.user.profile.username,c.model.creatorUID=a.user.uid,d.create(c.model).then(function(){alert("Data saved, new model created"),b.path("/results")})},a.logout=function(){c.model={},c.model.results={},e.logout(),b.path("/")}}]),app.controller("ProfileCtrl",["$scope","$rootScope","$location","$routeParams","Profile","Auth",function(a,b,c,d,e,f){var g=d.userId;b.model={},b.model.results={},a.profile=e.get(g);var h=a.profile;h.$loaded().then(function(){}),e.getModels(g).then(function(b){b?(a.models=b,a.modelsExist=!0):a.modelsExist=!1}),a.loadModel=function(a){console.log(a),b.model=a,c.path("/input")},a.loadResults=function(a){console.log(a.results),b.model.results=a.results,c.path("/results")},a.deleteModel=function(c,d){e.delete(g,c,d),delete a.models[c],b.model={},b.model.results={}},a.logout=function(){b.model={},f.logout(),c.path("/")}}]),app.controller("AuthCtrl",["$scope","$rootScope","$location","Auth",function(a,b,c,d){d.signedIn()&&c.path("/input"),a.login=function(){d.login(a.user).then(function(){c.path("/input")},function(b){a.error=b.toString()})},a.register=function(){d.register(a.user).then(function(b){return d.login(a.user).then(function(){return b.username=a.user.username,d.createProfile(b)}).then(function(){c.path("/input")})},function(b){a.error=b.toString()})}}]),app.controller("ResultCtrl",["$scope","$rootScope","$location","$filter","Auth","socket",function(a,b,c,d,e,f){b.resultsAvailable=!1,a.signedIn=e.signedIn,e.signedIn()&&(a.user=e.user),a.logout=function(){e.logout(),c.path("/")},b.model.results?(b.resultsAvailable=!0,b.resultSet=b.model.results||{}):(b.resultsAvailable=!1,b.resultSet={}),f.on("ModelSolved",function(a){console.log("model Solved with displacements: "+a.displacements),b.resultSet=a,a&&(b.resultsAvailable=!0)}),a.logout=function(){b.model={},e.logout(),c.path("/")}}]),app.controller("GraphCtrl",["$scope","$rootScope","$location","$filter","ModelSync","Auth","socket",function(){function a(){for(var a=45,b=45,c=new Array,d=new google.visualization.DataTable,e=0;b>e;e++)d.addColumn("number","col"+e);d.addRows(a);for(var f=360/a,g=0,e=0;a>e;e++)for(var h=0;b>h;h++){var i=Math.cos(e*f*Math.PI/180)*Math.cos(h*f*Math.PI/180);d.setValue(e,h,i/4),c[g]="x:"+e+", y:"+h+" = "+i,g++}var j=new greg.ross.visualisation.SurfacePlot(document.getElementById("surfacePlotDiv")),k=new greg.ross.visualisation.SurfacePlot(document.getElementById("surfacePlotDiv2")),l=!0,m={red:0,green:0,blue:255},n={red:0,green:255,blue:255},o={red:0,green:255,blue:0},p={red:255,green:255,blue:0},q={red:255,green:0,blue:0},r=[m,n,o,p,q],s="X",t="Y",u="Z",v={xPos:300,yPos:50,width:500,height:500,colourGradient:r,fillPolygons:l,tooltips:c,xTitle:s,yTitle:t,zTitle:u,restrictXRotation:!1};j.draw(d,v),k.draw(d,v)}google.load("visualization","1"),google.setOnLoadCallback(a),a()}]),app.factory("ModelSync",["$firebase","$rootScope","FIREBASE_URL","socket",function(a,b,c,d){var e=new Firebase(c+"models"),f=new Firebase(c),g=a(e).$asArray(),h={all:g,create:function(c){return b.model=c,g.$add(c).then(function(e){a(f.child("user_models").child(c.creatorUID)).$push(e.name()),console.log("Firebase replied with : "+e.name());var g=e.name();b.uid=g,d.emit("BeginSolve",{id:g})})},find:function(b){return a(e.child(b)).$asObject()},"delete":function(b){a(e.child("models")).$remove(b.$id)}};return h}]),app.factory("Auth",["$firebase","$firebaseSimpleLogin","FIREBASE_URL","$rootScope",function(a,b,c,d){var e=new Firebase(c),f=b(e),g={register:function(a){return f.$createUser(a.email,a.password)},createProfile:function(b){var c={username:b.username,md5_hash:b.md5_hash},d=a(e.child("profile"));return d.$set(b.uid,c)},login:function(a){return f.$login("password",a)},logout:function(){return f.$logout()},resolveUser:function(){return f.$getCurrentUser()},signedIn:function(){return!!g.user.provider},user:{}};return d.$on("$firebaseSimpleLogin:login",function(b,c){console.log("Logged in: "),angular.copy(c,g.user),g.user.profile=a(e.child("profile").child(g.user.uid)).$asObject(),console.log(g.user)}),d.$on("$firebaseSimpleLogin:logout",function(){console.log("Logged out: "),g.user&&g.user.profile&&g.user.profile.$destroy(),angular.copy({},g.user)}),g}]),app.factory("socket",["$rootScope",function(a){var b=io.connect("/");return{on:function(c,d){b.on(c,function(){var c=arguments;a.$apply(function(){d.apply(b,c)})})},emit:function(c,d,e){b.emit(c,d,function(){var c=arguments;a.$apply(function(){e&&e.apply(b,c)})})}}}]),app.factory("Profile",["$window","FIREBASE_URL","$filter","$firebase","ModelSync","$q",function(a,b,c,d,e,f){var g=new a.Firebase(b),h=(new Firebase(b+"/models"),new Firebase(b),{get:function(a){return d(g.child("profile").child(a)).$asObject()},getModels:function(a){var b=f.defer();return d(g.child("user_models").child(a)).$asArray().$loaded().then(function(a){for(var c={},d=0;d<a.length;d++){var f=a[d].$value;c[f]=e.find(f)}b.resolve(c)}),b.promise},"delete":function(a,b){d(g.child("models")).$remove(b),d(g.child("user_models").child(a)).$asArray().$loaded().then(function(c){for(var e=0;e<c.length;e++){var f=c[e].$value;f===b&&(d(g.child("user_models").child(a)).$remove(c[e].$id),alert("Record removed"))}})}});return h}]);