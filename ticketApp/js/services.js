angular.module('ticketApp.services',[]).factory('Ticket',function($resource){
    return $resource('http://localhost:1337/api/tickets/:id',{id:'@_id'},{
        update: {
            method: 'PUT'
        }
    });
}).service('popupService',function($window){
    this.showPopup=function(message){
        return $window.confirm(message);
    }
});