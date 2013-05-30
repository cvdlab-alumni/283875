!(function (exports){

  var fs = require('fs');

  var plasm_lib = require('plasm.js');
  var obj = plasm_lib.plasm;
  var fun = plasm_lib.plasm_fun;
  var plasm = obj.plasm;
  var Plasm = obj.Plasm;

  var root = this;

  Object.keys(fun).forEach(function (k) { 
    root[k] = fun[k];
  });

  var p = new Plasm();
  fun.PLASM(p);


  var scmodel = (function () {
    // Marble color
    var marble_color = [ 1.5, 1.5, 1.5 ];

    // Windows color
    var windows_color = [ 0.3, 0.5, 0.8, 0.8 ];

    // Stand color
    var stand_color = [ 0.5, 1, 0.5, 1 ];

    // Automatic knots generation for 2nd order NUBS
    function knots(pp) {
      var i;
      var max = 2 + 1 + pp.length - 3 - 3;
      var kkknots = [ 0, 0, 0 ];
      for (i = 1; i <= max; i++) {
        kkknots.push(i);
      };
      return kkknots.concat([ max + 1, max + 1, max + 1 ]);
    };

    // Elementary cell of the palace
    function arc() {
      var pp1 = [
        [ 0, 0 ], [ 5, 0 ], [ 5, 0 ],
        [ 5, 8 ], [ 5, 8 ], [ 0, 8 ],
        [ 0, 8 ], [ 0, 0 ]
      ];
      var c1 = NUBS(S0)(2)(knots(pp1))(pp1);
      var pp2 = [
        [ 0.5, 0.5 ], [ 4.5, 0.5 ], [ 4.5, 0.5 ],
        [ 4.5, 4 ], [ 4.5, 4 ], [ 4.5, 7.5 ],
        [ 0.5, 7.5 ], [ 0.5, 4 ], [ 0.5, 4 ],
        [ 0.5, 0.5 ]
      ];
      var c2 = NUBS(S0)(2)(knots(pp2))(pp2);
      var surface_mapping = BEZIER(S1)([ c1, c2 ])
      var d2d = PROD1x1([ INTERVALS(1)(32), INTERVALS(1)(1) ]);
      var surface = MAP(surface_mapping)(d2d);
      return PROD2x1([ surface, INTERVALS(2)(1) ]);
    };

    // Row of 9 arcs
    function arcs_row() {
      var aaarc = arc();
      var t = T([0])([5]);
      return STRUCT( REPLICA(9)([ aaarc, t ]) );
    };

    // Facade of the palace (6 arc rows)
    function facade() {
      var row = arcs_row();
      var t = T([1])([8]);
      var arcs = STRUCT( REPLICA(6)([ row, t ]) );
      var top = CUBOID([ 5 * 9, 8, 2 ]);
      return STRUCT([ arcs, T([1])([ 8 * 6 ])(top) ]);
    };

    // Facades (4 facade instances)
    function facades() {
      var f = facade();
      var f1 = T([0])([2])(f);
      var f2 = T([2])([ - (2 + 5 * 9) ])(f1);
      var f3 = R([0,2])(PI/2)(f);
      var f4 = T([0])([ 2 + 5 * 9 ])(f3);
      return STRUCT([ f1, f2, f3, f4 ]);
    };

    // Pillars
    function pillars() {
      return SIMPLEX_GRID([
        [ 2, - 5 * 9, 2 ], [ 8 * 7 ], [ 2, - 5 * 9, 2 ]
      ]);
    };

    // Outside of the palace (facades + pillars)
    function outside() {
      var fffacades = facades();
      var pppillars = T([2])([ - ( 2 + 5 * 9 ) ])(pillars());
      oooutside = STRUCT([ fffacades, pppillars ]);
      return COLOR(marble_color)(oooutside);
    };

    // Windows (transparent cube)
    function windows() {
      var face = CUBOID([ 5 * 7, 8 * 6 ]);
      var f1 = face;
      var f2 = R([0,2])(PI/2)(face);
      var f3 = T([2])([ - 5 * 7 ])(face);
      var f4 = T([0])([ 5 * 7 ])(f2);
      return COLOR(windows_color)(STRUCT([ f1, f2, f3, f4 ]));
    };

    // Floors
    function floors() {
      var floor = CUBOID([ 5 * 9, 0.5, 2 + 5 * 9 ]);
      var ffflooors = STRUCT( REPLICA(7)([ floor, T([1])([8]) ]) );
      return COLOR(marble_color)( ffflooors );
    };

    // Inside of the palace (windows + floors)
    function inside() {
      return STRUCT([ windows(), T([ 0, 2 ])([ - 5, - 5 * 8 ])( floors() ) ]);
    };

    // Roof
    function roof() {
      return COLOR(marble_color)( CUBOID([ 2 + 5 * 9 + 1 + 2, 0.5, 2 + 5 * 9 + 1 + 2 ]) );
    };

    // The whole palace
    function palace() {
      return STRUCT([
        outside(),
        T([ 0, 2 ])([ 2 + 5, - 5 ])( inside() ),
        T([ 0, 1, 2 ])([ - 0.5, 8 * 7, - ( 5 * 9 + 2 + 1 - 0.5 ) ])( roof() )
      ]);
    };

    // Stairs
    function stairs() {
      var i;
      var ssstairs = [];
      for (i = 0; i < 20; i++) {
        var stair = CUBOID([ 69, 0.5, 129 - 60 * i / 20 ]);
        ssstairs.push( T([ 1, 2 ])([ 0.5 * i, 60 * i / 20 / 2 ])(stair) );
      };
      return COLOR(marble_color)( STRUCT( ssstairs ) );
    };

    // Sides
    function sides() {
      var side = CUBOID([ 2.5, 10 + 2, 129 ]);
      var sssides = STRUCT([ side, T([0])([ 2.5 + 69 ])(side) ]);
      return COLOR(marble_color)( sssides );
    };

    // The final output
    function output() {
      return STRUCT([
        palace(),
        T([ 0, 1, 2 ])([ - 10, - 10, - 129 + 1 + 40 ])( stairs() ),
        T([ 0, 1, 2 ])([ - 2.5 - 10, - 10, - 129 + 1 + 40 ])( sides() )
      ]);
    };

    var model = output();

    return model;
  })();

  exports.author = 'marcoliceti';
  exports.category = 'buildings';
  exports.scmodel = scmodel;

  if (!module.parent) {
    fs.writeFile('./data.json', JSON.stringify(scmodel.toJSON()));
  }

}(this));