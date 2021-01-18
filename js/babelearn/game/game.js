/*jshint esversion: 8 */

import {CHALLENGE_TYPE} from '../challenge/enum.js';
import {CHALLENGE_DIFFICULTY} from '../challenge/enum.js';
import {ChallengeFactory} from '../challenge/challenge_factory.js';

/**
 * Represents an instance of the game.
 */
export class Game {

    constructor(){
        this.score = 0;
        this.currentChallenge = null;
        this.challengeFactory = new ChallengeFactory();
        this.gameLang = 'EN';
    }

    /**
     * Starts a new Challenge. In particular, changes the current challenge with
     * a new challenge according to the difficulty and type specified.
     *
     * @param {CHALLENGE_DIFFICULTY} difficulty of the challenge to return.
     * @param {CHALLENGE_TYPE} type of the challenge to return.
     */
    startNewChallenge(difficulty, type){
      this.currentChallenge = this.challengeFactory.getNewChallenge(difficulty, type, this.getGameLang());
    }

    /** 
     * @returns {Challenge}
     */
    getCurrentChallenge(){
      return this.currentChallenge;
    }

    /**
     * Check whether the given answer is correct for the current challenge.
     *
     * @param {string} userAnswer Answer attempt for this challenge.
     */
    async guess(userAnswer){
      var correctAnswer = await this.currentChallenge.guess(userAnswer);
      return correctAnswer;
    }

    /**
     * @returns {string}
     */
    getSolution(){
      return this.currentChallenge.getSolution();
    }

    /**
     * @returns {string}
     */
    getGameLang(){
      return this.gameLang;
    }

    setGameLang(gameLang){
      this.gameLang = gameLang;
    }
}
