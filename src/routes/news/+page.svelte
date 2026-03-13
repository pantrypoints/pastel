<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { Search, X } from 'lucide-svelte';
	import { t } from '$lib/i18n';
	import NewsCard from '$lib/components/NewsCard.svelte';
	import { articles, searchNews } from '$lib/data/news';

	let filter = '';
	let activeTag = 'all';

	const allTags = ['all', ...new Set(articles.flatMap(a => a.tags))];

	$: filtered = (() => {
		let result = filter.length > 1 ? searchNews(filter) : [...articles];
		if (activeTag !== 'all') result = result.filter(a => a.tags.includes(activeTag));
		return result;
	})();
</script>

<svelte:head>
	<title>News — Pantrypoints</title>
</svelte:head>

<!-- Hero -->
<section class="page-hero py-20">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<div in:fly={{ y: 20, duration: 500, easing: cubicOut }}>
			<span class="inline-block px-4 py-1.5 rounded-full bg-pastel-yellow-light dark:bg-pastel-yellow-dark/20 text-pastel-yellow-dark dark:text-pastel-yellow text-xs font-display font-700 uppercase tracking-widest mb-6">Updates</span>
			<h1 class="section-heading text-5xl mb-4">{$t.news.title}</h1>
			<p class="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">{$t.news.subtitle}</p>
		</div>
	</div>
</section>

<!-- Filter Bar -->
<section class="py-6 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 sticky top-16 z-30 backdrop-blur-xl bg-white/80 dark:bg-gray-950/80">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-4 items-center">
		<!-- Search -->
		<div class="relative flex-1 max-w-md">
			<Search size={16} class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
			<input
				bind:value={filter}
				type="text"
				placeholder="Search articles..."
				class="input pl-10 pr-10"
			/>
			{#if filter}
				<button on:click={() => filter = ''} class="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
					<X size={14} />
				</button>
			{/if}
		</div>

		<!-- Tag filter -->
		<div class="flex gap-2 flex-wrap">
			{#each allTags.slice(0, 6) as tag}
				<button
					on:click={() => activeTag = tag}
					class="px-3 py-1.5 rounded-xl text-xs font-display font-700 uppercase tracking-wide transition-all
					{activeTag === tag
						? 'bg-pastel-blue-dark text-white'
						: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}"
				>
					{tag}
				</button>
			{/each}
		</div>
	</div>
</section>

<!-- Articles Grid -->
<section class="py-16 bg-gray-50 dark:bg-gray-900 min-h-[60vh]">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		{#if filtered.length === 0}
			<div class="text-center py-24 text-gray-400">
				<div class="text-5xl mb-4">📭</div>
				<p class="font-display font-600">{$t.nav.noResults}</p>
			</div>
		{:else}
			<!-- Featured article -->
			{#if filter.length <= 1 && activeTag === 'all' && filtered.length > 0}
				{@const featured = filtered[0]}
				<a
					href="/news/{featured.slug}"
					in:fly={{ y: 20, duration: 500, easing: cubicOut }}
					class="block mb-8 card overflow-hidden group border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300"
				>
					<div class="grid grid-cols-1 lg:grid-cols-2">
						<!-- Color panel -->
						<div class="h-32 lg:h-auto bg-gradient-to-br
							{featured.color === 'blue' ? 'from-pastel-blue-light to-pastel-blue' :
							 featured.color === 'green' ? 'from-pastel-green-light to-pastel-green' :
							 featured.color === 'yellow' ? 'from-pastel-yellow-light to-pastel-yellow' :
							 'from-pastel-red-light to-pastel-red'}
							dark:from-gray-800 dark:to-gray-700 flex items-center justify-center text-6xl">
							📰
						</div>
						<div class="p-8 lg:p-10">
							<div class="flex flex-wrap gap-2 mb-4">
								{#each featured.tags.slice(0, 3) as tag}
									<span class="px-2.5 py-0.5 rounded-full text-xs font-display font-700 bg-pastel-blue-light text-pastel-blue-dark dark:bg-pastel-blue-dark/20 dark:text-pastel-blue">{tag}</span>
								{/each}
								<span class="px-2.5 py-0.5 rounded-full text-xs font-display font-700 bg-gray-100 dark:bg-gray-800 text-gray-500">Featured</span>
							</div>
							<h2 class="font-display font-900 text-2xl lg:text-3xl text-gray-900 dark:text-white mb-4 group-hover:text-pastel-blue-dark dark:group-hover:text-pastel-blue transition-colors leading-tight">{featured.title}</h2>
							<p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{featured.excerpt}</p>
							<div class="text-sm text-gray-400 flex items-center gap-4">
								<span>{featured.author}</span>
								<span>·</span>
								<span>{featured.readingTime} min read</span>
								<span>·</span>
								<span>{new Date(featured.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
							</div>
						</div>
					</div>
				</a>
			{/if}

			<!-- Grid -->
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each (filter.length > 1 || activeTag !== 'all' ? filtered : filtered.slice(1)) as article, i}
					<NewsCard {article} index={i} />
				{/each}
			</div>
		{/if}
	</div>
</section>
