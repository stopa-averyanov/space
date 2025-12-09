<script lang='ts'>

import type { Question } from './questions.ts';

let props : { question : Question, totalQuestions : number, questionNumber : number, score : number, progressBar : number} = $props();

let selectionEnabled = $state(true);
let highlightAnswers = $state(false);

let selectedOption = $state(-1);
let questionHeader = $derived(props.question.question);
let options : string[] = $derived(props.question.options);
let progress : number = $derived(props.progressBar);

let correctAnswer = $derived(props.question.answer);
let nextQuestion : Function;

let hidden = $state(true);

export function askNext(callback : Function) {

    selectionEnabled = true;
    highlightAnswers = false;
    selectedOption = -1;
    nextQuestion = callback;
}

function select(index : number) {

    if (!selectionEnabled) return;
    selectedOption = index;
}
function submit() {

    if (selectionEnabled) {

        highlightAnswers = true;
        selectionEnabled = false;
    }
    else {

        nextQuestion(selectedOption == props.question.answer);
    }
}
export function show() {
    hidden = false;
}
export function hide() {

    hidden = true;
}

</script>
<style>
.disabled {
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    transition: opacity 1s linear 0s, visibility 0s linear 1s;
}
h2 {
    font-weight: 400;
}
.question {
    visibility: visible;
    width: 100%;
    border-style: solid;
    border-width: 2px;
    border-color: white;
    display: flex;
    flex-direction: column;
    max-width: 640px;
    align-items: center;
    padding: 16px 16px 4px 16px;
    box-sizing: border-box;
    transition: opacity 1s linear 0s, visibility 0s linear 0s;
}
.question-header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 1em;
}
.answers {
    width: 100%;
    display: grid; 
    grid-template-columns: 1fr 1fr; 
    grid-template-rows: 1fr 1fr; 
    gap: 0px 0px; 
    grid-template-areas: 
        ". ."
        ". ."; 
    text-align: center;
}
.answers p, .continue-button {
    margin: 0.2em;
    padding: 1em;
    transition-duration: 0.2s;
    transition-property: background-color;
    box-sizing: border-box;
}
.answers p.hover:hover, .continue-button:hover {
    background-color: #ffffff22;
    cursor: pointer;
}
.continue-button {
    max-width: 20ch;
    width: 100%;
    text-align: center;
    transition-duration: 0.5s;
    transition-property: opacity;
}
.continue-button.hidden {
    transition-duration: 0s;
}
.hidden {
    opacity: 0;
    user-select: none;
    pointer-events: none;
    cursor: unset;
}
.correct, .correct:hover {

    background-color: #00ff0022 !important;
}
.incorrect, .incorrect:hover {

    background-color: #ff000022 !important;
}
.selected {
    background-color: #ffffff33 !important;
}
hr {
    margin: 0 auto 0 0;
    transition-duration: 0.5s;
}
p {
    transition: opacity 0.5s;
}
.explanation {
    text-align:left;
    width: 100%;
    line-height: 1.5;
}
.explanation.hidden {
    transition-duration: 0s;
}
@media (max-width: 639px) {

    
    .question {
        min-height: 100svh;
        border-width: 0;
    }
    .question-header {
        justify-content: flex-start;
        gap: 1em;
    }
}
</style>
<div class='question {hidden ? 'disabled' : ''}'>
    <div class='question-header'>
        <span>Вопрос {props.questionNumber}/{props.totalQuestions}</span>
        <span>Счет: {props.score}/{props.totalQuestions}</span>
    </div>
    <hr style='width: {progress * 100}%;' class='progressbar'>
    <h2>{questionHeader}</h2>
    <div class='answers'>
        {#each options as option, index}
        {@const selectedClass = (selectedOption == index && !highlightAnswers) ? 'selected' : ''}
        {@const answerClass = highlightAnswers ? (index == correctAnswer ? 'correct' : index == selectedOption ? 'incorrect' : '') : ''}
        {@const hoverClass = selectionEnabled ? 'hover' : ''}
        <p class='{selectedClass} {answerClass} {hoverClass}' onclick={() => { select(index) }}>{option}</p>
        {/each}
    </div>
    <span onclick={submit} class='continue-button {selectedOption != -1 ? '' : 'hidden'}'>{highlightAnswers ? 'Дальше' : 'Ответить'}</span>
    <p class='explanation {highlightAnswers ? '' : 'hidden'}'>Объяснение: {props.question.explanation}</p>
</div>