### Classes

#### basis

```bash
class Polygon{
    constructor(height,width){
        this.height = height;
        this.width = width;
    }
    get area(){
        return this.calcArea();
    }
    calcArea(){
        return this.height*this.width;
    }
}

const square = new Polygon(10,10);
console.log(square.area)
// 100
```

#### class's static

```bash 
class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    static distance(pointa,pointb){
        const dx = pointa.x - pointb.x;
        const dy = pointa.y - pointb.y;
        return Math.sqrt(dx*dx+dy*dy);
    }
}

var point1 = new Point(5,5);
var point2 = new Point(10,10);

console.log(Point.distance(point1,point2))
//7.0710678118654755
```