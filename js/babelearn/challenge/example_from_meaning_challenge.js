/*jshint esversion: 8 */

import {Challenge} from './challenge.js';
import {SemanticWordDescription} from "../babelnet_interface/semantic_api/semantic_api.js";
import {SemanticSentenceDescription} from "../babelnet_interface/semantic_api/semantic_api.js";
import {ChallengeBuildFailedError} from './challenge.js';

// Challenge 2

/**
 * The user is given the game word and a meaning of her, and must provide a sentence in which the
 * game word (or a synonym) is used in the given meaning.
 * 
 * @extends {Challenge}
 */
export class ExampleFromMeaningChallenge extends Challenge{
    /**
     * @param {string} word The word to use for this challenge. 
     * @param {string} wordLang The language the given word is expressed into. Use two letters abbreviations, e.g. 'EN' for English. 
     * @param {string} gameLang Game language. Use two letters abbreviations, e.g. 'EN' for English. 
     * @throws {TypeError} if word or wordLang are not specified.
     */
    constructor(word, wordLang, gameLang) {
        if(word == null || wordLang == null || gameLang == null){
          throw new TypeError('Word, her language and the game language must be specified');
        }
      
        const description = "Given a word and its meaning, write a sentence that uses the word in the right context. \n";
        super(word, wordLang, gameLang,null, description);
        this.semanticWordDescription = null;
    }

    /**
     * See {@link Challenge}.
     * 
     * @throws {ChallengeBuildFailedError} if it's unable to build the challenge.
     */
    async generate(){
        this.semanticWordDescription = new SemanticWordDescription(this.getWord(), this.getWordLang(), [this.getGameLang()], null);

        await this.semanticWordDescription.initialize().then((res) => {});

        while(this.semanticWordDescription.getMeaning(this.getGameLang()) == null){
          if(this.semanticWordDescription.hasAnotherMeaning()){
            await this.semanticWordDescription.nextMeaning().then((res) => {});
          }else{
              throw new ChallengeBuildFailedError();
          }
        }
        // while(this.semanticWordDescription.getExamples(this.getGameLang()).length <= 0 ||
        //       this.semanticWordDescription.getMeaning(this.getGameLang()) == null){
        //   if(this.semanticWordDescription.hasAnotherMeaning()){
        //     await this.semanticWordDescription.nextMeaning().then((res) => {});
        //   }else{
        //       throw new ChallengeBuildFailedError();
        //   }
        // }

        //this.setSolution(this.semanticWordDescription.getExamples(this.getGameLang())[0]);
        this.setExerciseMain(this.semanticWordDescription.getMeaning(this.getGameLang()));
    }

  getWordInGameLang() {
      try{
        return this.semanticWordDescription.getLemma(this.getGameLang());
      }catch(error){
        return "";
      }

  }

  /**
   * See {@link Challenge}.
   */
  async guess(answer) {
        let semanticSentenceDescription = new SemanticSentenceDescription(answer, this.getGameLang());
        let correctAnswer = false;

        await semanticSentenceDescription.initialize().then((res) => {
            correctAnswer = semanticSentenceDescription.checkForUsage(this.semanticWordDescription);
        });

        if(!correctAnswer){
          console.log("Risposta sbagliata");
            let userSemanticWordDescription = semanticSentenceDescription.getSemanticWordDescription(this.getWordInGameLang(), [this.getGameLang()]);
            if(userSemanticWordDescription == null){
              console.log("SEMANTIC WORD DESCRIPTION FOR DISAMBIGUATION E NULL");
                this.setExerciseWrongAnswerInfo(null);
            }
            else{
                console.log("Disambiguazione in corso...");
                await userSemanticWordDescription.initialize().then((res) => {
                  this.setExerciseWrongAnswerInfo(userSemanticWordDescription.getMeaning(this.getGameLang()));
                });
            }
        }

        return correctAnswer;
    }
}
