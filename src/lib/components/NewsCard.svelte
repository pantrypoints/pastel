<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { ArrowRight, Clock, User } from 'lucide-svelte';
	import type { NewsArticle } from '$lib/data/news';
	import { t } from '$lib/i18n';

	export let article: NewsArticle;
	export let index = 0;

	const colorAccents = {
		blue: 'from-pastel-blue-light to-pastel-blue/10 dark:from-pastel-blue-dark/20 dark:to-transparent border-pastel-blue/40',
		green: 'from-pastel-green-light to-pastel-green/10 dark:from-pastel-green-dark/20 dark:to-transparent border-pastel-green/40',
		red: 'from-pastel-red-light to-pastel-red/10 dark:from-pastel-red-dark/20 dark:to-transparent border-pastel-red/40',
		yellow: 'from-pastel-yellow-light to-pastel-yellow/10 dark:from-pastel-yellow-dark/20 dark:to-transparent border-pastel-yellow/40',
	};

	const tagColors = {
		blue: 'bg-pastel-blue/50 text-pastel-blue-dark dark:bg-pastel-blue-dark/30 dark:text-pastel-blue',
		green: 'bg-pastel-green/50 text-pastel-green-dark dark:bg-pastel-green-dark/30 dark:text-pastel-green',
		red: 'bg-pastel-red/50 text-pastel-red-dark dark:bg-pastel-red-dark/30 dark:text-pastel-red',
		yellow: 'bg-pastel-yellow/50 text-pastel-yellow-dark dark:bg-pastel-yellow-dark/30 dark:text-pastel-yellow',
	};

	function formatDate(dateStr: string) {
		return new Date(dateStr).toLocaleDateString('en-US', {
			year: 'numeric', month: 'long', day: 'numeric'
		});
	}
</script>

<a
	href="/news/{article.slug}"
	in:fly={{ y: 24, duration: 400, delay: index * 60, easing: cubicOut }}
	class="card block overflow-hidden group border-2 border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300"
>
	<!-- Color strip header -->
	<div class="h-2 bg-gradient-to-r {colorAccents[article.color]}"></div>

	<div class="p-6">
		<!-- Tags -->
		<div class="flex flex-wrap gap-1.5 mb-4">
			{#each article.tags.slice(0, 3) as tag}
				<span class="px-2.5 py-0.5 rounded-full text-xs font-display font-700 {tagColors[article.color]}">{tag}</span>
			{/each}
		</div>

		<h3 class="font-display font-800 text-lg text-gray-900 dark:text-white mb-3 leading-snug group-hover:text-pastel-blue-dark dark:group-hover:text-pastel-blue transition-colors line-clamp-2">
			{article.title}
		</h3>

		<p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5 line-clamp-3">{article.excerpt}</p>

		<!-- Meta -->
		<div class="flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
			<div class="flex items-center gap-3">
				<span class="flex items-center gap-1"><User size={11} />{article.author}</span>
				<span class="flex items-center gap-1"><Clock size={11} />{article.readingTime} {$t.news.minRead}</span>
			</div>
			<span>{formatDate(article.date)}</span>
		</div>

		<!-- Read more -->
		<div class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center gap-1.5 text-pastel-blue-dark dark:text-pastel-blue text-sm font-display font-700 group-hover:gap-3 transition-all">
			{$t.news.readMore}
			<ArrowRight size={15} class="transition-transform duration-200 group-hover:translate-x-1" />
		</div>
	</div>
</a>
