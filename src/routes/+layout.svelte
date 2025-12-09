<script lang="ts">
import { asset } from '$app/paths';
import Navigation from '$lib/components/Navigation.svelte';

let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" type="image/x-icon" href={asset('/favicon.ico')}>
</svelte:head>

{@render children()}

<Navigation></Navigation>