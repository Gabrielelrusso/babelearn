/*jshint esversion: 8 */

import {Challenge, ChallengeBuildFailedError} from './challenge.js';
import {SemanticWordDescription} from '../babelnet_interface/semantic_api/semantic_api.js';

// Challenge 4.

/**
 * The user is given four images and must identify the word which represents them.
 * 
 * @extends {Challenge}
 */
export class FourImagesOneWordChallenge extends Challenge{
    /**
     * @param {string} word The word to use for this challenge. 
     * @param {string} wordLang The language the given word is expressed into. Use two letters abbreviations, e.g. 'EN' for English. 
     * @param {string} gameLang Game language. Use two letters abbreviations, e.g. 'EN' for English. 
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

    /**
     * See {@link Challenge}.
     * 
     * @throws {ChallengeBuildFailedError} if it's unable to build the challenge.
     */
    async generate(){
        this.gameWordSemanticDescription = new SemanticWordDescription(this.getWord(), this.getWordLang(), [this.getGameLang()], null);

        await this.gameWordSemanticDescription.initialize().then((res) => {
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
        
        /* var start = Math.round(Math.random()*images.length) - this.NUM_GAME_IMAGES;
        // if there is only the number of images needed, start could be less than zero
        if (start < 0){
            start = 0;
        } */

        // Always choose the first images, since they're the most significative ones
        var start = 0;

        let gameImages = images.slice(start, start+this.NUM_GAME_IMAGES); // slice() excludes upper limit
        this.setExerciseOptions(gameImages);
        /**
         * Set one of the possible solutions, e.g. to eventually show it to the user, but guess(answer) method will
         * also accept synonyms of the game word.
         */
        this.setSolution(this.gameWordSemanticDescription.getLemma(this.getGameLang()));
    }

    /**
     * See {@link Challenge}.
     */
    async guess(answer){
        // Bring everything to lower case since 'answer' come from front-end
        var compatible = await this.gameWordSemanticDescription.checkForCompatibility(answer, this.getGameLang());
        return compatible;
    }
}

