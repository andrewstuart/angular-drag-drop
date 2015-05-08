angular.module('ngDrag').directive('ngDrag', function (DragData) {
    return {
        restrict: 'A',
        link: function postLink(scope, element, iAttrs) {
            element.attr('draggable', 'true');

            element.on('dragstart', function(e) {
                e.stopPropagation();
                e.originalEvent.dataTransfer.setData('ngdrag/type', iAttrs.ngDrag || 'ngdrag/id');
                e.originalEvent.dataTransfer.setData(iAttrs.ngDrag || 'ngdrag/id', scope.$id);
                DragData.add(scope);
            });
        }
    };
});
