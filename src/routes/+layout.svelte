<script lang="ts">
	import '../app.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';

	onMount(() => {
		theme.init();
	});
</script>

<svelte:head>
	<title>Pantrypoints — The Moneyless Economy Platform</title>
</svelte:head>

<Nav />

<main class="pt-16 min-h-screen">
	{#key $page.url.pathname}
		<div class="page-transition">
			<slot />
		</div>
	{/key}
</main>

<Footer />
