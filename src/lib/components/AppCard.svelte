<script lang="ts">
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { ArrowRight, Zap, Clock, CheckCircle } from 'lucide-svelte';
	import type { App } from '$lib/data/apps';
	import { t } from '$lib/i18n';

	export let app: App;
	export let index = 0;

	const colorClasses = {
		blue: {
			bg: 'bg-pastel-blue-light dark:bg-pastel-blue-dark/15',
			badge: 'bg-pastel-blue text-pastel-blue-dark',
			accent: 'text-pastel-blue-dark dark:text-pastel-blue',
			border: 'hover:border-pastel-blue dark:hover:border-pastel-blue-dark',
			iconBg: 'bg-pastel-blue/40 dark:bg-pastel-blue-dark/30',
		},
		green: {
			bg: 'bg-pastel-green-light dark:bg-pastel-green-dark/15',
			badge: 'bg-pastel-green text-pastel-green-dark',
			accent: 'text-pastel-green-dark dark:text-pastel-green',
			border: 'hover:border-pastel-green dark:hover:border-pastel-green-dark',
			iconBg: 'bg-pastel-green/40 dark:bg-pastel-green-dark/30',
		},
		red: {
			bg: 'bg-pastel-red-light dark:bg-pastel-red-dark/15',
			badge: 'bg-pastel-red text-pastel-red-dark',
			accent: 'text-pastel-red-dark dark:text-pastel-red',
			border: 'hover:border-pastel-red dark:hover:border-pastel-red-dark',
			iconBg: 'bg-pastel-red/40 dark:bg-pastel-red-dark/30',
		},
		yellow: {
			bg: 'bg-pastel-yellow-light dark:bg-pastel-yellow-dark/15',
			badge: 'bg-pastel-yellow text-pastel-yellow-dark',
			accent: 'text-pastel-yellow-dark dark:text-pastel-yellow',
			border: 'hover:border-pastel-yellow dark:hover:border-pastel-yellow-dark',
			iconBg: 'bg-pastel-yellow/40 dark:bg-pastel-yellow-dark/30',
		}
	};

	const statusIcons = {
		live: CheckCircle,
		beta: Zap,
		'coming-soon': Clock
	};

	const statusColors = {
		live: 'text-pastel-green-dark bg-pastel-green-light dark:text-pastel-green dark:bg-pastel-green-dark/20',
		beta: 'text-pastel-yellow-dark bg-pastel-yellow-light dark:text-pastel-yellow dark:bg-pastel-yellow-dark/20',
		'coming-soon': 'text-gray-500 bg-gray-100 dark:text-gray-400 dark:bg-gray-800'
	};

	$: c = colorClasses[app.color];
	$: StatusIcon = statusIcons[app.status];
</script>

<a
	href="/apps/{app.category}/{app.slug}"
	in:fly={{ y: 24, duration: 400, delay: index * 60, easing: cubicOut }}
	class="card block p-6 border-2 border-transparent {c.border} group transition-all duration-300 cursor-pointer"
>
	<!-- Top row: icon + status -->
	<div class="flex items-start justify-between mb-4">
		<div class="w-14 h-14 rounded-2xl {c.iconBg} flex items-center justify-center text-3xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
			{app.icon}
		</div>
		<span class="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-display font-700 {statusColors[app.status]}">
			<svelte:component this={StatusIcon} size={11} />
			{app.status === 'coming-soon' ? 'Soon' : app.status.charAt(0).toUpperCase() + app.status.slice(1)}
		</span>
	</div>

	<!-- Title & tagline -->
	<h3 class="font-display font-800 text-lg text-gray-900 dark:text-white mb-1 group-hover:{c.accent.split(' ')[0]} transition-colors">
		{app.title}
	</h3>
	<p class="text-xs font-display font-600 {c.accent} mb-3">{app.tagline}</p>
	<p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5 line-clamp-2">{app.description}</p>

	<!-- Tags -->
	<div class="flex flex-wrap gap-1.5 mb-5">
		{#each app.tags.slice(0, 3) as tag}
			<span class="px-2 py-0.5 rounded-full text-xs font-display font-600 {c.badge} bg-opacity-60">{tag}</span>
		{/each}
	</div>

	<!-- CTA -->
	<div class="flex items-center gap-1.5 {c.accent} text-sm font-display font-700 group-hover:gap-3 transition-all">
		{$t.apps.learnMore}
		<ArrowRight size={15} class="transition-transform duration-200 group-hover:translate-x-1" />
	</div>
</a>
