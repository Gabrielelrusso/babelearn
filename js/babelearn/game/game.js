/*jshint esversion: 8 */

import {CHALLENGE_TYPE} from '../challenge/enum.js';
import {CHALLENGE_DIFFICULTY} from '../challenge/enum.js';
import {ChallengeFactory} from '../challenge/challenge_factory.js';

/*
 * Implements the game class.
 */
export class Game {

    constructor(){
        this.score = 0;
        this.currentChallenge = null;
        this.challengeFactory = new ChallengeFactory();
        this.gameLang = 'EN';
    }

    /*
     * starts a new Challenge. In particular, changes the current challenge with
     * a new challenge according to the difficulty and type specified.
     *
     * @param {CHALLENGE_DIFFICULTY} difficulty of the challenge to return.
     * @param {CHALLENGE_TYPE} type of the challenge to return.
     */
    startNewChallenge(difficulty, type){
      this.currentChallenge = this.challengeFactory.getNewChallenge(difficulty, type, this.getGameLang());
    }

    /*
     * starts a new Challenge. In particular, changes the current challenge with
     * a new challenge according to the difficulty and type specified.
     *
     * @returns {Challenge} currentChallenge
     */
    getCurrentChallenge(){
      return this.currentChallenge;
    }

    /*
     * the user
     *
     * @param {String} difficulty of the challenge to return.
     * @returns {Boolean} true if the answer is correct, false otherwise.
     */
    async guess(userAnswer){
      var correctAnswer = await this.currentChallenge.guess(userAnswer);
      return correctAnswer;
    }

    getSolution(){
      return this.currentChallenge.getSolution();
    }

    getGameLang(){
      return this.gameLang;
    }

    setGameLang(gameLang){
      this.gameLang = gameLang;
    }
}
