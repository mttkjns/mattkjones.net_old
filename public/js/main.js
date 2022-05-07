// Dean Attali / Beautiful Jekyll 2016

var main = {

  bigImgEl : null,
  numImgs : null,

  init : function() {
    // Shorten the navbar after scrolling a little bit down
    $(window).scroll(function() {
        if ($(".navbar").offset().top > 50) {
            $(".navbar").addClass("top-nav-short");
        } else {
            $(".navbar").removeClass("top-nav-short");
        }
    });

    // Close nav collapse when clicked outside of nav
    $(document).click(function (event) {
      var clickover = $(event.target);
      var open = $("#main-navbar").hasClass("collapse in");
      if (open === true 
        && !clickover.hasClass("navbar-toggle") 
        && !clickover.hasClass("navlinks-parent") 
        && !clickover.is("#toggleDisplayMode")
        && !clickover.hasClass("fas")) {
        console.log("nav click")
        console.log($(clickover).attr("class"));
        $("button.navbar-toggle").click();
      }
    });

    // On mobile, hide the avatar when expanding the navbar menu
    $('#main-navbar').on('show.bs.collapse', function () {
      $(".navbar").addClass("top-nav-expanded");
    });
    $('#main-navbar').on('hidden.bs.collapse', function () {
      $(".navbar").removeClass("top-nav-expanded");
    });

    // On mobile, when clicking on a multi-level navbar menu, show the child links
    $('#main-navbar').on("click", ".navlinks-parent", function(e) {
      var target = e.target;
      $.each($(".navlinks-parent"), function(key, value) {
        if (value == target) {
          $(value).parent().toggleClass("show-children");
        } else {
          $(value).parent().removeClass("show-children");
        }
      });
    });

    // Ensure nested navbar menus are not longer than the menu header
    var menus = $(".navlinks-container");
    if (menus.length > 0) {
      var navbar = $("#main-navbar").find("ul");
      var fakeMenuHtml = "<li class='fake-menu' style='display:none;'><a></a></li>";
      navbar.append(fakeMenuHtml);
      var fakeMenu = $(".fake-menu");

      $.each(menus, function(i) {
        var parent = $(menus[i]).find(".navlinks-parent");
        var children = $(menus[i]).find(".navlinks-children a");
        var words = [];
        $.each(children, function(idx, el) { words = words.concat($(el).text().trim().split(/\s+/)); });
        var maxwidth = 0;
        $.each(words, function(id, word) {
          fakeMenu.html("<a>" + word + "</a>");
          var width =  fakeMenu.width();
          if (width > maxwidth) {
            maxwidth = width;
          }
        });
        // $(menus[i]).css('min-width', maxwidth + 'px')
      });

      fakeMenu.remove();
    }

    // show the big header image
    main.initImgs();
  },

  initImgs : function() {
    // If the page was large images to randomly select from, choose an image
    if ($("#header-big-imgs").length > 0) {
      main.bigImgEl = $("#header-big-imgs");
      main.numImgs = main.bigImgEl.attr("data-num-img");

          // 2fc73a3a967e97599c9763d05e564189
    // set an initial image
    var imgInfo = main.getImgInfo();
    var src = imgInfo.src;
    var desc = imgInfo.desc;
    var position = imgInfo.position;
      main.setImg(src, desc, position);

    // For better UX, prefetch the next image so that it will already be loaded when we want to show it
      var getNextImg = function() {
      var imgInfo = main.getImgInfo();
      var src = imgInfo.src;
      var desc = imgInfo.desc;
      var position = imgInfo.position;

    var prefetchImg = new Image();
      prefetchImg.src = src;
    // if I want to do something once the image is ready: `prefetchImg.onload = function(){}`

      setTimeout(function(){
                  var img = $("<div></div>").addClass("big-img-transition").css("background-image", 'url(' + src + ')');
        if (position !== undefined) {
          img.css("background-position", position);
        }
        $(".intro-header.big-img").prepend(img);
        setTimeout(function(){ img.css("opacity", "1"); }, 50);

      // after the animation of fading in the new image is done, prefetch the next one
        //img.one("transitioned webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
      setTimeout(function() {
        main.setImg(src, desc, position);
      img.remove();
        getNextImg();
      }, 1000);
        //});
      }, 6000);
      };

    // If there are multiple images, cycle through them
    if (main.numImgs > 1) {
        getNextImg();
    }
    }
  },

  getImgInfo : function() {
    var randNum = Math.floor((Math.random() * main.numImgs) + 1);
    var src = main.bigImgEl.attr("data-img-src-" + randNum);
  var desc = main.bigImgEl.attr("data-img-desc-" + randNum);
  var position = main.bigImgEl.attr("data-img-position-" + randNum);

  return {
    src : src,
    desc : desc,
    position : position
  }
  },

  setImg : function(src, desc, position) {
  $(".intro-header.big-img").css("background-image", 'url(' + src + ')');
  if (position !== undefined) {
    $(".intro-header.big-img").css("background-position", position);
  }
  else {
    // Remove background-position if added to the prev image.
    $(".intro-header.big-img").css("background-position", "");
  }
  if (typeof desc !== typeof undefined && desc !== false) {
    // Check for Markdown link
    var mdLinkRe = /\[(.*?)\]\((.+?)\)/;
    if (desc.match(mdLinkRe)) {
      // Split desc into parts, extracting md links
      var splitDesc = desc.split(mdLinkRe);

      // Build new description
      var imageDesc = $(".img-desc");
      splitDesc.forEach(function (element, index){
        // Check element type. If links every 2nd element is link text, and every 3rd link url
        if (index % 3 === 0) {
          // Regular text, just append it
          imageDesc.append(element);
        }
        if (index % 3 === 1) {
          // Link text - do nothing at the moment
        }
        if (index % 3 === 2) {
          // Link url - Create anchor tag with text
          var link = $("<a>", {
            "href": element,
            "target": "_blank",
            "rel": "noopener noreferrer"
          }).text(splitDesc[index - 1]);
          imageDesc.append(link);
        }
      });
      imageDesc.show();
    } else {
      $(".img-desc").text(desc).show();
    }
  } else {
    $(".img-desc").hide();
  }
  }
};

function toggleColorInvert() {
  try { 
    var header = document.querySelector("body > header > div")
    header.classList.toggle("light-mode");
  }
  catch(err) {   }
  var content = document.querySelector("body > div.container")
  content.classList.toggle("light-mode");
  var body = document.querySelector("body")
  body.classList.toggle("body-light");
  var icon = $("#toggleDisplayMode > i")
  var text = $("#toggleDisplayMode")
  if (icon.hasClass("fa-sun")) {
    icon.removeClass("fa-sun").addClass("fa-moon")
  }
  else {
    icon.removeClass("fa-moon").addClass("fa-sun")
  }
}

function darkmode_init()
{	
  let darkmodeSwitch = document.querySelector("#toggleDisplayMode");

	let darkmodeCookie = {
		set:function(key,value,time,path,secure=false)
		{
			let expires = new Date();
			expires.setTime(expires.getTime() + time);
			var path   = (typeof path !== 'undefined') ? pathValue = 'path=' + path + ';' : '';
			var secure = (secure) ? ';secure' : '';
			
			document.cookie = key + '=' + value + ';' + path + 'expires=' + expires.toUTCString() + secure;
		},
		get:function()
		{
			let keyValue = document.cookie.match('(^|;) ?lightmode=([^;]*)(;|$)');
			return keyValue ? keyValue[2] : null;
		},
		remove:function()
		{
			document.cookie = 'lightmode=; Max-Age=0; path=/';
		}
	};
	
	
	if(darkmodeCookie.get() == 'true')
	{
    toggleColorInvert();
	}
	
	
	darkmodeSwitch.addEventListener('click', (event) => {
		event.preventDefault();
		event.target.classList.toggle('active');
		toggleColorInvert();
		
		if(document.body.classList.contains('body-light'))
		{
			darkmodeCookie.set('lightmode','true',2628000000,'/',false);
		}
		else
		{
			darkmodeCookie.remove();
		}
	});
}

// 2fc73a3a967e97599c9763d05e564189

document.addEventListener('DOMContentLoaded', function()
{
  main.init();
  darkmode_init();
});