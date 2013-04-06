# GRID implementation

GRID = COMP([ INSR(PROD), AA(QUOTE) ])

# pillars

circle_radius = 2

circle = T([1,2])([ circle_radius, circle_radius ])(CIRCLE(circle_radius)([32,1]))

square_side = circle_radius * 2

square = CUBOID([ square_side, square_side ])

distance_x = 35

distance_y = 70

t_x = T([1])([ square_side + distance_x ])

t_y = T([2])([ square_side + distance_y ])

distance_between_floors = 32

floor_thickness = 5

t_z = T([3])([ distance_between_floors + floor_thickness ])

# pillars0

pillars0_left_2D = STRUCT([ circle, t_x, STRUCT(NN(3)([ square, t_x ])) ])

pillars0_right_2D = STRUCT(NN(5)([ circle, t_x ]))

pillars0_2D = STRUCT([ t_y(pillars0_left_2D), pillars0_right_2D ])

pillars0 = PROD([ pillars0_2D, QUOTE([ distance_between_floors ]) ])

# pillars1

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

# pillars2

pillars2 = t_x(t_x(
	GRID([
		[ square_side, -distance_x, square_side, -distance_x, square_side ],
		[ square_side, -distance_y, square_side ],
		[ distance_between_floors ]
	])
))

# pillars3

pillars3 = pillars2

# pillars

pillars = STRUCT([ pillars0, t_z, pillars1, t_z, pillars2, t_z, pillars3 ])


##########


# floors

max_x = 4 * ( square_side + distance_x ) + square_side

stairs_width = 13

max_y = square_side + distance_y + square_side + stairs_width + square_side

margin_x = 35

margin_y = 35

# floor0

floor0 = T([1,2,3])([ -margin_x / 2.0, -margin_y / 2.0, -floor_thickness ])( CUBOID([ max_x + margin_x, max_y + margin_y, floor_thickness ]) )

# floor1

stair_length = 50

space_before_stair = 35

x_quotes = [ space_before_stair, -stair_length, max_x - space_before_stair - stair_length ]

y_quotes = [ square_side + distance_y + square_side, -stairs_width, square_side ]

floor1_a = GRID([
	x_quotes,
	y_quotes,
	[ floor_thickness ]
])

floor1_b = GRID([
	AA(DIFF)(x_quotes),
	y_quotes,
	[ floor_thickness ]
])

floor1_c = GRID([
	x_quotes,
	AA(DIFF)(y_quotes),
	[ floor_thickness ]
])

floor1 = STRUCT([ floor1_a, floor1_b, floor1_c ])

# floor2

x_quotes = [ square_side, - (max_x - 2 * square_side), square_side ]

y_quotes = [ square_side, - distance_y, square_side, -stairs_width, square_side ]

floor2_a = GRID([
	x_quotes,
	y_quotes,
	[ floor_thickness ]
])

floor2_b = GRID([
	AA(DIFF)(x_quotes),
	y_quotes,
	[ floor_thickness ]
])

floor2_c = GRID([
	x_quotes,
	AA(DIFF)(y_quotes),
	[ floor_thickness ]
])

floor2_major_basis = 88

floor2_minor_basis = distance_x + square_side + distance_x

floor2_d = T([1,2])([ max_x - square_side - floor2_major_basis, square_side + distance_y + square_side ])( CUBOID([ floor2_major_basis, stairs_width, floor_thickness ]) )

floor2_e_2D = MKPOL([
	[
		[ floor2_major_basis - floor2_minor_basis, 0 ],
		[ floor2_major_basis, 0 ],
		[ floor2_major_basis, distance_y ],
		[ 0, distance_y]
	],
	[ [ 1, 2, 3, 4 ] ],
	None
])

floor2_e = T([1,2])([ max_x - floor2_major_basis - square_side, square_side ])( PROD([ floor2_e_2D, QUOTE([ floor_thickness ]) ]) )

floor2 = STRUCT([ floor2_a, floor2_b, floor2_c, floor2_d, floor2_e ])

# floor3

stair_length = 43

space_before_stair = square_side + distance_x + square_side + distance_x + square_side

x_quotes = [ space_before_stair, -stair_length, max_x - space_before_stair - stair_length ]

y_quotes = [ square_side + distance_y + square_side, -stairs_width, square_side ]

floor3_a = GRID([
	x_quotes,
	y_quotes,
	[ floor_thickness ]
])

floor3_b = GRID([
	AA(DIFF)(x_quotes),
	y_quotes,
	[ floor_thickness ]
])

floor3_c = GRID([
	x_quotes,
	AA(DIFF)(y_quotes),
	[ floor_thickness ]
])

floor3 = STRUCT([ floor3_a, floor3_b, floor3_c ])

# floor4

x_quotes = [ - (max_x - 82), 82 ]

y_quotes = [ - (max_y - 19), 19 ]

floor4_a = GRID([
	x_quotes,
	y_quotes,
	[ floor_thickness ]
])

floor4_b = GRID([
	AA(DIFF)(x_quotes),
	y_quotes,
	[ floor_thickness ]
])

floor4_c = GRID([
	x_quotes,
	AA(DIFF)(y_quotes),
	[ floor_thickness ]
])

floor4 = STRUCT([ floor4_a, floor4_b, floor4_c ])

# floors

floors = STRUCT([ floor0, T([3])([ distance_between_floors ]), floor1, t_z, floor2, t_z, floor3, t_z, floor4 ])

# building (pillars and horizontal partitions)

building = STRUCT([ pillars, floors ])

VIEW(building)