import { BabelProxy } from '../babelproxy/babelproxy.js'

/**
 * Convenience class to represent a custom exception.
 */
export class NotInitializedError extends Error{}

/**
 * Represents the semantic description of a certain sentence in a certain language. It uses a {@link BabelProxy} instance
 * in order to disambiguate the sense of the words used in the sentence using the Babelfy API and stores the synsetIDs associated to those words.
 * Since full initialization requires Internet access, the bulding process of an instance of this class is split in two parts,
 * to allow to defer the time-consuming Internet communication to when it's more appropriate for the API user. When the object is built 
 * the information necessary to the disambiguation is stored, but for the disambiguation to actually happen it's necessary to call the initialize()
 * method on the instance, so it must be called before using any other method or accessing any property of the instance.
 */
export class SemanticSentenceDescription {
    /**
     * Stores the information necessary for the disambiguation process to succeed.
     * 
     * @param {string} sentence The sentence to analyze.
     * @param {string} language The language the given sentence is expressed into. Use two letters abbreviation, e.g. 'EN' for English.
     */
    constructor(sentence, language){
        if(sentence == null || language == null){
            throw new TypeError('Sentence and her language must be both specified.');
        }

        this.sentence = sentence;
        this.sentenceLang = language;

        /** @private */
        this.proxy_ = new BabelProxy('86994456-f309-4bce-8e40-838b9284a220');

        this.isInitialized = false;
        this.disambiguatedWords = null; // Google style conventions require to set all of the fields in the constructor
    }

    /**
     * Performs the actual disambiguation and stores the result as a mapping {word: synsetID}, for each word in the
     * sentence associated to the instance whose sense the Babelfy API was able to disambiguate.
     */
    async initialize(){
        this.disambiguatedWords = await this.proxy_.getBabelfySynsets(this.sentence, this.sentenceLang);
        this.isInitialized = true;
    }

    /**
     * Checks if the instance has been initialized before using any other method on her.
     * 
     * @private
     */
    initializationErrorChecking_(){
        if(!this.isInitialized){
            throw new NotInitializedError('This instance of SemanticSentenceDescription is not initialized. Please call initialize() on her.')
        }
    }

    /**
     * Returns a {@link SemanticWordDescription} object encapsulating the meaning found by Babelfy for the given
     * word of the sentence associated to this object.
     * The returned SemanticWordDescription object must be initialized before being used.
     * 
     * @param {string} word The word of the sentence associated to this object whose meaning, if found, will be encapsulated in the returned object.
     * @param {string[]} targetLanguages The languages to associate to the returned {@link SemanticWordDescription}.
     * @returns {SemanticWordDescription} A {@link SemanticWordDescription} encapsulating the given word and her meaning in the sentence associated to this {@link SemanticSentenceDescription}.
     */
    getSemanticWordDescription(word, targetLanguages){
        /**
         * This method is useful because after obtaining the semantic description of a word of the sentence the
         * checkForEquality can be invoked on her passing the SemanticWordDescription of another word, allowing to check
         * if a word has been used in the sentence with the same meaning as another word.
         */
        this.initializationErrorChecking_();

        // Get all the available words (can't use Object.keys() because it would return array indices)
        var words = [];
        this.disambiguatedWords.forEach((element) => {
            words.push(element['word']);
        });

        // Check if the required word is available
        if(word == null || !words.includes(word)){
            return null;
        }

        // Loop over the available words
        for(var i = 0; i < words.length; i++){
            if(words[i] == word){
                // When you find the required one, build a SemanticWordDescription object through her synsetID
                return new SemanticWordDescription(null, null, targetLanguages, null, this.disambiguatedWords[i]['synsetID']);
            }
        }
    }
}

/**
 * Represents the semantic description of a certain word.
 * When the constructor is called, the information necessary to build the description is stored in the instance, but
 * since actually building the description requires Internet communication, this action is deferred to when the initialize()
 * method is called, in order to allow the API user to choose when this communication must happen. This implies that it's
 * mandatory to call the initialize() method before calling any other method or accessing any property of the instance.
 */
export class SemanticWordDescription {
    /**
     * Default parameters here are only for documentation purposes.
     * 
     * @param {string} word The word whose semantic description will be built. Can be omitted if the synsetID is provided.
     * @param {string} language The language the given word is expressed into.
     * @param {string[]} targetLangs The languages in which language-dependent elements (lemma, examples, meaning) of this instance will be available.
     * @param {number} meaningPos This value allows to select different meanings of the same word: if you call different time this
     *  method with the same value for all the parameters except this one, you will get each time a different meaning of the same word to be
     *  associated to the {@link SemanticWordDescription} instance. If you don't have this necessity, just put it to zero, or even to null if you
     *  provide the synsetID. In general, it must be a non-negative integer.
     * @param {string} synsetID The synsetID upon which the semantic word description encapsulated by this object will be built.
     *  Can be omitted if word and language are provided.
     */
    constructor(word=null, language=null, targetLangs=['EN'], meaningPos=null, synsetID=null){
        // synsetID or word AND language must be provided
        if(synsetID == null && (word == null || language == null)){
            throw new TypeError('The synset ID or the desired word and her language must be specified.');
        }

        if (targetLangs == null || targetLangs.length > 4 || targetLangs.length < 1 || !Array.isArray(targetLangs)){
            throw new RangeError('At least 1 and at most 4 target languages must be specified by passing an array of strings.');
        }

        // Unless the synsetID has been provided, also the meaningPos is mandatory
        if (synsetID == null && (meaningPos == null || meaningPos < 0)){
            throw new RangeError("'meaningPos' must be specified and must be an integer valued at least 0.");
        }

        /** @private */
        this.proxy_ = new BabelProxy('86994456-f309-4bce-8e40-838b9284a220');

        /** @private */
        this.synsetID_ = synsetID;

        /** @private */
        this.lemma_ = word;

        /** @private */
        this.wordLang_ = language; // language 'word' is expressed into

        this.availableLangs = targetLangs;
        this.meaningPos = meaningPos;
        this.isInitialized = false;

        /** @private */
        this.apiResponse_ = null; // Google style conventions require to set all of the fields in the constructor
    }

    async initialize(){
        /**
         * When a synsetID is given, the information regarding the lemma and her language is taken by the first sense available
         * in the response received by the BabelNet API. This flag is used to understand whether this must be done.
         */
        var isSynsetIdGiven = false; 

        // The synsetID, if specified, is the preferred method to build the instance
        if(this.synsetID_ == null){
            // it was not provided in the constructor
            var synsetIDs = await this.proxy_.getBabelnetSynsets(this.lemma_, this.wordLang_); // VSCode suggests that await has no effect here, but evidences show that it has.
            if(synsetIDs.length <= this.meaningPos){
                throw new RangeError('The required meaningPos is not availabe, try to provide a smaller value and perform the initialization again.');
            }
            this.synsetID_ = synsetIDs[this.meaningPos];
        }
        else{
            isSynsetIdGiven = true;
        }

        this.apiResponse_ = await this.proxy_.getSynsetInfo(this.synsetID_, this.availableLangs);
        
        if(isSynsetIdGiven){
            // Init wordLang and lemma to the values of the first sense in the response
            this.wordLang_ = this.apiResponse_["senses"][0]["properties"]["language"];
            this.lemma_ = this.apiResponse_["senses"][0]["properties"]["simpleLemma"];
        }

        this.isInitialized = true;
    }

    /**
     * Checks if the instance has been initialized before using any other method on her.
     * 
     * @private
     */
    initializationErrorChecking_(){
        if(!this.isInitialized){
            throw new NotInitializedError('This instance of SemanticWordDescription is not initialized. Please call initialize() on her.')
        }
    }

    /**
     * Convenience method used by the methods which received a desired language as a parameter to check if that
     * language is available for this semantic word description.
     * 
     * @param {string} lang Desired language.
     * @private
     */
    desiredLangValidation_(lang){
        if(!this.availableLangs.includes(lang)){
            throw new TypeError('The requested language is not available.');
        }
    }

    /**
     * Retrieves the first lemma in the required language associated to this {@link SemanticWordDescription}.
     * 
     * @param {string} targetLang Language of the retrieved lemma. Must be one of the languages specified when this object was built.
     * @returns {string} The first lemma in the required language associated to this {@link SemanticWordDescription}.
     */
    getLemma(targetLang){
        if(targetLang == null || (this.wordLang_ != targetLang && !this.availableLangs.includes(targetLang))){
            throw new TypeError('Lemma not available in the required language.')
        }

        var senses = this.apiResponse_["senses"];
        for(var i = 0; i < senses.length; i++){
            if(senses[i]['properties']['language'] == targetLang){
                return senses[i]['properties']['simpleLemma'];
            }
        }
    }

    /**
     * Retrieves the meaning of the word associated to this SemanticWordDescription, in the required language.
     * 
     * @param {string} lang Language of the retrieved meaning. Must be one of the languages specified when this object was built.
     * @returns {string} The meaning of the word associated to this SemanticWordDescription, in the required language.
     *  If no valid meaning is available, returns null.
     */
    getMeaning(lang){
        this.initializationErrorChecking_();

        this.desiredLangValidation_(lang); 

        // forEach does not work properly here
        var glosses = this.apiResponse_.glosses;
        for(var i = 0; i < glosses.length; i++){
            if(glosses[i]['language'] == lang){
                console.log('found gloss') // DEBUG
                return glosses[i]['gloss'];
            }
        }

        // It's not sure that a synset will always be associated to a gloss (see notes)
        return null;
    }

    /**
     * Retrieves usage examples for the word associated to this SemanticWordDescription, in the required language.
     * 
     * @param {string} lang The language the examples will be expressed into. Must be one of the languages specified when this object was built.
     * @returns {string[]} All the examples available in the required language. Can be an empty list if no example is found.
     */
    getExamples(lang){
        this.initializationErrorChecking_();
        this.desiredLangValidation_(lang);

        var examplesList = [];

        this.apiResponse_.examples.forEach((example) => {
            examplesList.push(example['example']);
        });

        return examplesList;
    }

    /**
     * Retrieves images associated to the word linked to this SemanticWordDescription.
     * 
     * @returns {string[]} An array containing the URLs of the images. Returned array could be empty if no image is found.
     */
    getImages(){
        this.initializationErrorChecking_();

        var imageURLs = [];

        this.apiResponse_.images.forEach((image) => {
            imageURLs.push(image['url']);
        });

        return imageURLs;
    }

    /**
     * Checks if a word in a given language is compatible with the word associated to this semantic word description.
     * The term "compatible" is used instead of "equal" because the comparison is based on the existence of a synsetID
     * associated to the given word which is equal to the synsetID associated to this object, but, if for example the 
     * given word is extracted from a sentence without prior disambiguation, that word could have been used in that
     * sentence with a meaning different from the meaning of the word associated to this object.
     * 
     * @param {string} word 
     * @param {string} lang Can be any language (but it must be supported by the BabelNet API).
     * @returns {boolean} True if the words are compatible.
     */
    async checkForCompatibility(word, lang){
        this.initializationErrorChecking_();

        // Get a list of the synsetIDs associated to the given word
        var inSynsets = await this.proxy_.getBabelnetSynsets(word, lang);

        // Check if one of them is equal to the synsetID associated to this object
        for(var i = 0; i < inSynsets.length; i++){
            if(inSynsets[i] == this.synsetID_){
                return true;
            }
        }

        return false;
    }

    /**
     * Check if two words are equal (same lemma and meaning).
     * 
     * @param {SemanticWordDescription} semanticWordDescription The word to compare with the one associated to this object.
     * @returns {boolean} True if the words associated to this object and the given one are equal (same lemma and meaning).
     */
    checkForEquality(semanticWordDescription){
        // Check if the synsetIDs are equal
        this.initializationErrorChecking_();
        return semanticWordDescription.synsetID_ == this.synsetID_;
    }
}