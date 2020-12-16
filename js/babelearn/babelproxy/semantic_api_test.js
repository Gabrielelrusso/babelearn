import { SemanticWordDescription, SemanticSentenceDescription } from './semantic_api.js'

// 'park'
// 'EN'
// 'bn:00060690n'
var word = null, wordLanguage = null, wordTargetLangs = ['EN'], meaningPos = 0, synsetID = 'bn:00060690n';
var wordUut = new SemanticWordDescription(word, wordLanguage, wordTargetLangs, meaningPos, synsetID);

var sentence = 'Today is a good day for a trip.', sentenceLanguage = 'EN';
var sentenceUut = new SemanticSentenceDescription(sentence, sentenceLanguage);

function testWordInitialize(){
    // (res) is necessary to wait for the completion of the async method
    wordUut.initialize().then((res) => console.log('uut word: ', wordUut.lemma, '\nuut language: ', wordUut.wordLang, '\nuut synsetID: ', wordUut.synsetID,
                                               '\nuut availableLangs: ', wordUut.availableLangs, '\nuut meaningPos: ', wordUut.meaningPos));
}

function testWordInitializationErrorChecking(){
    // uut.getMeaning();
    // uut.getExamples();
    // uut.getImages();
    // uut.checkForCompatibility();
    // uut.checkForEquality();
}

function testGetMeaning(){
    // Not available lang
    //uut.initialize().then((res) => console.log('meaning: ', uut.getMeaning('IT')));

    // Available lang
    wordUut.initialize().then((res) => {var meaning = wordUut.getMeaning('EN'); console.log('meaning: ', meaning)});
}

function testGetExamples(){
    // Not available lang
    //uut.initialize().then((res) => console.log('meaning: ', uut.getExamples('IT')));

    // Available lang
    wordUut.initialize().then((res) => {var meaning = wordUut.getExamples('EN'); console.log('examples: ', meaning)});
}

function testGetImages(){
    wordUut.initialize().then((res) => {var imgUrls = wordUut.getImages(); console.log('image URLs: ', imgUrls)});
}

function testCheckForCompatibility(){
    wordUut.initialize().then((res) => {
        // Should return false
        wordUut.checkForCompatibility('park', 'IT').then((res) => console.log('park - IT compatibility: ', res)); 
        
        // Should return false
        wordUut.checkForCompatibility('parcheggio', 'EN').then((res) => console.log('parcheggio - EN compatibility: ', res)); 

        // Should return false
        wordUut.checkForCompatibility('land', 'EN').then((res) => console.log('land -EN compatibility: ', res)); 
        
        // Should return true
        wordUut.checkForCompatibility('park', 'EN').then((res) => console.log('park - EN compatibility: ', res)); 
    });
}

function testSentenceInitialize(){
    sentenceUut.initialize().then((res) => console.log('Sentence: ', sentenceUut.sentence, '\nSentence language: ', sentenceUut.sentenceLang,
                                                        '\nisInitialized: ', sentenceUut.isInitialized, '\nDisambiguated words: ', sentenceUut.disambiguatedWords));
}

function testSentenceInitializationErrorChecking(){
    // Should throw and exception since initialize() hasn't been called
    sentenceUut.getSemanticWordDescription();
}

function testGetSemanticWordDescription(){
    var requiredLanguages = ['EN'];
    sentenceUut.initialize().then((res) => {
        var semWordDesc = sentenceUut.getSemanticWordDescription('Today', requiredLanguages);
        if (semWordDesc == null){
            console.log('Required word does not exist');
            return;
        }
        semWordDesc.initialize().then((res) => console.log('uut word: ', semWordDesc.lemma, '\nuut language: ', semWordDesc.wordLang, '\nuut synsetID: ', semWordDesc.synsetID,
                                               '\nuut availableLangs: ', semWordDesc.availableLangs, '\nuut meaningPos: ', semWordDesc.meaningPos)); 
    });
}
