$(function () {

    var count = 1;

    update();

    $('#new_project').click(function () {

        let contract_name = '';

        console.log("new_project");
        console.log($('#project_name').val());
        
        contract_name += $('#contract_name1').val()
        for (let i=1; i<count; i++) {
            contract_name += ',' + $('#contract_name' + (i+1)).val();
        }
        console.log(contract_name);

        if ($('#project_name').val()) {
            $.post("new_project", {
                project_name: $('#project_name').val(),
                contract_name: contract_name
            }, (data) => {
                update();
            });
        } else {
            alert('Project name cannot be empty');
        }
        
    });

    $('#add_contract').click(function () {
        $('form').append('<label>contract ' + ++count + ' name</label><br>')
        $('form').append('<input type="text" id="contract_name'+ count +'"><br>')
    });
})

function update() {

    $.post("get_project_list", (data) => {
        $('#project_list').html("");
        for (let i in data) {
            $('#project_list').append(
                '<div class="panel panel-info">' +
                '<div class="panel-heading">' +
                '<a href="/editor?project=' + data[i].project + '">' +
                '<h4 class="list-group-item-heading">' + data[i].project + '</h4>' +
                '</a>' +
                '</div>' +
                '<div class="panel-body">' +
                '<p class="list-group-item-text">Create date : ' + new Date(data[i].create_date).toLocaleString() + '</p>' +
                '<p class="list-group-item-text">Last update : ' + new Date(data[i].last_update).toLocaleString() + '</p>' +
                '</div>' +
                '</div>');
        }
    });

}