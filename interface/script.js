var features = {
	"forma":[
		"churro",
		"ovalo",
		"rombo"
	],
	"numero":[
		"uno",
		"dos",
		"tres"
	],
	"color":[
		"morado",
		"verde",
		"rojo"
	],
	"relleno":[
		"blanco",
		"rayado",
		"solido"
	]
};

var newCard = function(hand) {
  var card = {};
  for (var key in features) {
    card[key] = features[key][Math.floor(Math.random()*features[key].length)];
  }
  var repetida = hand.some((x)=>{
    var matches = 0;
    for (var key in features) {
      if (card[key] == x[key]) {
        matches += 1;
      }
    }
    return matches == Object.keys(features).length;
  });

  if (repetida) {
    console.log("repetida");
    return newCard(hand);
  }
  return card;
}

var newHand = function() {
  var hand = [];
  var size = 12;
  for (var i = 0; i < size; i++) {
    hand.push(newCard(hand));
  }
  console.log(hand);
  return hand;
}
