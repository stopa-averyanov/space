<script lang='ts'>
import { onMount, type Component, type Snippet } from "svelte";
    import { on } from "svelte/events";

let props : { content : Component, scrollFunction : Function } = $props(); 
let container : HTMLElement;

const screenSpaceThreshold = 0.4;

let observer : IntersectionObserver;

onMount(()=> {


    

    function resize() {

        if (observer !== undefined)
            observer.disconnect();

        const threshold = window.innerHeight / container.clientHeight * screenSpaceThreshold;

        const options = {
            rootMargin: "0px",
            scrollMargin: "0px",
            threshold: threshold
        };
        observer = new IntersectionObserver((entries) => { 
        
            entries.forEach(entry => {
                if (entry.isIntersecting)
                    props.scrollFunction();
            })
        }, options);
        observer.observe(container);
    }

    on(window, 'resize', resize);
    resize();
})

</script>

<div bind:this={container}>

    <props.content></props.content>
</div>