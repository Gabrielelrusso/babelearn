/*jshint esversion: 8 */

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
     * @throws {TypeError} if sentence or language are not specified.
     */
    constructor(sentence, language){
        if(sentence == null || language == null){
            throw new TypeError('Sentence and her language must be both specified.');
        }

        this.sentence = sentence;
        this.sentenceLang = language;

        /** @private */
        this.proxy_ = new BabelProxy('8c7346f4-59f1-41c8-a031-6369f4d9f711');

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
     * @throws {NotInitializedError} if initialize() has not been called on this instance.
     */
    initializationErrorChecking_(){
        if(!this.isInitialized){
            throw new NotInitializedError('This instance of SemanticSentenceDescription is not initialized. Please call initialize() on her.')
        }
    }

    /**
     * Checks if the given word has been used in this sentence (with the sence associated to the {@link SemanticWordDescription} which
     * encapsulates the word).
     *
     * @param {SemanticWordDescription} word
     * @throws {NotInitializedError} if initialize() has not been called on this instance.
     */
    checkForUsage(semanticWordDescription){
        this.initializationErrorChecking_();

        var synsetIDs = [];
        this.disambiguatedWords.forEach((element) => {
            synsetIDs.push(element['synsetID']);
        });

        return synsetIDs.includes(semanticWordDescription.synsetID_);

    }

    /**
     * Returns a {@link SemanticWordDescription} object encapsulating the meaning found by Babelfy for the given
     * word of the sentence associated to this object.
     * The returned SemanticWordDescription object must be initialized before being used.
     *
     * @param {string} word The word of the sentence associated to this object whose meaning, if found, will be encapsulated in the returned object.
     * @param {string[]} targetLanguages The languages to associate to the returned {@link SemanticWordDescription}. Use two letters abbreviation, e.g. 'EN' for English.
     * @returns {SemanticWordDescription} A {@link SemanticWordDescription} encapsulating the given word and her meaning in the sentence associated to this {@link SemanticSentenceDescription}.
     * @throws {NotInitializedError} if initialize() has not been called on this instance.
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
                return new SemanticWordDescription(null, null, targetLanguages, this.disambiguatedWords[i]['synsetID']);
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
     * @param {string} language The language the given word is expressed into. Use two letters abbreviation, e.g. 'EN' for English.
     * @param {string[]} targetLangs The languages in which language-dependent elements (lemma, examples, meaning) of this instance will be available. Use two letters abbreviation, e.g. 'EN' for English.
     * @param {string} synsetID The synsetID upon which the semantic word description encapsulated by this object will be built.
     *     Can be omitted if word and language are provided.
     * @throws {TypeError} if neither the synsetID nor word and language have been specified.
     * @throws {RangeError} if target languages have not been specified, they are too many or they have not been provided as an array
     */
    constructor(word=null, language=null, targetLangs=['EN'], synsetID=null){
        // synsetID or word AND language must be provided
        if(synsetID == null && (word == null || language == null)){
            throw new TypeError('The synset ID or the desired word and her language must be specified.');
        }

        if (targetLangs == null || targetLangs.length > 4 || targetLangs.length < 1 || !Array.isArray(targetLangs)){
            throw new RangeError('At least 1 and at most 4 target languages must be specified by passing an array of strings.');
        }

        /** @private */
        this.proxy_ = new BabelProxy('7cb3603a-46cb-4bca-8e7c-56f62244b039');


        /** @private */
        this.synsetID_ = synsetID;

        /** @private */
        this.lemma_ = word;

        /**
         * This value allows to select different meanings of the same word: it's used by the nextMeaning() method.
         * @private
         * */
        this.meaningPos_ = 0;

        /** @private */
        this.apiResponse_ = null; // Google style conventions require to set all of the fields in the constructor

        /** @private */
        this.maxMeaningPos_ = null;

        this.wordLang_ = language; // language 'word' is expressed into
        this.availableLangs = targetLangs;
        this.isInitialized = false;

        /**
         * Wheter on a call to initialize() a re-initialization must be forced (e.g. to change meaning).
         * @private
         */
        this.reinit_ = false;
    }

    /**
     * Actually populates this object's member variables with the data received by the BabelNet API.
     *
     */
    async initialize(){
        /**
         * When a synsetID is given, the information regarding the lemma and her language is taken by the first sense available
         * in the response received by the BabelNet API. This flag is used to understand whether this must be done.
         */
        var isSynsetIdGiven = false;

        console.log('Initializing with ', this.meaningPos_, ' meaning pos and ', this.synsetID_, ' synsetID');

        // The synsetID, if specified, is the preferred method to build the instance
        if(this.synsetID_ == null || this.reinit_){
            console.log('re-calling API');
            // it was not provided in the constructor
            var synsetIDs = await this.proxy_.getBabelnetSynsets(this.lemma_, this.wordLang_); // VSCode suggests that await has no effect here, but evidences show that it has.
            console.log("wordLang: ",this.wordLang_);
            console.log("lemma: ", this.lemma_);
            console.log("synset IDs: ",synsetIDs);
            this.maxMeaningPos_ = synsetIDs.length;
            this.synsetID_ = synsetIDs[this.meaningPos_];
            console.log("synsetIDs[", this.meaningPos_,"]: ", this.synsetID_);
        }
        else{
            isSynsetIdGiven = true;
        }

        await this.proxy_.getSynsetInfo(this.synsetID_, this.availableLangs).then((res)=>{
          this.apiResponse_ = res;
          console.log("RESPONSE: ", this.apiResponse_);
        });

        if(isSynsetIdGiven && !this.reinit_){
            // Init wordLang and lemma to the values of the first sense in the response
            this.wordLang_ = this.apiResponse_["senses"][0]["properties"]["language"];
            this.lemma_ = this.apiResponse_["senses"][0]["properties"]["simpleLemma"];
        }

        this.isInitialized = true;
        this.reinit_ = false;
    }

    /**
     * Controllare se esiste un altro synsetID associato a questa parola.
     */
    hasAnotherMeaning(){
        return this.maxMeaningPos_ - 1 > this.meaningPos_;
    }

    /**
     * Carica in quest'oggetto il significato successivo di questa parola.
     *
     * @throws {RangeError} if no new meaning is available for the word encapsulated by this object.
     */
    async nextMeaning(){
        if(this.hasAnotherMeaning()){
            this.meaningPos_ += 1;
            this.reinit_ = true;
            await this.initialize();
        }
        else{
            throw new RangeError('No new meaning is available for this word.');
        }
    }

    /**
     * Checks if the instance has been initialized before using any other method on her.
     *
     * @private
     * @throws {NotInitializedError} if initialize() has not been called on this instance.
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
     * @param {string} lang Desired language. Use two letters abbreviation, e.g. 'EN' for English.
     * @private
     * @throws {TypeError} if the required language is not available.
     */
    desiredLangValidation_(lang){
        if(!this.availableLangs.includes(lang)){
            console.log(lang," is not available");
            throw new TypeError('The requested language is not available.');
        }
    }

    /**
     * Retrieves the first lemma in the required language associated to this {@link SemanticWordDescription}.
     *
     * @param {string} targetLang Language of the retrieved lemma. Must be one of the languages specified when this object was built. Use two letters abbreviation, e.g. 'EN' for English.
     * @returns {string} The first lemma in the required language associated to this {@link SemanticWordDescription}.
     * @throws {TypeError} if the lemma is not available in the required language.
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
     * @param {string} lang Language of the retrieved meaning. Must be one of the languages specified when this object was built. Use two letters abbreviation, e.g. 'EN' for English.
     * @returns {string} The meaning of the word associated to this SemanticWordDescription, in the required language.
     *     If no valid meaning is available, returns null.
     * @throws {NotInitializedError} if initialize() has not been called on this instance.
     * @throws {TypeError} if the required language is not available.
     */
    getMeaning(lang){
        this.initializationErrorChecking_();

        this.desiredLangValidation_(lang);

        // forEach does not work properly here
        var glosses = this.apiResponse_.glosses;
        for(var i = 0; i < glosses.length; i++){
            if(glosses[i]['language'] == lang){
                // console.log('found gloss: ', glosses[i]['gloss']); // DEBUG
                return glosses[i]['gloss'];
            }
        }

        // It's not sure that a synset will always be associated to a gloss (see notes)
        return null;
    }

    /**
     * Retrieves usage examples for the word associated to this SemanticWordDescription, in the required language.
     *
     * @param {string} lang The language the examples will be expressed into. Must be one of the languages specified when this object was built. Use two letters abbreviation, e.g. 'EN' for English.
     * @returns {string[]} All the examples available in the required language. Can be an empty list if no example is found.
     * @throws {NotInitializedError} if initialize() has not been called on this instance.
     * @throws {TypeError} if the required language is not available.
     */
    getExamples(lang){
        this.initializationErrorChecking_();
        this.desiredLangValidation_(lang);

        var examplesList = [];

        this.apiResponse_.examples.forEach((example) => {
            examplesList.push(example['example']);
        });
        if(this.apiResponse_['senses'].length > 0 && this.apiResponse_['senses'][0]['properties']['synsetID']['id'] == "bn:13784328v"){
          console.log("API RESPONSE: ", this.apiResponse_);
          console.log("examples found with lang(",lang,"): ", examplesList);
        }else{
          console.log(this.apiResponse_['senses'][0]['properties']['synsetID']['id']);
        }

        return examplesList;
    }

    /**
     * Retrieves images associated to the word linked to this SemanticWordDescription.
     *
     * @returns {string[]} An array containing the URLs of the images. Returned array could be empty if no image is found.
     * @throws {NotInitializedError} if initialize() has not been called on this instance.
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
     * @param {string} lang Can be any language (but it must be supported by the BabelNet API). Use two letters abbreviation, e.g. 'EN' for English.
     * @returns {boolean} True if the words are compatible.
     * @throws {NotInitializedError} if initialize() has not been called on this instance.
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
     * @throws {NotInitializedError} if initialize() has not been called on this instance.
     */
    checkForEquality(semanticWordDescription){
        // Check if the synsetIDs are equal
        this.initializationErrorChecking_();
        console.log("my synsetID: ", this.synsetID_);
        console.log("other synsetID: ", semanticWordDescription.synsetID_);
        return semanticWordDescription.synsetID_ == this.synsetID_;
    }
}
