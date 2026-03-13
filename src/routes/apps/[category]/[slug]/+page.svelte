<script lang="ts">
	import { fly, scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { ArrowLeft, CheckCircle, Zap, Clock, Github, ExternalLink } from 'lucide-svelte';
	import { t } from '$lib/i18n';
	import { apps } from '$lib/data/apps';
	import AppCard from '$lib/components/AppCard.svelte';

	export let data;
	$: app = data.app;

	const colorConfig = {
		blue: {
			hero: 'from-pastel-blue-light via-white to-white dark:from-pastel-blue-dark/20 dark:via-gray-950 dark:to-gray-950',
			icon: 'bg-pastel-blue/50 dark:bg-pastel-blue-dark/30',
			badge: 'bg-pastel-blue-light text-pastel-blue-dark dark:bg-pastel-blue-dark/30 dark:text-pastel-blue',
			accent: 'text-pastel-blue-dark dark:text-pastel-blue',
			btn: 'bg-pastel-blue-dark hover:bg-pastel-blue text-white',
			check: 'text-pastel-blue-dark dark:text-pastel-blue',
			checkBg: 'bg-pastel-blue-light dark:bg-pastel-blue-dark/20'
		},
		green: {
			hero: 'from-pastel-green-light via-white to-white dark:from-pastel-green-dark/20 dark:via-gray-950 dark:to-gray-950',
			icon: 'bg-pastel-green/50 dark:bg-pastel-green-dark/30',
			badge: 'bg-pastel-green-light text-pastel-green-dark dark:bg-pastel-green-dark/30 dark:text-pastel-green',
			accent: 'text-pastel-green-dark dark:text-pastel-green',
			btn: 'bg-pastel-green-dark hover:bg-pastel-green text-white',
			check: 'text-pastel-green-dark dark:text-pastel-green',
			checkBg: 'bg-pastel-green-light dark:bg-pastel-green-dark/20'
		},
		red: {
			hero: 'from-pastel-red-light via-white to-white dark:from-pastel-red-dark/20 dark:via-gray-950 dark:to-gray-950',
			icon: 'bg-pastel-red/50 dark:bg-pastel-red-dark/30',
			badge: 'bg-pastel-red-light text-pastel-red-dark dark:bg-pastel-red-dark/30 dark:text-pastel-red',
			accent: 'text-pastel-red-dark dark:text-pastel-red',
			btn: 'bg-pastel-red-dark hover:bg-pastel-red text-white',
			check: 'text-pastel-red-dark dark:text-pastel-red',
			checkBg: 'bg-pastel-red-light dark:bg-pastel-red-dark/20'
		},
		yellow: {
			hero: 'from-pastel-yellow-light via-white to-white dark:from-pastel-yellow-dark/20 dark:via-gray-950 dark:to-gray-950',
			icon: 'bg-pastel-yellow/50 dark:bg-pastel-yellow-dark/30',
			badge: 'bg-pastel-yellow-light text-pastel-yellow-dark dark:bg-pastel-yellow-dark/30 dark:text-pastel-yellow',
			accent: 'text-pastel-yellow-dark dark:text-pastel-yellow',
			btn: 'bg-pastel-yellow-dark hover:bg-pastel-yellow text-white',
			check: 'text-pastel-yellow-dark dark:text-pastel-yellow',
			checkBg: 'bg-pastel-yellow-light dark:bg-pastel-yellow-dark/20'
		}
	};

	const statusInfo = {
		live: { icon: CheckCircle, label: 'Live', color: 'text-pastel-green-dark bg-pastel-green-light dark:text-pastel-green dark:bg-pastel-green-dark/20' },
		beta: { icon: Zap, label: 'Beta', color: 'text-pastel-yellow-dark bg-pastel-yellow-light dark:text-pastel-yellow dark:bg-pastel-yellow-dark/20' },
		'coming-soon': { icon: Clock, label: 'Coming Soon', color: 'text-gray-500 bg-gray-100 dark:text-gray-400 dark:bg-gray-800' }
	};

	$: c = colorConfig[app.color];
	$: si = statusInfo[app.status];
	$: related = apps.filter(a => a.id !== app.id && (a.category === app.category || a.color === app.color)).slice(0, 3);

	// Dummy screenshot placeholders
	const screenshots = [
		{ label: 'Dashboard', bg: 'from-pastel-blue-light to-pastel-green-light' },
		{ label: 'Exchange View', bg: 'from-pastel-green-light to-pastel-yellow-light' },
		{ label: 'Profile', bg: 'from-pastel-yellow-light to-pastel-red-light' }
	];
</script>

<svelte:head>
	<title>{app.title} — Pantrypoints</title>
</svelte:head>

<!-- Hero -->
<section class="bg-gradient-to-br {c.hero} py-20 border-b border-gray-100 dark:border-gray-800">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<!-- Back -->
		<a
			href="/apps"
			in:fly={{ x: -10, duration: 300 }}
			class="inline-flex items-center gap-2 text-sm font-display font-600 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-10 transition-colors"
		>
			<ArrowLeft size={16} />
			{$t.apps.backToApps}
		</a>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
			<div in:fly={{ y: 20, duration: 500, delay: 100, easing: cubicOut }}>
				<!-- Icon + status -->
				<div class="flex items-center gap-4 mb-6">
					<div class="w-20 h-20 rounded-3xl {c.icon} flex items-center justify-center text-5xl shadow-lg">
						{app.icon}
					</div>
					<span class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-display font-700 {si.color}">
						<svelte:component this={si.icon} size={14} />
						{si.label}
					</span>
				</div>

				<h1 class="font-display font-900 text-4xl sm:text-5xl text-gray-900 dark:text-white mb-3">{app.title}</h1>
				<p class="font-display font-600 {c.accent} text-lg mb-5">{app.tagline}</p>
				<p class="text-gray-600 dark:text-gray-400 leading-relaxed text-base mb-8">{app.description}</p>

				<!-- Tags -->
				<div class="flex flex-wrap gap-2 mb-8">
					{#each app.tags as tag}
						<span class="px-3 py-1 rounded-full text-sm font-display font-600 {c.badge}">{tag}</span>
					{/each}
				</div>

				<!-- CTAs -->
				<div class="flex flex-wrap gap-3">
					{#if app.url}
						<a href={app.url} target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-display font-700 {c.btn} shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
							<ExternalLink size={17} />
							{$t.apps.getStarted}
						</a>
					{/if}
					{#if app.github}
						<a href={app.github} target="_blank" rel="noopener" class="btn-secondary">
							<Github size={17} />
							GitHub
						</a>
					{/if}
					{#if !app.url && !app.github}
						<button class="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-display font-700 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed">
							<Clock size={17} />
							Coming Soon
						</button>
					{/if}
				</div>
			</div>

			<!-- Decorative UI mockup -->
			<div in:fly={{ y: 30, duration: 600, delay: 200, easing: cubicOut }} class="hidden lg:block">
				<div class="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
					<!-- Fake browser chrome -->
					<div class="flex items-center gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
						<div class="w-3 h-3 rounded-full bg-pastel-red"></div>
						<div class="w-3 h-3 rounded-full bg-pastel-yellow"></div>
						<div class="w-3 h-3 rounded-full bg-pastel-green"></div>
						<div class="ml-3 flex-1 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center px-3">
							<span class="text-xs text-gray-400 font-mono">pantrypoints.com/{app.category}/{app.slug}</span>
						</div>
					</div>
					<div class="p-6 bg-gradient-to-br {c.hero} min-h-[260px] flex items-center justify-center">
						<div class="text-center">
							<div class="text-7xl mb-4 animate-bounce-slow">{app.icon}</div>
							<div class="font-display font-800 text-2xl text-gray-900 dark:text-white">{app.title}</div>
							<div class="text-sm {c.accent} mt-1 font-display font-600">{app.tagline}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Long description + Features -->
<section class="py-20 bg-white dark:bg-gray-950">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
			<!-- Description -->
			<div class="lg:col-span-2">
				<h2 class="font-display font-800 text-2xl text-gray-900 dark:text-white mb-6">About {app.title}</h2>
				<div class="text-gray-600 dark:text-gray-400 leading-relaxed space-y-4">
					{#each app.longDescription.split('\n\n') as para}
						<p>{para}</p>
					{/each}
				</div>
			</div>

			<!-- Features -->
			<div>
				<h2 class="font-display font-800 text-2xl text-gray-900 dark:text-white mb-6">{$t.apps.features}</h2>
				<ul class="space-y-3">
					{#each app.features as feat, i}
						<li
							in:fly={{ x: 10, duration: 300, delay: i * 60, easing: cubicOut }}
							class="flex items-start gap-3"
						>
							<div class="w-6 h-6 rounded-full {c.checkBg} {c.check} flex items-center justify-center shrink-0 mt-0.5">
								<CheckCircle size={14} />
							</div>
							<span class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{feat}</span>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</section>

<!-- Screenshots Section -->
<section class="py-20 bg-gray-50 dark:bg-gray-900">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<h2 class="font-display font-800 text-2xl text-gray-900 dark:text-white mb-8">{$t.apps.screenshots}</h2>
		<div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
			{#each screenshots as shot, i}
				<div
					in:scale={{ start: 0.95, duration: 400, delay: i * 80, easing: cubicOut }}
					class="rounded-2xl overflow-hidden bg-gradient-to-br {shot.bg} dark:from-gray-800 dark:to-gray-700 aspect-video flex items-center justify-center border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
				>
					<div class="text-center">
						<div class="text-4xl mb-2">{app.icon}</div>
						<div class="text-xs font-display font-700 text-gray-600 dark:text-gray-400 uppercase tracking-wide">{shot.label}</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Related Apps -->
{#if related.length > 0}
	<section class="py-20 bg-white dark:bg-gray-950">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<h2 class="font-display font-800 text-2xl text-gray-900 dark:text-white mb-8">Related Apps</h2>
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each related as relApp, i}
					<AppCard app={relApp} index={i} />
				{/each}
			</div>
		</div>
	</section>
{/if}
