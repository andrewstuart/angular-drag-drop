angular.module('ngDrag').directive('ngDrop', function(DragData) {

  /**
   * @ngdoc directive
   * @name uni.directive:ngDrop
   * @param {Expression} ngDrop The expression to evaluate upon drop. If dropped element came from ngDrag, the ngDrag $scope is
   * available as $from.
   * @param {Expression} dragOver An expression to evaluate on dragover.
   * @param {String} allowDrop A string that identifies the type of data that
   * will trigger the ngDrop handler. Used in conjuction with `ng-drag="..."`,
   * this is helpful for limiting what can be dropped on a particular target.
   * @description Allows an expression to be evaluated upon drop. Event
   * available as $event.
   * @restrict A
   */
  return {
    restrict: 'A',
    link: function postLink($scope, element, iAttrs) {

      element.on('dragover', function(e) {
        if (iAttrs.dragOver) {
          $scope.$apply(function() {
            $scope.$eval(iAttrs.dragOver, {$event: e});
          });
        }
      });

      element.on('dragenter', function(e) {
        var type = e.originalEvent.dataTransfer.getData('ngdrag/type');
        if(type === iAttrs.allowDrop) {
          event.dataTransfer.dropEffect = 'move';
        } else {
          event.dataTransfer.dropEffect = 'none';
        }
      });

      element.on('drop', function(e) {
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
