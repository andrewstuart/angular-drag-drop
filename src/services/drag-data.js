angular.module('ngDrag').service('DragData', function () {
    /**
     * @ngdoc service
     * @name uni.service:DragData
     * @description
     * The DragData service is a simple service for holding references to a
     * scope by its id and cleaning up at the right time. It is used by ngDrag
     * to get reference to the right scope on the drop event.
     */
        var index = {};

    this.add = function(scope) {
        if(scope.$id) {
            index[scope.$id] = scope;

            //Cleanup
            scope.$on('$destroy', function() {
              delete index[scope.$id];
            });
        }
    };

    this.get = function(id) {
        if(index[id]) {
            return index[id];
        }
    };
});
