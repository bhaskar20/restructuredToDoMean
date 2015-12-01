angular.module('todoController', [])
    .controller('mainController', function($scope, $http,Todos) {
        $scope.formData = {};

         Todos.get()
            .success(function(data) {
                $scope.todos = data;
            });

        // when submitting the add form, send the text to the node API
        $scope.createTodo = function() {
            if (!$.isEmptyObject($scope.formData)) {
                 Todos.create($scope.formData)
                    .success(function(data) {
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.todos = data; // assign our new list of todos
                    });
                }
            };
        // delete a todo after checking it
        $scope.deleteTodo = function(id) {
            Todos.delete(id)
                // if successful creation, call our get function to get all the new todos
                .success(function(data) {
                    $scope.todos = data; // assign our new list of todos
                });
        };
    });

    });