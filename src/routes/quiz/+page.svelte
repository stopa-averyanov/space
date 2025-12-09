<script lang="ts">
import QuestionPrompt from "./QuestionPrompt.svelte";
import ScrollableStars3DBackground from "$lib/components/ScrollableStars3DBackground.svelte";
import Navigation from "$lib/components/Navigation.svelte";
import { onMount } from "svelte";
import Results from "./Results.svelte";
import Intro from "./Intro.svelte";
import questions from "./questions";
    import type { derived } from "svelte/store";

let questionIndex = $state(0);
let progressBar = $state(0);
let score = $state(0);

let promptProps = $derived({
    question : questions[questionIndex],
    totalQuestions : questions.length,
    questionNumber : questionIndex + 1,
    score : score,
    progressBar : progressBar
});
let intro : Intro;
let prompt : QuestionPrompt;
let results : Results;

let message : string = $state('Вы еще очень многому можете научиться!');

function begin() {

    console.log('begin')
    intro.hide();
    prompt.show();
    ask();
}
onMount(() => {

    setTimeout(() => { 
        intro.show();
        // prompt.show();
        // results.show();
    }, 1);
})
function ask() {

    prompt.askNext((correct : boolean) => {
        
        if (correct) score += 1;
        if (questionIndex != questions.length - 1) {

            questionIndex++;
        }
        else {
            results.show();
            prompt.hide();
        }
        progressBar += 1 / questions.length;
        if (score > 3) {
            message = 'Вы хорошо знакомы с историей и природой своего космического дома!'
        }
        if (score > 5) {
            message = 'Вы отлично знаете солнечную систему и её историю!'
        }
        if (score > 7) {
            message = 'Ваши знания по-настоящему впечатляют!'
        }
        ask();
    });
}

</script>
<script lang='ts' module>

</script>
<style>

.fullscreen-container {
    min-height: 100svh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>

<svelte:head>
    <title>Квиз</title>
</svelte:head>

<ScrollableStars3DBackground></ScrollableStars3DBackground>
<div class="fullscreen-container">
    <Intro bind:this={intro} {...{startFunction : begin}}></Intro>
    <QuestionPrompt bind:this={prompt} { ...promptProps }></QuestionPrompt>
    <Results bind:this={results} {...{totalPoints : score, maxPoints : questions.length, message : message}}></Results>

</div>