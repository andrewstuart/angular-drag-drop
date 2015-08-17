angular.module('ngDrag').service('DragData', function () {

  /**
   * @ngdoc service
   * @name ngDrag.service:DragData
   * @description `DragData` is a service that holds references to $scopes for
   * the drag directives. The source will be exposed for the ng-drop expression.
   */

        var index = {};

        /**
         * @ngdoc
         * @methodOf ngDrag.service:DragData
         * @name ngDrag.service:DragData#add
         * @param {Scope} scope The scope to track
         * @description `add` adds a scope to the service to be tracked by its
         * $id.
         */

    this.add = function(scope) {
        if(scope.$id) {
            index[scope.$id] = scope;

            //Cleanup
            scope.$on('$destroy', function() {
              delete index[scope.$id];
            });
        }
    };

    /**
     * @ngdoc
     * @methodOf ngDrag.service:DragData
     * @name ngDrag.service:DragData#get
     * @param {String} id The $id of the scope that you want returned.
     * @description `get` returns the scope with the given $id.
     */

    this.get = function(id) {
        if(index[id]) {
            return index[id];
        }
    };
});
