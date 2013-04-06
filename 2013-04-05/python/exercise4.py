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


##########

# vertical_enclosures

# north

window_elevation = distance_between_floors / 2.0

window_height = (3.0 / 4) * window_elevation

blank_space_above_window = ( distance_between_floors - window_height - window_elevation ) + floor_thickness

north_a_z_pattern = [ window_elevation, -window_height, blank_space_above_window ]

north_a = GRID([
	[ - (max_x - square_side), square_side ],
	[ -square_side, distance_y ],
	CAT([ [ -distance_between_floors, -floor_thickness ], NN(3)(north_a_z_pattern) ])
])

north_b_k = distance_between_floors / 10.0

north_b = GRID([
	[ - (max_x - square_side), square_side ],
	[ -(square_side + distance_y + square_side), stairs_width - north_b_k ],
	CAT([ [ -distance_between_floors, -floor_thickness ], NN(3)([ distance_between_floors, -floor_thickness ]) ])
])

north_c = GRID([
	[ - (max_x - square_side), square_side ],
	[ -(square_side + distance_y + square_side + (stairs_width - north_b_k)), north_b_k ],
	CAT([ [ -distance_between_floors, -floor_thickness ], NN(3)([ -(distance_between_floors - north_b_k), north_b_k, -floor_thickness ]) ])
])

north = STRUCT([ north_a, north_b, north_c ])

# south

south_a = GRID([
	[ square_side ],
	[ square_side + distance_y + square_side ],
	[ -3 * (distance_between_floors + floor_thickness), 2 / 3.0 * window_elevation ]
])

south_b = GRID([
	[ square_side ],
	[ - (square_side + distance_y + square_side), stairs_width ],
	[ -2 * (distance_between_floors + floor_thickness), distance_between_floors, -floor_thickness, 2 / 3.0 * window_elevation ]
])

south = STRUCT([ south_a, south_b ])

# east

east_a_k1 = 12

east_a_k2 = 100

east_a_k3 = 8

east_a_k4 = distance_between_floors / 5.0

east_a_length = 3 * (square_side + distance_x) + square_side + east_a_k1

x_quotes = [ east_a_k2, -east_a_k3, east_a_length - (east_a_k2 + east_a_k3) ]

z_quotes = [ distance_between_floors - (east_a_k3 + east_a_k4), -east_a_k3, east_a_k4 ]

east_a_1 = GRID([
	x_quotes,
	[ -(square_side + distance_y + square_side + stairs_width), square_side ],
	z_quotes
])

east_a_2 = GRID([
	AA(DIFF)(x_quotes),
	[ -(square_side + distance_y + square_side + stairs_width), square_side ],
	z_quotes
])

east_a_3 = GRID([
	x_quotes,
	[ -(square_side + distance_y + square_side + stairs_width), square_side ],
	AA(DIFF)(z_quotes)
])

east_a = STRUCT([ east_a_1, east_a_2, east_a_3 ])

east_b_k1 = 82

east_b_k2 = 35

x_quotes = [ east_b_k1, -east_b_k2, max_x - (east_b_k1 + east_b_k2) ]

z_quotes = [ window_elevation, -window_height, distance_between_floors - (window_elevation + window_height) ]

east_b_1 = GRID([
	x_quotes,
	[ -(square_side + distance_y + square_side + stairs_width), square_side ],
	z_quotes
])

east_b_2 = GRID([
	AA(DIFF)(x_quotes),
	[ -(square_side + distance_y + square_side + stairs_width), square_side ],
	z_quotes
])

east_b_3 = GRID([
	x_quotes,
	[ -(square_side + distance_y + square_side + stairs_width), square_side ],
	AA(DIFF)(z_quotes)
])

east_b = STRUCT([ east_b_1, east_b_2, east_b_3 ])

east_c = GRID([
	[ max_x ],
	[ -(square_side + distance_y + square_side + stairs_width), square_side ],
	NN(2)( [ distance_between_floors, -floor_thickness ] )
])

east = STRUCT([ east_a, T([3])([ distance_between_floors + floor_thickness ])(east_b), T([3])([ 2 * (distance_between_floors + floor_thickness) ])(east_c) ])

# west

west_a = GRID([
	[ -square_side, distance_x, -square_side, distance_x, -square_side, -distance_x, -square_side, distance_x, -square_side  ],
	[ square_side ],
	[ -(distance_between_floors + floor_thickness), distance_between_floors, -floor_thickness, distance_between_floors, -floor_thickness ]
])

west_b_z_pattern = [ window_elevation, -window_height, (distance_between_floors - (window_elevation + window_height)) + floor_thickness ]

west_b = GRID([
	[ -square_side, -distance_x, -square_side, -distance_x, -square_side, distance_x, -square_side, -distance_x, -square_side  ],
	[ square_side ],
	CAT([ [ -(distance_between_floors + floor_thickness) ], NN(2)(west_b_z_pattern) ])
])

west_c = GRID([
	[ -square_side, distance_x + square_side + distance_x ],
	[ square_side ],
	[ -3 * (distance_between_floors + floor_thickness), 2 / 3.0 * window_elevation ]
])

west_d = GRID([
	[ -square_side, -distance_x, -square_side, -distance_x, -square_side, distance_x, -square_side, -distance_x, -square_side  ],
	[ square_side ],
	CAT([ [ -3 * (distance_between_floors + floor_thickness) ], west_b_z_pattern ])
])

west_e = GRID([
	[ -square_side, -distance_x, -square_side, -distance_x, -square_side, -distance_x, -square_side, distance_x, -square_side  ],
	[ square_side ],
	[ -3 * (distance_between_floors + floor_thickness), distance_between_floors ]
])

west = STRUCT([ west_a, west_b, west_c, west_d, west_e ])

# vertical_enclosures

vertical_enclosures = STRUCT([ north, south, east, west ])


##########


# windows

# north_windows

north_windows = COLOR(BLACK)(GRID([
	[ - (max_x - square_side), square_side ],
	[ -square_side, distance_y ],
	CAT([ [ -distance_between_floors, -floor_thickness ], NN(3)(AA(DIFF)(north_a_z_pattern)) ])
]))

# south_windows

south_windows_space = square_side / 3.0

south_windows_length = (distance_y - 3 * south_windows_space) / 4.0

south_windows_height = (distance_between_floors - south_windows_space) / 2.0

south_windows = COLOR(BLACK)(GRID([
	[ -south_windows_space, south_windows_space, -south_windows_space ],
	CAT([ [ -square_side ], NN(3)([ south_windows_length, -south_windows_space ]), [ south_windows_length, -square_side ]  ] ),
	[ -distance_between_floors, -floor_thickness, south_windows_height, -south_windows_space, south_windows_height, -floor_thickness, south_windows_height, -south_windows_space, south_windows_height ]
]))

# east_windows

east_windows_z_pattern = AA(DIFF)([ window_elevation, -window_height, (distance_between_floors - (window_elevation + window_height)) + floor_thickness ])

east_windows = COLOR(BLACK)(GRID([
	[ -square_side, -distance_x, -square_side, -distance_x, -square_side, distance_x, -square_side, -distance_x, -square_side  ],
	[ square_side ],
	CAT([ [ -(distance_between_floors + floor_thickness) ], NN(3)(east_windows_z_pattern) ])
]))

# west_windows

west_windows_a_k1 = 12

west_windows_a_k2 = 100

west_windows_a_k3 = 8

west_windows_a_k4 = distance_between_floors / 5.0

west_windows_a_length = 3 * (square_side + distance_x) + square_side + west_windows_a_k1

x_quotes = [ -west_windows_a_k2, west_windows_a_k3, - (west_windows_a_length - (west_windows_a_k2 + west_windows_a_k3)) ]

z_quotes = [ -(distance_between_floors - (west_windows_a_k3 + west_windows_a_k4)), west_windows_a_k3, -west_windows_a_k4 ]

west_windows_a = COLOR(BLACK)(GRID([
	x_quotes,
	[ -(square_side + distance_y + square_side + stairs_width), square_side ],
	z_quotes
]))

west_windows_b_k1 = 82

west_windows_b_k2 = 35

x_quotes = [ -west_windows_b_k1, west_windows_b_k2, -(max_x - (west_windows_b_k1 + west_windows_b_k2)) ]

z_quotes = [ -distance_between_floors, -floor_thickness, -window_elevation, window_height ]

west_windows_b = COLOR(BLACK)(GRID([
	x_quotes,
	[ -(square_side + distance_y + square_side + stairs_width), square_side ],
	z_quotes
]))

west_windows = STRUCT([ west_windows_a, west_windows_b ])

# windows

windows = STRUCT([ north_windows, south_windows, east_windows, west_windows ])

# building (pillars, horizontal partitions, vertical enclosures and windows)

building = STRUCT([ pillars, floors, vertical_enclosures, windows ])

VIEW(building)