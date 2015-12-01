angular.module('todoController', ['todoService'])
    .controller('mainController',function($scope,Todos) {
        $scope.formData = {};
        $scope.todos = {};
         Todos.get()
            .success(function(data) {
                $scope.todos = data;
            });

        // when submitting the add form, send the text to the node API
        $scope.createToDo = function() {
            console.log("create");
            if (!$.isEmptyObject($scope.formData)) {
                 Todos.create($scope.formData)
                    .success(function(data) {
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.todos = data; // assign our new list of todos
                    });
                }
            };
        // delete a todo after checking it
        $scope.deleteToDo = function(id) {
            Todos.delete(id)
                // if successful creation, call our get function to get all the new todos
                .success(function(data) {
                    $scope.todos = data; // assign our new list of todos
                });
        };
    });