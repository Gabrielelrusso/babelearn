// Dev'essere una roba tale che facciamo "import babelearn.js" e possiamo usare tutto il framework
import {ExampleFromMeaningChallenge} from "./challenge/example_from_meaning_challenge.js"
import {MeaningFromExampleChallenge} from "./challenge/meaning_from_example_challenge.js"

// export {ExampleFromMeaningChallenge, MeaningFromExampleChallenge}
let exampleFromMeaningChallenge = new ExampleFromMeaningChallenge('play', 'EN', 'EN');
window.exported = {exampleFromMeaningChallenge}
