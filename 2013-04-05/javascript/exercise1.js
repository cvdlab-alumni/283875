// Adapt Pyplasm code to Plasm.js code

T = function (dims) {
  dims = dims.map(function (dim) {
    return dim - 1;
  });

  return function (values) {
    return function (object) {
     return object.clone().translate(dims, values);
    };
  };
};
  
R = function (dims) {
  dims = dims.map(function (dim) {
    return dim - 1;
  });
   
  return function (angle) {
    return function (object) {
      return object.clone().rotate(dims, angle);
    };
  };
};
  
S = function (dims) {
  dims = dims.map(function (dim) {
    return dim - 1;
  });

  return function (values) {
    return function (object) {
      return object.clone().scale(dims, values);
    };
  };
};

S3 = S2;
S2 = S1;
S1 = S0;

GRID = SIMPLEX_GRID;

NN = REPLICA;

VIEW = DRAW;

// pillars

circle_radius = 2

circle = T([1,2])([ circle_radius, circle_radius ])(CIRCLE(circle_radius)(32))

square_side = circle_radius * 2

square = CUBOID([ square_side, square_side ])

distance_x = 35

distance_y = 70

t_x = T([1])([ square_side + distance_x ])

t_y = T([2])([ square_side + distance_y ])

distance_between_floors = 32

floor_thickness = 5

t_z = T([3])([ distance_between_floors + floor_thickness ])

// pillars0

pillars0_left_2D = STRUCT([ circle, t_x, STRUCT(REPLICA(3)([ square, t_x ])) ])

pillars0_right_2D = STRUCT(REPLICA(5)([ circle, t_x ]))

pillars0_2D = STRUCT([ t_y(pillars0_left_2D), pillars0_right_2D ])

pillars0 = EXTRUDE([distance_between_floors])(pillars0_2D)

// pillars1

small_pillars1 = GRID([
	[ square_side, -distance_x, square_side, -distance_x, square_side ],
	[ square_side, -distance_y, square_side ],
	[ distance_between_floors ]
])

high_pillars1 = GRID([
	[ square_side, -distance_x, square_side ],
	[ square_side, -distance_y, square_side ],
	[ distance_between_floors + floor_thickness + distance_between_floors ]
])

pillars1 = STRUCT([ high_pillars1, t_x, t_x, small_pillars1 ])

// pillars2

pillars2 = t_x(t_x(
	GRID([
		[ square_side, -distance_x, square_side, -distance_x, square_side ],
		[ square_side, -distance_y, square_side ],
		[ distance_between_floors ]
	])
))

// pillars3

pillars3 = pillars2

// pillars

pillars = STRUCT([ pillars0, t_z, pillars1, t_z, pillars2, t_z, pillars3 ])

// building (initial model: only pillars)

building = STRUCT([ pillars ])

VIEW(building)