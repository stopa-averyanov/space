<script>
import { resolve } from '$app/paths';
let on = false;

const elements = [
    {
        name : 'Главная',
        href : resolve('/')
    },
    {
        name : 'Масштаб',
        href : resolve('/actualScale/')
    },
    {
        name : 'Сравнение',
        href : resolve('/compare/')
    },
    {
        name : 'История',
        href : resolve('/timeline/')
    },
    {
        name : 'Квиз',
        href : resolve('/quiz/')
    }
]

</script>

<style>

.navigation-container {

    position: fixed;
    top: 0;
    right: 0;
    padding: 1em;

    display: flex;
    flex-direction: column;
    align-items: end;

    z-index: 2;

    text-align: right;
}
.burger-menu-icon {

    position: relative;
    min-height: 24px;
    min-width: 32px;
    max-height: 24px;
    max-width: 32px;
    transition: 0.1s;

    z-index: 3;
}
.rectangle {

    min-height: 2px;
    min-width: 100%;
    background-color: white;
    position: absolute;

    transition-duration: 0.2s;
}
.one {
    top: 0;
}
.four {
    bottom: 0;
}
.two, .three {
    top: 50%;
    transform: translate(0, -50%);
}
.one.active, .four.active {

    opacity: 0;
} 
.two.active {
    transform: translate(0, 0);
    rotate: 45deg;
}
.three.active {
    rotate: -45deg;
    transform: translate(0, 0);
}
.burger-menu-icon:hover {

    transform: scale(1.1, 1.1);
}
a {
    margin: 0.5em 0;
    display: block;
    opacity: 0;
    transition: 0.5s;
    transform: translate(0, -20%);
    text-shadow: 0px 0px 21px 2px rgba(0, 0, 0, 1);
    color: white;
    text-decoration: none;
}
a.active {

    opacity: 1;
    transform: translate(0, 0);
}
.navigation-options {
    
    margin-top: 0.5em;
    transition: 0.5s;
    padding: 0 1em;
    box-sizing: border-box;
    transition-property: background-color, backdrop-filter;
}
@media (max-width: 767px) {

    .navigation-options {

        z-index: 1;

        position: fixed;
        right: 0;
        top: 0;
        margin: 0;
        min-width: 100%;
        min-height: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        display: flex;

        visibility: hidden;
        transition: background-color 0.2s linear 0s, backdrop-filter 0.2s linear 0s, visibility 0s linear 0.5s;

        pointer-events: all;
    }
    .navigation-options.active {
    
        background-color: #00000066;
        backdrop-filter: blur(5px);
        
        visibility: visible;
        transition: background-color 0.2s linear 0s, backdrop-filter 0.2s linear 0s, visibility 0s linear 0.0s;
    }
}

</style>

<div class='navigation-container'>

    <div class='burger-menu-icon' onclick={() => {on = !on}}>
        <div class='rectangle one {on ? "active" : ""}'></div>
        <div class='rectangle two {on ? "active" : ""}'></div>
        <div class='rectangle three {on ? "active" : ""}'></div>
        <div class='rectangle four {on ? "active" : ""}'></div>
    </div>

    <div onclick={() => {on = false;}} class='navigation-options {on ? "active" : ""}'>
        {#each elements as element, index}
        <a data-sveltekit-reload href={element.href} class='{on ? "active" : ""}' style='transition-delay: {index * 0.1}s'>{element.name}</a>
        {/each}
    </div>
</div>