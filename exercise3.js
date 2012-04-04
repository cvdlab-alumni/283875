DRAW(COLOR([1,0.91,0.74])(pavimento()));
DRAW(COLOR([0,0.2,0.2])(piscina1()));
DRAW(COLOR([0,0.2,0.2])(piscina2()));
DRAW(COLOR([0.22,0.44,0])(prato()));
DRAW(COLOR([1,0.91,0.74])(pareti()));
DRAW(COLOR([1,0.91,0.74])(pilastri()));
DRAW(COLOR([0.99,0.99,1])(tetti()));
DRAW(COLOR([1,0.91,0.74])(panchine()));
DRAW(COLOR([1,0.91,0.74])(scalini()));

function pavimento() {

	// zone principali
	var ingresso = SIMPLEX_GRID([[8],[5],[1]]);
	ingresso = T([1,2])([17,-1])(ingresso);

	var area1 = SIMPLEX_GRID([[38],[7],[1]]);
	area1 = T([1,2])([10,-1])(area1);

	var area2 = SIMPLEX_GRID([[18],[6],[1]]);
	area2 = T([0,1,2])([20,4,-1])(area2);

	var area3 = SIMPLEX_GRID([[8],[12],[1]]);
	area3 = T([0,1,2])([38,4,-1])(area3);

	var area4 = SIMPLEX_GRID([[15.5],[3],[1]]);
	area4 = T([0,1,2])([20,1,-1])(area4);

	var area5 = SIMPLEX_GRID([[39],[1],[1]]);
	area5 = T([0,2])([-1,-1])(area5);

	// ritocchi
	var ritocco1 = SIMPLEX_GRID([[1],[1],[1]]);
	ritocco1 = T([0,1,2])([-1,1,-1])(ritocco1);

	var ritocco2 = SIMPLEX_GRID([[5],[1],[1]]);
	ritocco2 = T([0,1,2])([46,4,-1])(ritocco2);

	var ritocco3 = SIMPLEX_GRID([[1],[1],[1]]);
	ritocco3 = T([0,1,2])([50,5,-1])(ritocco3);

	// assemblamento finale
	var pavimento = STRUCT([ingresso, area1, area2,
		area3, area4, area5, ritocco1, ritocco2, ritocco3]);

	return pavimento;
}

function piscina1() {
	var piscina = SIMPLEX_GRID([[20],[9],[1]]);
	piscina = T([1,2])([1,-1])(piscina);

	return piscina;
}

function piscina2() {
	var piscina = SIMPLEX_GRID([[4],[11],[1]]);
	piscina = T([0,1,2])([46,5,-1])(piscina);

	return piscina;
}

function prato() {
	var prato = SIMPLEX_GRID([[8],[1],[1]]);
	prato = T([0,1,2])([38,16,-1])(prato);

	return prato;
}

function pareti() {
	var p1 = SIMPLEX_GRID([[0.15],[21],[4]]);
	p1 = T([1,2])([1,-1])(p1);

	var p2 = SIMPLEX_GRID([[7],[0.15],[3]]);
	p2 = T([1])([.85])(p2);

	var p3 = SIMPLEX_GRID([[0.15],[5],[3]]);
	p3 = T([0,1])([7.85,17])(p3);

	var p4 = SIMPLEX_GRID([[16],[0.15],[3]]);
	p4 = T([0,1])([8,16.85])(p4);

	var p5 = SIMPLEX_GRID([[19],[0.15],[3]]);
	p5 = T([0,1])([6.5,14.85])(p5);

	var p6 = SIMPLEX_GRID([[13.5],[0.15],[4]]);
	p6 = T([0,1,2])([36.5,15.85,-1])(p6);

	var p7 = SIMPLEX_GRID([[0.15],[11],[4]]);
	p7 = T([0,1,2])([49.85,5,-1])(p7);

	var p8 = SIMPLEX_GRID([[21],[0.15],[3]]);
	p8 = T([0,1])([29,5])(p8);

	var p9 = SIMPLEX_GRID([[0.15],[7.5],[3]]);
	p9 = T([0,1])([43.15,6.75])(p9);

	var p10 = SIMPLEX_GRID([[10],[0.15],[3]]);
	p10 = T([0,1])([29,13.25])(p10);

	var p11 = SIMPLEX_GRID([[9],[0.15],[3]]);
	p11 = T([0,1])([24,7.5])(p11);

	var p12 = SIMPLEX_GRID([[5.5],[0.15],[3]]);
	p12 = T([0,1])([36.25,11.35])(p12);

	var p13 = SIMPLEX_GRID([[0.1],[5.6],[3]]);
	p13 = T([0,1])([30,7.65])(p13);

	var p14 = SIMPLEX_GRID([[0.1],[5.6],[3]]);
	p14 = T([0,1])([31,7.65])(p14);

	var p15 = SIMPLEX_GRID([[0.1],[6.2],[3]]);
	p15 = T([0,1])([37.85,5.15])(p15);

	var p16 = SIMPLEX_GRID([[0.1],[6.2],[3]]);
	p16 = T([0,1])([41.65,5.15])(p16);

	return STRUCT([p1,p2,p3,p4,p5,p6,p7,p8,p9,
		p10,p11,p12,p13,p14,p15,p16]);
}

function pilastri() {
	var fila = SIMPLEX_GRID([[0.1,-6.35,0.1,-5.9,0.1,-6.4,0.1],[0.1],[3]]);
	var fila1 = T([0,1])([24.95, 13.95])(fila);
	var fila2 = T([1])([-7])(fila1);

	return STRUCT([fila1, fila2]);
}

function tetti() {
	var tetto1 = SIMPLEX_GRID([[23],[13],[0.2]]);
	tetto1 = T([0,1,2])([23,4,3])(tetto1);

	var tetto2 = SIMPLEX_GRID([[9.5],[9.5],[0.2]]);
	tetto2 = T([0,1,2])([-0.75,12,3])(tetto2);

	return STRUCT([tetto1, tetto2]);
}

function panchine() {
	var panchine = SIMPLEX_GRID([[15],[0.8],[0.05]]);
	panchine = T([0,1,2])([6.8,13.9,0.45])(panchine);

	// 8 piedi per le panchine
	var piedi = SIMPLEX_GRID([[0.25,-1.7,0.25,-1.7,0.25,-1.7,0.25,-1.7,0.25,-1.7,0.25,-1.7,0.25,-1.7,0.25],
		[0.8],[0.45]]);
	piedi = T([0,1])([7.25,13.9])(piedi);

	return STRUCT([panchine, piedi]);
}

function scalini() {
	var larghezza = 2/4;

	var scalino1 = SIMPLEX_GRID([[larghezza],[3],[0.2]]);
	var scalino2 = SIMPLEX_GRID([[larghezza],[3],[0.4]]);
	var scalino3 = SIMPLEX_GRID([[larghezza],[3],[0.6]]);
	var scalino4 = SIMPLEX_GRID([[larghezza],[3],[0.8]]);

	scalino2 = T([0])([-larghezza])(scalino2);
	scalino3 = T([0])([-larghezza*2])(scalino3);
	scalino4 = T([0])([-larghezza*3])(scalino4);

	var scalini = STRUCT([scalino1,scalino2,scalino3,scalino4]);
	return T([0,1,2])([37,1,-1])(scalini);
}