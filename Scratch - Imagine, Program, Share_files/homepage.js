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

$(document).ready(function(){
 // $('.slider-carousel').sliderCarousel();
  scratch.notifications.loadActivity($('#test'), {'friends': true, 'max': 5}, function() {
    if ($('#activity-feed').children().length == 0) {
      $('#whats-happenin .empty-field').show();
      $('#activity-feed').hide();
    }
  }
  )
  $('.play-button')
  .one('click',function () {
    //$('#modal-video').html($('#intro-video-swf').html());
  })
  .on('click',function () {
    $('#modal-video').modal('show');
    if (!$('#modal-video iframe').attr('src')) {
      $('#modal-video iframe').attr('src', 'https://web.archive.org/web/20130510001250/http://player.vimeo.com/video/65583694?title=0&amp;byline=0&amp;portrait=0');
    } 
  });

  $('#modal-video .close').on('click', function() {
    $('#modal-video iframe').attr('src', '');
    $('#modal-video').modal('hide'); 
  }); 
  // Set cookie to dismiss welcome box for newcomers
  $('#welcome-to-scratch [data-control="set"]').on('click', setCue);

  //$('#welcome-to-scratch [data-control="dismiss"]').on('click', dismissCue);

$.getScript('https://web.archive.org/web/20130510001250/http://blogscratch.tumblr.com/api/read/json/?callback="displayPosts"&num=3'); 

    if (Scratch.INIT_DATA.ADMIN) {
      this.adminView = new Scratch.AdminPanel({model: {}, el: $('#admin-panel')}); 
    }
})
function setCue() {
  console.log('setting');
  $.ajax({
    url: '/site-api/users/set-template-cue/',
    type: 'POST',
    data: JSON.stringify({'cue': 'HP_welcome_to_scratch_off'}),
  })
  .done(function(data) {
    $('#welcome-to-scratch').hide("slide", { direction: "up", complete: function() {$('#whats-happenin').show() }}, 1000); 
  });
}

function dismissCue() {
  console.log('dismissing');
  $.ajax({
    url: '/site-api/users/dismiss-template-cue/',
    type: 'POST',
    data: JSON.stringify({'cue': 'HP_welcome_to_scratch_off'}),
  });
}

function displayPosts(data) {
  var items = [];
  var last = data['posts'].length -1;
  for (i=0; i < data['posts'].length; i++) {
    if (i == last) {
      items.push('<li class="last">');
    } else {
      items.push('<li>');
    }
    items.push('<a href="/news#' + data['posts'][i]['id'] + '"><img src="' + $(data['posts'][i]['regular-body']).find('img').attr('src') + '" /></a>');
    items.push('<div class="event-content"><span class="title"><a href="/news#' + data['posts'][i]['id'] + '">' + data['posts'][i]['regular-title'] + '</a></span>');
    items.push( $(data['posts'][i]['regular-body']).find('span.snippet').html() + '</div></li>');
  }
  $('<ul>', {
    html: items.join(''),
  }).addClass('event-list').appendTo('#news-feed'); 
}


}
/*
     FILE ARCHIVED ON 00:12:50 May 10, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 13:10:32 Aug 08, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 76.957
  exclusion.robots: 0.079
  exclusion.robots.policy: 0.07
  RedisCDXSource: 0.651
  esindex: 0.011
  LoadShardBlock: 54.624 (3)
  PetaboxLoader3.datanode: 61.497 (4)
  load_resource: 83.231
  PetaboxLoader3.resolve: 56.568
*/