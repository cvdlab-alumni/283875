var PARAMS = {
	"MAX_LATITUDE":      20,
	"MAX_LONGITUDE":     20,
	"MAX_ALTITUDE":      3,
	"NUMBER_OF_STREETS": 30
};

function terrain( PARAMS ) {
	var MAX_LATITUDE = PARAMS[ "MAX_LATITUDE" ];
	var MAX_LONGITUDE = PARAMS[ "MAX_LONGITUDE" ];
	var MAX_ALTITUDE = PARAMS[ "MAX_ALTITUDE" ];

	function vertices() {
		var vertices = [];
		var x, y, z;
		var v;
		var i, j;
		for ( i = 0; i <= MAX_LONGITUDE; i++ ) {
			for ( j = 0; j <= MAX_LATITUDE; j++ ) {
				x = i;
				y = j;
				z = SIN( i / MAX_LONGITUDE * 5 * PI ) * MAX_ALTITUDE * Math.random();
				v = [ x, y, z ];
				vertices.push(v);
			};
		};
		return vertices;
	};

	function faces() {
		var faces = [];
		var a, b, c, d;
		var i, j;
		for ( i = 0; i < MAX_LONGITUDE; i++ ) {
			for ( j = i * MAX_ALTITUDE; j < ( i + 1 ) * MAX_LATITUDE; j++ ) {
				a = j;
				b = j + MAX_LATITUDE + 1;
				c = a + 1;
				d = b + 1;
				faces.push( [ a, b, d ] );
				faces.push( [ a, d, c ] );
			};
		};
		return faces;
	};

	var output = {};

	output.vertices = vertices();
	output.faces = faces();

	output.getModel = function () {
		return COLOR( [ 0.5, 0.25, 0.1 ] )( SIMPLICIAL_COMPLEX( this.vertices )( this.faces ) );
	};

	return output;
};

function lake( PARAMS ) {
	var MAX_LATITUDE = PARAMS[ "MAX_LATITUDE" ];
	var MAX_LONGITUDE = PARAMS[ "MAX_LONGITUDE" ];
	var MAX_ALTITUDE = PARAMS[ "MAX_ALTITUDE" ];

	function vertices() {
		var p1 = [ 0,             0,            0              ];
		var p2 = [ MAX_LONGITUDE, 0,            0              ];
		var p3 = [ MAX_LONGITUDE, MAX_LATITUDE, 0              ];
		var p4 = [ 0,             MAX_LATITUDE, 0              ];
		var p5 = [ 0,             0,            - MAX_ALTITUDE ];
		var p6 = [ MAX_LONGITUDE, 0,            - MAX_ALTITUDE ];
		var p7 = [ MAX_LONGITUDE, MAX_LATITUDE, - MAX_ALTITUDE ];
		var p8 = [ 0,             MAX_LATITUDE, - MAX_ALTITUDE ];
		return [ p1, p2, p3, p4, p5, p6, p7, p8 ];
	};

	function faces() {
		var f1 = [ 0, 1, 2, 3 ];
		var f2 = [ 4, 5, 6, 7 ];
		var f3 = [ 0, 3, 7, 4 ];
		var f4 = [ 1, 2, 6, 5 ];
		var f5 = [ 0, 1, 5, 4 ];
		var f6 = [ 3, 2, 6, 7 ]
		return [ f1, f2, f3, f4, f5, f6 ];
	};

	var output = {};

	output.vertices = vertices();
	output.faces = faces();

	output.getModel = function () {
		var s1 = COLOR( [ 0.5, 1, 0.8, 0.7 ] )( SIMPLICIAL_COMPLEX( this.vertices.slice( 0, 4 ) )( this.faces.slice( 0, 1 ) ) );
		var s2 = COLOR( [ 0.5, 0.25, 0.1 ] )( SIMPLICIAL_COMPLEX( this.vertices )( this.faces.slice( 1 ) ) );
		return STRUCT([ s1, s2 ]);
	};

	return output;
};

function trees( PARAMS, places_to_put ) {
	var width = PARAMS[ "MAX_ALTITUDE" ] / 20;

	function tree() {
		function vertices() {
			return [
				[ - width / 4, 0, 0 ],
				[ width / 4, 0, 0 ],
				[ width / 4, 0, width / 2 ],
				[ width / 2, 0, width / 2 ],
				[ 0, 0, width ],
				[ - width / 2, 0, width / 2 ],
				[ - width / 4, 0, width / 2 ]
			];
		};

		function faces() {
			return [ [ 0, 1, 2 ], [ 0, 2, 6 ], [ 6, 3, 4 ], [ 5, 6, 4 ] ];
		};

		var out = {};
		out.vertices = vertices();
		out.faces = faces();
		out.getModel = function () {
			var s1 = COLOR( [ 0.6, 0.35, 0.2 ] )( SIMPLICIAL_COMPLEX( this.vertices )( this.faces.slice( 0, 2 ) ) );
			var s2 = COLOR( [ 0, 1, 0 ] )( SIMPLICIAL_COMPLEX( this.vertices )( this.faces.slice( 2 ) ) );
			return STRUCT([ s1, s2 ]);
		};
		return out;
	};

	function translate_tree( a_tree, place ) {
		a_tree.vertices = a_tree.vertices.map( function (p) {
			return [ p[0] + place[0], p[1] + place[1], p[2] + place[2] ];
		} );
		return a_tree;
	};

	function model() {
		var a_lot_of_trees = [];
		var i, place, z;
		for ( i = 0; i < places_to_put.length; i++ ) {
			place = places_to_put[i];
			z = place[2];
			if ( z > width ) {
				a_lot_of_trees.push( translate_tree( tree(), place ) );
			};
		};

		var out = {};
		out.trees = a_lot_of_trees;
		out.getModel = function () {
			return STRUCT( this.trees.map( function (x) {
				return x.getModel();
			} ) );
		};
		return out;
	};

	return model();
};

var t = terrain( PARAMS );
var l = lake( PARAMS );
var tt = trees( PARAMS, t.vertices );

DRAW( t.getModel() );
DRAW( l.getModel() );
DRAW( tt.getModel() );