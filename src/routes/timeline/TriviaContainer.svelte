<script lang='ts'>
import { on } from 'svelte/events';
import type { Event } from './events.ts';

let events : Event[] = $state([]);
let queuedEvents : Event[];

let inner : HTMLDivElement;

export function update(events_ : Event[]) {

    queuedEvents = events_;
    inner.classList.add('hidden');
    on(inner, 'transitionend', () => {
        events = queuedEvents;
        inner.classList.remove('hidden');
    }, {once: true});
}

</script>

<style>
.outer-container {
    flex-grow: 1;
    min-width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    overflow-y: auto;
}
.inner-container {
    width: 100%;
    max-width: 640px;
    padding: 0 16px 16px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: opacity 0.5s;
}
:global(p) {
    line-height: 1.5;
}
:global(h1) {
    font-weight: 400;
}
:global(img) {
    max-width: 100%;
    max-height: 480px;
}
:global(.hidden) {
    opacity: 0;
}
</style>

<div class='outer-container'>
    <div class="inner-container" bind:this={inner}>
        {#each events as event}
            {#if event.date}
            <h1>{event.date} — {event.title}</h1>
            {:else}
            <h1>{event.title}</h1>
            {/if}
            {@html event.content}
        {/each}
    </div>
</div>