document.addEventListener("DOMContentLoaded", function(){

  //Implementation of the auto scroll
  function getElementY(query) {
    return window.pageYOffset + document.querySelector(query).getBoundingClientRect().top
  }

  function doScrolling(element, duration) {
  	var startingY = window.pageYOffset
    var elementY = getElementY(element)

    // If element is close to page's bottom then window will scroll only to some position above the element.
    var targetY = document.body.scrollHeight - elementY < window.innerHeight ? document.body.scrollHeight - window.innerHeight : elementY
  	var diff = targetY - startingY

    // Easing function: easeInOutCubic
    // From: https://gist.github.com/gre/1650294
    var easing = function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 }
    var start

    if (!diff) return

  	// Bootstrap our animation - it will get called right before next frame shall be rendered.
  	window.requestAnimationFrame(function step(timestamp) {
      if (!start) start = timestamp

      // Elapsed miliseconds since start of scrolling.
      var time = timestamp - start

  		// Get percent of completion in range [0, 1].
      var percent = Math.min(time / duration, 1)

      // Apply the easing.
      // It can cause bad-looking slow frames in browser performance tool, so be careful.
      percent = easing(percent)

      window.scrollTo(0, startingY + diff * percent)

  		// Proceed with animation as long as we wanted it to.
      if (time < duration) {
        window.requestAnimationFrame(step)
      }
    })
  }

  //Initialize the buttons which triggers auto scroll
  (function initializeScrollButtons() {
    document.getElementsByClassName("mn-download")[0].addEventListener("click", doScrolling.bind(null, ".download", 1000));
    document.getElementsByClassName("mn-about")[0].addEventListener("click", doScrolling.bind(null, ".about", 1000));
    document.getElementsByClassName("download-btn")[0].addEventListener("click", doScrolling.bind(null, ".download", 1000));
    document.getElementsByClassName("learn-btn")[0].addEventListener("click", doScrolling.bind(null, ".about", 1000));
  })();

  //Implementation for copy text when click on specific box
  (function copyOnClick() {
    document.getElementsByClassName("download-code-container")[0].addEventListener("click", function(event){
      document.getElementsByClassName("download-onedrivecli-title")[0].innerText = "Copied";
      setTimeout(function() {
        document.getElementsByClassName("download-onedrivecli-title")[0].innerText = "Onedrivecli";
      }, 1000);
      navigator.clipboard.writeText("iex (new-object net.webclient).downloadstring ('https://raw.githubusercontent.com/PanSem /onedrivecli-site/master/install.ps1')");
    });
  })();

  //Implementaion for auto typing
  (function autoTyping() {
    var dataText = [ "onedrivecli", "your@username", "*********", "C:/full_path"];

    // type one text in the typwriter
    // keeps calling itself until the text is finished
    function typeWriter(text, i, qSelector) {
      // chekc if text isn't finished yet
      if (i < (text.length)) {
        // add next character to h1
        if(text.substring(i,i+5)==="<br/>"){
          i = i + 5;
        }else{
         document.querySelector(qSelector).innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';
        }

        // wait for a while and call this function again for next character
        setTimeout(function() {
          typeWriter(text, i + 1, qSelector)
        }, 100);
      }
    }

    typeWriter(dataText[0], 0, ".ps-onedrivecli");

    setTimeout(function() {
      document.getElementsByClassName("username-window")[0].style.display = "block";
      setTimeout(function() {
        typeWriter(dataText[1], 0, ".ps-username");
      },500);
    }, 1500);

    setTimeout(function() {
      document.getElementsByClassName("password-window")[0].style.display = "block";
      setTimeout(function() {
        typeWriter(dataText[2], 0, ".ps-password");
      },500);
    }, 3500);

    setTimeout(function() {
      document.getElementsByClassName("full-path")[0].style.display = "block";
      setTimeout(function() {
        typeWriter(dataText[3], 0, ".ps-path");
      },500);
    }, 5000);

    setTimeout(function() {
      document.getElementsByClassName("wait-login")[0].style.display = "block";
    }, 7000);

    setTimeout(function() {
      document.getElementsByClassName("o-folder")[0].style.display = "block";
    }, 8000);
  })();

  //Implementation for slider
  (function slider() {
    var slideIndex = 1;
   showSlides(slideIndex);

   function plusSlides(n) {
     showSlides(slideIndex += n);
   }

   function currentSlide(n) {
     showSlides(slideIndex = n);
   }

   function showSlides(n) {
     var i;
     var slides = document.getElementsByClassName("mySlides");
     var dots = document.getElementsByClassName("dot");

     if (n > slides.length) {
       slideIndex = 1
     }

     if (n < 1) {
       slideIndex = slides.length
     }

     for (i = 0; i < slides.length; i++) {
         slides[i].style.display = "none";
     }

     for (i = 0; i < dots.length; i++) {
         dots[i].className = dots[i].className.replace(" active", "");

     }
     slides[slideIndex-1].style.display = "block";
     dots[slideIndex-1].className += " active";
   }

    document.getElementsByClassName("about-container")[0].addEventListener("click", plusSlides.bind(null, 1));
  })();
});
