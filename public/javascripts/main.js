function loadModal() {
  $('#myInput').trigger('focus')
}

$( "#send" ).click(function( event ) {

  if ($("#project-name").val().trim().length === 0 ||  ($("#project-name").val().trim().length > 32)) {
    event.preventDefault();
    console.log("nope")
  } else {
    console.log($("#project-name"))
  }
});

//Code for getting projects
$.getJSON('api/gProjects', function(data){
    //userNameInDB = data;
    console.log(data);
    data.forEach(function (item) {
        app5.add(item);
    });
});


var app5 = new Vue({
  el: '#projectT',
  data: {
    projects: [
    ]
  },
  methods: {
    add: function (project) {
      this.projects.push(project);
    },
    enterProj: function(project) {
      location.href="/project?project="+project;
    }
  }


})
