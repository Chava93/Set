import { Component, OnInit } from '@angular/core';
import { CloudfunctionsService } from './cloudfunctions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor (private functions: CloudfunctionsService) {}
  title = 'set';
  features = {
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
  hand = [];
  activeCards = [];
  sets = [];
  foundSets = [];

  ngOnInit() {
    this.newHand();
  }

  newHand() {
    this.hand = [];
    this.foundSets = [];
    var size = 12;
    for (var i = 0; i < size; i++) {
      this.hand.push(this.newCard(this.hand));
    }
    this.functions
      .getSets(this.hand)
      .subscribe(response => {
        this.sets = [
          [0, 1, 2],
          [1, 2, 3]
        ];
      });
  }

  newCard(hand) {
    var card = {};
    for (var key in this.features) {
      card[key] = this.features[key][Math.floor(Math.random()*this.features[key].length)];
    }
    var repetida = hand.some((x)=>{
      var matches = 0;
      for (var key in this.features) {
        if (card[key] == x[key]) {
          matches += 1;
        }
      }
      console.log("holi")
      return matches == Object.keys(this.features).length;
    });

    if (repetida) {
      return this.newCard(hand);
    }
    return card;
  }

  checkSet(activeCards) {
    for (let i = 0; i < this.foundSets.length; i++) {
      if (this.foundSets[i][0] == activeCards[0] && this.foundSets[i][1] == activeCards[1] && this.foundSets[i][2] == activeCards[2]) {
        console.log("Ya habías encontrado este set.")
        return false;
      }
    }

    for (let i = 0; i < this.sets.length; i++) {
      if (this.sets[i][0] == activeCards[0] && this.sets[i][1] == activeCards[1] && this.sets[i][2] == activeCards[2]) {
        this.foundSets.push(this.sets[i]);
        return true;
      }
    }
    return false;
  }

  chooseCard(x, cardIndex) {
    if (this.activeCards.includes(cardIndex)) {
      return;
    }
    if (this.activeCards.length < 3) {
      this.activeCards.push(cardIndex)
    }
    if (this.activeCards.length == 3) {
      if (this.checkSet(this.activeCards.sort())) {
        console.log('yes! that is a set!');
        this.activeCards = [];
      } else {
        console.log('Nope. Try again.');
        this.activeCards = [];
      }

    }
  }

}
