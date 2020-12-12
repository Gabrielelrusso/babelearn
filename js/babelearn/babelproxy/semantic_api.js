/**
 * Implements a facade towards the BabelProxy class, in order to decouple the business logic
 * of the game from the details of the BabelNet/Babelfy API (e.g. existance of synsets, synset IDs
 * and so on).
 */
class SemanticOracle {
    constructor(){}

    /**
     * Retrieves the first N meanings of a given word, together with some usage examples for
     * each of them.
     * 
     * @param {string} word The word to search for.
     * @param {string} language The language the given word belongs to. Use two letters abbreviations, e.g. 'EN' for English.
     * @param {number} n The number of meanings to retrieve. Must be a strictly positive integer.
     * @returns {{string: {'examples': string[], 'meaning': string[]}}} An Object mapping the given word to an Object containing the meanings and the examples.
     */
    getTopMeaningsWithExamples(word, language, n){

    }   

    /**
     * Retrieves the i-th meaning of a given word.
     * 
     * @param {string} word The word whose meaning will be searched.
     * @param {string} language The language the given word belongs to. Use two letters abbreviations, e.g. 'EN' for English.
     * @param {number} meaningPosition The position of the meaning in the list of meanings of the given word, e.g. settings this
     *     to 1 allows to retrieve the first meaning of the word. The order of the meanings, and so which one is the i-th
     *     meaning of a word, depends on the underlying BabelNet API, so the position is only intended to be used to retrieve 
     *     different meanings of the same word, by calling this method with the same word and language but changing the position.
     *     This number must be a non-negative integer (positions are zero-based).
     * @returns {string} A meaning of the given word.
     */
    getMeaning(word, language, meaningPosition){

    }

    /**
     * Retrieves the meanings, according to the context in which they are used, of the words located at given positions in a given phrase. 
     * 
     * @param {string} phrase 
     * @param {number[]} positions 
     * @returns {string[]} An array containing the meaning of each of the required words.
     */
    getMeaningAtPositions(phrase, positions){

    }

    /**
     * Given a word which has a certain meaning in a certain language, check if another word, in another language, has a sense
     * compatible to that meaning.
     * 
     * @param {string} word1 
     * @param {string} language1 
     * @param {string} meaning1
     * @param {string} word2 
     * @param {string} language2 
     * @returns {boolean} true if there exist a sense for the second word in her language for which it has the same meaning as the given one.
     */
    checkForEquality(word1, language1, meaning1, word2, language2){
        /**
         * Prendi lista di synset di word1 in language1, per ogni synset prendi il main gloss fino a che non ne trovi uno uguale a 
         * meaning1, poi prendi il synsetID corrispondente e verifica se coincide con uno dei synsetID di word2 in language2.
         * -> NOTA: è "lineare" (c'è il check del meaning) rispetto alla somma del numero di synsetID delle due parole, mentre se non 
         * passassi il meaning sarebbe proporzionale al prodotto del numero dei synsetID delle due parole.
         */

    }   

    /**
     * Retrieves a list of image URLs associated to the i-th meaning of a given word in a given language.
     * 
     * @param {string} word The word whose associated image URLs will be searched.
     * @param {word} language The language the given word belongs to. Use two letters abbreviations, e.g. 'EN' for English.
     * @param {number} meaningPosition The position of the meaning in the list of meanings of the given word, e.g. settings this
     *     to 1 allows to retrieve the images associated to the first meaning of the word. The order of the meanings, and so which one is the i-th
     *     meaning of a word, depends on the underlying BabelNet API, so the position is only intended to be used to retrieve 
     *     different meanings of the same word, by calling this method with the same word and language but changing the position.
     *     This number must be a non-negative integer (positions are zero-based).
     * @returns {string[]} An array containing the URLs of the images associated to the given word in the given language.
     */
    getImages(word, language, meaningPosition){

    }



}