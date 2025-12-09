<script lang='ts'>
import { onMount } from "svelte";
import { on } from "svelte/events";

let props : { years : number[], scrollFunction : Function } = $props();

let position = $state(0);

let leftYear : HTMLSpanElement;
let centerYear : HTMLSpanElement;
let rightYear : HTMLSpanElement;

let leftYearPos = 0;
let centerYearPos = 0;
let rightYearPos = 0;

let extraMarkPos = $state(0);
let leftMarkPos = $state(0);
let centerMarkPos = $state(0);
let rightMarkPos = $state(0);

let extraMarkHeight = $state(24);
let leftMarkHeight = $state(24);
let centerMarkHeight = $state(32);
let rightMarkHeight = $state(24);

let extraMark : HTMLDivElement;
let leftMark : HTMLDivElement;
let centerMark : HTMLDivElement;
let rightMark : HTMLDivElement;

function swipeLeft() {

    if (centerMark.classList.contains('transitioning')) return;
    if (position < props.years.length - 1) {

        position++;
        requestAnimationFrame(() => {
            resizeReaction()
            swipeLeftAnimation()
        });
        props.scrollFunction(position);
    }
}

function swipeRight() {

    if (centerMark.classList.contains('transitioning')) return;
    if (position > 0) {

        position--;
        requestAnimationFrame(() => {
            resizeReaction()
            swipeRigthAnimation()
        });
        props.scrollFunction(position);
    }
}

function resetMarks() {

    extraMarkPos = leftYearPos;
    leftMarkPos = leftYearPos;
    centerMarkPos = centerYearPos;
    rightMarkPos = rightYearPos;

    leftMarkHeight = 24;
    centerMarkHeight = 36;
    rightMarkHeight = 24;

    leftMark.classList.remove('transitioning');
    centerMark.classList.remove('transitioning');
    rightMark.classList.remove('transitioning');
    extraMark.classList.remove('transitioning');
    leftMark.classList.remove('hidden');
    extraMark.classList.add('hidden');
    rightMark.classList.remove('hidden');
}
function swipeRigthAnimation() {

    leftMark.classList.add('transitioning');
    centerMark.classList.add('transitioning');
    rightMark.classList.add('transitioning');
    extraMark.classList.add('transitioning');
    rightMark.classList.add('hidden');
    extraMark.classList.remove('hidden');

    extraMarkPos = leftYearPos;
    leftMarkPos = centerYearPos;
    centerMarkPos = rightYearPos;
    rightMarkPos = rightYearPos;

    leftMarkHeight = 36;
    centerMarkHeight = 24;
    rightMarkHeight = 24;
}
function swipeLeftAnimation() {

    leftMark.classList.add('transitioning');
    centerMark.classList.add('transitioning');
    rightMark.classList.add('transitioning');
    extraMark.classList.add('transitioning');
    leftMark.classList.add('hidden');
    extraMark.classList.remove('hidden');

    extraMarkPos = rightYearPos;
    leftMarkPos = leftYearPos;
    centerMarkPos = leftYearPos;
    rightMarkPos = centerYearPos;
    
    rightMarkHeight = 36;
    centerMarkHeight = 24;
    leftMarkHeight = 24;
}

function resizeReaction() {

    const leftRect = leftYear.getBoundingClientRect();
    const centerRect = centerYear.getBoundingClientRect();
    const rightRect = rightYear.getBoundingClientRect();
    leftYearPos = leftRect.left + leftRect.width / 2;
    centerYearPos = centerRect.left + centerRect.width / 2;
    rightYearPos = rightRect.left + rightRect.width / 2;
}
onMount(() => {
    on(window, 'resize', () => {
        resizeReaction();
        resetMarks();
    });

    resizeReaction();
    resetMarks();


    on(centerMark, 'transitionend', resetMarks);
})

</script>

<style>
:global(.transitioning) {

    transition-duration: 0.2s !important;
}
.timeline-container {
    margin-bottom: 2em;
    font-size: max(2em, 2vw);
}
.timeline-line {
    min-height: 2px;
    max-height: 2px;
    min-width: 100%;
    background-color: white;
    display: flex;
    align-items: center;
}
.timeline-mark {

    min-height: var(--h);
    min-width: 3px;
    background-color: white;
    position: absolute;
    left: var(--x);

    transition-duration: 0s;
}
.timeline-dates {
    display: flex;
    gap: 1em;
    font-size: 1em;
    margin-bottom: 1em;
    text-align: center;
    align-items: baseline;
    justify-content: center;
}
.timeline-date {

    display: block;
    max-width: 4ch;
    min-width: 4ch;
}
@media (max-width: 767px) {

    .timeline-container {
        font-size: 1.5em;
    }
}
.clickable {
    user-select: none;
    cursor: pointer;
}
:global(.hidden) {
    opacity: 0;
}
</style>

<div class='timeline-container'>

    <div class='timeline-dates'>
        <div>
            <span bind:this={leftYear} class='timeline-date' style='font-size: 0.6em'>{position != 0 ? props.years[position - 1] : ''}</span>
        </div>
        <span onclick={swipeRight} class='clickable'>≪</span>
        <div>
            <span bind:this={centerYear} class='timeline-date' style='font-size: 1.1em'>{props.years[position]}</span>
        </div>
        <span onclick={swipeLeft} class='clickable'>≫</span>
        <div>
            <span bind:this={rightYear} class='timeline-date' style='font-size: 0.6em'>{position != props.years.length - 1 ? props.years[position + 1] : ''}</span>
        </div>
    </div>
    <div class='timeline-line'>
        <div bind:this={extraMark} style='--x: {extraMarkPos}px; --h: {extraMarkHeight}px; transition-property: opacity !important; min-height: 24px;' class='timeline-mark'></div>
        <div bind:this={leftMark} style='--x: {leftMarkPos}px; --h: {leftMarkHeight}px;' class='timeline-mark'></div>
        <div bind:this={centerMark} style='--x: {centerMarkPos}px; --h: {centerMarkHeight}px;' class='timeline-mark'></div>
        <div bind:this={rightMark} style='--x: {rightMarkPos}px; --h: {rightMarkHeight}px;' class='timeline-mark'></div>
    </div>
</div>