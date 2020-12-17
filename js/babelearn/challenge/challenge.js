/**
 * Abstract Base Class per le challenge.
 * 
 */
export class Challenge {
    constructor(word, wordLang, additionalLang){
        // Verify that the class is not instantiated directly, but only thorugh subclasses
        if(this.constructor == Challenge){
            throw new TypeError('Abstract class Challenge cannot be instantiated directly.');
        }

        /** @private */
        this.description_ = null;

        /** @private */
        this.solution_ = null;

        /** @private */
        this.word_ = word;

        /** @private */
        this.wordLang_ = wordLang;

        /** @private */
        this.additionalLang_ = additionalLang;

        /** @private */
        this.exercise_ = null;

        /** @private */
        this.wrongAnswerInfo_ = null;
    }

    /**
     * Se una sottoclasse non implementa uno di questi metodi, non viene lanciata l'eccezione quando l'oggetto della sottoclasse
     * viene creato (Javascript non lo supporta) ma viene lanciata quando si prova ad utilizzare il metodo non overloaded.
     */

    async generate(){
        throw new TypeError('Subclasses of abstract class Challenge must provide an implementation for the generate() method.');
    }

    guess(answer){
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

    getWordLang(){
        return this.wordLang_;
    }

    getAdditionalLang(){
        return this.additionalLang_;
    }

    getExercise(){
        return this.exercise_;
    }

    getWrongAnswerInfo(){
        return this.wrongAnswerInfo_;
    }
}