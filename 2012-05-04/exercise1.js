/*
 * Exercise 1
 * Produce the model of a single wing in a local coordinate system.
 */

var LENGTH = 6;
var WIDTH = 1.5;
var HEIGTH = 0.1;

function wing(length, width, heigth) {
	/* Inner side of the wing is a little bit larger. */
	var outerHeigth = heigth - (40 / 100) * heigth;

	var halfHeigth = heigth / 2;
	var innerHalfHeigth = halfHeigth;
	var outerHalfHeigth = outerHeigth / 2;

	/* Upper half of the wing (bezier surface from two nubs curve). */
	var controls1 = [
		[ 0, 0,                       0              ],
		[ 0, 0,                       innerHalfHeigth],
		[ 0, innerHalfHeigth,         innerHalfHeigth],
		[ 0, width - innerHalfHeigth, innerHalfHeigth],
		[ 0, width,                   innerHalfHeigth],
		[ 0, width,                   0              ]
	];
	var upperVerticalSection1 = NUBS(S0)(2)([0,0,0,1,1,1,2,2,2])(controls1);

	var controls2 = [
		[ length - halfHeigth, 0,                                     0 ],
		[ length - halfHeigth, 0,                       outerHalfHeigth ],
		[ length - halfHeigth, outerHalfHeigth,         outerHalfHeigth ],
		[ length - halfHeigth, width - outerHalfHeigth, outerHalfHeigth ],
		[ length - halfHeigth, width,                   outerHalfHeigth ],
		[ length - halfHeigth, width,                                 0 ]
	];
	var upperVerticalSection2 = NUBS(S0)(2)([0,0,0,1,1,1,2,2,2])(controls2);

	var upperHalfBezier = BEZIER(S1)([ upperVerticalSection1, upperVerticalSection2 ]);
	var upperHalf = MAP(upperHalfBezier)(DOMAIN([[0,1],[0,1]])([15,15]));

	/* Lower half (bezier surface from two nubs curve). */
	var controls3 = [
		[ 0, 0,                       0                ],
		[ 0, 0,                       -innerHalfHeigth ],
		[ 0, innerHalfHeigth,         -innerHalfHeigth ],
		[ 0, width - innerHalfHeigth, -innerHalfHeigth ],
		[ 0, width,                   -innerHalfHeigth ],
		[ 0, width,                   0                ]
	];
	var lowerVerticalSection1 = NUBS(S0)(2)([0,0,0,1,1,1,2,2,2])(controls3);

	var controls4 = [
		[ length - halfHeigth, 0,                       0                ],
		[ length - halfHeigth, 0,                       -outerHalfHeigth ],
		[ length - halfHeigth, outerHalfHeigth,         -outerHalfHeigth ],
		[ length - halfHeigth, width - outerHalfHeigth, -outerHalfHeigth ],
		[ length - halfHeigth, width,                   -outerHalfHeigth ],
		[ length - halfHeigth, width,                   0                ]
	];
	var lowerVerticalSection2 = NUBS(S0)(2)([0,0,0,1,1,1,2,2,2])(controls4);

	var lowerHalfBezier = BEZIER(S1)([ lowerVerticalSection1, lowerVerticalSection2 ]);
	var lowerHalf = MAP(lowerHalfBezier)(DOMAIN([[0,1],[0,1]])([15,15]));

	return STRUCT([upperHalf, lowerHalf]);
};

var out = wing(LENGTH, WIDTH, HEIGTH);
DRAW(out);