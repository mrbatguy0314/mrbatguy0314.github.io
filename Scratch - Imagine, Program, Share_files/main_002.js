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

var Scratch = Scratch || {};
Scratch.Registration = Scratch.Registration || {};

$(function () {
  $('[data-control="registration"]').on('click',function(e){
    $('#login-dialog').modal('hide');
    e.preventDefault();
    if (Scratch.Registration.modal) {
      Scratch.Registration.modal.close();
    }
    $('#registration').append($('<div id="registration-data"/>'));
    Scratch.Registration.modal =  new Scratch.Registration.RegistrationView({el: '#registration-data'})
    $('#registration').modal('show');
    
  });

  $('#registration-done').on('click', function(e) {
    _gaq.push(['_trackEvent', 'registration', 'register-complete']);
  });
  
  // Next button 
/*
  $('#registration .modal-footer #registration-next').on('click', function(e) {
    if ($(this).hasClass('disabled')) return; // do nothing if the button is disabled
    

    this.addClass('disabled'); // disable next button (enabled once this step is complete)
  });
  */  
});


Scratch.Registration.RegistrationView=Backbone.View.extend({
  events:{
     'blur .username': 'validateUsername',
     'blur .password': 'validatePassword',
     'blur .password-confirm': 'validatePasswordMatch',
     'blur .email': 'validateEmail',
     'keydown .username': 'clear',
     'keydown .password': 'clear',
     'keydown .password-confirm': 'clear',
     'keydown .email': 'clear',
     'change input[name="gender"]': 'clear',
     'change select.birthyear': 'clear',
     'click .modal-footer .button': 'submit',
     'change select.birthmonth': 'checkAge',
     'change select.birthmonth': 'clear',
     'change select.birthyear': 'clear',
     'change select.birthyear': 'checkAge',
     'change select.country': 'clear',
     'click [data-dismiss="modal"]': 'dismiss',
  },

  initialize: function() {
    var self = this; 
    this.$el.load('/accounts/modal-registration/', function() {self.initData()});
    
    _.bindAll(this, 'onSubmit')
    this.step = 1;
  },
  
  initData: function() {
    // create birth year dropdown 
    var year = new Date().getFullYear(),
    firstYear = year-120,
    options = [];
    for(;year > firstYear; year--){
      options.push('<option value="'+year+'">'+year+'</option>');
    }
    this.$('.birthyear').append(options.join(''));
    
    // put focus on the first field
    setTimeout(function() {$('#registration input:first').focus();}, 200);
  },

  
  hasErrors: function() {
    if (this.$('#reg-body-' + this.step + ' .error').length == 0) {
      return false;
    } 
    return true;
  },
  
  clear: function(e) {
    $(e.target).parents('.controls.error').removeClass('error')
    //$(e.target).parents('.control-group').find('.error').html('');
    //this.$('#reg-body-' + this.step + ' .error').removeClass('error');
  },

  validateUsername: function(e) {
    console.log('username errors');
    var username = this.$('.username').val();
    var flag = false; // true if there are any errors in the username
    var $usernameError = this.$('[data-content="username-error"] .text');

    // only through the empty error when hitting next not on blur - otherwise it's annoying 
    if (!username.length && !e) {
      $usernameError.html(Scratch.Registration.FORM_ERRORS['usernameEmpty']);
      flag = true;
    }

    if (username.length) {
      if(username.length < 3 || username.length > 20) {
        $usernameError.html(Scratch.Registration.FORM_ERRORS['usernameLength']);
        flag = true;
        console.log('error length');
      }
      else if (!(/^[a-zA-Z0-9_]+$/).test(this.$('.username').val())) {
        $usernameError.html(Scratch.Registration.FORM_ERRORS['usernameCharacters']);
        flag = true;
      }
      // verify with the server that the username isn't taken
      if (!flag) {
        var self = this;
        $.ajax({
          url: '/accounts/check_username/' + username + '/',
          success: function(response) {
            var msg = response[0].msg;
            if (msg == 'username exists') {
              $usernameError.html(Scratch.Registration.FORM_ERRORS['usernameExists']);
              flag = true;
            } else if (msg == 'invalid username') {
              $usernameError.html(Scratch.Registration.FORM_ERRORS['invalidUsername']);
              flag = true;
            }
          },
          async: false,
        });
      }
    }
    
    if (flag) {
      this.$('.username').parents('.controls').addClass('error');
    }
  },
  
  validatePassword: function(e) {
    var password = this.$('.password').val();
    var flag = false; // true if there were any errors in the password
    var $passwordError = this.$('[data-content="password-error"] .text');

    if (!password.length && !e) {
      $passwordError.html(Scratch.Registration.FORM_ERRORS['passwordEmpty']);
      flag = true;
    }
    if (password.length) {
      if (password.toLowerCase() == this.$('.control-group .username').val().toLowerCase()) {
        console.log('pwd error');
        $passwordError.html(Scratch.Registration.FORM_ERRORS['passwordUsername']);
        flag = true;
      }
      else if (password == 'password') {
        $passwordError.html(Scratch.Registration.FORM_ERRORS['passwordPassword']);
        flag = true;
      } 
      else if (password.length < 6) {
        $passwordError.html(Scratch.Registration.FORM_ERRORS['passwordLength']);
        flag = true;
      }
    }
    if (flag) { 
      this.$('.password').parents('.controls').addClass('error');
    }
  },
 
  validatePasswordMatch: function(e) {
    var password = this.$('.password').val();
    var passwordConfirm = this.$('.password-confirm').val();
    var flag = false;
    var $passwordConfirmError = this.$('[data-content="password-confirm-error"] .text');

    if (!(password == passwordConfirm)) {
      $passwordConfirmError.html(Scratch.Registration.FORM_ERRORS['passwordConfirm']);
      flag = true;
    }
    
    if (flag) { 
      this.$('.password-confirm').parents('.controls').addClass('error');
    }

  },

  validateGender: function() {
    var flag = false;
    var $genderError = this.$('[data-content="gender-error"] .text');
    if (this.$('[name="gender"]:checked').size() == 0) { 
      console.log('gender error');
      $genderError.html(Scratch.Registration.FORM_ERRORS['genderEmpty']);
      flag = true; 
    } 
    if (flag) {
      this.$('[data-content="gender-error"]').parents('.controls').addClass('error')
    }
  },
  
  validateEmail: function() {
    var flag = false; // true if there were any errors in email 
    var email = this.$('.email').val();
    var $emailError = this.$('[data-content="email-error"] .text');

    if (!email.length) {
      $emailError.html(Scratch.Registration.FORM_ERRORS['emailEmpty']);
      flag = true;
    } 
    else if (!(/\S+@\S+\.\S+/).test(email)) {
      $emailError.html(Scratch.Registration.FORM_ERRORS['emailInvalid']);
      flag = true;
    }
    if (flag) {
      console.log('email error');
      this.$('.email').parents('.controls').addClass('error')
    }

  },

  validateBirthday: function() {
    var flag = false; // true if there were any errors in birthday
    var $birthdayError = this.$('[data-content="birthday-error"] .text');
    if ((this.$('.birthmonth').val()==0) || (this.$('.birthyear').val()==0)) {
      console.log('no birtday selected');
      $birthdayError.html(Scratch.Registration.FORM_ERRORS['birthdayEmpty']);
      flag = true;  
    }
    if (flag) { 
      this.$('.birthmonth').parents('.controls').addClass('error');
    }
  },

  validateCountry: function() {
    var flag = false; 
    var $countryError = this.$('[data-content="country-error"] .text');
    if (this.$('.country').val()==0) {
      $countryError.html(Scratch.Registration.FORM_ERRORS['countryEmpty']);
      flag= true;
    }
    if (flag) { 
      this.$('.country').parents('.controls').addClass('error');
    }
  },
 

  validateFields: function() {
    if (this.step == 1) {
      this.validateUsername();
      this.validatePassword();
      this.validatePasswordMatch();
    } else if (this.step == 2) {
      this.validateBirthday();
      this.validateGender();
      this.validateEmail();
      this.validateCountry();
    }
  },
  
  checkAge: function() {
    console.log('checkAge');
    if (this.$('.birthyear').val() == 0 || this.$('.birthmonth').val() == 0){
      return;
    }
    var today = new Date(),
    currentYear = today.getFullYear(),
    yearsOld = currentYear - this.$('.birthyear').val();
    if ((today.getMonth() - this.$('.birthmonth').val()) < 0) yearsOld--;
    console.log(yearsOld);
    if (yearsOld < 13) {
     this.$('label[for="email"]').hide();
     this.$('label.parents[for="email"]').show();
    } else {
     this.$('label[for="email"]').show();
     this.$('label.parents[for="email"]').hide();
    }

  },
  
  usernameExists: function(response) {
  
  },
 

  nextStep: function() {
    $('#registration .modal-body').hide();
    this.step++;
    _gaq.push(['_trackEvent', 'registration', 'register-step-' + this.step ]);
    $('#registration #reg-body-' + this.step).show();
    $('#registration #registration-form').attr('class', 'progress' + this.step);
    if (this.step == 3) {
      $('#registration-next').hide();
      $('#registration-done').show();
    }
  },

  submit: function(e) {
    this.validateFields();
    // move to the next page
    if (!this.hasErrors()) {
      console.log('has no errors');
      if (this.step == 2) {
        $.ajax({
          data: JSON.stringify({
            username: this.$('.username').val(),
            password: this.$('.password').val(),
            birth_month: this.$('.birthmonth').val(),
            birth_year: this.$('.birthyear').val(),
            gender: this.$('.gender').val(),
            country: this.$('.country').val(),
            email: this.$('.email').val(),
          }),
          dataType: 'json',
          url: '/accounts/register_new_user/',
          type: 'post',
          success: this.onSubmit,
        });
        
      }
      this.nextStep();
      
    } 
  },

  onSubmit: function(response) {
    console.log(response[0].success);
    if (response[0].success) {
      this.username = response[0].username;
      this.user_id = response[0].user_id; 
      this.accountCreated = true;
    }
  },
  
  dismiss: function(e) {
    if (this.accountCreated) {
      if (location.href.indexOf('editor')<0) {
        location.reload(true);
      } else {
        Scratch.LoggedInUser.set({'username': this.username, 'id': this.user_id});
      }
    }
  },
});



}
/*
     FILE ARCHIVED ON 00:12:50 May 10, 2013 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 13:10:38 Aug 08, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 88.009
  exclusion.robots: 0.097
  exclusion.robots.policy: 0.085
  cdx.remote: 0.073
  esindex: 0.012
  LoadShardBlock: 44.72 (3)
  PetaboxLoader3.datanode: 51.541 (4)
  load_resource: 15.195
*/