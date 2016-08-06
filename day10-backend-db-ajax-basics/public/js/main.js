
/* ----------------------------- begin view ----------------------------------*/

var view ={
  addTask: function(taskObj) {
    console.log(taskObj);
    var cl = $('<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
    var temp = $('<div class="task"><div class="row"><div class="col-md-1"><input class="status" check="' + taskObj.status + '" type="checkbox" value=""></div><div class="col-md-10"><p class="bg-info">' + taskObj.task + '</p></div><div class="col-md-1"><button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></div></div></div>');
    temp.find('.close').click(model.onDeleteClick);
    $('.content_list').append(temp);
  },
  deleteTask: function(id_task){
    $(".task[id_task="+id_task+"]").detach();
  }
};

/* ------------------------------- end view ----------------------------------*/



/* ------------------------------ begin model --------------------------------*/

var model = {
  id_author: 1,

  addTaskFromDataBase: function(event){
    console.log(event);
    var text = $(event).val();
    console.log("Текст таски - Клиент: "+text);
    var urlPost = "add/task:";
    var data = {id_author:model.id_author,id_task:'',task:text,status:false,urlPost:urlPost};
    var obj = model.my_ajax(data);

    return data;

  },
  deleteTaskFromDataBase: function(event){
    // var _this = $(event);
    console.log(event);
    var id_task = $(event).closest(".task").attr("id_task");
    var urlPost = "del/id_task:";
    var data = {id_author:model.id_author,id_task:id_task,task:'',status:'',urlPost:urlPost};
    model.my_ajax(data);
    console.log(id_task);
    return id_task;
  },
  my_ajax: function(data){
    console.log("http://localhost:3000/"+data.urlPost);
    console.log(JSON.stringify(data));
    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: 'http://localhost:3000/'+data.urlPost,
        success: function(data) {
            console.log('success');
            console.log(data);
        }
    });
  },onDeleteClick: function() {
      var close = $(this);
      console.log(close);
      var tmp = close.closest(".task");
      tmp.attr({
          close: true
      });
      console.log(tmp);
      $('.task[close=true]').detach();
  }

};
/* ------------------------------- end model ---------------------------------*/




/* --------------------------- begin controller ------------------------------*/

  var controller = {

    pressEnterKey: function (event) {
      var _this = $(this);
      if (event.keyCode == 13) {
        console.log("Нажал на добавить"+_this.attr('class'));
        var result = model.addTaskFromDataBase(_this);
        view.addTask(result);
      }
    },
    pressClickCloseTask: function(event) {
      var _this = $(this);
      console.log("Нажал на удалить таску");
      var result = model.deleteTaskFromDataBase(_this);
      view.deleteTask(result);
    }

  };

/* --------------------------- end controller --------------------------------*/




/* ------------------- anonymous initialize function ------------------------ */

  (function(){

    var app = {

      init: function () {
        this.main();
        this.event();
      },

      main: function () {

      },

      event: function () {
        $(document).ready(function() {

            /* Delete task in list if click on close*/
           $('.close').click(controller.pressClickCloseTask);
            /* Add task in list click on Enter */
           $('#input_text').keydown(controller.pressEnterKey);
           /* Status task*/
           $('input.status').click(controller);


        });
      }
    };
    app.init();

  }());

/* ----------------- end anonymous initialize function ---------------------- */
