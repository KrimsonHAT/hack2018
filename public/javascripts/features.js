//Code for getting features

$.getJSON('api/gFeatures', function (data) {
    //userNameInDB = data;
    console.log(data);
    data.forEach(function (item) {
        app_features.add(item);
    });
});

$("#send").click(function (event) {

    if ($("#feature-name").val().trim().length === 0 || ($("#project-name").val().trim().length > 32)) {
        event.preventDefault();
        console.log("nope")
    } else {
        console.log($("#feature-name"))
    }
});

$.getJSON('api/gOtherUsers', function (data) {
    data.forEach(function (item) {
        $('#chooseUsers').append('<option>' + item.username + '</option>');
    });
});
$.getJSON('api/gProyectUsers', function (data) {
    data.forEach(function (item) {
        $("#getGroupUsers").append('<option value=' + item.username + '>' + item.username + '</option>');


        $("#userRow").append(`
            <div class="row" style="margin-bottom:2px">
                <div class="col-2" id="userPhoto">
                    <p>photo</p>
                </div>
                <div class="col-5" id="userName">
                    <p>` + item.username + `</p>
                </div>
                    <div class="col-5" style="padding:3px;" id="userProgress">
                        <div class="progress"><div class="progress-bar progress-bar-striped" role="progressbar" style="width: 10%;" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div></div>
                    </div>
            </div>
            <div>
            </div>
            `
        );
    });
});

$('#chooseUserbt').on("click", function () {
    let selected = $('#chooseUsers option:selected').text();
    if (selected != "Choose...") {
        $.post('api/addUser', { username: selected }, function (data) {
            location.reload();
        });
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
            this.features.push(feature);
        }/*,
      enterProj: function(feature) {
        location.href="/project?project="+feature;
      }
      */
    }


})
