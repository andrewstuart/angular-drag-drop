angular.module('ngDrag')
.directive('ngDragenter', function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name ngDrag.directive:ngDragenter
   * @description A directive that will execute some function on dragenter
   * @param {Expression} ngDragenter An expression to be executed on dragenter.
   * @restrict A
   */
  return {
    restrict: 'A',
    link: function postLink($scope, iEle, iAttrs) {
      iEle.on('dragenter', function(e) {
        $scope.$eval(iAttrs.ngDragenter, {$event: e});
      });
    }
  };
})
.directive('ngDragleave', function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name ngDrag.directive:ngDragenter
   * @description A directive that will execute some function on dragenter
   * @param {Expression} ngDragenter An expression to be executed on dragenter.
   * @restrict A
   */
  return {
    restrict: 'A',
    link: function postLink($scope, iEle, iAttrs) {
      iEle.on('dragleave', function(e) {
        $scope.$eval(iAttrs.ngDragleave, {$event: e});
      });
    }
  };
});
