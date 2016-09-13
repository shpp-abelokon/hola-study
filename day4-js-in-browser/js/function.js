 var onDeleteClick = function() {
 var close = $(this);
 console.log(close);
 var tmp = close.closest(".task");
 tmp.attr({
   close: true
 });
 console.log(tmp);
 $('.task[close=true]').detach();
};

var addTaskClickEnter = function(event){
  if (event.keyCode == 13) {
    var text = $(this).val();
    console.log(text);
    addTask(text,'false');
  }
};

var addTask = function(text,status){
  var stat = false;
  var cl = $('<button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>');
  var temp = $('<div class="task"><div class="row"><div class="col-md-1"><input checked="'+status+'" type="checkbox" value=""></div><div class="col-md-10"><p class="bg-info">'+text+'</p></div><div class="col-md-1"><button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></div></div></div>');
  temp.find('.close').click(onDeleteClick);
   $('.content_list').append(temp);
};

$(document).ready(function() {

  /* Delete task in list if click on close*/
  $('.close span').click(onDeleteClick);
  /* Add task in list click on Enter */
  $('#input_text').keydown(addTaskClickEnter);

});
