angular.module('ngDrag').directive('ngDrop', function(DragData) {

    /**
     * @ngdoc directive
     * @name uni.directive:ngDrop
     * @param ngDrop The expression to evaluate upon drop. If dropped element came from ngDrag, the ngDrag $scope is
     * available as $from.
     * @description Allows an expression to be evaluated upon drop. Event available as $event.
     * @restrict A
     */
    return {
        restrict: 'A',
        link: function postLink($scope, element, iAttrs) {

            element.on('dragover', function(e) { e.preventDefault(); });

            element.on('dragenter', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var type = e.originalEvent.dataTransfer.getData('ngdrag/type');
                if(type === iAttrs.allowDrop) {
                    event.dataTransfer.dropEffect = 'move';
                } else {
                    event.dataTransfer.dropEffect = 'none';
                }
            });

            element.on('drop', function(e) {
                e.preventDefault();

                var id = e.originalEvent.dataTransfer.getData(iAttrs.allowDrop || 'ngdrag/id');
                if(!id) { return; }
                var from = DragData.get(id);

                $scope.$apply(function() {
                    $scope.$eval(iAttrs.ngDrop, {
                        $from: from,
                        $event: e
                    });
                });
            });
        }
    };
});
