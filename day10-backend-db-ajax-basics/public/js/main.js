/* ----------------------------- begin view ----------------------------------*/

var view = {
    addTask: function(taskObj, resMysql) {
        var cl = $('<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
        var temp = $('<div class="task" id_task=' + resMysql.data.insertId + '><div class="row"><div class="col-md-1"><input class="status" check="' + taskObj.status + '" type="checkbox" value=""></div><div class="col-md-10"><p class="bg-info">' + taskObj.task + '</p></div><div class="col-md-1"><button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></div></div></div>');
        $('.list').append(temp);
        $('.task[id_task=' + resMysql.data.insertId + '] .close').click(controller.pressClickCloseTask);
        $('.task[id_task=' + resMysql.data.insertId + '] input.status').click(controller.pressClickCheckBoxStatus);
        $('#input_text').val("");

    },
    deleteTask: function(taskObj, resMysql) {
        $(".task[id_task=" + taskObj.id_task + "]").detach();
    },
    changeTaskStatus: function(taskObj, resMysql) {
        $(".task[id_task=" + taskObj.id_task + "] input").attr({
            check: [taskObj.status]
        });
        $('.task[id_task=' + taskObj.id_task + '] input.status').click(controller.pressClickCheckBoxStatus);
    },
    downloadTasks: function(Obj, resMysql) {
        for (var i in resMysql.data) {
            var taskObj = {
                task: resMysql.data[i].task_content,
                status: resMysql.data[i].task_status
            };
            var res = {
                data: {
                    insertId: resMysql.data[i].ID
                }
            };
            view.addTask(taskObj, res);
        }
    },
    showWindowsSignUp: function() {
        $('#overlay2').fadeIn(450,
            function() {
                $('#modal_form_SignUp')
                    .css('display', 'block')
                    .animate({
                        opacity: 1,
                        top: '50%'
                    }, 200);
            });
    },
    hideWindowsSignUp: function() {
        $('#modal_form_SignUp')
            .animate({
                    opacity: 0,
                    top: '45%'
                }, 200,
                function() {
                    $(this).css('display', 'none');
                    $('#overlay2').fadeOut(450);
                }
            );
    },
    showWindowsSignIn: function() {
        $('#overlay2').fadeIn(450,
            function() {
                $('#modal_form_SignIn')
                    .css('display', 'block')
                    .animate({
                        opacity: 1,
                        top: '50%'
                    }, 200);
            });
    },
    hideWindowsSignIn: function() {
        $('#modal_form_SignIn')
            .animate({
                    opacity: 0,
                    top: '45%'
                }, 200,
                function() {
                    $(this).css('display', 'none');
                    $('#overlay2').fadeOut(450);
                }
            );
    }
};

/* ------------------------------- end view ----------------------------------*/



/* ------------------------------ begin model --------------------------------*/

var model = {
    id_author: 1,

    addTaskFromDataBase: function(event) {
        var text = $(event).val();
        var urlPost = "add/task:";
        var data = {
            id_author: model.id_author,
            id_task: '',
            task: text,
            status: false,
            urlPost: urlPost
        };
        model.my_ajax(data, view.addTask);
    },
    deleteTaskFromDataBase: function(event) {
        var id_task = $(event).closest(".task").attr("id_task");
        var urlPost = "del/id_task:";
        var data = {
            id_author: model.id_author,
            id_task: id_task,
            task: '',
            status: '',
            urlPost: urlPost
        };
        model.my_ajax(data, view.deleteTask);
    },
    changeTaskStatusFromDataBase: function(event) {
        var id_task = $(event).closest(".task").attr("id_task");
        var status = $(event).attr('check');
        status = (status == "false") ? "true" : "false";
        var urlPost = "update/task:";
        var data = {
            id_author: model.id_author,
            id_task: id_task,
            task: '',
            status: status,
            urlPost: urlPost
        };
        model.my_ajax(data, view.changeTaskStatus);
    },
    my_ajax: function(data, callback) {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/' + data.urlPost,
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(data),
            success: function(result) {
                callback(data, result);
            }
        });
    },
    onDeleteClick: function() {
        var close = $(this);
        var tmp = close.closest(".task");
        tmp.attr({
            close: true
        });
    },
    authorizationFromDataBase: function(event) {
        var login = $('input#login').val();
        var password = $('input#password').val();
        var urlPost = "authorization:";
        var data = {
            login: login,
            password: password,
            urlPost: urlPost
        };
        model.my_ajax(data, function(Obj, resMysql) {
            if ((resMysql.data.length) == '0') {
                $(".thankyou .error").text("не верный логин или пароль");
            } else {
                $(".thankyou .error").text("");
                var id_author = resMysql.data[0].ID;
                model.addAllUserTasksFromDataBase(id_author);
                view.hideWindowsSignIn();
            }
        });
    },
    addAllUserTasksFromDataBase: function(id_author) {
        var urlPost = "selectAllUserTasks:";
        var data = {
            id_author: id_author,
            urlPost: urlPost
        };
        model.my_ajax(data, view.downloadTasks);
    }
};
/* ------------------------------- end model ---------------------------------*/




/* --------------------------- begin controller ------------------------------*/

var controller = {

    pressEnterKey: function(event) {
        var _this = $(this);
        if (event.keyCode == 13) {
            model.addTaskFromDataBase(_this);
        }
    },
    pressClickCloseTask: function(event) {
        var _this = $(this);
        model.deleteTaskFromDataBase(_this);
    },
    pressClickCheckBoxStatus: function(event) {
        var _this = $(this);
        model.changeTaskStatusFromDataBase(_this);
    },
    pressClickBtnSingIn: function(event) {
        var _this = $(this);
        model.authorizationFromDataBase(_this);
    }

};

/* --------------------------- end controller --------------------------------*/




/* ------------------- anonymous initialize function ------------------------ */

(function() {

    var app = {

        init: function() {
            this.main();
            this.event();
        },

        main: function() {

        },

        event: function() {
            $(document).ready(function() {

                /* Delete task in list if click on close*/
                $('.close').click(controller.pressClickCloseTask);
                /* Add task in list click on Enter */
                $('#input_text').keydown(controller.pressEnterKey);
                /* Status task*/
                $('input.status').click(controller.pressClickCheckBoxStatus);
                /* Login user*/
                $('#form_btn_SignIn').click(controller.pressClickBtnSingIn);
                /* View modal windows Sign Up */
                $('#signUp').click(view.showWindowsSignUp);
                /* Close modal windows Sign Up*/
                $('#modal_close_SignUp, #overlay2').click(view.hideWindowsSignUp);
                /* View modal windows Sign Ip */
                $('#SignIn').click(view.showWindowsSignIn);
                /* Close modal windows Sign Ip*/
                $('#modal_close_SignIn, #overlay2').click(view.hideWindowsSignIn);

            });
        }
    };
    app.init();

}());

/* ----------------- end anonymous initialize function ---------------------- */
