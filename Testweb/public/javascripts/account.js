$(function () {
    var sign_in_dialog;
    var sign_in_form;
    var sign_up_dialog;
    var sign_up_form;

    var emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    var allFields = $([]).add($("#sign_up_name")).add($("#sign_up_email")).add($("#sign_up_password"));
    var tips = $(".validateTips");

    //dialog
    sign_in_dialog = $("#sign_in_dialog").dialog({
        autoOpen: false,
        height: 330,
        width: 350,
        modal: true,
        buttons: {
            "sign_in": sign_in_submit,
            Cancel: function () {
                sign_in_dialog.dialog("close");
            }
        },
        close: function () {
            sign_in_form[0].reset();
            allFields.removeClass("ui-state-error");
        }
    });

    sign_up_dialog = $("#sign_up_dialog").dialog({
        autoOpen: false,
        height: 400,
        width: 350,
        modal: true,
        buttons: {
            "Create an account": sign_up_submit,
            Cancel: function () {
                sign_up_dialog.dialog("close");
            }
        },
        close: function () {
            sign_up_form[0].reset();
            allFields.removeClass("ui-state-error");
        }
    });

    //form
    sign_in_form = sign_in_dialog.find("form").on("submit", function (event) {
        event.preventDefault();
        addUser();
    });
    sign_up_form = sign_up_dialog.find("form").on("submit", function (event) {
        event.preventDefault();
        addUser();
    });

    //button
    $("#sign_in_button").button().on("click", function () {
        sign_in_dialog.dialog("open");
    });

    $("#sign_up_button").button().on("click", function () {
        sign_up_dialog.dialog("open");
    });

    $("#sign_out_button").button().on("click", function () {
        $.post("sign_out");
    });

    //submit
    function sign_in_submit() {
        allFields.removeClass("ui-state-error");

        $.post("sign_in", {
                user: $("#sign_in_user").val(),
                password: $("#sign_in_password").val()
            })
            .done(function (data) {

                alert(data.result);
                if (data.success) {
                    alert(data.result);

                    $("#sign_in_button").hide();
                    $("#sign_up_button").hide();
                    $("#sign_out_button").show();

                    $("#uaer_name").html($("#sign_in_user").val());
                    $("#user_project").html("project1");
                }
            });
    }

    function sign_up_submit() {
        allFields.removeClass("ui-state-error");

        $.post("sign_up", {
                user: $("#sign_up_user").val(),
                email: $("#sign_up_email").val(),
                password: $("#sign_up_password").val()
            })
            .done(function (data) {
                if (data.sucess) {
                    alert(data.result);
                } else {
                    alert(data.result);
                }
            });
    }

    function addUser() {
        var valid = true;
        allFields.removeClass("ui-state-error");

        valid = valid && checkLength(name, "username", 3, 16);
        valid = valid && checkLength(email, "email", 6, 80);
        valid = valid && checkLength(password, "password", 5, 16);

        valid = valid && checkRegexp(name, /^[a-z]([0-9a-z_\s])+$/i,
            "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter.");
        valid = valid && checkRegexp(email, emailRegex, "eg. ui@jquery.com");
        valid = valid && checkRegexp(password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9");

        if (valid) {
            $("#users tbody").append("<tr>" +
                "<td>" + name.val() + "</td>" +
                "<td>" + email.val() + "</td>" +
                "<td>" + password.val() + "</td>" +
                "</tr>");
            dialog.dialog("close");
        }
        return valid;
    }

    function updateTips(t) {
        tips.text(t).addClass("ui-state-highlight");
        setTimeout(function () {
            tips.removeClass("ui-state-highlight", 1500);
        }, 500);
    }

    function checkLength(o, n, min, max) {
        if (o.val().length > max || o.val().length < min) {
            o.addClass("ui-state-error");
            updateTips("Length of " + n + " must be between " +
                min + " and " + max + ".");
            return false;
        } else {
            return true;
        }
    }

    function checkRegexp(o, regexp, n) {
        if (!(regexp.test(o.val()))) {
            o.addClass("ui-state-error");
            updateTips(n);
            return false;
        } else {
            return true;
        }
    }

});