<script lang='ts'>
import { onMount } from "svelte";
import { on } from "svelte/events";

let selectionIndex = $state(0);

let props : { options : string[], selectionFunction : Function } = $props();

let optionsElement : HTMLDivElement;
let selection : HTMLDivElement;
let selectedOption : HTMLSpanElement;

let dropdownContentVisible = $state(false);

onMount(() => {

    on(selectedOption, 'mouseenter', () => {

        dropdownContentVisible = true;
    });
    on(selection, 'mouseleave', () => {

        dropdownContentVisible = false;
    });
})

export function select(index : number) {

    selectionIndex = index;
    props.selectionFunction(index);

    if (optionsElement.classList.contains('visible'))
        optionsElement.classList.remove('visible')
}
export function selectSilent(index : number) {

    selectionIndex = index;
}
</script>

<style>
.dropdown {
    min-width: 20ch;
    position: relative;
    user-select: none;
    display: inline-block;
    text-align: left;
}
.selected-option {
    display: block;
    border-style: solid;
    border-width: 0 0 2px 0;
    border-color: white;
}
.dropdown-content {
    width: 100%;
    transform: translate(0, 100%);
    bottom: 0;
    position: absolute;
    flex-direction: column;
    display: flex;
    pointer-events: none;
    opacity: 0;
    transition-duration: 0.2s;
    transition-property: opacity;
    z-index: 1;
}
span {
    padding: 8px 16px;
    background-color: #000000;
}
span:hover {

    background-color: #222222;
}
.visible {

    pointer-events: unset;
    opacity: 1;
}

</style>

<div bind:this={selection} class='dropdown'>
    <span bind:this={selectedOption} class='selected-option'>{props.options[selectionIndex]}</span>
    <div bind:this={optionsElement} class='dropdown-content {dropdownContentVisible ? "visible" : ""}'>
        {#each props.options as option, index}
        <span onclick={select.bind(null, index)}>{option}</span>
        {/each}
    </div>
</div>
