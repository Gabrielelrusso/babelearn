import CHALLENGE_TYPE from './enum.js';
import CHALLENGE_DIFFICULTY from './enum.js';
import Challenge from './challenge.js'
/*
 * Implements a challenge factory according to the factory method pattern.
 */
export class ChallengeFactory {

    constructor(){
        this.words = {
          EASY: ['play', 'work', 'left'],
          MEDIUM: [''],
          HARD: []
        };
    }

    /**
     * Creates a list of BabelNet synset IDs from the response received by the BabelNet API.
     * The synsets IDs are represented as strings.
     *
     * @param {CHALLENGE_DIFFICULTY} difficulty of the challenge to return.
     * @param {CHALLENGE_TYPE} type of the challenge to return.
     * @returns {Challenge}
     */
    getNewChallenge(difficulty, type){
        let words = [];

        switch(difficulty){
            case difficulty.EASY:
              words = this.words.EASY;
            case difficulty.MEDIUM:
              words = this.words.MEDIUM;
            case difficulty.HARD:
              words = this.words.HARD;
        }

        let gameWord = words[Math.floor(Math.random() * words.length)];

        switch(type){
            case type.CHALLENGE_1:
              return
            case type.CHALLENGE_2:
              return
            case type.CHALLENGE_4:
              return
        }

        throw 'Type '+type+'does not exists.'
    }


}
