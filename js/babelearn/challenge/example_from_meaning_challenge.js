/*jshint esversion: 8 */

import {Challenge} from './challenge.js';
import {SemanticWordDescription} from "../babelnet_interface/semantic_api/semantic_api.js";
import {SemanticSentenceDescription} from "../babelnet_interface/semantic_api/semantic_api.js";
import {ChallengeBuildFailedError} from './challenge.js';

/**
 * Challenge 2.
 */
export class ExampleFromMeaningChallenge extends Challenge{
    constructor(word, wordLang, gameLang) {
        const description = "Given a word and its meaning, write a sentence that uses the word in the right context. \n";
        super(word, wordLang, gameLang,null, description);
        this.semanticWordDescription = null;
    }

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
    return this.semanticWordDescription.getLemma(this.getGameLang());
  }

  async guess(answer) {
        let semanticSentenceDescription = new SemanticSentenceDescription(answer, this.getGameLang());
        let correctAnswer = false;

        await semanticSentenceDescription.initialize().then((res) => {
            correctAnswer = semanticSentenceDescription.checkForUsage(this.semanticWordDescription);
        });

        if(!correctAnswer){
            let userSemanticWordDescription = semanticSentenceDescription.getSemanticWordDescription(this.getWord(), [this.getGameLang()]);
            if(userSemanticWordDescription == null){
                this.setExerciseWrongAnswerInfo(null);
            }
            else{
                await userSemanticWordDescription.initialize().then((res) => {
                  this.setExerciseWrongAnswerInfo(userSemanticWordDescription.getMeaning(this.getGameLang()));
                });
            }
        }

        return correctAnswer;
    }
}
