angular.module('ngDrag').service('DragData', function () {
    /**
     * @ngdoc service
     * @name uni.service:DragData
     * @description
     * # dragger service in the sabApp.  */
        var index = {};

    this.add = function(scope) {
        if(scope.$id) {
            index[scope.$id] = scope;
        }
    };

    this.get = function(id) {
        if(index[id]) {
            return index[id];
        }
    };
});
