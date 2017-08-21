var myNavBar = {
  flagAdd: true,
  elements: [],
  init: function (elements) {
    this.elements = elements;
  },
  add: function() {
    if(this.flagAdd) {
      for(var i=0; i < this.elements.length; i++) {
        document.getElementById(this.elements[i]).className += " fixed-theme";
      }
      this.flagAdd = false;
    }
  },
  remove: function() {
    for(var i=0; i < this.elements.length; i++) {
      document.getElementById(this.elements[i]).className = document.getElementById(this.elements[i]).className.replace( /(?:^|\s)fixed-theme(?!\S)/g , '' );
    }
    this.flagAdd = true;
  }
};

myNavBar.init([
    "header",
    "header-container",
    "brand"
]);

export function offSetManager(){
  var yOffset = 0;
  var currYOffSet = $(window).scrollTop();
  if(currYOffSet > 10) {
    if($('.navbar-collapse').hasClass('in') || $('#navbar-header').hasClass('navBarOpen')) {
      $('.navbar-collapse').removeClass('in');
      $('#navbar-header').removeClass('navBarOpen');
    }
  }
  var height1 = $('#header-text').offset().top;
  var height2 = $('#header-container').outerHeight();
  if(currYOffSet > (height1 - height2)) {
    myNavBar.add();
  }
  else {
    myNavBar.remove();
  }
}
