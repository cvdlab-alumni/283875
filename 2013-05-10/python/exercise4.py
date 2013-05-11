#################### Utilities ####################

# Input: a pair of 1-d domains (eg. [ d, d ], with d = INTERVALS(1)(32))
# Output: a 2-d domain
def domain2d(domains1D):
	def aux(q):
		a = q[0]
		b = q[1]
		c = q[2]
		d = q[3]
		return [ [ a, b, d ], [ d, b, c ] ]
	dd = PROD([ domains1D[0], domains1D[1] ])
	complex = UKPOL(dd)
	points = complex[0]
	cells = CAT(AA(aux)(complex[1]))
	return MKPOL([ points, cells, None ])

# Input: N point sequences
# Output: N Bezier curves
def points_to_beziers(point_sequences):
	return map( BEZIER(S1), point_sequences )

# Input: N curves
# Output: function
#	Input: curves domains sequence (e.g. [ [0,1], [0,1] ])
#	Output: 1 single curve, union of the N curves given
def curves_union( curves ):
	def isin( u, a, b ):
		return u >= a and u < b
	def aux0( domains ):
		def aux1(u):
			n = len( curves )
			i = 0
			j = 0
			k = 0
			while ( i < n ):
				k += domains[i][1] - domains[i][0]
				i += 1
			i = 0
			while ( i < n and not isin(u[0] * k, j, j + domains[i][1] - domains[i][0]) ):
				j += domains[i][1] - domains[i][0]
				i += 1
			print j
			if ( i < n ):
				return curves[i]([ domains[i][0] + u[0] * k - j ])
			else:
				return curves[n-1]([ domains[n-1][1] ])
		return aux1
	return aux0

# Input: a selector (e.g. S1)
# Output: a function
#	Input: a radius r
#	Output: a function
#		Input: a z axis offset
#		Output: a function
#			Input: a point
#			Output: a curve corresponding to a circle of radius r,
#			        centered on a plane parallel to XY plane and
#			        far z units away from it
def circle(selector):
	def aux1(r):
		def aux2(z):
			def aux3(p):
				return [ r * COS(selector(p)), r * SIN(selector(p)), z ]
			return aux3
		return aux2
	return aux1

# Returns a mapping to shape a disk with radius r
def disk(r):
	def mapping(p):
		return [ r * COS(p[0]), p[1] * r * SIN(p[0]) ]
	d1 = INTERVALS(2 * PI)(64)
	d2 = INTERVALS(1)(1)
	dd = domain2d([ d1, d2 ])
	return MAP(mapping)(dd)

#################### Exercise 2 (preparation) ####################

# SIDE PROFILE
def side():
	pp1 = [
		[ -190, -55 ], [ -203, -43 ], [ -204, -31 ], [ -193, -18 ]
	]
	pp2 = [
		[ -193, -18 ], [ -166, -3 ], [ -120, 8 ], [ -77, 10 ]
	]
	pp3 = [
		[ -77, 10 ], [ -27, 43 ], [ -6, 51 ], [ 18, 52 ]
	]
	pp4 = [
		[ 18, 52 ], [ 95, 43 ], [ 163, 21 ], [ 200, -4 ]
	]
	pp5 = [
		[ 200, -4 ], [ 194, -37 ]
	]
	pp6 = [
		[ 194, -37 ], [ 138, -61 ]
	]
	pp7 = [
		[ 138, -61 ], [ 135, -3 ], [ 71, -12 ], [ 77, -58 ]
	]
	pp8 = [
		[ 77, -58 ], [ 68, -58 ], [ 59, -52 ]
	]
	pp9 = [
		[ 59, -52 ], [ -77, -58 ]
	]
	pp10 = [
		[ -77, -58 ], [ -80, -15 ], [ -135, -18 ], [ -138, -58 ]
	]
	pp11 = [
		[ -138, -58 ], [ -190, -55 ]
	]
	curves = points_to_beziers([ pp1, pp2, pp3, pp4, pp5, pp6, pp7, pp8, pp9, pp10, pp11 ])
	return curves_union(curves)(N(11)([0,1]))

# UP PROFILE
def up():
	pp1 = [
		[ -200, 0 ], [ -200, 46 ], [ -153, 77 ], [ -123, 77 ]
	]
	pp2 = [
		[ -123, 77 ], [ -71, 77 ], [ -40, 71 ], [ 0, 71 ]
	]
	pp3 = [
		[ 0, 71 ], [ 46, 71 ], [ 114, 86 ], [ 147, 86 ]
	]
	pp4 = [
		[ 147, 86 ], [ 156, 77 ], [ 169, 64 ], [ 184, 61 ]
	]
	pp5 = [
		[ 184, 61 ], [ 200, 43 ], [ 200, -43 ], [ 184, -61 ]
	]
	pp6 = [
		[ 184, -61 ], [ 169, -64 ], [ 156, -77 ], [ 147, -86 ]
	]
	pp7 = [
		[ 147, -86 ], [ 114, -86 ], [ 46, -71 ], [ 0, -71 ]
	]
	pp8 = [
		[ 0, -71 ], [ -40, -71 ], [ -71, -77 ], [ -123, -77 ]
	]
	pp9 = [
		[ -123, -77 ], [ -153, -77 ], [ -200, -46 ], [ -200, 0 ]
	]
	curves = points_to_beziers([ pp1, pp2, pp3, pp4, pp5, pp6, pp7, pp8, pp9 ])
	return curves_union(curves)(N(9)([0,1]))

# FRONT PROFILE
def front():
	pp1 = [
		[ 0, -52 ], [ -66, -52 ]
	]
	pp2 = [
		[ -66, -52 ], [ -84, 6 ], [ -75, 17 ], [ -63, 20 ]
	]
	pp3 = [
		[ -63, 20 ], [ -49, 46 ], [ -43, 52 ], [ 0, 52 ]
	]
	pp4 = [
		[ 0, 52 ], [ 43, 52 ], [ 49, 46 ], [ 63, 20 ]
	]
	pp5 = [
		[ 63, 20 ], [ 75, 17 ], [ 84, 6 ], [ 66, -52 ]
	]
	pp6 = [
		[ 66, -52 ], [ 0, -52 ]
	]
	curves = points_to_beziers([ pp1, pp2, pp3, pp4, pp5, pp6 ])
	return curves_union(curves)(N(6)([0,1]))

#################### Exercise 2 ####################

d = INTERVALS(1)(256)

side_profile = MAP(side())(d)

up_profile = MAP(up())(d)
up_profile = MAP([ S1, K(0), S2 ])(up_profile)

front_profile = MAP(front())(d)
front_profile = MAP([ K(0), S2, S1 ])(front_profile)

profiles = STRUCT([ side_profile, up_profile, front_profile ])

#################### Exercise 3 (preparation) ####################

def triangles(l, y):
	pp1 = [
		[ 0, 0 ], [ 0.7 * l, 0.25 * l ],
		[ l, 0.75 * l ], [ 0.7 * l, 0.9 * l ]
	]
	pp2 = [
		[ 0.7 * l, 0.9 * l ], [ 0.3 * l, l ],
		[ 0, l ]
	]
	pp3 = [
		[ 0, 0 ], [ 0, l ]
	]
	pp4 = [
		[ 0, l ], [ -0.1 * l, l ],  [ -0.2 * l, 0.9 * l ]
	]
	pp5 = [
		[ -0.2 * l, 0.9 * l ], [ -0.4 * l, 0.7 * l ],
		[ -0.4 * l, 0.65 * l ], [ -0.25 * l, 0.5 * l ]
	]
	pp6 = [
		[ -0.25 * l, 0.5 * l ], [ -0.1 * l, 0.3 * l ],
		[ -0.15 * l, 0.15 * l ], [ 0, 0 ]
	]
	curves1 = points_to_beziers([ pp1, pp2 ])
	curve1 = curves_union(curves1)(N(2)([0,1]))
	curves2 = points_to_beziers([ pp3 ])
	curve2 = curves_union(curves2)(N(1)([0,1]))
	curves3 = points_to_beziers([ pp4, pp5, pp6 ])
	curve3 = curves_union(curves3)(N(3)([0,1]))
	c1 = BEZIER(S2)([ curve1, curve2 ])
	c2 = BEZIER(S2)([ curve2, curve3 ])
	d1 = INTERVALS(1)(32)
	d2 = INTERVALS(1)(1)
	dd = domain2d([ d1, d2 ])
	cc1 = MAP(c1)(dd)
	cc2 = MAP(c2)(dd)
	triangle = STRUCT([ cc1, cc2 ])
	triangle = T(2)(y)(triangle)
	return  STRUCT( NN(5)([ triangle, R([ 1,2 ])( 2 * PI / 5 ) ]) )

def wheel_disk(r):
	dsk = disk(r)
	trngls = triangles(r / 2.0, 0.25 * r)
	# Pyplasm crashes!
	# dsk = DIFFERENCE([ dsk, trngls ])
	dsk = COLOR([ 1, 1, 1 ])(dsk)
	trngls = COLOR([ 0, 0, 0 ])(trngls)
	trngls = T(3)(0.01 * r)(trngls)
	return STRUCT([ dsk, trngls ])

# THE WHEEL
def wheel(r):
	def aux(w):
		d = INTERVALS(2 * PI)(64)
		dd = domain2d([ d, INTERVALS(1)(5) ])
		c1 = circle(S1)( r       )( 0 )
		c2 = circle(S1)( r       )( 0.7 * w / 2 )
		c3 = circle(S1)( r       )( w / 2.0 )
		c4 = circle(S1)( 0.7 * r )( w / 2.0 )
		s1 = BEZIER(S2)([ c1, c2 ])
		s2 = BEZIER(S2)([ c2, c3, c4 ])
		ss1 = MAP(s1)(dd)
		ss2 = MAP(s2)(dd)
		ss = COLOR([ 0.1, 0.1, 0.1 ])(STRUCT([ ss1, ss2 ]))
		dsk = wheel_disk( 0.7 * r )
		dsk = T(3)(w / 2.0)(dsk)
		return STRUCT([ ss, S(3)(-1)(ss), dsk ])
	return aux

#################### Exercise 3 ####################

a_wheel = wheel(20)(16)

wheel_1 = T([ 1, 2, 3 ])([ -105, -50, 86 - 14 ])(a_wheel)
wheel_2 = T(1)( 105 + 107 )(wheel_1)

wheels_12 = STRUCT([ wheel_1, wheel_2 ])
wheels_34 = S(3)(-1)(wheels_12)

wheels = STRUCT([ wheels_12, wheels_34 ])

#################### Exercise 4 (preparation) ####################

def q1(r):
	pp1 = [
		[ 0, 0 ], [ -r, 0 ]
	]
	pp2 = [
		[ -r, 0 ], [ -r, r ], [ 0, r ]
	]
	pp3 = [
		[ 0, r / 5.0 ], [ - r / 10.0, r / 5.0 ],
		[ - r / 10.0, r / 10.0 ]
	]
	pp4 = [
		[ - r / 10.0, r / 10.0 ], [ - 4 / 5.0 * r, r / 10.0 ]
	]
	pp5 = [
		[ - 4 / 5.0 * r, r / 10.0 ], [ - 4 / 5.0 * r, 4 / 5.0 * r ],
		[ 0, 4 / 5.0 * r ]
	]
	c1 = curves_union( points_to_beziers([ pp1, pp2 ]) )(N(2)([ 0, 1 ]))
	c2 = curves_union( points_to_beziers([ pp3, pp4, pp5 ]) )(N(3)([ 0, 1 ]))
	q = BEZIER(S2)([ c1, c2 ])
	d1 = INTERVALS(1)(128)
	d2 = INTERVALS(1)(1)
	dd = domain2d([ d1, d2 ])
	return MAP(q)(dd)

def q2(r):
	pp1 = [
		[ 0, -r ], [ -r, -r ], [ -r, 0 ]
	]
	pp2 = [
		[ -r, 0 ], [ 0, 0 ]
	]
	pp3 = [
		[ 0, 0 ], [ 0, -r ]
	]
	pp4 = [
		[ - r / 10.0, - 4 / 5.0 * r ], [ - 4 / 5.0 * r, - 4 / 5.0 * r ],
		[ - 4 / 5.0 * r, - r / 10.0 ]
	]
	pp5 = [
		[ - 4 / 5.0 * r, - r / 10.0 ], [ - r / 5.0, - r / 10.0 ]
	]
	pp6 = [
		[ - r / 5.0, - r / 10.0 ], [ - r / 5.0, - r / 5.0 ],
		[ - r / 10.0, - r / 5.0 ]
	]
	pp7 = [
		[ - r / 10.0, - r / 5.0 ], [ - r / 10.0, - 4 / 5.0 * r ]
	]
	c1 = curves_union( points_to_beziers([ pp1, pp2, pp3 ]) )(N(3)([ 0, 1 ]))
	c2 = curves_union( points_to_beziers([ pp4, pp5, pp6, pp7 ]) )(N(4)([ 0, 1 ]))
	q = BEZIER(S2)([ c1, c2 ])
	d1 = INTERVALS(1)(128)
	d2 = INTERVALS(1)(1)
	dd = domain2d([ d1, d2 ])
	return MAP(q)(dd)

def steering_wheel_generator(r):
	q = STRUCT([ q1(r), q2(r) ])
	qq = STRUCT([ q, S(1)(-1)(q) ])
	qqq = PROD([ qq, Q( r / 10.0 ) ])
	return COLOR([ 0.1, 0.1, 0.1 ])(qqq)

#################### Exercise 4 ####################

steering_wheel = steering_wheel_generator(12);
steering_wheel = R([ 1, 3 ])(PI/2)(steering_wheel)
steering_wheel = R([ 1, 2 ])(PI/9)(steering_wheel)
steering_wheel = T([ 1, 3 ])([ -40, 35 ])(steering_wheel)

#################### Output ####################

VIEW(STRUCT([ profiles, wheels, steering_wheel ]))
