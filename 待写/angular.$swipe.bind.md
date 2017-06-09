### angular.$swipe.bind
```bash 
<p>{{slide}}</p>
var startX, startY;
        scope.slide={};

        $swipe.bind(ele, {
            'start': function(coords) {
                startX = coords.x;
                startY = coords.y;
                scope.slide.coordIniX = startX;
                scope.slide.coordIniY = startY;
                scope.slide.coordActX = 0;
                scope.slide.coordActY = 0;
                scope.slide.coordFinX = 0;
                scope.slide.coordFinY = 0;
                scope.slide.coordCancX = 0;
                scope.slide.coordCancY = 0;
                scope.$apply();
            },
            'move': function(coords) {
                scope.slide.coordActX = coords.x;
                scope.slide.coordActY = coords.y;
                if (Math.abs(coords.x - startX) < 100)
                    scope.slide.deltaX = coords.x - startX;

                scope.$apply();
                // ...
            },
            'end': function(coords) {
                scope.slide.coordFinX = coords.x;
                scope.slide.coordFinY = coords.y;
                scope.slide.deltaX = 0;
                scope.slide.mov = true;
                scope.$apply();
                // ...
            },
            'cancel': function(coords) {
                scope.slide.coordCancX = coords.x;
                scope.slide.coordCancY = coords.y;
                scope.slide.deltaX = 0;
                scope.slide.mov = true;
                scope.$apply();
                // ...
            }
        });
```