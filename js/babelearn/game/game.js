import {CHALLENGE_TYPE} from './enum.js';
import {CHALLENGE_DIFFICULTY} from './enum.js';
import {ChallengeFactory} from './challenge_factory.js';
/*
 * Implements the game class.
 */
export class Game {

    constructor(){
        this.score = 0;
        this.currentChallenge = null;
        this.challengeFactory = new ChallengeFactory();
    }

    /*
     * starts a new Challenge. In particular, changes the current challenge with
     * a new challenge according to the difficulty and type specified.
     *
     * @param {CHALLENGE_DIFFICULTY} difficulty of the challenge to return.
     * @param {CHALLENGE_TYPE} type of the challenge to return.
     */
    startNewChallenge(difficulty, type){
      this.currentChallenge = this.challengeFactory.getNewChallenge(difficulty, type);
    }

    getCurrentChallenge(){
      return this.currentChallenge;
    }

    guess(user_answer){
      return this.currentChallenge.guess(user_answer);
    }

    getSolution(){
      return this.currentChallenge.getSolution();
    }
}
