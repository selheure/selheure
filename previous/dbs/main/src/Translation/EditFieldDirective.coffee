angular.module('translation').
directive('editField', ($timeout)->
  return {
    restrict: 'E'
    scope:
      ngModel: '='
      type:    '@'
      lang:    '='
      save:    '&'
      rev:     '='
    template: """
              <span ng-hide="edit" ng-click="edit=true" type="text">{{ ngModel }}</span>

              <input ng-show="type=='input' && edit" type="text" ng-model="value" style="width:80%" ng-disabled="loading" ng-keypress="keypress($event)" focus="edit" ng-blur="blur()"/>

              <textarea ng-show="type=='textarea' && edit" ng-model="value" ng-disabled="loading" ng-blur="blur()" ng-keypress="keypress($event)" focus="edit" ></textarea>

              <span ng-show="loading" us-spinner="{width:2,length:6,radius:5}"></span>

              <span ng-show="edit && !loading">
                <button ng-click="goSave()" class="btn btn-default glyphicon glyphicon-ok"     style="color:green;"></button>
                <button ng-click="cancel()" class="btn btn-default glyphicon glyphicon-remove" style="color:red;  "></button>'
              </span>
              """

    link: (scope, element, attrs) ->
      scope.change = false
      scope.edit   = false
      scope._rev   = null

      scope.$on('EditFieldTranslationOn', ->
        scope.translation = true
        scope.ngModel     = ''
      )
      scope.$watch('lang', ->
        scope.value       = angular.copy(scope.ngModel)
        scope.translation = false
      )

      scope.$watch('edit', (value)->
        if value
          scope._rev = scope.rev
        else
          scope._rev = null
      )
      scope.blur = ->
        $timeout( ->
          scope.edit = false
        , 300)

      scope.keypress = ($event) ->
        if $event.keyCode == 13 && scope.type == 'input'
          scope.goSave()
        else if $event.keyCode == 13 && $event.ctrlKey
          scope.goSave()
        else if $event.keyCode == 10 && $event.ctrlKey # For ctrl+enter for Chrome
          scope.goSave()
        else if $event.keyCode == 27
          scope.edit = false
        else
          scope.change = true

      scope.goSave = ->
        if scope.change == false
          return scope.cancel()

        scope.loading = true

        scope.save({
          value: scope.value
          rev:   scope._rev
        }).then(
          (data) -> #Success
            scope.loading     = false
            scope.translation = false
            scope.edit        = false
            scope.ngModel     = angular.copy(scope.value)
          ,(err) -> #Error
            scope.loading = false
        )

      scope.cancel = ->
        scope.value   = scope.ngModel
        scope.edit    = false
        scope.change  = false
  }
)
