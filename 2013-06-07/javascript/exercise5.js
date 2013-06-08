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

function buildings( PARAMS, number_of_streets ) {
	var number_of_streets = PARAMS[ "NUMBER_OF_STREETS" ];
	var builing_side_size_x = PARAMS[ "MAX_LONGITUDE" ] / ( number_of_streets * 2 + 1 );
	var builing_side_size_y = PARAMS[ "MAX_LATITUDE" ] / ( number_of_streets * 2 + 1 );

	function building( is_small ) {
		function vertices() {
			var s1 = builing_side_size_x;
			var s2 = builing_side_size_y;
			var h = s1 + 4 * s1 * Math.random();

			var p1 = [ 0,  0,  0 ];
			var p2 = [ s1, 0,  0 ];
			var p3 = [ s1, s2, 0 ];
			var p4 = [ 0,  s2, 0 ];
			var p5 = [ 0,  0,  h ];
			var p6 = [ s1, 0,  h ];
			var p7 = [ s1, s2, h ];
			var p8 = [ 0,  s2, h ];
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

		var out = {};
		out.vertices = vertices();
		out.faces = faces();
		out.getModel = function () {
			var c = 0.5 * Math.random();
			return COLOR( [ c, c, c ] )( SIMPLICIAL_COMPLEX( this.vertices )( this.faces ) );
		};
		return out;
	};

	function streets_locations( number_of_streets ) {
		var sl = {};
		sl.x = [];
		sl.y = [];
		var i;
		var step_x = builing_side_size_x;
		var step_y = builing_side_size_y;
		for ( i = 1; i < number_of_streets * 2; i = i + 2 ) {
			sl.x.push( [ - i * step_x, - ( i + 1 ) * step_x ] );
		};
		for ( i = 1; i < number_of_streets * 2; i = i + 2 ) {
			sl.y.push( [ i * step_y, ( i + 1 ) * step_y ] );
		};
		return sl;
	};

	function translate_building( building, point ) {
		building.vertices = building.vertices.map( function ( origin ) {
			return [ origin[0] + point[0], origin[1] + point[1], origin[2] ];
		} );
		return building;
	};

	function a_lot_of_buildings() {
		var out = {};
		out.streets_locations = streets_locations( number_of_streets );
		out.buildings = [];

		var i, j;
		var sx, sy;
		var p;
		for ( i = 0; i < out.streets_locations.x.length; i++ ) {
			for ( j = 0; j < out.streets_locations.y.length; j++ ) {
				sx = out.streets_locations.x[i];
				sy = out.streets_locations.y[j];
				p = [ sx[1], sy[0] ];
				out.buildings.push( translate_building( building(), p ) );
			};
		};

		out.getModel = function () {
			return STRUCT( this.buildings.map( function (b) {
				return b.getModel();
			} ) );
		};
		return out;
	};

	return a_lot_of_buildings();
};

function streets( PARAMS ) {
	var MAX_LATITUDE = PARAMS[ "MAX_LATITUDE" ];
	var MAX_LONGITUDE = PARAMS[ "MAX_LONGITUDE" ];
	var MAX_ALTITUDE = PARAMS[ "MAX_ALTITUDE" ];

	function vertices() {
		var p1 = [ 0,               0,            0              ];
		var p2 = [ - MAX_LONGITUDE, 0,            0              ];
		var p3 = [ - MAX_LONGITUDE, MAX_LATITUDE, 0              ];
		var p4 = [ 0,               MAX_LATITUDE, 0              ];
		var p5 = [ 0,               0,            - MAX_ALTITUDE ];
		var p6 = [ - MAX_LONGITUDE, 0,            - MAX_ALTITUDE ];
		var p7 = [ - MAX_LONGITUDE, MAX_LATITUDE, - MAX_ALTITUDE ];
		var p8 = [ 0,               MAX_LATITUDE, - MAX_ALTITUDE ];
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
		var s1 = COLOR( [ 0.5, 0.5, 0.7 ] )( SIMPLICIAL_COMPLEX( this.vertices.slice( 0, 4 ) )( this.faces.slice( 0, 1 ) ) );
		var s2 = COLOR( [ 0.5, 0.25, 0.1 ] )( SIMPLICIAL_COMPLEX( this.vertices )( this.faces.slice( 1 ) ) );
		return STRUCT([ s1, s2 ]);
	};

	return output;
};

var t = terrain( PARAMS );
var l = lake( PARAMS );
var tt = trees( PARAMS, t.vertices );
var b = buildings( PARAMS );
var s = streets( PARAMS );

DRAW( t.getModel() );
DRAW( l.getModel() );
DRAW( tt.getModel() );
DRAW( b.getModel() );
DRAW( s.getModel() );