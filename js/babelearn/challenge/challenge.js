/*jshint esversion: 8 */

import { SemanticWordDescription } from "../babelnet_interface/semantic_api/semantic_api.js";

/**
 * Convenience class to represent the situation in which it's impossiblle to build a challenge obejct
 * (e.g due to lack of different meanings for a certain word).
 */
export class ChallengeBuildFailedError extends Error{}

/**
 * Abstract Base Class per le challenge.
 *
 * gameLang è la lingua di gioco, cioè la lingua in cui l'utente ha scelto di giocare. La specifichiamo
 * perché noi gestiamo sempre le parole in inglese (è più semplice per noi), però la roba sull'interfaccia
 * la mettiamo nella lingua scelta dall'utente.
 * additionalLang invece server per la challenge 3.
 */
export class Challenge {
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
     * Se una sottoclasse non implementa uno di questi metodi, non viene lanciata l'eccezione quando l'oggetto della sottoclasse
     * viene creato (Javascript non lo supporta) ma viene lanciata quando si prova ad utilizzare il metodo non overloaded.
     */

    async generate(){
        throw new TypeError('Subclasses of abstract class Challenge must provide an implementation for the generate() method.');
    }

    async guess(answer){
        throw new TypeError('Subclasses of abstract class Challenge must provide an implementation for the guess(answer) method.');
    }

    getDescription(){
        return this.description_;
    }

    getSolution(){
        return this.solution_;
    }

    getWord(){
        return this.word_;
    }

    getWordInGameLang(){
        // /**
        //  * The lemma is always the same, independently of the particular meaning it is used with, so there's no need to worry about the current
        //  * meaning used (meaningPos).
        //  */
        // let wordDescription = new SemanticWordDescription(this.word_, this.wordLang_, [this.gameLang_], null);
        // var lemma;
        // await wordDescription.initialize().then((res, lemma) => lemma = wordDescription.getLemma(this.gameLang_));
        // return lemma;
      throw new TypeError('Subclasses of abstract class Challenge must provide an implementation for the getWordInGameLang method.');
    }

    getWordLang(){
        return this.wordLang_;
    }

    getGameLang(){
        return this.gameLang_;
    }

    getAdditionalLang(){
        return this.additionalLang_;
    }

    getExerciseWrongAnswerInfo(){
        return this.exercise_["wrong-answer-info"];
    }

    getExerciseOptions(){
      this.exercise_["options"].forEach(option => {
        console.log(option+"spazio");
      })
      return this.exercise_["options"];
    }

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
