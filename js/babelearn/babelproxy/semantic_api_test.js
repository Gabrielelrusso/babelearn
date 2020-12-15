import { SemanticWordDescription } from './semantic_api.js'

// 'park'
// 'EN'
// 'bn:00060690n'
var word = null, language = null, targetLangs = ['EN'], meaningPos = 0, synsetID = 'bn:00060690n';

var uut = new SemanticWordDescription(word, language, targetLangs, meaningPos, synsetID);
        
function testInitialize(){
    // (res) is necessary to wait for the completion of the async method
    uut.initialize().then((res) => console.log('uut word: ', uut.lemma, '\nuut language: ', uut.wordLang, '\nuut synsetID: ', uut.synsetID,
                                               '\nuut availableLangs: ', uut.availableLangs, '\nuut meaningPos: ', uut.meaningPos));
}

function testInitializationErrorChecking(){
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
    uut.initialize().then((res) => {var meaning = uut.getMeaning('EN'); console.log('meaning: ', meaning)});
}

function testGetExamples(){
    // Not available lang
    //uut.initialize().then((res) => console.log('meaning: ', uut.getExamples('IT')));

    // Available lang
    uut.initialize().then((res) => {var meaning = uut.getExamples('EN'); console.log('examples: ', meaning)});
}

function testGetImages(){
    uut.initialize().then((res) => {var imgUrls = uut.getImages(); console.log('image URLs: ', imgUrls)});
}

function testCheckForCompatibility(){
    uut.initialize().then((res) => {
        // Should return false
        uut.checkForCompatibility('park', 'IT').then((res) => console.log('park - IT compatibility: ', res)); 
        
        // Should return false
        uut.checkForCompatibility('parcheggio', 'EN').then((res) => console.log('parcheggio - EN compatibility: ', res)); 

        // Should return false
        uut.checkForCompatibility('land', 'EN').then((res) => console.log('land -EN compatibility: ', res)); 
        
        // Should return true
        uut.checkForCompatibility('park', 'EN').then((res) => console.log('park - EN compatibility: ', res)); 
    });
}

testCheckForCompatibility();