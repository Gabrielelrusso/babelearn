import { BabelProxy } from './babelproxy.js'

// Convenience class for representing a custom exception
export class NotInitializedError extends Error{}

export class SemanticPhraseDescription {
    constructor(phrase, language){
        /**
         * Fa chiamata a API di Babelfy e si crea un dizionario del tipo
         * {parola: synsetID}
         */
    }

    getSemanticWordDescription(word){
        /**
         * Restituisce un oggetto SemanticWordDescription con il significato trovato
         * da Babelfy per 'word' nella nostra frase, così challenge può fare
         * checkForEquality con la SemanticWordDescription della parola di gioco.
         */
    }

}

export class SemanticWordDescription {
    // default parameters values are here only for documentation purposes
    constructor(word=null, language=null, targetLangs=['EN'], meaningPos=0, synsetID=null){
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

        if (meaningPos == null || meaningPos < 0){
            throw new RangeError("'meaningPos' must be specified and must be an integer valued at least 0.");
        }

        this.proxy = new BabelProxy('86994456-f309-4bce-8e40-838b9284a220');
        this.synsetID = synsetID;
        this.lemma = word;
        this.wordLang = language;
        this.availableLangs = targetLangs;
        this.meaningPos = meaningPos;
        this.initialized = false;
    }

    // il synsetID, se specificato, è il metodo preferito
    // Check sincronia
    async initialize(){
        var set = false;

        if(this.synsetID == null){
            // it was not provided in the constructor
            var synsetIDs = await this.proxy.getBabelnetSynsets(this.lemma, this.wordLang); // VSCode suggests that await has no effect here, but evidences show that it has.
            this.synsetID = synsetIDs[this.meaningPos];
        }
        else{
            set = true;
        }

        this.apiResponse = await this.proxy.getSynsetInfo(this.synsetID, this.targetLangs);
        
        if(set){
            // Init wordLang and lemma to the values of the first sense in the response
            this.wordLang = this.apiResponse["senses"][0]["properties"]["language"];
            this.lemma = this.apiResponse["senses"][0]["properties"]["simpleLemma"];
        }

        this.initialized = true;
    }

    initializationErrorChecking_(){
        if(!this.initialized){
            throw new NotInitializedError('This instance of SemanticWordDescription is not initialized. Please call initialize() on it.')
        }
    }

    desiredLangValidation_(lang){
        if(!this.availableLangs.includes(lang)){
            throw new TypeError('The requested language is not available.');
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
        var glosses = this.apiResponse.glosses;

        for(var i = 0; i < glosses.length; i++){
            if(glosses[i]['language'] == lang){
                console.log('found gloss')
                return glosses[i]['gloss'];
            }
        }

        /**
         * No need for further error checking, because if the code array to the point of 
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

        this.apiResponse.examples.forEach((example) => {
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

        this.apiResponse.images.forEach((image) => {
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

        var inSynsets = await this.proxy.getBabelnetSynsets(word, lang);

        for(var i = 0; i < inSynsets.length; i++){
            if(inSynsets[i] == this.synsetID){
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