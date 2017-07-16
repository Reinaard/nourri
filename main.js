/*
 * Main javascript file.
 */
var app = angular.module('Nourri', ["firebase"]);

app.controller('nourriController', function($scope, $firebaseArray) {

    $scope.date_today = new Date;

    $scope.meal_view_date = $scope.date_today;

    $scope.setFilterDate = function(daysAmount){
        $scope.meal_view_date.setDate($scope.meal_view_date.getDate() - daysAmount);
    }

    var ref = firebase.database().ref();

    $scope.meals = $firebaseArray(ref.child("amount"));

    $scope.baby_weight = $firebaseArray(ref.child("weight"));

    // Get total amount of feedings equal to input type
    $scope.getTotalMeals = function(type_input){
        var total = 0;
        for(var i = 0; i < $scope.meals.length; i++){
            if(type_input == $scope.meals[i].type){
                total += $scope.meals[i].amount;
            }
        }
        return total;
    }

    $scope.getFeedDate = function(date_string){
        var d = new Date(date_string);
        return d;
    }

    $scope.showOneDay = function(input) {
        var input_date = $scope.getFeedDate(input.date)
        var view_date = new Date($scope.meal_view_date);
        return view_date.setHours(0,0,0,0) == input_date.setHours(0,0,0,0)
    }
});
