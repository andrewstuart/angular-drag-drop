angular.module('ngDrag')
.directive('ngDragenter', function ($timeout) {
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
        $timeout(function() {
          $scope.$eval(iAttrs.ngDragenter, {$event: e});
        });
      });
    }
  };
})
.directive('ngDragleave', function ($timeout) {
  'use strict';

  /**
   * @ngdoc directive
   * @name ngDrag.directive:ngDragleave
   * @description A directive that will execute the provided expression on dragleave
   * @param {Expression} ngDragleave An expression to be executed on dragenter.
   * @restrict A
   */
  return {
    restrict: 'A',
    link: function postLink($scope, iEle, iAttrs) {
      iEle.on('dragleave', function(e) {
        //Prevent event from bubbling past the target.
        if ( e.target === iEle[0] ) {
          e.stopPropagation();
        }

        $timeout(function() {
          $scope.$eval(iAttrs.ngDragleave, {$event: e});
        });
      });
    }
  };
});
