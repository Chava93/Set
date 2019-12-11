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

var getSets = function(hand) {
  //Obtenemos los posibles sets para una determinada mano
  return $.post("https://us-central1-setgame.cloudfunctions.net/hello_http", hand, function(response) {
    console.log(JSON.parse(response));
  });
};

var checkSet = function(attempt) {
  //Esto no funciona. Necesitamos una función más matona para checar igualdad entre arrays.
  var sets = [
    [0, 1, 2],
    [1, 2, 3],
    [2, 3, 4]
  ];
  console.log(sets.includes(attempt));
};

// checkSet([0, 1, 2]);
var attempt = [];

var chooseCard = function(x) {
  if (attempt.length < 3) {
    attempt.push(x);
  }
  if (attempt.length == 3) {
    checkSet(attempt);
    attempt = [];
  }
  console.log(attempt);
};

var display = function(hand) {
  for (var i = 0; i < hand.length; i++) {
    var btn = document.createElement("DIV");
    btn.innerHTML = `<button type="button" name="button" onclick="chooseCard(${i})">${hand[i].forma} ${hand[i].numero} ${hand[i].color} ${hand[i].relleno}</button>`
    document.body.appendChild(btn);
  }
}

display(newHand());
