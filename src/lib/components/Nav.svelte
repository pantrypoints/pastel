<script lang="ts">
	import { page } from '$app/stores';
	import { fly, fade, scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { Search, Sun, Moon, Menu, X, Globe, ChevronDown } from 'lucide-svelte';
	import { theme } from '$lib/stores/theme';
	import { lang, t } from '$lib/i18n';
	import type { Lang } from '$lib/i18n';
	import { searchApps } from '$lib/data/apps';
	import { searchNews } from '$lib/data/news';
	import { onMount } from 'svelte';

	let menuOpen = false;
	let searchOpen = false;
	let searchQuery = '';
	let langMenuOpen = false;
	let searchInput: HTMLInputElement;

	$: appResults = searchQuery.length > 1 ? searchApps(searchQuery) : [];
	$: newsResults = searchQuery.length > 1 ? searchNews(searchQuery) : [];
	$: hasResults = appResults.length > 0 || newsResults.length > 0;

	const navLinks = [
		{ key: 'home', href: '/' },
		{ key: 'apps', href: '/apps' },
		{ key: 'news', href: '/news' },
		{ key: 'admin', href: '/admin' }
	];

	function isActive(href: string) {
		if (href === '/') return $page.url.pathname === '/';
		return $page.url.pathname.startsWith(href);
	}

	function toggleSearch() {
		searchOpen = !searchOpen;
		menuOpen = false;
		searchQuery = '';
		if (searchOpen) {
			setTimeout(() => searchInput?.focus(), 100);
		}
	}

	function closeSearch() {
		searchOpen = false;
		searchQuery = '';
	}

	function setLang(l: Lang) {
		lang.set(l);
		langMenuOpen = false;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			closeSearch();
			menuOpen = false;
			langMenuOpen = false;
		}
	}

	const colorMap = {
		blue: 'bg-pastel-blue-light text-pastel-blue-dark',
		green: 'bg-pastel-green-light text-pastel-green-dark',
		red: 'bg-pastel-red-light text-pastel-red-dark',
		yellow: 'bg-pastel-yellow-light text-pastel-yellow-dark'
	};

	onMount(() => {
		document.addEventListener('keydown', handleKeydown);
		return () => document.removeEventListener('keydown', handleKeydown);
	});
</script>

<nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16">
			<!-- Logo -->
			<a href="/" class="flex items-center gap-2 group">
				<div class="w-8 h-8 rounded-xl bg-gradient-to-br from-pastel-blue-dark to-pastel-green-dark flex items-center justify-center text-white font-display font-900 text-sm group-hover:scale-110 transition-transform">
					P
				</div>
				<span class="font-display font-800 text-lg text-gray-900 dark:text-white">
					Pantry<span class="text-pastel-blue-dark">points</span>
				</span>
			</a>

			<!-- Desktop Nav -->
			<div class="hidden md:flex items-center gap-1">
				{#each navLinks as link}
					<a
						href={link.href}
						class="px-4 py-2 rounded-xl text-sm font-display font-600 transition-all duration-200
						{isActive(link.href)
							? 'bg-pastel-blue-light dark:bg-pastel-blue-dark/20 text-pastel-blue-dark dark:text-pastel-blue'
							: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'}"
					>
						{$t.nav[link.key]}
					</a>
				{/each}
			</div>

			<!-- Desktop Controls -->
			<div class="hidden md:flex items-center gap-2">
				<!-- Search -->
				<button
					on:click={toggleSearch}
					class="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
					aria-label="Search"
				>
					<Search size={18} />
				</button>

				<!-- Lang Select -->
				<div class="relative">
					<button
						on:click={() => langMenuOpen = !langMenuOpen}
						class="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-display font-600 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
					>
						<Globe size={15} />
						{$lang.toUpperCase()}
						<ChevronDown size={13} class={langMenuOpen ? 'rotate-180' : ''} style="transition: transform 0.2s" />
					</button>
					{#if langMenuOpen}
						<div
							transition:fly={{ y: -8, duration: 150 }}
							class="absolute right-0 top-full mt-1 w-32 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-lg overflow-hidden"
						>
							{#each ['en', 'zh'] as l}
								<button
									on:click={() => setLang(l)}
									class="w-full text-left px-4 py-2.5 text-sm font-display font-600 transition-colors
									{$lang === l ? 'bg-pastel-blue-light dark:bg-pastel-blue-dark/20 text-pastel-blue-dark dark:text-pastel-blue' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}"
								>
									{$t.lang[l]}
								</button>
							{/each}
						</div>
					{/if}
				</div>

				<!-- Theme Toggle -->
				<button
					on:click={() => theme.toggle()}
					class="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
					aria-label="Toggle theme"
				>
					{#if $theme === 'dark'}
						<Sun size={18} />
					{:else}
						<Moon size={18} />
					{/if}
				</button>
			</div>

			<!-- Mobile Controls -->
			<div class="md:hidden flex items-center gap-2">
				<button on:click={toggleSearch} class="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
					<Search size={18} />
				</button>
				<button
					on:click={() => menuOpen = !menuOpen}
					class="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
				>
					{#if menuOpen}<X size={18} />{:else}<Menu size={18} />{/if}
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if menuOpen}
		<div transition:fly={{ y: -10, duration: 200 }} class="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-3 space-y-1">
			{#each navLinks as link}
				<a
					href={link.href}
					on:click={() => menuOpen = false}
					class="block px-4 py-3 rounded-2xl text-sm font-display font-600 transition-all
					{isActive(link.href)
						? 'bg-pastel-blue-light dark:bg-pastel-blue-dark/20 text-pastel-blue-dark dark:text-pastel-blue'
						: 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}"
				>
					{$t.nav[link.key]}
				</a>
			{/each}
			<div class="flex items-center gap-2 pt-2 px-2 border-t border-gray-100 dark:border-gray-800">
				<button on:click={() => { setLang('en'); menuOpen = false; }} class="flex-1 py-2 rounded-xl text-sm font-display font-600 {$lang === 'en' ? 'bg-pastel-blue-light text-pastel-blue-dark' : 'text-gray-600 hover:bg-gray-100'} transition-all">EN</button>
				<button on:click={() => { setLang('zh'); menuOpen = false; }} class="flex-1 py-2 rounded-xl text-sm font-display font-600 {$lang === 'zh' ? 'bg-pastel-blue-light text-pastel-blue-dark' : 'text-gray-600 hover:bg-gray-100'} transition-all">中文</button>
				<button on:click={() => { theme.toggle(); }} class="flex-1 py-2 rounded-xl text-sm font-600 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 flex items-center justify-center transition-all">
					{#if $theme === 'dark'}<Sun size={16} />{:else}<Moon size={16} />{/if}
				</button>
			</div>
		</div>
	{/if}
</nav>

<!-- Search Overlay -->
{#if searchOpen}
	<div
		transition:fade={{ duration: 150 }}
		class="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
		on:click={closeSearch}
		on:keydown={(e) => e.key === 'Enter' && closeSearch()}
		role="button"
		tabindex="-1"
	/>
	<div
		transition:fly={{ y: -20, duration: 250, easing: cubicOut }}
		class="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-[101] px-4"
	>
		<div class="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
			<!-- Search Input -->
			<div class="flex items-center gap-3 px-5 py-4 border-b border-gray-100 dark:border-gray-800">
				<Search size={20} class="text-gray-400 shrink-0" />
				<input
					bind:this={searchInput}
					bind:value={searchQuery}
					placeholder={$t.nav.search}
					class="flex-1 bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400 outline-none font-body text-base"
				/>
				{#if searchQuery}
					<button on:click={() => searchQuery = ''} class="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 transition-colors">
						<X size={16} />
					</button>
				{/if}
				<kbd class="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 text-xs font-mono">ESC</kbd>
			</div>

			<!-- Results -->
			{#if searchQuery.length > 1}
				<div class="max-h-[60vh] overflow-y-auto">
					{#if !hasResults}
						<div class="py-10 text-center text-gray-400 font-body">
							{$t.nav.noResults} for "{searchQuery}"
						</div>
					{:else}
						{#if appResults.length > 0}
							<div class="p-3">
								<div class="px-2 py-1.5 text-xs font-display font-700 uppercase tracking-wide text-gray-400 mb-1">{$t.nav.searchResults} — Apps</div>
								{#each appResults as app, i}
									<a
										href="/apps/{app.category}/{app.slug}"
										on:click={closeSearch}
										transition:fly={{ x: -10, duration: 150, delay: i * 30 }}
										class="flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
									>
										<div class="w-10 h-10 rounded-xl {colorMap[app.color]} flex items-center justify-center text-lg shrink-0">{app.icon}</div>
										<div>
											<div class="text-sm font-display font-700 text-gray-900 dark:text-white group-hover:text-pastel-blue-dark dark:group-hover:text-pastel-blue transition-colors">{app.title}</div>
											<div class="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{app.tagline}</div>
										</div>
									</a>
								{/each}
							</div>
						{/if}
						{#if newsResults.length > 0}
							<div class="p-3 border-t border-gray-100 dark:border-gray-800">
								<div class="px-2 py-1.5 text-xs font-display font-700 uppercase tracking-wide text-gray-400 mb-1">{$t.nav.searchResults} — News</div>
								{#each newsResults as article, i}
									<a
										href="/news/{article.slug}"
										on:click={closeSearch}
										transition:fly={{ x: -10, duration: 150, delay: i * 30 }}
										class="flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
									>
										<div class="w-10 h-10 rounded-xl {colorMap[article.color]} flex items-center justify-center text-lg shrink-0">📰</div>
										<div>
											<div class="text-sm font-display font-700 text-gray-900 dark:text-white group-hover:text-pastel-blue-dark transition-colors line-clamp-1">{article.title}</div>
											<div class="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">{article.excerpt}</div>
										</div>
									</a>
								{/each}
							</div>
						{/if}
					{/if}
				</div>
			{/if}
		</div>
	</div>
{/if}
