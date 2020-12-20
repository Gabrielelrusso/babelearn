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
        console.log("EXAMPLE FROM MEANING HAS BEEN CREATED.");
        console.log("WORD: ", word);
        console.log("WORD LANG: ", wordLang);
        console.log("GAME LANG: ", gameLang);
        const description = "Given a word and its meaning, write a sentence that uses the word in the right context. \n";
        super(word, wordLang, gameLang,null, description);
        this.semanticWordDescription = null;
    }

    async generate(){
        this.semanticWordDescription = new SemanticWordDescription(this.getWord(), this.getWordLang(), [this.getGameLang()], null);

        await this.semanticWordDescription.initialize().then((res) => {
            let hasSolution = false;
            let hasGloss = false;
            let solution = "";
            let gloss = "";

            do{
                let solutions = this.semanticWordDescription.getExamples(this.getWordLang());

                if(solutions.length > 0){
                    hasSolution = true;
                    solution = solutions[0];
                }
                else{
                    hasSolution = false;
                    solution = null;
                }

                gloss = this.semanticWordDescription.getMeaning(this.getWordLang());
                if( gloss.length > 0){
                    hasGloss = true;
                }
                else{
                    hasGloss = false;
                }

                if(!hasSolution || !hasGloss){
                    if(this.semanticWordDescription.hasAnotherMeaning()){
                        this.semanticWordDescription.nextMeaning();
                    }else{
                        throw new ChallengeBuildFailedError();
                    }
              }

            }while(!hasSolution || !hasGloss);

            this.setSolution(solution);
            this.setExerciseMain(gloss);
        });
    }

    async guess(answer) {
        let semanticSentenceDescription = new SemanticSentenceDescription(answer, this.getGameLang());
        var correctAnswer = false;

        await semanticSentenceDescription.initialize().then((res) => {
            correctAnswer = semanticSentenceDescription.checkForUsage(this.semanticWordDescription);
        });

        return correctAnswer;
    }
}
