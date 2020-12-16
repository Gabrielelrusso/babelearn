import { BabelProxy } from './babelproxy.js'

// Convenience class for representing a custom exception
export class NotInitializedError extends Error{}

export class SemanticSentenceDescription {
    constructor(sentence, language){
        /**
         * Fa chiamata a API di Babelfy e si crea un dizionario del tipo
         * {parola: synsetID}
         */
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

    async initialize(){
        this.disambiguatedWords = await this.proxy_.getBabelfySynsets(this.sentence, this.sentenceLang);
        this.isInitialized = true;
    }

    initializationErrorChecking_(){
        if(!this.isInitialized){
            throw new NotInitializedError('This instance of SemanticSentenceDescription is not initialized. Please call initialize() on her.')
        }
    }

    /**
     * L'oggetto SemanticWordDescription che restituisce dev'essere prima inizializzato, la funzione non lo fa,
     * così il chiamante può inizializzarselo quando serve.
     * 
     * @param {*} word 
     */
    getSemanticWordDescription(word, targetLanguages){
        /**
         * Restituisce un oggetto SemanticWordDescription con il significato trovato
         * da Babelfy per 'word' nella nostra frase, così challenge può fare
         * checkForEquality con la SemanticWordDescription della parola di gioco.
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

export class SemanticWordDescription {
    // default parameters values are here only for documentation purposes
    constructor(word=null, language=null, targetLangs=['EN'], meaningPos=null, synsetID=null){
        /**
         * Si crea un proxy, fa la richiesta e si salva tutta la risposta.
         * Properties:
         * - apiResponse
         * - lang
         * - meaningPos
         * - lemma
         * - synsetId
         * 
         * Posso passare synsetID oppure devo passare word AND language
         */
        if(synsetID == null && (word == null || language == null)){
            throw new TypeError('The synset ID or the desired word and her language must be specified.');
        }

        if (targetLangs == null || targetLangs.length > 4 || targetLangs.length < 1 || !Array.isArray(targetLangs)){
            throw new RangeError('At least 1 and at most 4 target languages must be specified by passing an array of strings.');
        }

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
        this.wordLang_ = language;

        this.availableLangs = targetLangs;
        this.meaningPos = meaningPos;
        this.isInitialized = false;

        /** @private */
        this.apiResponse_ = null; // Google style conventions require to set all of the fields in the constructor
    }

    // il synsetID, se specificato, è il metodo preferito
    // Check sincronia
    async initialize(){
        var set = false;

        if(this.synsetID_ == null){
            // it was not provided in the constructor
            var synsetIDs = await this.proxy_.getBabelnetSynsets(this.lemma_, this.wordLang_); // VSCode suggests that await has no effect here, but evidences show that it has.
            this.synsetID_ = synsetIDs[this.meaningPos];
        }
        else{
            set = true;
        }

        this.apiResponse_ = await this.proxy_.getSynsetInfo(this.synsetID_, this.availableLangs);
        
        if(set){
            // Init wordLang and lemma to the values of the first sense in the response
            this.wordLang_ = this.apiResponse_["senses"][0]["properties"]["language"];
            this.lemma_ = this.apiResponse_["senses"][0]["properties"]["simpleLemma"];
        }

        this.isInitialized = true;
    }

    initializationErrorChecking_(){
        if(!this.isInitialized){
            throw new NotInitializedError('This instance of SemanticWordDescription is not initialized. Please call initialize() on her.')
        }
    }

    desiredLangValidation_(lang){
        if(!this.availableLangs.includes(lang)){
            throw new TypeError('The requested language is not available.');
        }
    }

    // Prende il primo lemma nella lingua richiesta che trova e lo restituisce
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

    getMeaning(lang){
        this.initializationErrorChecking_();

        this.desiredLangValidation_(lang); 

        /**
         * A synset always contains a gloss, so return the first gloss that you find for
         * the required language. 
         * -> non è detto che un synset contenga sempre il gloss purtroppo (vedi note)
         */
        // forEach does not work properly here
        var glosses = this.apiResponse_.glosses;

        for(var i = 0; i < glosses.length; i++){
            if(glosses[i]['language'] == lang){
                console.log('found gloss')
                return glosses[i]['gloss'];
            }
        }

        /**
         * No need for further error checking, because if the code arrives to the point of 
         * executing the 'forEach' loop the required language is available and a gloss
         * will surely exist.
         */
    }

    /**
     * Returned array could be empty.
     * 
     * @param {*} lang 
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
     * Returned array could be empty
     */
    getImages(){
        this.initializationErrorChecking_();

        var imageURLs = [];

        this.apiResponse_.images.forEach((image) => {
            imageURLs.push(image['url']);
        });

        return imageURLs;
    }

    // Check sincronia
    async checkForCompatibility(word, lang){
        /**
         * Prende la lista di synset associati a 'word', e controlla se uno di questi
         * coincide col mio.
         */
        this.initializationErrorChecking_();

        var inSynsets = await this.proxy_.getBabelnetSynsets(word, lang);

        for(var i = 0; i < inSynsets.length; i++){
            if(inSynsets[i] == this.synsetID_){
                return true;
            }
        }

        return false;
    }

    checkForEquality(semanticWordDescription){
        // Controlla se i due ID sono uguali
        this.initializationErrorChecking_();
    }
}