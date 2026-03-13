<script lang="ts">
	import { fly, fade, scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { ArrowRight, Leaf, Users, Globe, Repeat, Shield, Zap } from 'lucide-svelte';
	import { t } from '$lib/i18n';
	import RegistrationForm from '$lib/components/RegistrationForm.svelte';
	import AppCard from '$lib/components/AppCard.svelte';
	import NewsCard from '$lib/components/NewsCard.svelte';
	import { apps } from '$lib/data/apps';
	import { articles } from '$lib/data/news';

	let mounted = false;
	let statsVisible = false;

	onMount(() => {
		mounted = true;
		// Animate stats when in view
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) statsVisible = true;
		}, { threshold: 0.3 });
		const statsEl = document.getElementById('stats');
		if (statsEl) observer.observe(statsEl);
		return () => observer.disconnect();
	});

	const stats = [
		{ key: 'stat1', value: '128+', icon: Users, color: 'text-pastel-blue-dark dark:text-pastel-blue' },
		{ key: 'stat2', value: '4,200+', icon: Repeat, color: 'text-pastel-green-dark dark:text-pastel-green' },
		{ key: 'stat3', value: '12', icon: Globe, color: 'text-pastel-yellow-dark dark:text-pastel-yellow' }
	];

	const features = [
		{
			icon: Leaf,
			title: 'Real-Value Exchange',
			desc: 'Every point represents actual goods or services produced in your community.',
			color: 'bg-pastel-green-light dark:bg-pastel-green-dark/20 text-pastel-green-dark dark:text-pastel-green'
		},
		{
			icon: Shield,
			title: 'Transparent Ledger',
			desc: 'Every transaction is recorded openly. Communities govern their own economy.',
			color: 'bg-pastel-blue-light dark:bg-pastel-blue-dark/20 text-pastel-blue-dark dark:text-pastel-blue'
		},
		{
			icon: Zap,
			title: 'Offline-Capable',
			desc: 'Works in low-connectivity environments — built for rural and remote communities.',
			color: 'bg-pastel-yellow-light dark:bg-pastel-yellow-dark/20 text-pastel-yellow-dark dark:text-pastel-yellow'
		},
		{
			icon: Globe,
			title: 'Open Source',
			desc: 'MIT licensed. Self-host, fork, contribute. The commons belongs to everyone.',
			color: 'bg-pastel-red-light dark:bg-pastel-red-dark/20 text-pastel-red-dark dark:text-pastel-red'
		}
	];

	// Decorative floating blobs
	const blobs = [
		{ color: '#A8D5E2', x: 10, y: 15, size: 300, delay: 0 },
		{ color: '#A8DDB5', x: 70, y: 5, size: 250, delay: 2 },
		{ color: '#F4E285', x: 85, y: 50, size: 200, delay: 4 },
		{ color: '#F4ACAC', x: 5, y: 60, size: 180, delay: 1 }
	];
</script>

<svelte:head>
	<title>Pantrypoints — Exchange Value, Not Money</title>
</svelte:head>

<!-- ══════════════════════════════════════════════
     HERO
══════════════════════════════════════════════ -->
<section class="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 noise-bg">
	<!-- Animated background blobs -->
	{#each blobs as blob}
		<div
			class="absolute rounded-full opacity-30 dark:opacity-10 animate-float pointer-events-none"
			style="
				background: {blob.color};
				left: {blob.x}%;
				top: {blob.y}%;
				width: {blob.size}px;
				height: {blob.size}px;
				filter: blur(60px);
				animation-delay: {blob.delay}s;
			"
		/>
	{/each}

	<div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
			<!-- Left: Copy -->
			<div>
				{#if mounted}
					<div in:fly={{ y: 30, duration: 600, delay: 100, easing: cubicOut }}>
						<span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pastel-blue-light dark:bg-pastel-blue-dark/20 text-pastel-blue-dark dark:text-pastel-blue text-xs font-display font-700 uppercase tracking-widest mb-8">
							<Leaf size={12} />
							{$t.hero.badge}
						</span>
					</div>

					<div in:fly={{ y: 30, duration: 600, delay: 200, easing: cubicOut }}>
						<h1 class="font-display font-900 text-5xl sm:text-6xl lg:text-7xl leading-[0.95] text-gray-900 dark:text-white mb-6">
							{$t.hero.title}
							<br />
							<span class="relative">
								<span class="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-pastel-blue-dark via-pastel-green-dark to-pastel-blue-dark">
									{$t.hero.titleAccent}
								</span>
								<!-- Underline decoration -->
								<svg class="absolute -bottom-2 left-0 w-full" viewBox="0 0 400 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
									<path d="M4 12C50 4 150 2 200 8C250 14 350 4 396 8" stroke="#A8D5E2" stroke-width="6" stroke-linecap="round"/>
								</svg>
							</span>
						</h1>
					</div>

					<div in:fly={{ y: 30, duration: 600, delay: 300, easing: cubicOut }}>
						<p class="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-10 max-w-lg">
							{$t.hero.subtitle}
						</p>
					</div>

					<div in:fly={{ y: 30, duration: 600, delay: 400, easing: cubicOut }} class="flex flex-wrap gap-4">
						<a href="#register" class="btn-primary text-base px-8 py-4">
							{$t.hero.register}
							<ArrowRight size={18} />
						</a>
						<a href="/apps" class="btn-secondary text-base px-8 py-4">
							{$t.hero.learnMore}
						</a>
					</div>
				{/if}
			</div>

			<!-- Right: Registration Form -->
			{#if mounted}
				<div id="register" in:fly={{ y: 40, duration: 700, delay: 300, easing: cubicOut }}>
					<RegistrationForm />
				</div>
			{/if}
		</div>
	</div>
</section>

<!-- ══════════════════════════════════════════════
     STATS
══════════════════════════════════════════════ -->
<section id="stats" class="py-20 bg-gray-950 dark:bg-gray-900">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 sm:grid-cols-3 gap-8">
			{#each stats as stat, i}
				{#if statsVisible}
					<div
						in:fly={{ y: 20, duration: 500, delay: i * 100, easing: cubicOut }}
						class="text-center"
					>
						<div class="w-12 h-12 rounded-2xl bg-gray-800 flex items-center justify-center mx-auto mb-4 {stat.color}">
							<svelte:component this={stat.icon} size={22} />
						</div>
						<div class="font-display font-900 text-4xl text-white mb-1">{stat.value}</div>
						<div class="text-gray-400 text-sm">{$t.hero[stat.key]}</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</section>

<!-- ══════════════════════════════════════════════
     FEATURES
══════════════════════════════════════════════ -->
<section class="py-24 bg-white dark:bg-gray-950">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="section-heading mb-4">Why Pantrypoints?</h2>
			<p class="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-base">
				Built for communities that want to exchange value on their own terms.
			</p>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
			{#each features as feat, i}
				<div
					in:fly={{ y: 20, duration: 400, delay: 100 + i * 80, easing: cubicOut }}
					class="p-6 rounded-3xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:-translate-y-1 transition-transform duration-300"
				>
					<div class="w-12 h-12 rounded-2xl {feat.color} flex items-center justify-center mb-4">
						<svelte:component this={feat.icon} size={22} />
					</div>
					<h3 class="font-display font-800 text-base text-gray-900 dark:text-white mb-2">{feat.title}</h3>
					<p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{feat.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ══════════════════════════════════════════════
     APPS PREVIEW
══════════════════════════════════════════════ -->
<section class="py-24 bg-gray-50 dark:bg-gray-900">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
			<div>
				<h2 class="section-heading mb-3">{$t.apps.title}</h2>
				<p class="text-gray-500 dark:text-gray-400 text-base max-w-lg">{$t.apps.subtitle}</p>
			</div>
			<a href="/apps" class="btn-secondary shrink-0">
				{$t.apps.viewAll}
				<ArrowRight size={16} />
			</a>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
			{#each apps.slice(0, 4) as app, i}
				<AppCard {app} index={i} />
			{/each}
		</div>
	</div>
</section>

<!-- ══════════════════════════════════════════════
     NEWS PREVIEW
══════════════════════════════════════════════ -->
<section class="py-24 bg-white dark:bg-gray-950">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
			<div>
				<h2 class="section-heading mb-3">{$t.news.title}</h2>
				<p class="text-gray-500 dark:text-gray-400 text-base">{$t.news.subtitle}</p>
			</div>
			<a href="/news" class="btn-secondary shrink-0">
				All News
				<ArrowRight size={16} />
			</a>
		</div>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each articles.slice(0, 3) as article, i}
				<NewsCard {article} index={i} />
			{/each}
		</div>
	</div>
</section>

<!-- ══════════════════════════════════════════════
     CTA BAND
══════════════════════════════════════════════ -->
<section class="py-20 bg-gradient-to-br from-pastel-blue-dark via-pastel-blue to-pastel-green-dark text-white">
	<div class="max-w-3xl mx-auto px-4 text-center">
		<h2 class="font-display font-900 text-4xl sm:text-5xl mb-5 text-white">
			Ready to join the<br />moneyless economy?
		</h2>
		<p class="text-white/80 text-base mb-10 max-w-xl mx-auto leading-relaxed">
			Register for early access and be among the first communities to go live with Pantrypoints.
		</p>
		<a href="#register" class="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-pastel-blue-dark font-display font-800 text-base hover:bg-white/90 transition-all hover:-translate-y-0.5 shadow-xl">
			{$t.hero.register}
			<ArrowRight size={18} />
		</a>
	</div>
</section>
