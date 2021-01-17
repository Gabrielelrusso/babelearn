/*jshint esversion: 8 */

/**
 * Implements a proxy towards the BabelNet and Babelfy HTTP APIs.
 *
 * @requires axios
 */
export class BabelProxy {
    /**
     * @param {string} apiKey The API key required by BabelNet/Babelfy to authorize API usage.
     */
    constructor(apiKey){
        this.apiKey = apiKey;
        this.babelnetSynsetsByWordServiceUrl = "https://babelnet.io/v5/getSynsetIds";
        this.babelnetSynsetsInfoByIDServiceUrl = "https://babelnet.io/v5/getSynset";
        this.babelfyDisambiguationServiceUrl = "https://babelfy.io/v1/disambiguate";
        this.babelnetSensesByWord = 'https://babelnet.io/v5/getSenses';
        this.REQUEST_TIMEOUT = 5000; // ms
    }

    /**
     * Creates a list of BabelNet synset IDs from the response received by the BabelNet API.
     * The synsets IDs are represented as strings.
     *
     * @param {Object} apiResponse The data as returned by the BabelNet HTTP API, in JSON format.
     * @param {string[]} outArray The array in which the synset IDs must be returned.
     * @private
     */
    createSynsetsList_(apiResponse, outArray){
        //console.log('creating synsets array'); // DEBUG

        /*
        * apiResponse is an array of dictionaries which in turn contain synset-related information,
        * and we are interested in getting the id of each synset.
        */
        apiResponse.data.forEach(element => {
            outArray.push(element["id"]);
        });
    }

    /**
     * Retrieves the IDs af all the BabelNet synsets denoted by a given word.
     * It's an async method, so it returns a Promise object, while in the method it waits for the HTTP request to
     * be completed.
     *
     * @param {string} word The word for which BabelNet syntes will be retrieved.
     * @param {string} language The language the given word belongs to. Use two letters abbreviation, e.g. 'EN' for English.
     * @returns {string[]} A list of the retrived synset IDs.
     * @throws an error if an error occurs during the GET request.
     */
    async getBabelnetSynsets(word, language){
        var get_params = {
            'lemma' : word,
            'searchLang' : language,
            'key' : this.apiKey,
            'timeout': this.REQUEST_TIMEOUT
        };

        var synsetIDs = [];

        /*
        * await causes the function to return the actual data only after that a (positive or negative) result has been
        * obtained from the HTTP request (it "stops" the execution flow on the request and its callbacks, without actually
        * stopping the execution thread).
        */

        try{
            await axios.get(
                this.babelnetSynsetsByWordServiceUrl + '?',
                {params: get_params}
            ).then((response) => {
              this.createSynsetsList_(response, synsetIDs);
              console.log("SERVER RESPONSE: ", response);
            });
        }catch(err){
            // An exception is already thrown by get, so don't throw anything else here, simply
            // stop execution flow
            console.log("ERROR: ", err);
            return;
        }

        console.log('returning synsets array'); // DEBUG

        return synsetIDs;
    }

    createSynsetsListFromSenses_(apiResponse, outArray){
        // console.log("API RESPONSE: ", apiResponse);
        apiResponse.data.forEach(element => {
            outArray.push(element.properties.synsetID.id);
        });
    }

    async getSensesSynsets(word, language){
        var get_params = {
            'lemma' : word,
            'searchLang' : language,
            'key' : this.apiKey,
            'timeout': this.REQUEST_TIMEOUT
        };

        var synsetIDs = [];

        try{
            await axios.get(
                this.babelnetSensesByWord,
                {params: get_params}
            ).then((response) => {
              this.createSynsetsListFromSenses_(response, synsetIDs);
              console.log("GET-SENSES RESPONSE: ", response);
            });
        }catch(err){
            // An exception is already thrown by get, so don't throw anything else here, simply
            // stop execution flow
            console.log("ERROR: ", err);
            return;
        }

        // console.log("Synset IDs from senses:\n", synsetIDs); // DEBUG

        return synsetIDs;

    }

    /**
     * Retrieves all the available information regarding a given BabelNet synset.
     *
     * @param {string} synsetID The identifier of the desired synset.
     * @param {string[]} targetLanguages Languages desired for the language-dependent information (e.g. words usage examples).
     * @returns {Object} The data (so no headers) retuned by the API, in the same format as it's returned.
     * @throws {RangeError} if too many target languages are given.
     * @throws an error if an error occurs during the GET request.
     */
    async getSynsetInfo(synsetID, targetLanguages){
        if(targetLanguages.length > 4){
            throw new RangeError('BabelNet API accepts at most 4 different languages');
        }
        var get_params = new URLSearchParams();

        get_params.append('id', synsetID);
        get_params.append('key', this.apiKey);
        targetLanguages.forEach((language) => {
            get_params.append('targetLang', language);
        });
        get_params.append('timeout', this.REQUEST_TIMEOUT);

        var apiResponse;

        try{
            await axios.get(
                this.babelnetSynsetsInfoByIDServiceUrl + '?',
                {params: get_params}
            ).then((response) => apiResponse = response.data);
        }catch(err){
            // An exception is already thrown by get, so don't throw anything else here, simply
            // stop execution flow
            return;
        }

        // console.log('returning synset info'); // DEBUG

        return apiResponse;
    }

    /**
     * Creates a list of mappings {"word": word, "synsetID": synsetID}, mapping each word of the given
     * sentence whose sense has been disambiguated to the corresponding synsetID. The reported word is not the
     * one used in the sentence, but the lemma corresponding to the synsetID which the Babelfy API has mapped
     * to the word used in the sentence.
     *
     * @param {Object} apiResponse The data as returned by the Babelfy HTTP API, in JSON format.
     * @param {string[]} outArray The array in which the Objects must be returned.
     * @private
     */
    async createSynsetsListFromBabelfy_(sentence, apiResponse, outArray){
        //console.log('Creating synsets from Babelfy'); // DEBUG

        apiResponse.forEach((disambiguatedWord) => {
            var unitStart = disambiguatedWord["charFragment"]["start"];
            var unitEnd = disambiguatedWord["charFragment"]["end"];
            outArray.push({"word": sentence.slice(unitStart, unitEnd+1), "synsetID": disambiguatedWord["babelSynsetID"]});
        });

        console.log('Done creating disambiguation dictionary');
    }

    /**
     * Retrieves the synsets associated to the words in the given sentence which the Babelfy API is able to
     * disambiguate.
     *
     * @param {string} sentence The sentence to query the API for.
     * @param {string} language The language the sentence is expressed into. Use two-letters abbreviations, e.g. 'EN' for English.
     * @returns {Object} A mapping between each word of the sentence whose sense has been disambiguated and the corresponding synsetID, as {"word": word, "synsetID": synsetID}.
     * @throws an error if an error occurs during the GET request.
     */
    async getBabelfySynsets(sentence, language){
        var get_params = {
            'text' : sentence,
            'lang' : language,
            'key' : this.apiKey,
            'timeout': this.REQUEST_TIMEOUT
        };

        var synsetIDs = [];

        try{
            await axios.get(
                this.babelfyDisambiguationServiceUrl + '?',
                {params: get_params}
            ).then((response) =>
                /**
                 * se metto la chiamata a createSynsetsList in una funzione anonima e dopo metto una print si rompe la sincronizzazione, mentre
                 * così sembra di no.
                 */
                this.createSynsetsListFromBabelfy_(sentence, response.data, synsetIDs)
                );
        }catch(err){
            // An exception is already thrown by get, so don't throw anything else here, simply
            // stop execution flow
            return;
        }
        console.log('Done disambiguation, found:\n', synsetIDs); // DEBUG

        return synsetIDs;
    }
}
