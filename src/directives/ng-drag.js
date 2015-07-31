angular.module('ngDrag')
.directive('ngDrag', function (DragData, $timeout) {
  'use strict';

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
   * @param {Expression} ngDragstart An expression that will be executed on
   * dragstart. Event available as `$event`.
   * @param {Expression} ngDragend An expression that will be evaluated on
   * dragend. Event available as `$event`.
   * @restrict A
   */
  return {
    restrict: 'A',
    link: function postLink($scope, element, iAttrs) {
      element.attr('draggable', 'true');

      if (iAttrs.ngDragend) {
        element.on('dragend', function(e) {
          $timeout(function() {
            $scope.$eval(iAttrs.ngDragend, {$event: e});
          });
        });
      }

      element.on('dragstart', function(e) {

        var event = e.originalEvent || e;

        //Only add data if not already added (would be less specific)
        if ( !event.dataTransfer.getData('ngdrag/type') ) {
          event.dataTransfer.setData('ngdrag/type', iAttrs.ngDrag || 'ngdrag/id');
          event.dataTransfer.setData(iAttrs.ngDrag || 'ngdrag/id', $scope.$id);
        }
        DragData.add($scope);

        if (iAttrs.ngDragstart) {
          //$timeout is necessary here to get around chrome bug where DOM
          //manipulation on dragstart cancels the drag.
          $timeout(function() {
            $scope.$eval(iAttrs.ngDragstart, {$event: e});
          });
        }
      });
    }
  };
});
