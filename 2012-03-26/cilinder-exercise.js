function cilinder(r,h,d) {
  var domain = DOMAIN([[0,2*Math.PI],[0,h]])([d,d]);
  
  var mapping = function (p) {
  var u = p[0];
  var v = p[1];

  return [r*COS(u),r*SIN(u),v];
  };

  return MAP(mapping)(domain);
}
var c = cilinder(2,10,50);
DRAW(c);
