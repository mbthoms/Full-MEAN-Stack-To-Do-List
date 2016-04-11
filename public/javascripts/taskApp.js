/**
 * custom Angular file for managing tasks
 */
    // create the module
var app = angular.module('TaskApp', []);

// create the factory or service to talk to the server route
app.factory('tasks', ['$http', function($http) {
    // set up empty task list
    var o = {
        tasks: []
    };

    // get tasks from server
    o.getTasks = function() {
        console.log('factory getTasks');
      return $http.get('/tasks').success(function(data) {
          angular.copy(data,  o.tasks);
      });
    };

    // add new task
    o.addTask = function(task) {
        /*return $http.post('/tasks', task).success(function(data) {
            o.tasks.push(data);
        });*/
        return $http.post('/tasks', task).success(function() {
            o.tasks.push(task);
        });
    };

    // delete task
    o.deleteTask = function(task) {
        return $http.delete('/tasks/' + task.id, {id: task.id}).success(function() {

            /*var index = o.tasks.indexOf(task.id);
            o.tasks.splice(index, 1);

            o.getTasks();*/
        });
    };

    return o;
}]);

// create the controller to talk to the html
app.controller('TaskController', ['$scope', 'tasks', function($scope, tasks) {

    // set the scope tasks equal to the factory tasks
    $scope.tasks = tasks.tasks;

    // getTasks
    $scope.getTasks = function() {
        console.log('controller getTasks');
        tasks.getTasks().then(function(response) {
            $scope.tasks = response.data;
        });
    };

    // add a new task
    $scope.addTask = function(task) {
      // check for blank title
        if ($scope.title === "") { return; }

        // call add in our factory to add to the db
        tasks.addTask({
            title: $scope.title
        });

        // refresh the data on the page
        $scope.title = "";
        $scope.getTasks();
    };

    // delete a task
    $scope.deleteTask = function(id) {
        if (window.confirm("Are you sure you want to delete this task?")) {
            tasks.deleteTask({
                id: id
            });

            $scope.getTasks();
        }
    };
}]);
