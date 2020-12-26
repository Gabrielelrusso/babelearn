/*jshint esversion: 8 */

import {Challenge, ChallengeBuildFailedError} from './challenge.js';
import {SemanticWordDescription} from '../babelnet_interface/semantic_api/semantic_api.js';

/**
 * Challenge 4.
 */
export class FourImagesOneWordChallenge extends Challenge{
    /**
     *
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

        var description = 'Look at the four images and identify the word they represent.';
        super(word, wordLang, gameLang, null, description);

        this.NUM_GAME_IMAGES = 4;
    }

    async generate(){
        this.gameWordSemanticDescription = new SemanticWordDescription(this.getWord(), this.getWordLang(), [this.getGameLang()], null);

        await this.gameWordSemanticDescription.initialize().then((res) => {
          console.log("game word semantic description initialized");
        });

        var images = this.gameWordSemanticDescription.getImages(); // return value is always != null
        while(images.length < this.NUM_GAME_IMAGES){
            if(this.gameWordSemanticDescription.hasAnotherMeaning()){
                await this.gameWordSemanticDescription.nextMeaning().then((res) => {});
                images = this.gameWordSemanticDescription.getImages();
            }
            else{
                throw new ChallengeBuildFailedError('Unable to build FourImagesOneWordChallenge');
            }
        }

        var start = Math.round(Math.random()*images.length) - this.NUM_GAME_IMAGES;
        // if there is only the number of images needed, start could be less than zero
        if (start < 0){
            start = 0;
        }

        let gameImages = images.slice(start, start+this.NUM_GAME_IMAGES); // slice() excludes upper limit
        this.setExerciseOptions(gameImages);
        /**
         * Set one of the possible solutions, e.g. to eventually show it to the user, but guess(answer) method will
         * also accept synonyms of the game word.
         */
        this.setSolution(this.gameWordSemanticDescription.getLemma(this.getGameLang()));
    }

    async guess(answer){
        // Bring everything to lower case since 'answer' come from front-end
        var compatible = await this.gameWordSemanticDescription.checkForCompatibility(answer, this.getGameLang());
        return compatible;
    }
}

