$(function () {

    update();

    $('#new_project').click(function () {

        console.log("new_project");

        var project_name = prompt("Please enter the project name", "")
        if (project_name) {
            $.post("new_project", {
                project_name: project_name
            }, (data) => {
                update();
            });
        } else {
            alert('Project name cannot be empty');
        }
    });

})

function update() {

    $.post("get_project_list", (data) => {
        $('#project_list').html("");
        for (let i in data) {
            $('#project_list').append('<div id="project_list">' +
                '<div class="list-group">' +
                '<a href="/editor?project=' + data[i].project + '" class="list-group-item">' +
                '<h4 class="list-group-item-heading">' + data[i].project + '</h4>' +
                '<p class="list-group-item-text">Create date : ' +  new Date(data[i].create_date).toLocaleString() + '</p>' +
                '<p class="list-group-item-text">Last update : ' +  new Date(data[i].last_update).toLocaleString() + '</p>' +
                '</a>' +
                '</div>' +
                '</div>');

        }
    });

}