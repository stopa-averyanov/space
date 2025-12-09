<script lang='ts'>

let props : { startFunction : Function } = $props();

let hidden = $state(true);

export function show() {
    hidden = false;
}
export function hide() {

    hidden = true;
}

</script>
<style>
div.disabled {
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    transition: opacity 1s linear 0s, visibility 0s linear 1s;
}
h2 {
    font-weight: 400;
}
div {

    position: absolute;
    display: flex; 
    flex-direction: column;
    transition: opacity 1s linear 0s, visibility 0s linear 0s;
    margin: 1em;
}
p {
    display: inline-block;
    min-width: 15ch;
    text-align: center;
    padding: 1em;
    transition: background-color 0.2s linear 0s, display 0s linear 0.2s;;
    box-sizing: border-box;
    align-self: center;
    background-color: #ffffff11;
    user-select: none;
}
p:hover {
    background-color: #ffffff22;
    cursor: pointer;
}

</style>
<div class='{hidden ? 'disabled' : ''}'>
    <h2>Считаете, что космос вас уже ничем не удивит?</h2>
    <h2>Внимательно изучили сайт и уверены, что ничего не упустили?</h2>
    <h2>Пройдите короткий тест и проверьте свои знания.</h2>

    <p onclick={() => {props.startFunction()}}>Начать</p>
</div>