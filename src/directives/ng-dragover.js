angular.module('angular-drag-drop')
.directive('ngDragenter', function ($timeout) {
  'use strict';

  /**
   * @ngdoc directive
   * @name angular-drag-drop.directive:ngDragenter
   * @param {Expression} ngDragenter An expression to be executed on dragenter
   * @description Evaluates some expression on dragenter
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
   * @name angular-drag-drop.directive:ngDragleave
   * @param {Expression} ngDragleave An expression to be executed on dragleave
   * @description Evaluates some expression on the dragleave event
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
