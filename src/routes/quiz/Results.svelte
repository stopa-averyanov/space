<script lang='ts'>
    import { resolve } from "$app/paths";


let props : { totalPoints : number, maxPoints : number, message : string} = $props();


let hidden = $state(true);

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
}
h1, h2 {
    font-weight: 400;
}
h1 {
    font-size: 5em;
    margin-top: 0.3em;
    margin-bottom: 0.3em;
}
div {
    transition: opacity 1s; 
    position: absolute;
}

</style>
<div class='{hidden ? 'disabled' : ''}'>
    <h2>Ваш счёт:</h2>
    <h1>{props.totalPoints} / {props.maxPoints}</h1>
    <p>{props.message}</p>

    <a data-sveltekit-reload href={resolve('/')} style='color: white; text-decoration: underline'>Вернуться на главную</a>
</div>