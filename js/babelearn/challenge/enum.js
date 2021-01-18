/*jshint esversion: 8 */

/**
 * Describes possible challenge difficulties, where the difficulty is associated with game words:
 * some game words determine easy challenges, other determine medium challenges and other determine difficult challenges.
 */
export const CHALLENGE_DIFFICULTY = Object.freeze({
    EASY:   Symbol("easy"),
    MEDIUM:  Symbol("medium"),
    HARD: Symbol("hard")
});

/**
 * Identifies the challenge type, as one of the following ones.
 * - Meaning from example: the user is given a usage example of the game word and must identify the meaning the game
 * word has been used with, among three possible ones.
 * - Example from meaning: the user is given the game word and a meaning of her, and must provide a sentence in which the
 * game word (or a synonym) is used in the given meaning.
 * - Four image one word: the user is given four images and must identify the word which represents them.
 */
export const CHALLENGE_TYPE = Object.freeze({
    MEANING_FROM_EXAMPLE_CHALLENGE:   Symbol("meaning-from-example-challenge"),
    EXAMPLE_FROM_MEANING_CHALLENGE:  Symbol("example-from-meaning-challenge"),
    FOUR_IMAGES_ONE_WORD_CHALLENGE: Symbol("four-images-one-word-challenge")
});
