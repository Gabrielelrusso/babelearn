/*jshint esversion: 8 */

import {Challenge, ChallengeBuildFailedError} from './challenge.js';
import {SemanticWordDescription} from '../babelnet_interface/semantic_api/semantic_api.js';

/**
 * Challenge 1.
 *
 */
export class MeaningFromExampleChallenge extends Challenge{
    /**
     *
     * @param {*} word
     * @param {*} wordLang
     * @param {*} gameLang
     * @throws {TypeError} if word or wordLang are not specified.
     */
    constructor(word, wordLang, gameLang){
        if(word == null || wordLang == null || gameLang == null){
            throw new TypeError('Word, her language and the game language must be specified');
        }

        var description = 'Given a word and a usage example, identify the meaning of the word in the provided usage context.';
        super(word, wordLang, gameLang, null, description);

        this.gameWordFirstMeaning = null;
        this.gameWordSecondMeaning = null;
        this.gameWordThirdMeaning = null;
    }

    /**
     * @throws {ChallengeBuildFailedError} if it's unable to build the challenge.
     */
    async generate(){
        this.gameWordFirstMeaning =  new SemanticWordDescription(this.getWord(), this.getWordLang(), ['EN', this.getGameLang()], null);
        await this.gameWordFirstMeaning.initialize().then((res) => {});

        while(this.gameWordFirstMeaning.getMeaning('EN') == null || this.gameWordFirstMeaning.getExamples('EN').length == 0){
            if(this.gameWordFirstMeaning.hasAnotherMeaning()){
                await this.gameWordFirstMeaning.nextMeaning().then((res) => {});
            }
            else{
                throw new ChallengeBuildFailedError('Unable to build MeaningFromExampleChallenge');
            }
        }

        this.gameWordSecondMeaning = new SemanticWordDescription(this.getWord(), this.getWordLang(), ['EN', this.getGameLang()], null);
        await this.gameWordSecondMeaning.initialize().then((res) => {});

        while(this.gameWordSecondMeaning.getMeaning('EN') == null || this.gameWordSecondMeaning.checkForEquality(this.gameWordFirstMeaning)){
            if(this.gameWordSecondMeaning.hasAnotherMeaning()){
                await this.gameWordSecondMeaning.nextMeaning().then((res) => {});
            }
            else{
                throw new ChallengeBuildFailedError('Unable to build MeaningFromExampleChallenge');
            }
        }

        this.gameWordThirdMeaning = new SemanticWordDescription(this.getWord(), this.getWordLang(), ['EN', this.getGameLang()], null);
        await this.gameWordThirdMeaning.initialize().then((res) => {});

        while(this.gameWordThirdMeaning.getMeaning('EN') == null ||
            this.gameWordThirdMeaning.checkForEquality(this.gameWordFirstMeaning) ||
            this.gameWordThirdMeaning.checkForEquality(this.gameWordSecondMeaning)
        ){
            if(this.gameWordThirdMeaning.hasAnotherMeaning()){
                await this.gameWordThirdMeaning.nextMeaning().then((res) => {});
            }
            else{
                throw new ChallengeBuildFailedError('Unable to build MeaningFromExampleChallenge');
            }

        }

        // Settare solution ed exercise
        let exerciseMain = await this.translateSentence('EN', this.getGameLang(), this.gameWordFirstMeaning.getExamples('EN')[0]);
        let exerciseOption1 = await this.translateSentence('EN', this.getGameLang(), this.gameWordFirstMeaning.getMeaning('EN'));
        console.log("First Meaning: ",this.gameWordFirstMeaning.getMeaning('EN')+"spazio");
        let exerciseOption2 = await this.translateSentence('EN', this.getGameLang(), this.gameWordSecondMeaning.getMeaning('EN'));
        let exerciseOption3 = await this.translateSentence('EN', this.getGameLang(), this.gameWordThirdMeaning.getMeaning('EN'));

        this.setExerciseMain(exerciseMain); // the first example surely exists
        this.setExerciseOptions([exerciseOption1, exerciseOption2, exerciseOption3]);

        // Shuffle options in the way suggested here: https://flaviocopes.com/how-to-shuffle-array-javascript/
        //this.exercise_.options = this.exercise_.options.sort(() => Math.random - 0.5);
        this.setExerciseOptions(this.getExerciseOptions().sort(() => Math.random() - 0.5));

        // wrong-answer-info non ce l'ho

        this.setSolution(exerciseOption1);
    }

    async guess(answer){
        console.log('Answer: ',answer.toLowerCase()+"spazio", "\nSolution: ", this.getSolution().toLowerCase()+"spazio");
        // Bring everything to lower case since 'answer' come from front-end
        return (answer.toLowerCase() === this.getSolution().toLowerCase());
    }

    getWordInGameLang() {
      try{
        return this.gameWordFirstMeaning.getLemma(this.getGameLang());
      }catch(error){
        return "";
      }

    }

  async translateSentence(sourceLang, targetLang, sentence){
    /* console.log('attempting translation');
    await axios({
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        //"accept-encoding": "application/gzip",
        "x-rapidapi-key": "077caff853mshc9d9a26a7436d44p1d2a14jsnab04dd561760",
        "x-rapidapi-host": "google-translate1.p.rapidapi.com"
      },
      url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
      method: "POST",
      responseType: 'json',
      data: {
        "q": sentence,
        "format": "text",
        "source": sourceLang,
        "target": targetLang
      }
    }).then((response) =>{
      console.log("Response for translating sentence: ", response);
    }).catch(err => {
      console.error(err);
    }); */

    var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + sentence;
    var apiResponse = null;

    try{
      await axios.get(
        url
      ).then((response) => {
        apiResponse = response;
      });
    }catch(err){
        // An exception is already thrown by get, so don't throw anything else here, simply
        // stop execution flow
        console.log("ERROR: ", err);
        return;
    }

    var retVal = apiResponse.data[0][0][0];

    console.log("Translation: ", retVal+"spazio");

    return retVal;
  }
}
