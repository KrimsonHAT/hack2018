//Code for getting features

$.getJSON('api/gFeatures', function(data){
    //userNameInDB = data;
    console.log(data);
    data.forEach(function (item) {
        app_features.add(item);
    });
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
  