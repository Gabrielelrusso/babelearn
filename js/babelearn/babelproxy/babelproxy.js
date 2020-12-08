/**
 * Implements a proxy towards the BabelNet and Babelfy HTTP APIs.
 * 
 * @requires axios
 */
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
     * @param {array} apiResponse 
     * @private
     */
    createSynsetsList(apiResponse){
        var synsetIDs = [];

        apiResponse.data.forEach(element => {
            synsetIDs.push(element["id"]);
        });

        //console.log(synsetIDs);

        return synsetIDs;
    }

    /**
     * Retrieves the IDs af all the BabelNet synsets denoted by a given word.
     * 
     * @param {string} word The word for which BabelNet syntes will be retrieved.
     * @param {string} language The language 'word' belongs to. Use two letters abbreviation, e.g. 'EN' for English.
     * @returns A list of the retrived synset IDs, represented as strings.
     */
    async getBabelnetSynsets(word, language){
        var get_params = { // if not working, remove quotes on keys
            'lemma' : word,
            'searchLang' : language,
            'key' : this.apiKey
        };

        // await should cause the get to be synchronous
        let response = await axios.get(
            this.babelnetSynsetsByWordServiceUrl + '?',
            {params: get_params}
        );

        //console.log(response);

        return this.createSynsetsList(response);
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
