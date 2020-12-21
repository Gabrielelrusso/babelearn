/*jshint esversion: 8 */ 

import {Challenge, ChallengeBuildFailedError} from './challenge.js';
import {SemanticWordDescription} from '../babelnet_interface/semantic_api/semantic_api.js';

/**
 * Challenge 1.
 * 
 */
export class MeaningFromExampleChallenge extends Challenge{
    /**
     * 
     * @param {*} word 
     * @param {*} wordLang 
     * @param {*} gameLang
     * @throws {TypeError} if word or wordLang are not specified.
     */
    constructor(word, wordLang, gameLang){
        if(word == null || wordLang == null || gameLang == null){
            throw new TypeError('Word, her language and the game language must be specified');
        }

        var description = 'Given a word and a usage example, identify the meaning of the word in the provided usage context.';
        super(word, wordLang, gameLang, null, description);

        this.gameWordFirstMeaning = null;
        this.gameWordSecondMeaning = null;
        this.gameWordThirdMeaning = null;
    }

    /**
     * @throws {ChallengeBuildFailedError} if it's unable to build the challenge.
     */
    async generate(){
        this.gameWordFirstMeaning =  new SemanticWordDescription(this.getWord(), this.getWordLang(), [this.getGameLang()], null);
        var retry = false;
        await this.gameWordFirstMeaning.initialize().then((res) => {
            if(this.gameWordFirstMeaning.getMeaning == null ||
                this.gameWordFirstMeaning.getExamples.length == 0)
            {
                retry = true;
            }
        });

        while(
            (this.gameWordFirstMeaning.getMeaning == null ||
            this.gameWordFirstMeaning.getExamples.length == 0) &&
            this.gameWordFirstMeaning.hasAnotherMeaning()
        ){
            this.gameWordFirstMeaning.nextMeaning();
        }

        if(this.gameWordFirstMeaning.getMeaning == null || this.gameWordFirstMeaning.getExamples.length == 0){
            throw new ChallengeBuildFailedError('Unable to build MeaningFromExampleChallenge');
        }

        this.gameWordSecondMeaning = new SemanticWordDescription(this.getWord(), this.getWordLang(), [this.getGameLang()], null);
        await this.gameWordSecondMeaning.initialize().then((res) => {
            while(
                (this.gameWordSecondMeaning.getMeaning == null ||
                this.gameWordSecondMeaning.checkForEquality(this.gameWordFirstMeaning)) && 
                this.gameWordSecondMeaning.hasAnotherMeaning()
            ){
                this.gameWordSecondMeaning.nextMeaning();
            }
        });

        if(this.gameWordSecondMeaning.getMeaning == null || this.gameWordSecondMeaning.checkForEquality(this.gameWordFirstMeaning)){
            throw new ChallengeBuildFailedError('Unable to build MeaningFromExampleChallenge');
        }

        this.gameWordThirdMeaning = new SemanticWordDescription(this.getWord(), this.getWordLang(), [this.getGameLang()], null);
        await this.gameWordThirdMeaning.initialize().then((res) => {
            while(
                (this.gameWordThirdMeaning.getMeaning == null ||
                this.gameWordThirdMeaning.checkForEquality(this.gameWordFirstMeaning) ||
                this.gameWordThirdMeaning.checkForEquality(this.gameWordSecondMeaning)) &&
                this.gameWordThirdMeaning.hasAnotherMeaning()
            ){
                this.gameWordThirdMeaning.nextMeaning();
            }
        });

        if(
            this.gameWordThirdMeaning.getMeaning == null ||
            this.gameWordThirdMeaning.checkForEquality(this.gameWordFirstMeaning) ||
            this.gameWordThirdMeaning.checkForEquality(this.gameWordSecondMeaning)
        ){
            throw new ChallengeBuildFailedError('Unable to build MeaningFromExampleChallenge');
        }

        // Settare solution ed exercise
        this.setExerciseMain(this.gameWordFirstMeaning.getExamples()[0]); // the first example surely exists
        this.setExerciseOptions([this.gameWordFirstMeaning.getMeaning(), this.gameWordSecondMeaning.getMeaning(), this.gameWordThirdMeaning.getMeaning()]);

        // Shuffle options in the way suggested here: https://flaviocopes.com/how-to-shuffle-array-javascript/
        //this.exercise_.options = this.exercise_.options.sort(() => Math.random - 0.5);
        this.setExerciseOptions(this.getExerciseOptions().sort(() => Math.random - 0.5)); 

        // wrong-answer-info non ce l'ho
        
        this.setSolution(this.gameWordFirstMeaning.getMeaning());
    }

    guess(answer){
        // Bring everything to lower case since 'answer' come from front-end
        return (answer.toLowerCase() === this.getSolution().toLowerCase());
    }

}