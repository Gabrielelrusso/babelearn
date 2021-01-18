/*jshint esversion: 8 */

import { SemanticWordDescription } from "../babelnet_interface/semantic_api/semantic_api.js";

/**
 * Convenience class to represent the situation in which it's impossiblle to build a challenge object
 * (e.g due to lack of different meanings for a certain word).
 */
export class ChallengeBuildFailedError extends Error{}

/**
 * Abstract Base Class for challenges.
 */
export class Challenge {
    /* 
    * gameLang è la lingua di gioco, cioè la lingua in cui l'utente ha scelto di giocare. La specifichiamo
    * perché noi gestiamo sempre le parole in inglese (è più semplice per noi), però la roba sull'interfaccia
    * la mettiamo nella lingua scelta dall'utente.
    * additionalLang invece server per la challenge 3.
    */
    /**
     * 
     * @param {string} word The word to use for this challenge. 
     * @param {string} wordLang The language given word is expressed into. Use two letters abbreviation, e.g. 'EN' for English. 
     * @param {string} gameLang Game language. Use two letters abbreviation, e.g. 'EN' for English. 
     * @param {string} additionalLang Any additional language that must be stored for the challenge (challenge 3).
     * @param {string} description Description of the challenge, i.e. what the player has to do to complete the challenge.
     */
    constructor(word, wordLang, gameLang, additionalLang, description){
        // Verify that the class is not instantiated directly, but only thorugh subclasses
        if(this.constructor == Challenge){
            throw new TypeError('Abstract class Challenge cannot be instantiated directly.');
        }

        /** @private */
        this.description_ = description;

        /** @private */
        this.solution_ = null;

        /** @private */
        this.word_ = word;

        /** @private */
        this.wordLang_ = wordLang;

        /** @private */
        this.gameLang_ = gameLang;

        /** @private */
        this.additionalLang_ = additionalLang;

        /** @private */
        this.exercise_ = {
          'main': null,
          'options': [],
          'wrong-answer-info': null,
        };

    }

    /**
     * If a subclass does not implement one of these methods, JavaScript does not throw an exception when the subclass object
     * is built, so we explicitly throw an exception when an inherited, non-overloaded method is called.
     */

    /**
     * Generates the challenge by initializing her properties.
     */
    async generate(){
        throw new TypeError('Subclasses of abstract class Challenge must provide an implementation for the generate() method.');
    }

    /**
     * Check whether the given answer is correct for this challenge instance.
     * 
     * @param {string} answer Answer attempt for this challenge.
     * @returns {boolean} True if given answer is correct. 
     */
    async guess(answer){
        throw new TypeError('Subclasses of abstract class Challenge must provide an implementation for the guess(answer) method.');
    }

    /**
     * @returns {string}
     */
    getWordInGameLang(){
        throw new TypeError('Subclasses of abstract class Challenge must provide an implementation for the getWordInGameLang method.');
    }

    /**
     * @returns {string}
     */
    getDescription(){
        return this.description_;
    }

    /**
     * @returns {string}
     */
    getSolution(){
        return this.solution_;
    }

    /**
     * @returns {string}
     */
    getWord(){
        return this.word_;
    }

    /**
     * @returns {string} The language is represnted through two-letters abbreviations, e.g. 'EN' for English.
     */
    getWordLang(){
        return this.wordLang_;
    }

    /**
     * @returns {string} The language is represnted through two-letters abbreviations, e.g. 'EN' for English.
     */
    getGameLang(){
        return this.gameLang_;
    }

    /**
     * @returns {string} The language is represnted through two-letters abbreviations, e.g. 'EN' for English.
     */
    getAdditionalLang(){
        return this.additionalLang_;
    }

    /**
     * @returns {string}
     */
    getExerciseWrongAnswerInfo(){
        return this.exercise_["wrong-answer-info"];
    }

    /**
     * @returns {Object}
     */
    getExerciseOptions(){
      this.exercise_["options"].forEach(option => {
        console.log(option+"spazio");
      })
      return this.exercise_["options"];
    }

    /**
     * @returns {string}
     */
    getExerciseMain(){
      return this.exercise_["main"];
    }

    setExerciseOptions(options){
      this.exercise_["options"] = options;
    }

    setExerciseMain(main){
      this.exercise_["main"] = main;
    }

    setSolution(solution){
        this.solution_ = solution;
    }

    setExerciseWrongAnswerInfo(info){
        this.exercise_["wrong-answer-info"] = info;
    }
}
