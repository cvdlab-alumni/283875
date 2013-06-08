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

var t = terrain( PARAMS );

DRAW( t.getModel() );