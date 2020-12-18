import {Challenge} from './challenge.js'
import {SemanticWordDescription} from "../babelnet_interface/semantic_api/semantic_api.js";
import {SemanticSentenceDescription} from "../babelnet_interface/semantic_api/semantic_api.js";

export class ExampleFromMeaningChallenge extends Challenge{
    constructor(word, wordLang) {
        const description = "";
        super(word, wordLang, null, description);
    }

    async generate(){
        this.semanticWordDescription = new SemanticWordDescription(this.getWord(), this.getWordLang(), [this.getWordLang()], 0, null);
        this.semanticWordDescription.initialize().then((res) => {
          let solution = this.semanticWordDescription.getExamples(this.getWordLang())[0];
          let gloss = this.semanticWordDescription.getMeaning(this.getWordLang());
          this.setSolution(solution);
          this.setExerciseMain(gloss);
        });
    }

    guess(answer) {

    }


}
