<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { Search, X } from 'lucide-svelte';
	import { t } from '$lib/i18n';
	import AppCard from '$lib/components/AppCard.svelte';
	import { apps, searchApps } from '$lib/data/apps';

	let filter = '';
	let activeStatus: 'all' | 'live' | 'beta' | 'coming-soon' = 'all';

	$: filtered = (() => {
		let result = filter.length > 1 ? searchApps(filter) : [...apps];
		if (activeStatus !== 'all') result = result.filter(a => a.status === activeStatus);
		return result;
	})();

	const statusOptions = [
		{ value: 'all', label: 'All' },
		{ value: 'live', label: 'Live' },
		{ value: 'beta', label: 'Beta' },
		{ value: 'coming-soon', label: 'Coming Soon' }
	];
</script>

<svelte:head>
	<title>Apps — Pantrypoints</title>
</svelte:head>

<!-- Hero -->
<section class="page-hero py-20">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<div in:fly={{ y: 20, duration: 500, easing: cubicOut }}>
			<span class="inline-block px-4 py-1.5 rounded-full bg-pastel-green-light dark:bg-pastel-green-dark/20 text-pastel-green-dark dark:text-pastel-green text-xs font-display font-700 uppercase tracking-widest mb-6">Ecosystem</span>
			<h1 class="section-heading text-5xl mb-4">{$t.apps.title}</h1>
			<p class="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">{$t.apps.subtitle}</p>
		</div>
	</div>
</section>

<!-- Filters -->
<section class="py-8 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 sticky top-16 z-30 backdrop-blur-xl bg-white/80 dark:bg-gray-950/80">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-4 items-center">
		<!-- Search -->
		<div class="relative flex-1 max-w-md">
			<Search size={16} class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
			<input
				bind:value={filter}
				type="text"
				placeholder={$t.nav.search}
				class="input pl-10 pr-10"
			/>
			{#if filter}
				<button on:click={() => filter = ''} class="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
					<X size={14} />
				</button>
			{/if}
		</div>

		<!-- Status filter -->
		<div class="flex gap-2 flex-wrap">
			{#each statusOptions as opt}
				<button
					on:click={() => activeStatus = opt.value}
					class="px-4 py-2 rounded-xl text-sm font-display font-600 transition-all
					{activeStatus === opt.value
						? 'bg-pastel-blue-dark text-white shadow-md'
						: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}"
				>
					{opt.label}
				</button>
			{/each}
		</div>
	</div>
</section>

<!-- Apps Grid -->
<section class="py-16 bg-gray-50 dark:bg-gray-900 min-h-[60vh]">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		{#if filtered.length === 0}
			<div class="text-center py-24 text-gray-400">
				<div class="text-5xl mb-4">🔍</div>
				<p class="font-display font-600">{$t.nav.noResults}</p>
			</div>
		{:else}
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				{#each filtered as app, i}
					<AppCard {app} index={i} />
				{/each}
			</div>
		{/if}
	</div>
</section>
