//Code for getting features

$.getJSON('api/gFeatures', function(data){
    //userNameInDB = data;
    console.log(data);
    data.forEach(function (item) {
        app5.add(item);
    });
  });
  

$.getJSON('api/users', function(data){
    data.forEach(function(item){
        console.log(item);
        $('#chooseUsers').append('<option>' + item.username + '</option>');
    });
});

$('#chooseUserbt').on("click",function(){
    console.log($('#chooseUsers option:selected').text());
    if($('#chooseUsers option:selected').text() != "Choose..."){
       
        console.log("exito");
    }
});
  
  var app_features = new Vue({
    el: '#features',
    data: {
      features: [
      ]
    },
    methods: {
      add: function (feature) {
        this.projects.push(feature);
      }/*,
      enterProj: function(feature) {
        location.href="/project?project="+feature;
      }
      */
    }
  
  
  })
  