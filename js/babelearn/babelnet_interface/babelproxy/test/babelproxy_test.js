import { BabelProxy } from '../babelproxy.js'

var proxyInstance = new BabelProxy('86994456-f309-4bce-8e40-838b9284a220');

// Test get synset associated to word
function facadeSim(callback){
    proxyInstance.getBabelnetSynsets('parco', 'IT').then((res) => {callback(res)});
};

function challengeSim(){
    facadeSim((res) => console.log('Synset IDs received by challenge simulator: ', res));
};

// Test get main gloss associated to synset ID
function getSynsetInfo(){
    // Query for the main gloss of 'play'
    // bn:00028604n
    proxyInstance.getSynsetInfo('bn:00028604n', ['EN', 'IT']).then((res) => console.log('Received data: ', res));
};

// Test Babelfy disambiguation
function getDisambiguatedSynsets(){
    proxyInstance.getBabelfySynsets('aparcamiento', 'ES').then((res) => console.log('Babelfy found these synsets:', res));
};

function getExamples(){
    proxyInstance.getExamples('bn:00028604n').then((res) => console.log('Usage examples:\n', res));
};

function getImages(){
    proxyInstance.getImages('bn:00028604n').then((res) => console.log('Found images:\n', res));
};

getSynsetInfo();