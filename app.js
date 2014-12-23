var app = angular.module('vdVast', []);

app.controller("mainCtrl", ['$scope', function($scope) {
  $scope.params = [{
    id: 'vid1',
    poster: 'http://video-js.zencoder.com/oceans-clip.png',
    datasetup: '{}',
    width: '640',
    height: '400'
  }];
  $scope.source = [{
    src: 'http://video-js.zencoder.com/oceans-clip.mp4',
    type: 'video/mp4'
  }, {
    src: 'http://video-js.zencoder.com/oceans-clip.webm',
    type: 'video/webm'
  }, {
    src: 'http://video-js.zencoder.com/oceans-clip.ogv',
    type: 'video/ogg4'
  }];
  $scope.videovast = [{
    url: 'http://videoads.theonion.com/vast/270.xml'
  }];
}]);

app.directive('videojs', function () {
  var linker = function (scope, element, attrs){
    var setup = {
        'techOrder': ['html5', 'flash'],
        'controls': true,
        'preload': 'auto',
        'autoplay': false,
        'height': scope.params[0].height,
        'width': scope.params[0].width
    };
    attrs.id = scope.params[0].id;
    element.attr('id', attrs.id);
    element.attr('poster', scope.params[0].poster);
    var player = videojs(attrs.id, setup, function(){
        this.src({type: scope.source[0].type, src: scope.source[0].src });
    });
    
    player.ads();
    player.vast({url: scope.videovast[0].url});

    scope.$on('$destroy', function () {
      player.dispose();
    });
  } return {
    restrict : 'A',
    link : linker
  };
});