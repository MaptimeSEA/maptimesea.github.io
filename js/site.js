$(document).ready(function(){
  
  // sticky header with generated ids and anchors for <h1> tags
  var heads = document.getElementsByTagName("h1");
  var tutNav = document.getElementById("tutorial-nav");
  for (var i=0; i<heads.length; i++) {
    if(heads[i].className!="tutorial-title") {
      var text = heads[i].innerHTML;
      var target = nice(text);

      // create list item and anchor
      var item = document.createElement("li");
      var anchor = document.createElement("a");
      anchor.href = "#"+target;
      anchor.innerHTML = text;
      item.appendChild(anchor);
      tutNav.appendChild(item);

      // add id to h1 element in page
      heads[i].id = target;

    }
  }

  // collapse sections
  $(".collapse-button").on("click", function(){
    $(this).next(".collapse").slideToggle(200);
  });

  // click navigation anchors and animate scroll
  $('a').on('click', function(){
    if($(this).attr('href').indexOf('#')>-1) {
      event.preventDefault();
      var id = $(this).attr("href");
      var top = $(id).offset().top - 50;
      $("html, body").animate({
        scrollTop: top
      }, 500); // you can set any time here
    }
  });

  var nav = $("#tutorial-nav");
  $("#tutorial-nav li:eq(0) a").addClass('nav-active');
  var aChildren = $("#tutorial-nav li").children();
  var aArray = [];
  var top = nav.offset().top;

  for (var i=0; i < aChildren.length; i++) {    
      var aChild = aChildren[i];
      var ahref = $(aChild).attr('href');
      aArray.push(ahref);
  }

});

function nice(str) {
  var newString = str.replace(/[^A-Z0-9]+/ig, "-").toLowerCase();
  return newString;
}