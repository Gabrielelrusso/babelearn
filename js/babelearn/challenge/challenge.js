/**
 * Abstract Base Class per le challenge.
 */
export class Challenge {
    constructor(word, wordLang, additionalLang){
        // Verify that the class is not instantiated directly, but only thorugh subclasses
        if(this.constructor == Challenge){
            throw new TypeError('Abstract class Challenge cannot be instantiated directly.');
        }

        // Verify that all the methods of the abstract class are implemented by subclasses
        if(this.generate === undefined || this.guess === undefined || this.getSolution === undefined){
            throw new TypeError('Classes extending the Challenge abstract class must implement all of her methods.'); 
        }

        /** @private */
        this.question_ = null;
        
        /** @private */
        this.solution_ = null;
    }

    async generate(){}

    guess(answer){}

    getSolution(){}
}