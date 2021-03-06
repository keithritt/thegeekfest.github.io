function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(email.val())) {
    email.addClass("error").attr("aria-invalid", true);
  } else {
    $(email).removeClass("error").removeAttr("aria-invalid");
  }

  return re.test(email.val());
}

function validatePhone(phone) {
  var re = /^\d{10}$/;
  if (!re.test(phone.val())) {
    phone.addClass("error").attr("aria-invalid", true);
  } else {
    $(phone).removeClass("error").removeAttr("aria-invalid");
  }

  return re.test(phone.val());
}

function checkRequiredFields(jqObjects) {
  jqObjects.each(function () {
    if (!$(this).val()) {
      $(this).addClass("required").attr("aria-invalid", true);
    } else {
      $(this).removeClass("required").removeAttr("aria-invalid");
    }

    // validate email field
    if ($(this).attr("id") === "entry_809307019") {
      validateEmail($(this));
    }

    // validate phone field
    if ($(this).attr("id") === "entry_843662138") {
      validatePhone($(this));
    }
  });
}

function validateFrom(requiredFields) {
  var isValid = false;

  // check all required fileds
  checkRequiredFields(requiredFields);

  var checkedParticipationElements = $("ul.ss-choices-required input:checked")

  if (checkedParticipationElements.length < 1) {
    $("ul.ss-choices-required").addClass("required").attr("aria-invalid", true);
  } else {
    $("ul.ss-choices-required").removeClass("required").removeAttr("aria-invalid");
  }

  var invalidElements = $("*[aria-invalid]");
  //if page contains no 'aria-invalid' attribute then form is valid.
  if (invalidElements.length === 0) {
    isValid = true;
  }

  invalidElements.focus();
  return isValid;
}

if (window.jQuery) {
  $(document).ready(function () {
    // Load embedded Google map on screen sizes larger than 600px
    var toggleMap = function () {
      var locationContainer, gmap, gmapScrollPreventer, location;
      locationContainer = $("#location-container");

      // if screen width is less than 600px
      if ($(window).width() > 600) {
        $("#location-container")
          .css("background-color", "transparent")
          .css("background-image", "none")
          .css("background-position", "")
          .css("background-repeat", "")
          .css("height", "300px");
        gmapScrollPreventer = document.createElement("DIV");
        gmapScrollPreventer.id = 'map-overlay';
        $("#location-container").append(gmapScrollPreventer);
        $("#map-overlay")
          .css("background", "transparent")
          .css("position", "absolute")
          .css("width", "100%")
          .css("height", "300px")
          .click(function() {
            $("#map-overlay").css("pointer-events", "none");
          });

        gmap = document.createElement("IFRAME");
        gmap.id = 'campus-map';
        location = 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3264.0421688414367!2d-80.69445979999999!3d35.10565789999999!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8854246c3b400e35%3A0xc61cfd104a8653f0!2sLevine+II%2C+2800+Campus+Ridge+Rd%2C+Matthews%2C+NC+28105!5e0!3m2!1sen!2sus!4v1409667414849';
        $("#location-container").append(gmap);
        $("#campus-map").attr("frameborder", "0")
          .attr("src", location)
          .css("width", "100%")
          .css("height", "300px")
          .css("border", "0");
      } else {
        // if screen width is less than 600px
        $("#map-overlay").remove()
        $("#campus-map").remove()
        $("#location-container")
          .css("background-color", "transparent")
          .css("background-image", "url('assets/images/levine_campus_ext_00.jpg')")
          .css("background-position", "center")
          .css("background-repeat", "no-repeat")
          .css("height", "300px");
      }
    };

    if ($(window).width() > 600) {
      toggleMap();
    }

    $(window).resize(function() {
      toggleMap();
    });

    // add evenlistener to required form fields (aria-required="true" attribute)
    // on blur
    var requiredFields = $("*[aria-required=true]");

    requiredFields.blur(function () {
      checkRequiredFields($(this));
    });

    // focus on first name input
    $("form input:first").focus();

    $("form#ss-form").submit(function () {
      var isValid = validateFrom(requiredFields);
      return isValid;
    });

    // load TGF Live iframe if modal is loaded and todayDate is after liveDate
    $('#tgfliveModal').on('shown.bs.modal', function (e) {
      var liveDate, todayDate, embedUrl, url1, url2;
      liveDate = new Date('2014-11-13T09:00:00.000-05:00');
      todayDate = new Date();
      embedUrl = 'http://cdn.livestream.com/embed/cpcc?layout=4&amp;autoPlay=true'
      url1 = 'http://www.livestream.com/?utm_source=lsplayer&amp;utm_medium=embed&amp;utm_campaign=footerlinks'
      url2 = 'http://www.livestream.com/cpcc?utm_source=lsplayer&amp;utm_medium=embed&amp;utm_campaign=footerlinks'

      if (todayDate > liveDate) {
        $('.modal-body')
          .append('<iframe id="tgfLiveIframe" frameborder="0" src="' + embedUrl +
                  '" scrolling="no"></iframe><div id="tgfLiveFooter">Watch ' +
                  '<a href="' + url1 + '" title="live streaming video">live' +
                  'streaming video</a> from <a href="' + url2 + '" title="' +
                  'Watch cpcc at livestream.com">cpcc</a> at livestream.com' +
                  '</div>');
      }
    });

    // unload TGF Live iframe
    $('#tgfliveModal').on('hidden.bs.modal', function (e) {
      $('#tgfLiveIframe').remove()
      $('#tgfLiveFooter').remove()
    });

    // hide TGF live on mobile devices
    if('ontouchstart' in document.documentElement) {
      $('#tgfliveinfo button').addClass('touch');
      $('#tgfliveinfo')
        .append('<p class="alert alert-warning" role="alert">' +
                '<i class="fa fa-frown-o fa-2x"></i>' +
                '&nbsp;TGF Live! is not currently supported on mobiles / tablets.' +
                '&nbsp;You may watch the event Live, from any laptop / desktop computer.' +
                '</p>');
    }

    // replace placeholder with YouTube video - #perfmatters
    $('#ytLink').click(function() {
      $(this).remove();
      $("#video")
        .append("<iframe src='//www.youtube.com/embed/diJ1uDQ2IIc?list=PLuRg1jByqFYMIKX0wi4_8T3SBeF0XwFCL'" +
                "frameborder='0' allowfullscreen></iframe>");
        return false;
    });

    // close navbar-menu on mobile devices upon making a selection
    $('#navbar-collapse-1 a').click(function() {
      $('#navbar-collapse-1').collapse('hide');
    });
  });
}
