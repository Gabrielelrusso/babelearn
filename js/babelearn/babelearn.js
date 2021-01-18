/**
 * Exports variables needed by the GUI to use the framework.
 */

import {ExampleFromMeaningChallenge} from "./challenge/example_from_meaning_challenge.js"
import {MeaningFromExampleChallenge} from "./challenge/meaning_from_example_challenge.js"
import {Game} from "./game/game.js"


let exampleFromMeaningChallenge = new ExampleFromMeaningChallenge('play', 'EN', 'EN');
window.exported = {exampleFromMeaningChallenge}

let game = new Game();
window.exported = {game}
