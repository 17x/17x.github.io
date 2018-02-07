const getRotateByMatrix = str => {
  
    str =str.split('(')[1].split(')')[0].split(',');
  console.log(str);
    let a = str[0],
        b = str[1],
        c = str[2],
        d = str[3],
        scale = Math.sqrt(a*a + b*b),
        sin = b/scale,
        angle = Math.round(Math.atan2(b, a) * (180/Math.PI));

    return angle
}