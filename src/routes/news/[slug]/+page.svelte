<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { ArrowLeft, Clock, User, Tag } from 'lucide-svelte';
	import { t } from '$lib/i18n';
	import { marked } from 'marked';
	import { articles } from '$lib/data/news';
	import NewsCard from '$lib/components/NewsCard.svelte';

	export let data;
	$: article = data.article;

	const colorBg = {
		blue: 'from-pastel-blue-light to-white dark:from-pastel-blue-dark/20 dark:to-gray-950',
		green: 'from-pastel-green-light to-white dark:from-pastel-green-dark/20 dark:to-gray-950',
		red: 'from-pastel-red-light to-white dark:from-pastel-red-dark/20 dark:to-gray-950',
		yellow: 'from-pastel-yellow-light to-white dark:from-pastel-yellow-dark/20 dark:to-gray-950',
	};

	const tagColor = {
		blue: 'bg-pastel-blue-light text-pastel-blue-dark dark:bg-pastel-blue-dark/30 dark:text-pastel-blue',
		green: 'bg-pastel-green-light text-pastel-green-dark dark:bg-pastel-green-dark/30 dark:text-pastel-green',
		red: 'bg-pastel-red-light text-pastel-red-dark dark:bg-pastel-red-dark/30 dark:text-pastel-red',
		yellow: 'bg-pastel-yellow-light text-pastel-yellow-dark dark:bg-pastel-yellow-dark/30 dark:text-pastel-yellow',
	};

	$: htmlContent = marked.parse(article.content);
	$: related = articles.filter(a => a.slug !== article.slug && a.tags.some(t => article.tags.includes(t))).slice(0, 3);

	function formatDate(d: string) {
		return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
	}
</script>

<svelte:head>
	<title>{article.title} — Pantrypoints News</title>
	<meta name="description" content={article.excerpt} />
</svelte:head>

<!-- Hero -->
<section class="bg-gradient-to-br {colorBg[article.color]} py-20 border-b border-gray-100 dark:border-gray-800">
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
		<a
			href="/news"
			in:fly={{ x: -10, duration: 300 }}
			class="inline-flex items-center gap-2 text-sm font-display font-600 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-10 transition-colors"
		>
			<ArrowLeft size={16} />
			{$t.news.backToNews}
		</a>

		<div in:fly={{ y: 20, duration: 500, delay: 100, easing: cubicOut }}>
			<!-- Tags -->
			<div class="flex flex-wrap gap-2 mb-6">
				{#each article.tags as tag}
					<span class="px-3 py-1 rounded-full text-sm font-display font-600 {tagColor[article.color]}">{tag}</span>
				{/each}
			</div>

			<h1 class="font-display font-900 text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-white mb-6 leading-tight">
				{article.title}
			</h1>

			<p class="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">{article.excerpt}</p>

			<!-- Meta -->
			<div class="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 pb-8 border-b border-gray-200 dark:border-gray-800">
				<span class="flex items-center gap-1.5">
					<div class="w-7 h-7 rounded-full bg-gradient-to-br from-pastel-blue to-pastel-green flex items-center justify-center text-white text-xs font-display font-700">
						{article.author[0]}
					</div>
					{article.author}
				</span>
				<span class="text-gray-300 dark:text-gray-700">·</span>
				<span class="flex items-center gap-1"><Clock size={13} />{article.readingTime} {$t.news.minRead}</span>
				<span class="text-gray-300 dark:text-gray-700">·</span>
				<span>{formatDate(article.date)}</span>
			</div>
		</div>
	</div>
</section>

<!-- Article Body -->
<section class="py-16 bg-white dark:bg-gray-950">
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-12">
			<!-- Markdown Content -->
			<div
				in:fly={{ y: 20, duration: 500, delay: 200, easing: cubicOut }}
				class="prose-pantry"
			>
				{@html htmlContent}
			</div>

			<!-- Sidebar -->
			<aside in:fly={{ y: 20, duration: 500, delay: 300, easing: cubicOut }} class="hidden lg:block">
				<div class="sticky top-24 space-y-6">
					<!-- Author Card -->
					<div class="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
						<div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-pastel-blue to-pastel-green flex items-center justify-center text-white text-lg font-display font-800 mb-3">
							{article.author[0]}
						</div>
						<div class="font-display font-700 text-gray-900 dark:text-white text-sm mb-0.5">{article.author}</div>
						<div class="text-xs text-gray-500 dark:text-gray-400">{article.authorRole}</div>
					</div>

					<!-- Tags -->
					<div class="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
						<div class="font-display font-700 text-gray-900 dark:text-white text-sm mb-3 flex items-center gap-1.5">
							<Tag size={14} />{$t.news.tags}
						</div>
						<div class="flex flex-wrap gap-1.5">
							{#each article.tags as tag}
								<span class="px-2.5 py-1 rounded-full text-xs font-display font-600 {tagColor[article.color]}">{tag}</span>
							{/each}
						</div>
					</div>
				</div>
			</aside>
		</div>
	</div>
</section>

<!-- Related Articles -->
{#if related.length > 0}
	<section class="py-16 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<h2 class="font-display font-800 text-2xl text-gray-900 dark:text-white mb-8">Related Articles</h2>
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each related as rel, i}
					<NewsCard article={rel} index={i} />
				{/each}
			</div>
		</div>
	</section>
{/if}
