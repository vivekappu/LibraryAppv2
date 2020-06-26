window.addEventListener("DOMContentLoaded", function(e) {
    var myHilitor = new Hilitor("highlight");
    myHilitor.setMatchType("left");
    document.getElementById("keywords").addEventListener("keyup", function(e) {
      myHilitor.apply(this.value);
    }, false);
  }, false);