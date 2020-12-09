/**
 * Implements a proxy towards the BabelNet and Babelfy HTTP APIs.
 * 
 * @requires axios
 */
// TODO: aggiungere export davanti a 'class'. L'ho tolto per fare il test in maniera più semplice. Investigare questione async-await.
class BabelProxy {
    /**
     * @param {string} apiKey The API key required by BabelNet/Babelfy to authorize API usage.
     */
    constructor(apiKey){
        this.apiKey = apiKey;
        this.babelnetSynsetsByWordServiceUrl = "https://babelnet.io/v5/getSynsetIds";
        this.babelnetSynsetsInfoByIDServiceUrl = "https://babelnet.io/v5/getSynset";
        this.babelfyDisambiguationServiceUrl = "https://babelfy.io/v1/disambiguate";
    }

    /**
     * Creates a list of BabelNet synset IDs from the response received by the BabelNet API.
     * The synsets IDs are represented as strings.
     * 
     * @param {array} apiResponse The data as returned by the BabelNet HTTP API, in JSON format.
     * @param {array} outArray The array in which the synset IDs must be returned.
     * @private
     */
    createSynsetsList(apiResponse, outArray){
        console.log('creating synsets array'); // DEBUG
        
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
     * @param {string} language The language 'word' belongs to. Use two letters abbreviation, e.g. 'EN' for English.
     * @returns A list of the retrived synset IDs, represented as strings.
     */
    async getBabelnetSynsets(word, language){
        var get_params = { 
            'lemma' : word,
            'searchLang' : language,
            'key' : this.apiKey
        };

        var synsetIDs = [];
        
        /*
        * await causes the function to return the actual data only after that a (positive or negative) result has been
        * obtained from the HTTP request (it "stops" the execution flow on the request and its callbacks, without actually
        * stopping the execution thread).
        */
        await axios.get(
            this.babelnetSynsetsByWordServiceUrl + '?',
            {params: get_params}
        ).then((response) => this.createSynsetsList(response, synsetIDs),
        (error) => console.log(error)
        );

        console.log('returning synsets array'); // DEBUG
    
        return synsetIDs;
    }

    /**
     * Retrieves the main gloss of the BabelNet synsets identified by the given ID.
     * 
     * @param {string} synsetID The ID of the synset whose main gloss will be retrieved.
     * @returns The retrieved main gloss, as a string.
     */
    getGloss(synsetID){
        // The main gloss is always in position zero in the 'glosses' array
    }

    /**
     * Retrieves the synsets associated to the words in the given sentence which the Babelfy API is able to
     * disambiguate.
     * 
     * @param {string} sentence The sentence to query the API for.
     * @returns A list of the retrived synset IDs, represented as strings.
     */
    getBabelfySynsets(sentence){

    }
}
