import { BabelProxy } from './babelproxy.js'

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
    constructor(word, language, targetLangs, meaningPos, synsetID){
        /**
         * Si crea un proxy, fa la richiesta e si salva tutta la risposta.
         * Properties:
         * - apiResponse
         * - langs
         * - meaningPos
         * - lemma
         * - synsetId
         * 
         * Posso passare synsetID oppure devo passare word AND meaningPos
         */
        
    }


    getMeaning(lang){

    }

    getExamples(lang){

    }

    getImages(){

    }

    checkForCompatibility(word, lang){
        /**
         * Prende la lista di synset associati a 'word', e controlla se uno di questi
         * coincide col mio.
         */
    }

    checkForEquality(semanticWordDescription){
        // Controlla se i due ID sono uguali
    }
}