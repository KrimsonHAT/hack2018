function loadModal() {
  $('#myInput').trigger('focus')
}

$( "#send" ).click(function( event ) {

  if ($("#project-name").val().length === 0 ||  ($("#project-name").val().length > 32)) {
    event.preventDefault();
    console.log("nope")
  } else {
    console.log($("#project-name"))
  }
  

});

var app5 = new Vue({
  el: '#exampleModalCenterTitle',
  data: {
    message: 'Hello Vue.js!'
  }
})
