import {CHALLENGE_TYPE} from './enum.js';
import {CHALLENGE_DIFFICULTY} from './enum.js';
import {Challenge} from './challenge.js'
import {ExampleFromMeaningChallenge} from './example_from_meaning_challenge.js'
import {FourImagesOneWordChallenge} from './four_images_one_word_challenge.js'
import {MeaningFromExampleChallenge} from './meaning_from_example_challenge.js'
/*
 * Implements a challenge factory according to the factory method pattern.
 */
export class ChallengeFactory {

    constructor(){
        this.words = {
          EASY: ['play', 'work', 'left','ride','run'],
          MEDIUM: [],
          HARD: []
        };
    }

    /**
     * Creates and returns a new Challenge
     *
     * @param {CHALLENGE_DIFFICULTY} difficulty of the challenge to return.
     * @param {CHALLENGE_TYPE} type of the challenge to return.
     * @param {string} gameLang, language in which the challenge are created .
     * @returns {Challenge}
     */
    getNewChallenge(difficulty, type, gameLang){
        let words = [];

        switch(difficulty){
            case CHALLENGE_DIFFICULTY.EASY:
              console.log("the chosen difficulty is easy");
              words = this.words.EASY;
              break;
            case CHALLENGE_DIFFICULTY.MEDIUM:
              console.log("the chosen difficulty is medium");
              words = this.words.MEDIUM;
              break;
            case CHALLENGE_DIFFICULTY.HARD:
              console.log("the chosen difficulty is hard");
              words = this.words.HARD;
              break;
            default:
              throw 'Difficulty '+difficulty.toString()+' does not exists.';
        }


        console.log("THE LIST OF WORDS IS: ", words);

        let gameWord = words[Math.floor(Math.random() * words.length)];
        console.log("THE WORD SELECTED IS: ", gameWord);

        switch(type){
            case CHALLENGE_TYPE.MEANING_FROM_EXAMPLE_CHALLENGE:
              return new MeaningFromExampleChallenge(gameWord, 'EN', gameLang);
            case CHALLENGE_TYPE.EXAMPLE_FROM_MEANING_CHALLENGE:
              return new ExampleFromMeaningChallenge(gameWord, 'EN', gameLang);
            case CHALLENGE_TYPE.FOUR_IMAGES_ONE_WORD_CHALLENGE:
              return new FourImagesOneWordChallenge(gameWord, 'EN', gameLang);
            default:
             throw 'Type '+type.toString()+' does not exists.'
        }


    }
}
