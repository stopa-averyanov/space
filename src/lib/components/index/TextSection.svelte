<script lang='ts'>
import type { Snippet } from "svelte";
    
let props : { header : Snippet, body : Snippet, first? : boolean } = $props(); 

</script>

<style>
.fullscreen-container {
    box-sizing: border-box;
    padding: 0 32px 0 32px;
    min-height: 100vh;
    max-height: 100vh;
}
.title-container {
    padding-top: 32px;
}
.title-container :global(p) {
    margin-top: 0;
}
.title-container :global(h1) {
    margin: 24px 0 38px 0;
    font-size: 6em;
    font-weight: 300;
    line-height: 0.8;
}
.title-container :global(hr) {
    max-width: 360px;
    margin-left: 0;
}
.text-container {
    box-sizing: border-box;
    flex-grow: 1;
    padding: 0;
    margin-top: 32px;
    max-width: 360px;
    max-height: 420px;
    overflow-y: scroll;
}
:global(.text-box) :global(p) {
    margin-top: 0;
    margin-bottom: 38px;
    max-width: 540px;
    line-height: 1.5;
    
    color: #ffffff;
    font-weight: 400;
}
:global(.text-box) {

    box-sizing: border-box;
    padding: 0px 24px 0 0;
    min-height: 420px;
    max-height: 420px;
}
.separator-before {
    margin: 16px 0 24px;
    display: none;
}
.separator-after {
    display: block;
}
@media (max-width: 767px) {

    .title-container :global(p) {
        max-width: calc(100% - 32px);
    }
    .title-container :global(h1) {
        font-size: 3.5em;
    }
    .title-container :global(hr) {
        max-width: unset;
    }
    .fullscreen-container {
        max-height: unset;
        padding: 0 16px 0 16px;
    }
    .title-container {
        min-height: 100vh;
    }
    .text-container {

        max-width: unset;
        max-height: unset;
        overflow-y: none;
    }
    :global(.text-box) {

        display: flex;
        flex-direction: column;
        gap: 24px;
        padding: 12px 8px 12px 8px;
        max-height: unset;
        min-height: unset;
        backdrop-filter: blur(10px);
        margin-bottom: 48px;
        border-radius: 8px;
    }
    :global(.text-box) :global(p) {

        margin: 0 0 0 0;
    }
    .separator-before{
        display: block;
    }
    .separator-after {
        display: none;
    }
}

/* Scrollbar */

.text-container::-webkit-scrollbar {
  height: 2px;
  width: 2px;
}
.text-container::-webkit-scrollbar-track {
  border-radius: 0px;
  background-color: #00000000;
  opacity: 0;
}
.text-container::-webkit-scrollbar-track:hover {
  background-color: #00000000;
  opacity: 0;
}
.text-container::-webkit-scrollbar-track:active {
  background-color: #00000000;
  opacity: 0;
}
.text-container::-webkit-scrollbar-thumb {
  border-radius: 0px;
  background-color: #ffffff;
}
.text-container::-webkit-scrollbar-thumb:hover {
  background-color: #ffffff;
}
.text-container::-webkit-scrollbar-thumb:active {
  background-color: #ffffff;
}

</style>

<div class='fullscreen-container'>
    {#if !props.first}
        <hr class='separator-before'>
    {/if}
    <div class='title-container'>
        {@render props.header()}
        <hr class='separator-after'>
    </div>
    <div class='text-container'>
        {@render props.body()}
    </div>
</div>