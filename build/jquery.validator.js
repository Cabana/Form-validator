var split;
split=split||function(a){var b=String.prototype.split,n=/()??/.exec("")[1]===a,d;d=function(e,c,d){if("[object RegExp]"!==Object.prototype.toString.call(c))return b.call(e,c,d);var f=[],l=(c.ignoreCase?"i":"")+(c.multiline?"m":"")+(c.extended?"x":"")+(c.sticky?"y":""),k=0;c=RegExp(c.source,l+"g");var q,h,p;e+="";n||(q=RegExp("^"+c.source+"$(?!\\s)",l));for(d=d===a?4294967295:d>>>0;h=c.exec(e);){l=h.index+h[0].length;if(l>k&&(f.push(e.slice(k,h.index)),!n&&1<h.length&&h[0].replace(q,function(){for(var g=1;g<
arguments.length-2;g++)arguments[g]===a&&(h[g]=a)}),1<h.length&&h.index<e.length&&Array.prototype.push.apply(f,h.slice(1)),p=h[0].length,k=l,f.length>=d))break;c.lastIndex===h.index&&c.lastIndex++}k===e.length?(p||!c.test(""))&&f.push(""):f.push(e.slice(k));return f.length>d?f.slice(0,d):f};String.prototype.split=function(b,c){return d(this,b,c)};return d}();
(function(){Array.prototype.clean=function(a){var b;for(b=0;b<this.length;)this[b]===a&&(this.splice(b,1),b--),b++;return this};String.prototype.wrapInBraces=function(){return this.replace(/^/,"{").replace(/$/,"}")};String.prototype.replaceSquareBracketsWithBraces=function(){return this.replace(/\[/g,"{").replace(/\]/g,"}")};String.prototype.removeWhitespace=function(){return this.replace(/\s+/g,"")};this.Parser=function(){function a(b){this.defaults=b}a.prototype.parse=function(b){var a;a={};if(""===
b)return a;b=this._prepareString(b);return this._toJSON(b)};a.prototype.addDefaultValue=function(b,a){this.defaults||(this.defaults={});return this.defaults[b]=a};a.prototype._prepareString=function(b){b=b.removeWhitespace();this.defaults&&(b=this._applyOptionValues(b));b=this._setUndefinedValues(b);return this._wrapWordsInQuotes(b)};a.prototype._applyOptionValues=function(b){var a,d,e,c,m;d="";b=this._splitIntoWords(b);a=c=0;for(m=b.length;c<m;a=++c)e=b[a],a=b[a+1],this.defaults[e]&&":"!==a&&(e+=
":"+this.defaults[e]),d+=e;return d};a.prototype._setUndefinedValues=function(b){var a,d,e,c,m,f;e=this._splitIntoWords(b);a=m=0;for(f=e.length;m<f;a=++m)if(c=e[a],b=e[a+1],d=e[a-1],/\]+/.test(b)&&":"!==d||","===b||void 0===b&&!/\]+/.test(c))e[a]+=":undefined";b=e.join("");a="";c=b.split(/(\[|,|\])/);d=0;for(e=c.length;d<e;d++)b=c[d],/.*:.*:.*/.test(b)&&(b=b.replace(":undefined","")),a+=b;return a};a.prototype._splitIntoWords=function(b){return split(b,/(:\[?|\]+,?|,)/).clean("")};a.prototype._wrapWordsInQuotes=
function(b){var a,d,e,c;a=this._splitIntoWords(b);b=e=0;for(c=a.length;e<c;b=++e)d=a[b],":"===d||/\]+/.test(d)||(":["===d||","===d)||(/^\d+$/.test(d)?a[b]=parseInt(d):a[b]="true"===d?!0:"false"===d?!1:'"'+d+'"');return a.join("")};a.prototype._toJSON=function(a){/\.*:\.*/.test(a)||(a+=':"undefined"');a=a.replaceSquareBracketsWithBraces().wrapInBraces();a=a.replace(/\\/g,"\\\\");return JSON.parse(a)};return a}()}).call(this);
(function(){var a,b,n,d,e,c,m,f,l,k=[].indexOf||function(a){for(var g=0,b=this.length;g<b;g++)if(g in this&&this[g]===a)return g;return-1},q={}.hasOwnProperty,h=function(a,g){function b(){this.constructor=a}for(var c in g)q.call(g,c)&&(a[c]=g[c]);b.prototype=g.prototype;a.prototype=new b;a.__super__=g.prototype;return a};c={};Object.keys||(Object.keys=function(a){var g,b;g=[];b=void 0;for(b in a)Object.prototype.hasOwnProperty.call(a,b)&&g.push(b);return g});String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+
this.slice(1)};m=function(a){switch(a.length){case 0:a="";break;case 1:a=a[0];break;case 2:a=a[0]+" and "+a[1];break;default:a=a.slice(0,-1).join(", ")+", and "+a[a.length-1]}return a};b=function(){function a(){this.errors=[]}a.prototype.add=function(a){var b,c,d,p;if(a){if("string"===typeof a)return this.errors.push(a);p=[];c=0;for(d=a.length;c<d;c++)b=a[c],p.push(this.errors.push(b));return p}};a.prototype.none=function(){return 0===this.errors.length?!0:!1};a.prototype.alwaysReturn=function(a){return this.none=
function(){return a}};a.prototype.fullMessages=function(){return m(this.errors).toLowerCase().capitalize()};a.prototype.all=function(){return this.errors};return a}();d=function(){function a(g){this.input=g;this.customMessage=this.input.getAttribute("data-custom-error-message")}a.prototype.setupErrorMessage=function(a){return this.input.setAttribute("data-error-message",this.customMessage||a)};a.prototype.resetErrorMessages=function(){return this.input.removeAttribute("data-error-message")};a.prototype.validations=
function(){return this.input.getAttribute("data-validation")};a.prototype.asHtmlNode=function(){return this.input};return a}();n=function(){function a(g,b,c){this.length=g;this.min=b;this.max=c}a.prototype.validate=function(){var a,b,c;if(this.max&&this.min&&(a=this.length,0>k.call(function(){c=[];for(var a=b=this.min,g=this.max;b<=g?a<=g:a>=g;b<=g?a++:a--)c.push(a);return c}.apply(this),a)))return this.mixedMessage();if(this.min&&this.length<this.min)return this.tooShortMessage();if(this.max&&this.length>
this.max)return this.tooLongMessage()};return a}();a=function(a){function b(){return f=b.__super__.constructor.apply(this,arguments)}h(b,a);b.prototype.mixedMessage=function(){return"Value most be at least "+this.min+" and maximum "+this.max+" characters long"};b.prototype.tooShortMessage=function(){return"Value most be at least "+this.min};b.prototype.tooLongMessage=function(){return"Value can't be longer than "+this.max};return b}(n);e=function(a){function b(){return l=b.__super__.constructor.apply(this,
arguments)}h(b,a);b.prototype.mixedMessage=function(){return"Can't contain less than "+this.min+" or more than "+this.max+" words"};b.prototype.tooShortMessage=function(){return"Can't contain less than "+this.min+" words"};b.prototype.tooLongMessage=function(){return"Can't contain more than "+this.max+" words"};return b}(n);this.FormValidator=function(){function f(){var a;a=new Parser;a.addDefaultValue("required",!0);a.addDefaultValue("allowEmpty",!0);this.parser=a;this._setupBuiltInValidations()}
f.prototype.defineValidation=function(a,b,c){return this._validations[a]={validationHandler:b,errorMessage:c}};f.prototype.validateForm=function(a){var b,c,d,f;b=a.querySelectorAll("[data-validation]");c=[];d=0;for(f=b.length;d<f;d++)a=b[d],c.push(this.validateInput(a));return 0<=k.call(c,!1)?!1:!0};f.prototype.validateInput=function(a){var f;a=new d(a);f=this._generateValidations(a.validations());c=new b;this._performBuiltinValidations(a.asHtmlNode(),f);this._performFormatValidation(a.asHtmlNode(),
f.format);a.resetErrorMessages();if(c.none())return!0;a.setupErrorMessage(c.fullMessages());return!1};f.prototype._validations={};f.prototype._performFormatValidation=function(a,b){var f,d,e,l,k;if(b){l=Object.keys(b);k=[];d=0;for(e=l.length;d<e;d++)f=l[d],this._validations[f].validationHandler.test(a.value)?k.push(void 0):k.push(c.add(this._validations[f].errorMessage));return k}};f.prototype._performBuiltinValidations=function(a,b){var f,d,e,l,k;l=Object.keys(b);k=[];d=0;for(e=l.length;d<e;d++)f=
l[d],"format"!==f?(f=this._validations[f].validationHandler(a,b),k.push(c.add(f))):k.push(void 0);return k};f.prototype._setupBuiltInValidations=function(){var b=this;this.defineValidation("email",/.+@.+\..+/,"Email is invalid");this.defineValidation("tel",/\d{8}/,"Telephone number is invalid");this.defineValidation("number",/^\d+$/,"Invalid");this.defineValidation("required",function(a,b){if("checkbox"===a.getAttribute("type")){if(!a.checked)return"Most be checked"}else if(!/^.+$/.test(a.value))return"Can't be blank"});
this.defineValidation("length",function(b,c){return(new a(b.value.length,c.length.min,c.length.max)).validate()});this.defineValidation("wordCount",function(a,b){var c;c=""===a.value?c=0:a.value.split(/[ ]+/).length;return(new e(c,b.wordCount.min,b.wordCount.max)).validate()});this.defineValidation("allowEmpty",function(a,c){return b._alwaysValidIf(""===a.value)});return this.defineValidation("onlyIfChecked",function(a,c){return b._alwaysValidIf(!document.getElementById(c.onlyIfChecked).checked)})};
f.prototype._alwaysValidIf=function(a){if(a)return c.alwaysReturn([])};f.prototype._generateValidations=function(a){return this.parser.parse(a)};return f}()}).call(this);
(function(a,b,n,d){function e(b,d){this.element=b;this.options=a.extend({},m,d);this._defaults=m;this._name=c;this.init()}var c="validate",m={validator:new FormValidator,onBlur:!1,selectorClasses:{field:".field"},errorClasses:{input:"input-with-error",field:"field-with-error",form:"form-with-error"},beforeValidation:function(){},afterValidation:function(){},ifValid:function(){},ifInvalid:function(){}};e.prototype={init:function(){var b=this,c=b.element,d=b.options,e=d.validator,h=!0;c.setAttribute("novalidate",
"true");a(n).on("keydown",function(b){var c;c=13===b.keyCode?!0:void 0;c&&(b=b.target.nodeName.toLowerCase(),c="input"==b||"textarea"==b||"select"==b?!0:!1);c&&a('input[type="submit"]:not([data-skip-validation])').trigger("click")});a("input[data-skip-validation]").hover(function(){h=!1},function(){h=!0}).on("click",function(a){h&&a.preventDefault()});a(c).on("submit",function(m){h&&(d.beforeValidation(),e.validateForm(c)?d.ifValid():(m.preventDefault(),d.ifInvalid()),b.setErrorClasses(c,d),b.setErrorMessages(c,
d),a(".input-with-error").first().focus(),d.afterValidation())});if(d.onBlur)a(c).find("[data-validation]").on("blur",function(a){e.validateInput(this);b.setErrorClasses(c,d);b.setErrorMessages(c,d)})},setErrorClasses:function(b,c){a("."+c.errorClasses.input).removeClass(c.errorClasses.input);a("."+c.errorClasses.field).removeClass(c.errorClasses.field);a("."+c.errorClasses.form).removeClass(c.errorClasses.form);a(b).find("[data-error-message]").each(function(){var d=a(this),e=d.parents(c.selectorClasses.field),
h=a(b);d.addClass(c.errorClasses.input);e.addClass(c.errorClasses.field);h.addClass(c.errorClasses.form)})},setErrorMessages:function(b,c){a(b).find("small.error-message").remove();a(b).find("[data-error-message]").each(function(){var b=this.dataset.errorMessage;a(this).after('<small class="error-message">'+b+"</small>")})}};a.fn[c]=function(b){return this.each(function(){a.data(this,"plugin_"+c)||a.data(this,"plugin_"+c,new e(this,b))})}})(jQuery,window,document);
