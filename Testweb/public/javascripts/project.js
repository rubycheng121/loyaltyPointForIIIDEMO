$(function () {

    let count = 1;

    update();

    $('#new_project').click(function () {

        let contract = {};
        console.log("new_project");
        console.log($('#project_name').val());

        contract[$('#contract_name1').val()] = []
        $('.deploy1').each(function (index) {
            contract[$('#contract_name1').val()].push($(this).val());
        });

        for (let i = 1; i < count; i++) {
            contract[$('#contract_name' + (i + 1)).val()] = []
            $('.deploy' + + (i + 1)).each(function (index) {
                contract[$('#contract_name' + (i + 1)).val()].push($(this).val());
            });
        }

        console.log(contract);

        $.post("new_project", {
            project_name: $('#project_name').val(),
            contract: JSON.stringify(contract)
        }, (data) => {
            update();
        });
    });

    $('#add_contract').click(function () {

        $('#form').append('<label>Contract ' + ++count + ' Name</label><br>')
        $('#form').append('<input type="text" id="contract_name' + count + '"><br>')
        $('#form').append('<button class="new_deploy">Add Contract ' + count + ' Variable</button><br>')
        $('.new_deploy').unbind()
        $('.new_deploy').click(function () {
            console.log('new_deploy')
            $(this).before('<label>Contract Variable Name :</label><input type="text" class="deploy'+count+'" style="margin-left:2rem"><br>')
        });
    });

    $('.new_deploy').click(function () {
        console.log('new_deploy')
        $(this).before('<label>Contract Variable Name :</label><input type="text" class="deploy1" style="margin-left:2rem"><br>')
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