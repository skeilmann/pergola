(function($){$.fn.inputFilter=function(inputFilter){return this.on("input keydown keyup mousedown mouseup select contextmenu drop",function(){if(inputFilter(this.value)){this.oldValue=this.value;this.oldSelectionStart=this.selectionStart;this.oldSelectionEnd=this.selectionEnd;}else if(this.hasOwnProperty("oldValue")){this.value=this.oldValue;this.setSelectionRange(this.oldSelectionStart,this.oldSelectionEnd);}else{this.value="";}});};}(jQuery));$(document).ready(function()
{$(document).on('submit','form.ajax-form',function(event)
{event.preventDefault();ajax_form.submit(this);});$('body').tooltip({selector:'[data-popup="tooltip"]'});$(".int").inputFilter(function(value){return /^\d*$/.test(value);});});var ajax_form={submit:function(form_ob)
{if(!(form_ob instanceof jQuery))
{form_ob=$(form_ob);}
var form_ac=form_ob.attr('action'),form_rr=form_ob.data('ajax-reset'),form_captcha=form_ob.data('recaptcha'),form_al=ajax_form.get_alert(form_ob.data('ajax-alert')),form_bt=ajax_form.get_submit_btn(form_ob);if(typeof form_ac!=='undefined')
{$.ajax({url:form_ac,type:'post',data:new FormData(form_ob[0]),dataType:'json',processData:false,contentType:false,cache:false,beforeSend:function()
{ajax_form.hide_alert(form_al);ajax_form.toggle_submit_btn(form_bt,'loading');},complete:function()
{ajax_form.toggle_submit_btn(form_bt,'normal');},success:function(response)
{if(typeof response.type!=='undefined')
{if(typeof response.message!=='undefined')
{ajax_form.show_alert(form_al,response.type,response.message);}
if(response.type==='success')
{if(typeof response.rr!=='undefined'||typeof form_rr!=='undefined')
{form_ob.trigger('reset');}}}
if(typeof response.alerts!=='undefined')
{ajax_form.show_input_alerts(form_ob,response.alerts);}
if(typeof response.func!=='undefined')
{var func=window[response.func];if(typeof func==='function')
{func(response);}}
if(typeof response.r_to!=='undefined')
{var r_tm=(typeof response.r_tm!=='undefined'&&!isNaN(parseFloat(response.r_tm)))?parseFloat(response.r_tm):3;setTimeout(function()
{if($.inArray(response.r_to,['refresh','reload'])>=0)
{window.location.reload();}
else
{window.location=response.r_to;}},(r_tm*1000));}
if(form_captcha&&response.type==='error'){grecaptcha.reset();}},error:function()
{ajax_form.show_alert(form_al,'danger','An error occurred while receiving the server response, please reload the page and try again!');}});}},get_alert:function(alert_ob)
{return(typeof alert_ob!=='undefined'&&$(alert_ob).length>0)?$(alert_ob):false;},show_alert:function(alert_ob,alert_type,alert_msg)
{if(alert_ob)
{switch(alert_type)
{case 'error':alert_type='danger';break;case 'info':alert_type='primary';break;}
alert_ob.removeClass('alert-danger alert-success alert-primary alert-warning').addClass('alert-'+alert_type).html(alert_msg);if(!alert_ob.is(':visible'))
{if(alert_ob.hasClass('d-none'))
{alert_ob.removeClass('d-none');}
else
{alert_ob.fadeIn();}}
$('html, body').animate({scrollTop:alert_ob.offset().top-15},350);}},hide_alert:function(alert_ob)
{if(alert_ob)
{if(!alert_ob.is(':visible'))
{alert_ob.addClass('hidden');}}},get_submit_btn:function(form_ob)
{var form_btn=form_ob.find('button[type="submit"], input[type="submit"]');if(form_btn.length<1)
{var form_id=form_ob.attr('id');form_btn=false;if(typeof form_id!=='undefined')
{form_btn=$('body').find('button[type="submit"][form="'+form_id+'"], input[type="submit"][form="'+form_id+'"]');if(form_btn.length<1)
{form_btn=false;}}}
return form_btn;},toggle_submit_btn:function(btn_ob,btn_state)
{if(btn_ob)
{switch(btn_state)
{case 'loading':btn_ob.width(btn_ob.width()).attr({'disabled':true,'data-label':btn_ob.html()});btn_ob.html('<i class="fas fa-spinner fa-spin"></i>');break;case 'normal':btn_ob.removeAttr('style disabled');btn_ob.html(btn_ob.data('label'));break;case 'disabled':btn_ob.removeAttr('style');btn_ob.html(btn_ob.data('label'));break;}}},show_input_alerts:function(form_ob,alerts)
{$.each(alerts,function(field,message)
{var field_ob=form_ob.find('[name="'+field+'"]');if(field_ob.length>0)
{var help_block_ob=field_ob.closest('.form-group').find('span.help-block');if(help_block_ob.length>0)
{help_block_ob.html(message);}
else
{field_ob.addClass('is-invalid');}
field_ob.on('change',function()
{field_ob.removeClass('is-invalid');});}});}};