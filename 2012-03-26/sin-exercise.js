var domain = DOMAIN([[0,2*Math.PI]])([10]);
var mapping = function (p) {
  var u = p[0];

  return [u,SIN(u)];
};
var mapped = MAP(mapping)(domain);
DRAW(mapped);