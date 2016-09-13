function QueueRunner(exec) {
    this.listPendingTasks = [];
    this.workingTasksCounter = 0;

    this.onfinish = function(result) {

        this.listPendingTasks[0].onFinish(result);
        this.listPendingTasks.shift();
        if (this.listPendingTasks.length != 0) {
            exec(this.listPendingTasks[0], this.onfinish);
        } else {
            this.workingTasksCounter--;
        }
    };

    this.onfinish = this.onfinish.bind(this);
    this.push = function(task) {
        this.listPendingTasks.push(task);
        console.log(this.listPendingTasks);

        if (this.workingTasksCounter == 0) {
            this.workingTasksCounter++;
            console.log(this.listPendingTasks[0]);
            exec(this.listPendingTasks[0], this.onfinish);
        }
    };
}

function sum(data, onfinish) {
    onfinish(data[1] + data[2]);
}

function callback(result) {
    console.log(result);
}

qr = new QueueRunner(sum, callback);

var taske = {
    1: 40,
    2: 7,
    onFinish: callback
}
qr.push(taske);

var taske = {
    1: 5,
    2: 7,
    onFinish: callback
}
qr.push(taske);
