import {Challenge} from './challenge.js'
import {SemanticWordDescription} from "../babelnet_interface/semantic_api/semantic_api.js";
import {SemanticSentenceDescription} from "../babelnet_interface/semantic_api/semantic_api.js";
import {ChallengeBuildFailedError} from './challenge.js'

export class ExampleFromMeaningChallenge extends Challenge{
    constructor(word, wordLang, gameLang) {
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
        let userSemanticWordDescription = null;
        await semanticSentenceDescription.initialize().then((res) => {
          userSemanticWordDescription = semanticSentenceDescription.getSemanticWordDescription(this.getWord(), [this.getGameLang()]);
        });

        await userSemanticWordDescription.initialize().then((res) => {
        });

        let correctAnswer = this.semanticWordDescription.checkForEquality(userSemanticWordDescription);
        if(!correctAnswer){
            let exerciseWrongAnswerInfo = userSemanticWordDescription.getMeaning(this.getGameLang());
            this.setExerciseWrongAnswerInfo(exerciseWrongAnswerInfo);
        }

        return correctAnswer;
    }


}
