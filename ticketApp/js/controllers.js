angular.module('ticketApp.controllers',[]).controller('TicketListController',function($scope,$state,popupService,$window,Ticket){

    $scope.tickets=Ticket.query();

    $scope.deleteTicket=function(ticket){
        if(popupService.showPopup('Really delete this?')){
            ticket.$delete(function(){
                $window.location.href='ticketApp/index.html';
            });
        }
    }

}).controller('TicketViewController',function($scope,$stateParams,Ticket){

    $scope.ticket=Ticket.get({id:$stateParams.id});

}).controller('TicketCreateController',function($scope,$state,$stateParams,Ticket){

    $scope.ticket=new Ticket();

    $scope.addTicket=function(){
        $scope.ticket.$save(function(){
            $state.go('tickets');
        });
    }

}).controller('TicketEditController',function($scope,$state,$stateParams,Ticket){

    $scope.updateTicket=function(){
        $scope.ticket.$update(function(){
            $state.go('tickets');
        });
    };

    $scope.loadTicket=function(){
        $scope.ticket=Ticket.get({id:$stateParams.id});
    };

    $scope.loadTicket();
});