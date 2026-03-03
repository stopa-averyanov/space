<script lang='ts'>
import { asset } from "$app/paths";

const props : { clickLeft : () => void, clickRight : () => void } = $props();

let leftCircle : HTMLDivElement;
let rigthCircle : HTMLDivElement;

function clickLeft() {

    props.clickLeft();
    leftCircle.classList.add('white-circle');
    leftCircle.style.animation = 'none';
    leftCircle.offsetHeight;
    leftCircle.style.animation = '';
}
function clickRight() {

    props.clickRight();
    rigthCircle.classList.add('white-circle');
    rigthCircle.style.animation = 'none';
    rigthCircle.offsetHeight;
    rigthCircle.style.animation = '';
}

</script>
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class='buttons'>
    <div class='button-left' onclick={clickLeft} style={`background-image: url('${asset('/arrow-left.svg')}')`}>
        <div bind:this={leftCircle}></div>
    </div>
    <div class='button-right' onclick={clickRight} style={`background-image: url('${asset('/arrow-left.svg')}')`}>
        <div bind:this={rigthCircle}></div>
    </div>
</div>

<style>
.buttons {
    display: flex;
    flex-direction: row;
    gap: 128px;
}
.button-left {
    min-width: 72px;
    min-height: 72px;
    background-size: cover;
}
.button-right {
    min-width: 72px;
    min-height: 72px;
    background-size: cover;
    transform: scaleX(-1);
}
div:global(.white-circle) {
    background-color: white;
    width: 100%;
    height: 100%;
    opacity: 0;
    border-radius: 50%;

    animation-name: fade-out;
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
}
@keyframes fade-out {
    0% {
        opacity: 0.2;
    }
    100% {
        opacity: 0;
    }
}
</style>