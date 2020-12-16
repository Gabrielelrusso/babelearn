import { SemanticWordDescription } from './semantic_api.js'

// 'park'
// 'EN'
// 'bn:00060690n'
var word = null, wordLanguage = null, wordTargetLangs = ['EN'], meaningPos = 0, synsetID = 'bn:00060690n';
var wordUut = new SemanticWordDescription(word, wordLanguage, wordTargetLangs, meaningPos, synsetID);
  
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

