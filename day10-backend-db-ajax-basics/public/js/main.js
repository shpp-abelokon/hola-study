/* ----------------------------- begin view ----------------------------------*/

var view = {
    addTask: function(taskObj, resMysql) {
        var temp = $('<div class="task" id_task=' + resMysql.data.insertId + '><div class="row"><div class="col-md-1 checkbox_task"><input  class="status" type="checkbox" value=""></div><div class="col-md-10"><div class="task_text">' + taskObj.task + '<i class="fa fa-pencil-square-o" aria-hidden="true"></i></div><input type="text" class="form-control task_text_editor" ></div><div class="col-md-1"><button type="button" class="close" aria-label="Close"><i class="fa fa-times-circle-o" aria-hidden="true"></i></button></div></div></div>');
        $('.list').append(temp);
        $('.task[id_task=' + resMysql.data.insertId + '] input.status').prop('checked', taskObj.status);
        $('.task[id_task=' + resMysql.data.insertId + '] .close').click(controller.pressClickCloseTask);
        $('.task[id_task=' + resMysql.data.insertId + '] input.status').click(controller.pressClickCheckBoxStatus);
        controller.hoverTaskShowClose('.task[id_task=' + resMysql.data.insertId + ']');
        $('.task[id_task=' + resMysql.data.insertId + '] .task_text').dblclick(controller.dblClickTaskText);
        $('.task[id_task=' + resMysql.data.insertId + '] .task_text_editor').keydown(controller.pressEnterKeyEdit);
        $('.task[id_task=' + resMysql.data.insertId + '] .task_text_editor').blur(controller.blurInputTextEdit);
        $('#input_text').val("");

        view.showCountActiveTasks(taskObj.status);


    },
    deleteTask: function(taskObj, resMysql) {
        $(".task[id_task=" + taskObj.id_task + "]").detach();
    },
    changeTaskStatus: function(taskObj, resMysql) {
        view.showCountActiveTasks(taskObj.status == true ? -1 : 0);
        if (model.user.filter == 'active' && taskObj.status == true) {
            $('.task[id_task=' + taskObj.id_task + ']').empty();
        } else if (model.user.filter == 'complite' && taskObj.status == false) {
            $('.task[id_task=' + taskObj.id_task + ']').empty();
        }
    },
    downloadTasks: function(Obj, resMysql) {
        $('.list').empty();
        model.user.counterOfActiveTasks = 0;
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
    },
    checkLoginSignUp: function(obj, resMysql) {
        if (resMysql.login == '0') {
            $('.name_SignUp').css('border', '1px solid red');
            // break;
        } else {
            $('.name_SignUp').css('border', '1px solid lightgreen');
            if (resMysql.mail == '0') {
                $('.email_SignUp').css('border', '1px solid red');
            } else {
                $('.email_SignUp').css('border', '1px solid lightgreen');
                if (resMysql.pass == '0') {
                    $('.password_SignUp').css('border', '1px solid red');
                } else {
                    $('.password_SignUp').css('border', '1px solid lightgreen');
                    view.hideWindowsSignUp();
                }
            }
        }
    },
    showCountActiveTasks: function(value) {
        if (value == 0 || value == -1) {
            n = (value == 0) ? ++model.user.counterOfActiveTasks : (value == -1) ? --model.user.counterOfActiveTasks : model.user.counterOfActiveTasks;
            $('.counterOfActiveTasks').text(function() {
                if (n > 1) {
                    return "Remain tasks: " + n;
                } else {
                    return "Remain task: " + n;
                }
            });
        }
    },
    showTaskText: function(data) {
        $('.task[id_task=' + data.id_task + '] .task_text').text(data.task_content).css({
            "display": 'block'
        });
        $('.task[id_task=' + data.id_task + '] input.task_text_editor').css({
            'display': 'none'
        });
    },
    showUserGreeting: function(obj) {
        $('.bg_content h1').text(obj.login + ' welcome to Todo List');
        $('#SignIn,#signUp').css({
            'display': 'none'
        });
        $('#user_name').css('display', 'block').find('span').text(obj.login);
    }

};

/* ------------------------------- end view ----------------------------------*/



/* ------------------------------ begin model --------------------------------*/

var model = {
    user: {
        id_author: '',
        filter: '',
        counterOfActiveTasks: ''
    },

    addTaskFromDataBase: function(event) {
        if (model.user.id_author !== '') {
            var text = $(event).val();
            if (text.length > 0) {
                var urlPost = "add/task:";
                var data = {
                    id_author: model.user.id_author,
                    id_task: '',
                    task: text,
                    status: 0,
                    urlPost: urlPost
                };
                model.my_ajax(data, view.addTask);
            }
        }
    },
    deleteTaskFromDataBase: function(event) {
        var id_task = $(event).closest(".task").attr("id_task");
        var status = $('.task[id_task=' + id_task + '] input').prop('checked');
        if (status == false) {
            view.showCountActiveTasks(-1);
        }
        var urlPost = "del/id_task:";
        var data = {
            id_author: model.user.id_author,
            id_task: id_task,
            task: '',
            status: '',
            urlPost: urlPost
        };
        model.my_ajax(data, view.deleteTask);
    },
    changeTaskStatusFromDataBase: function(event) {
        var id_task = $(event).closest(".task").attr("id_task");
        var status = $(event).prop('checked');
        var urlPost = "update/task:";
        var data = {
            id_author: model.user.id_author,
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
            url: '/' + data.urlPost,
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
            if ((resMysql.result) == 0) {
                $(".thankyou .error").text("invalid username or password");
            } else {
                $(".thankyou .error").text("");
                model.user.id_author = resMysql.id_user;
                model.user.filter = resMysql.user_filter;
                model.filterTasks(model.user.filter);
                view.hideWindowsSignIn();
                view.showUserGreeting(data);
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
    },
    registerUserInDataBase: function(event) {
        var user_login = $('.name_SignUp').val();
        var user_email = $('.email_SignUp').val();
        var user_pass = $('.password_SignUp').val();
        var data = {
            user_login: user_login,
            urlPost: "checkLogin:",
            user_email: user_email,
            user_pass: user_pass
        };
        model.my_ajax(data, view.checkLoginSignUp);
    },
    addNewUser: function(obj, access) {
        if (access.login && access.mail) {

        }
    },
    completeAllTasks: function(event) {
        var status = event.prop('checked');
        var allCheckboxesYouWantToChange;
        if (status == true) {
            allCheckboxesYouWantToChange = $(".task  input:checkbox:enabled").not(':checked');
        } else if (status == false) {
            allCheckboxesYouWantToChange = $(".task  input:checkbox:checked");
        }
        allCheckboxesYouWantToChange.prop('checked', status);
        allCheckboxesYouWantToChange.each(function(i, elem) {
            model.changeTaskStatusFromDataBase(elem);
        });
    },
    filterTasks: function(value) {
        var data = {
            filter: value,
            urlPost: "filterTasks:",
            id_author: model.user.id_author,
        };
        if (value == 'all') {
            model.addAllUserTasksFromDataBase(model.user.id_author);
        } else {
            model.my_ajax(data, view.downloadTasks);
        }
        data.urlPost = 'updateStatusFilterUser:';
        model.my_ajax(data, function() {});
    },
    removeCompletedTasks: function() {
        var data = {
            id_author: model.user.id_author,
            urlPost: 'removeCompletedTasks:',
            filter: model.user.filter,
            status: 1,
        };
        model.my_ajax(data, function(data) {
            model.filterTasks(data.filter);
        });
        // model.filterTasks(model.user.filter);
    },
    editTasktext: function(event) {
        var id_task = $(event).closest(".task").attr("id_task");
        var task_text = $(event).text();
        $(event).css({
            'display': 'none'
        });
        $('.task[id_task=' + id_task + '] input.task_text_editor').css({
            'display': 'block'
        }).val(task_text);
    },
    updateTaskTextFromDataBase: function(event) {
        var id_task = $(event).closest(".task").attr("id_task");
        var task_text = $(event).val();
        var urlPost = 'updateTaskText:';
        var data = {
            id_task: id_task,
            task_content: task_text,
            urlPost: urlPost
        };
        model.my_ajax(data, view.showTaskText);

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
    },
    pressClickBtnSingUp: function(event) {
        var _this = $(this);
        model.registerUserInDataBase(_this);
    },
    pressClickCompleteAllTasks: function(event) {
        var _this = $(this);
        model.completeAllTasks(_this);
    },
    pressClickfilterAll: function(event) {
        var _this = $(this);
        model.user.filter = 'all';
        model.filterTasks(model.user.filter);
    },
    pressClickfilterActive: function(event) {
        var _this = $(this);
        model.user.filter = 'active';
        model.filterTasks(model.user.filter);
    },
    pressClickfilterComplite: function(event) {
        var _this = $(this);
        model.user.filter = 'complite';
        model.filterTasks(model.user.filter);
    },
    pressClickRemoveCompletedTasks: function(event) {
        var _this = $(this);
        model.removeCompletedTasks();
    },
    hoverTaskShowClose: function(event) {
        $(event).hover(function() {
            $(this).find('.close').css({
                "display": 'block'
            });
            $(this).find('i').css({
                "display": 'block'
            });
        }, function() {
            $(this).find('.close').css({
                "display": 'none'
            });
            $(this).find('i').css({
                "display": 'none'
            });
        });
    },
    dblClickTaskText: function(event) {
        var _this = $(this);
        model.editTasktext(_this);
    },
    pressEnterKeyEdit: function(event) {
        if (event.keyCode == 13) {
            var _this = $(this);
            model.updateTaskTextFromDataBase(_this);
        }
    },
    blurInputTextEdit: function(event) {
        var _this = $(this);
        model.updateTaskTextFromDataBase(_this);
    },
    pressClickExit: function(_this) {
        model.user = {
            id_author: '',
            filter: '',
            counterOfActiveTasks: ''
        };
        $('.list').empty();
        $('#user_name').css('display', 'none').find('span').empty();
        $('#SignIn,#signUp').css('display', 'block');
        $('.counterOfActiveTasks').text('Remain task: ');
        $('.bg_content h1').text('Please log into your account or register');
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

                /* delete task in list if click on close*/
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

                $('#form_btn_SignUp').click(controller.pressClickBtnSingUp);

                $('.complete_all_tasks').click(controller.pressClickCompleteAllTasks);

                $('.filterAll').click(controller.pressClickfilterAll);

                $('.filterActive').click(controller.pressClickfilterActive);

                $('.filterComplite').click(controller.pressClickfilterComplite);

                $('.removeCompletedTasks').click(controller.pressClickRemoveCompletedTasks);
                $('.task_text').hover(controller.hoverTaskShowClose);
                $('.task_text').dblclick(controller.dblClickTaskText);
                $('.task input.task_text_editor').keydown(controller.pressEnterKeyEdit);
                $('.task input.task_text_editor').blur(controller.blurInputTextEdit);
                $('#user_name i').click(controller.pressClickExit);
            });
        }
    };
    app.init();

}());

/* ----------------- end anonymous initialize function ---------------------- */
