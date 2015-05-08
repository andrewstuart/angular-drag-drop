angular.module('ngDrag').directive('ngDrag', function (DragData) {
  /**
   * @ngdoc directive
   * @name ngDrag.directive:ngDrag
   * @description A directive that allows an item to be dragged and its $scope
   * tracked and provided to the drop target upon drop.
   * @param {String} ngDrag Either emtpy or a string that can be used to
   * identify the type of data that is being transferred. This is most useful
   * for limiting where an item can be dropped. For example, say you show
   * multiple items each with multiple steps, and you want to limit dragging
   * steps to the same item.
   *
   * ```html
   * <div class="item" ng-drag="item/{{item.id}}">...</div>
   * ```
   *
   * @param {Expression} dragStart An expression that will be executed on
   * dragstart. Event available as `$event`.
   * @param {Expression} dragEnd An expression that will be evaluated on
   * dragend. Event available as `$event`.
   * @restrict A
   */
  return {
    restrict: 'A',
    link: function postLink($scope, element, iAttrs) {
      element.attr('draggable', 'true');

      if (iAttrs.dragEnd) {
        iEle.on('dragend', function(e) {
          $scope.$eval(iAttrs.dragStart, {$event: e});
          $scope.$apply();
        });
      }

      element.on('dragstart', function(e) {
        e.stopPropagation();
        e.originalEvent.dataTransfer.setData('ngdrag/type', iAttrs.ngDrag || 'ngdrag/id');
        e.originalEvent.dataTransfer.setData(iAttrs.ngDrag || 'ngdrag/id', $scope.$id);
        DragData.add($scope);

        if (iAttrs.dragStart) {
          $scope.$eval(iAttrs.dragStart, {$event: e});
          $scope.$apply();
        }
      });
    }
  };
});
