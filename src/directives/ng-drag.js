angular.module('angular-drag-drop')
.directive('ngDrag', function (DragData, $timeout) {
  'use strict';

  /**
   * @ngdoc directive
   * @name angular-drag-drop.directive:ngDrag
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
   * @example
   * <example module="test">
   *   <file name="example.js">
   *     angular.module('test', ['angular-drag-drop'])
   *     .controller('ExController', function($scope) {
   *       $scope.tests = ['green', 'yellow', 'red'];
   *       $scope.alert = function(msg) {
   *         alert(msg);
   *       };
   *     });
   *   </file>
   *   <file name="example.html">
   *     <style>
   *       .parent div {
   *         height: 3em;
   *         background-color: rgba(0, 0, 0, 0.1);
   *         margin: 1em;
   *       }
   *     </style>
   *     <div class="parent" ng-controller="ExController">
   *       <div ng-repeat="data in tests" style="background-color: {{data}};" ng-drag>
   *         {{data}} (Drag Me)
   *       </div>
   *       <div ng-drop="dropped = $from.data" style="background-color: {{dropped}};">
   *         {{dropped}} (Drop{{dropped && 'ped'}} here)
   *       </div>
   *     </div>
   *   </file>
   * </example>
   * <example module="test2">
   * <file name="example2.js">
   *   angular.module('test2', ['angular-drag-drop'])
   *     .controller('test', function($scope) {
   *       $scope.data = [{
   *         color: 'red',
   *         numbers: [1, 2, 3]
   *       },{
   *         color: 'green',
   *         numbers: [4, 5, 6]
   *       },{
   *         color: 'blue',
   *         numbers: [7, 8, 9]
   *       }]
   *     });
   * </file>
   * <file name="example2.html">
   *   <style>
   *     .target {
   *       background-color: #ddd;
   *       height: 2em;
   *       min-width: 8em;
   *     }
   *
   *
   *     .num {
   *       display: inline-block;
   *       background-color: rgba(0, 0, 0, 0.1);
   *       padding: 1em;
   *       text-align: center;
   *       color: white;
   *       margin: 1em;
   *     }
   *
   *     .target.num { color: black; }
   *   </style>
   *   <p>Notice you can only drag between like colors.</p>
   *   <div ng-controller="test">
   *     <div ng-repeat="color in data" style="background-color: {{color.color}};">
   *       <div class="num" ng-repeat="number in color.numbers" ng-drag="color/{{color.color}}">
   *         {{number}}
   *       </div>
   *       <div class="target num" ng-drop="current = $from.number" allow-drop="color/{{color.color}}">
   *         {{current || 'Drag ' + color.color + ' Here'}}
   *       </div>
   *     </div>
   *   </div>
   * </file>
   * </example>
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
