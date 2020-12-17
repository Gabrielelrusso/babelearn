import {ChallengeFactory} from './../challenge_factory'
import {CHALLENGE_TYPE} from './enum.js';
import {CHALLENGE_DIFFICULTY} from './enum.js';


// SemanticWordDescription
function getNewChallengeTest(){
  let challengeFactory = new ChallengeFactory();
  let challenge = challengeFactory.getNewChallenge(CHALLENGE_DIFFICULTY.EASY, CHALLENGE_TYPE.EXAMPLE_FROM_MEANING_CHALLENGE);

}
