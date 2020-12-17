/**
 * Abstract Base Class per le challenge.
 */
export class Challenge {
    constructor(word, wordLang, additionalLang){
        // Verify that the class is not instantiated directly, but only thorugh subclasses
        if(this.constructor == Challenge){
            throw new TypeError('Abstract class Challenge cannot be instantiated directly.');
        }

        if(this.generate === undefined){
            throw new TypeError('Classes extending the Challenge abstract class'); 
        }

    }

    async generate(){}

    guess(answer){}

    getSolution(){}
}