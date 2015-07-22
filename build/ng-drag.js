/*! The MIT License (MIT)

Copyright (c) 2015 Andrew Stuart

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

angular.module('ngDrag', []);

angular.module('ngDrag').directive('ngDrag', ["DragData", function (DragData) {
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
        element.on('dragend', function(e) {
          $scope.$apply(function() {
            $scope.$eval(iAttrs.dragEnd, {$event: e});
          });
        });
      }

      element.on('dragstart', function(e) {
        //Only add data if not already added (would be less specific)
        if ( !e.originalEvent.dataTransfer.getData('ngdrag/type') ) {
          e.originalEvent.dataTransfer.setData('ngdrag/type', iAttrs.ngDrag || 'ngdrag/id');
          e.originalEvent.dataTransfer.setData(iAttrs.ngDrag || 'ngdrag/id', $scope.$id);
        }
        DragData.add($scope);

        if (iAttrs.dragStart) {
          $scope.$apply(function() {
            $scope.$eval(iAttrs.dragStart, {$event: e});
          });
        }
      });
    }
  };
}]);

angular.module('ngDrag').directive('ngDrop', ["DragData", function(DragData) {

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
        e.preventDefault();
        if (iAttrs.dragOver) {
          $scope.$apply(function() {
            $scope.$eval(iAttrs.dragOver, {$event: e});
          });
        }
      });

      element.on('dragenter', function(e) {
        e.preventDefault();
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
}]);

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
