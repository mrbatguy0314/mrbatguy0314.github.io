var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

$(function(){
  Scratch.LoggedInUser = new Scratch.LoggedInUserModel(Scratch.INIT_DATA.LOGGED_IN_USER.model, Scratch.INIT_DATA.LOGGED_IN_USER.options);
  Scratch.LoginModal = new Scratch.LoginView({model: Scratch.LoggedInUser, el: '#login-dialog'});
  Scratch.LanguageDropdown = new Scratch.LanguageDropdownView({el: '#lang-dropdown'});
   
  // add data-control="modal-login" to element site-wide to require login
  if(!Scratch.INIT_DATA.LOGGED_IN_USER.options.authenticated){
    $('body').on('click.login', '[data-control="modal-login"]', function() {
      $('#login-dialog').modal('show');
      setTimeout(function() {$('#login-dialog input:first').focus();}, 200);
    });
  }
  
  // prevent the spacebar from propagating to the window and bypassing the swf
  // TODO: Can add to js that controls swf (potentially scratch_app.js)
  $('object').keydown(function(e) { 
    if (e.keyCode == 32) {
      e.stopPropagation();
    }
  });

  // track project creation
  $('#topnav #project-create').on('click', function() {
    _gaq.push(['_trackEvent', 'project', 'create']);
  });

  $('.slider-carousel').sliderCarousel();

  // Show popup to users that were queued for deletion but logged in to cancel
  if (Scratch.INIT_DATA.CANCELED_DELETION) {
    var deletion_canceled_template = $(_.template($('#template-deletion-canceled').html())());
    $(deletion_canceled_template).dialog({
      title: gettext("Your Account Will Not Be Deleted"),
      buttons: {
        "Continue": function() {$(this).dialog("close"); }
      }
    });
  }


});

$(document).on("accountnavready", function(e){
  if (Scratch.LoggedInUser) {
    Scratch.LoggedInUser.set(Scratch.INIT_DATA.LOGGED_IN_USER.model);
  } else {
    Scratch.LoggedInUser = new Scratch.LoggedInUserModel(Scratch.INIT_DATA.LOGGED_IN_USER.model, Scratch.INIT_DATA.LOGGED_IN_USER.options);
  }
  Scratch.LoginNav = new Scratch.LoginView({model: Scratch.LoggedInUser, el: '#login-dropdown'});
  Scratch.LogoutNav = new Scratch.LogoutView({el: '#logout'});

  // Display banner to unsupported browsers
  Scratch = Scratch || {};
  Scratch.INIT_DATA = Scratch.INIT_DATA || {};
  Scratch.INIT_DATA.TEMPLATE_CUES = Scratch.INIT_DATA.TEMPLATE_CUES || {}
  if ('unsupported_browser' in Scratch.INIT_DATA.TEMPLATE_CUES && Scratch.INIT_DATA.TEMPLATE_CUES.unsupported_browser) {
    var unsupported = false;
    for (var browser in Scratch.INIT_DATA.BROWSERS_SUPPORTED){
      if (bowser[browser] && bowser.version < Scratch.INIT_DATA.BROWSERS_SUPPORTED[browser]) unsupported = true;
    }
    if (unsupported) {
      var $browser_template = $(_.template($('#template-unsupported-browser').html())());
      $browser_template.insertAfter($('.confirm-email'));
    } else if (bowser.msie && bowser.version < 9) {
      var $browser_template = $(_.template($('#template-unsupported-msie').html())());
      $browser_template.insertAfter($('.confirm-email'));
    }
  }

  $('.banner .close').on('click', function(e) {
    var banner = $(e.target).parents(".banner");
    var cue = banner.data("cue");
    setCue(cue, false, function(){
      banner.hide();
    });
  })
});

}
/*
     FILE ARCHIVED ON 10:49:33 Mar 30, 2018 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 12:24:57 Aug 27, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 162.728
  exclusion.robots: 0.239
  exclusion.robots.policy: 0.218
  cdx.remote: 0.111
  esindex: 0.017
  LoadShardBlock: 114.679 (3)
  PetaboxLoader3.datanode: 60.31 (5)
  PetaboxLoader3.resolve: 207.919 (3)
  load_resource: 176.866 (2)
*/