<script lang='ts'>
import { onMount } from "svelte";

let scrollFactor = $state(0);

onMount(() => {

    window.addEventListener('scroll', () => {

        scrollFactor = Math.max(0, document.documentElement.scrollTop / window.innerHeight);
    })
});

</script>

<style>
.announcement-container {

    position: fixed;
    margin-left: 20px;
    margin-right: 20px;
    bottom: 3em;
    max-width: 36em;
    display: grid;
    grid-auto-columns: 1fr; 
    grid-template-rows: min-content min-content; 
    transition-duration: 1.5s;

    gap: 0.5em;
}
.announcement-container :global(h2) {
    
    grid-area: 1 / 1 / 2 / 2;
    font-size: 2em;
    font-weight: 300;
    margin: 0;
}
.announcement-container :global(p) {
    font-size: 1em;
    grid-area: 2 / 1 / 3 / 2;
    margin: 0;
    transition-duration: 1.5s;
}
.hidden {

    opacity: 0;
}
.shown {

    opacity: 1;
}
@media (max-width: 767px) {

    .announcement-container {
        bottom: 1em;
    }
}

</style>

<div class='announcement-container {scrollFactor >= 3 ? 'hidden' : 'shown'}'>
    <h2>Добро пожаловать.</h2>
    <p class='{scrollFactor >= 0.5 ? 'hidden' : 'shown'}'>На этой странице Вы можете увидеть реальные расстояния планет, а также их отношения друг к другу.</p>
    <p class='{scrollFactor < 0.5 ? 'hidden' : 'shown'}'>В демонстрационных целях, размеры планет были увеличены в 1000 раз относительно их удаленности от Солнца.</p>
</div>