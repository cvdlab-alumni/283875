/*
 * Note importanti: la mia soluzione si basa sull'uso
 * di una funzione che mi consente di ottenere griglie
 * orizzontali della dimensione e nella posizione che
 * voglio. Il posizionamento non avviene per traslazione
 * ma piuttosto indicando le coordinate di un vertice
 * del rettangolo/griglia. Per quanto non si tratti di
 * una soluzione estremamente elegante, credo che sia
 * una delle più dignitose se si tiene in considerazione
 * il vincolo di usare solo POLYLINE e STRUCT.
 *
 * Detto questo, il pavimento del padiglione può essere visto come un
 * insieme di rette orizzontali e verticali su una griglia
 * di larghezza massima pari a 52 ed altezza massima 22.
 *
 * Gli insiemi di linee possono inoltre essere raggruppati
 * coerentemente in un numero limitato di più
 * piccole griglie rettangolari
 * corrispondenti in maniera più o meno esatta a zone
 * "notevoli" dell'edificio:
 *
 * - l'ingresso
 * - la piscina
 * - alcune aree all'aperto
 * - un'altra, ricoperta da uno dei due tetti
 * - il percorso verso gli scalini
 *
 * Saranno infine necessarie alcune altre griglie per dei
 * ritocchi finali al pavimento, più altre linee per
 * rappresentare i confini delle piscini, i pilastri, ecc..
 *
 */

// zone principali
var ingresso = griglia([0,17], 8, 5);
var area1 = griglia([0,10], 38, 7);
var area2 = griglia([20,4], 18, 6);
var area3 = griglia([38,4], 8, 12);
var area4 = griglia([20,1], 15, 3);
var area5 = griglia([0,0], 38, 1);

// ritocchi alle griglie
var ritocco1 = griglia([-1,0], 1, 2);
var ritocco2 = griglia([46,4], 5, 1);
var ritocco3 = griglia([50,5], 1, 1);
var ritocco4 = STRUCT([POLYLINE([[35.5,1],[35.5,4]]),
	POLYLINE([[35,2],[35.5,2]]),
	POLYLINE([[35,3],[35.5,3]])
	]);

// assemblamento di tutta la struttura pavimento
var pavimento = STRUCT([ingresso, area1, area2, area3, area4, area5,
	ritocco1, ritocco2, ritocco3, ritocco4]);

// disegno del pavimento
DRAW(pavimento);

// pilastri
DRAW(rettangolo([25-0.1,14-0.1], 0.2,0.2));
DRAW(rettangolo([31-0.1,14-0.1], 0.2,0.2));
DRAW(rettangolo([37-0.1,14-0.1], 0.2,0.2));
DRAW(rettangolo([43-0.1,14-0.1], 0.2,0.2));
DRAW(rettangolo([25-0.1,10-0.1], 0.2,0.2));
DRAW(rettangolo([31-0.1,10-0.1], 0.2,0.2));
DRAW(rettangolo([37-0.1,10-0.1], 0.2,0.2));
DRAW(rettangolo([43-0.1,10-0.1], 0.2,0.2));

// linee piscina 1
DRAW(POLYLINE([[0,2],[0,10]]));

// linee piscina 2
DRAW(POLYLINE([[50,6],[50,16]]));
DRAW(POLYLINE([[46,16],[50,16]]));

// linee prato
DRAW(POLYLINE([[46,16],[46,17]]));
DRAW(POLYLINE([[38,17],[46,17]]));

/**
 * Funzione d'appoggio per la generazione di una
 * griglia rettangolare, date le coordinate
 * del vertice in basso a sinistra, larghezza e altezza.
 */
function griglia(origine, larghezza, altezza) {
	var lineeOriz = new Array(altezza+1);
	var lineeVert = new Array(larghezza+1);

	for (var i = 0; i <= altezza; i++) {
		lineeOriz[i] = POLYLINE([[origine[0],origine[1]+i],
                               [origine[0]+larghezza, origine[1]+i]]);
	}
	for (var i = 0; i <= larghezza; i++) {
		lineeVert[i] = POLYLINE([[origine[0]+i,origine[1]],
			[origine[0]+i,origine[1]+altezza]]);
	}
	return STRUCT([STRUCT(lineeOriz), STRUCT(lineeVert)]);
}

/**
 * Simile alla funzione griglia, ma restituisce un
 * rettangolo.
 */
function rettangolo(origine, larghezza, altezza) {
  var b1 = POLYLINE([
    [origine[0],origine[1]],
    [origine[0]+larghezza,origine[1]]
    ]);
  var b2 = POLYLINE([
    [origine[0],origine[1]+altezza],
    [origine[0]+larghezza,origine[1]+altezza]
    ]);

  var h1 = POLYLINE([
    [origine[0],origine[1]],
    [origine[0],origine[1]+altezza]
    ]);
  var h2 = POLYLINE([
    [origine[0]+larghezza,origine[1]],
    [origine[0]+larghezza,origine[1]+altezza]
    ]);

  return STRUCT([b1,b2,h1,h2]);
}