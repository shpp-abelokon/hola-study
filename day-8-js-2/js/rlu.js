var hash_table = new Map();
var limit = 10;
var priority_array = [];

var find = function(value) {
    return priority_array.indexOf(value);
}

var addRequest = function(request, data) {
    if (priority_array.length == limit) {
        var index_value = priority_array.shift();
        hash_table.delete(index_value);
    }
    if (hash_table.has(request)) {
        var index = find(request);
        priority_array.unshift(priority_array[index]);
    } else {
        hash_table.set(request, data);
        priority_array.push(request);
    }
}

var showResponse = function(response) {
    $('.response p').text('Response: ' + response);
}

var LRUCache = function() {
    var request = $('input').val();
    var date = new Date();
    addRequest(request, date);
    showResponse(hash_table.get(request));
}

$(document).ready(function() {

    $('button').click(LRUCache);

});
