<script lang="ts">
	import { fly, scale, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { Lock, LogOut, Users, Download, Search, X, Eye, EyeOff, AlertCircle, Loader } from 'lucide-svelte';
	import { t } from '$lib/i18n';

	export let data;

	let password = '';
	let showPassword = false;
	let loginError = false;
	let loginLoading = false;
	let searchQuery = '';

	$: registrations = data.registrations || [];
	$: filtered = searchQuery
		? registrations.filter(r =>
				r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
				(r.organization || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
				r.country.toLowerCase().includes(searchQuery.toLowerCase())
		  )
		: registrations;

	async function handleLogin() {
		loginLoading = true;
		loginError = false;
		const res = await fetch('/api/admin/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ password })
		});
		const d = await res.json();
		if (d.success) {
			window.location.reload();
		} else {
			loginError = true;
			loginLoading = false;
		}
	}

	async function handleLogout() {
		await fetch('/api/admin/logout', { method: 'POST' });
		window.location.reload();
	}

	function exportCSV() {
		const headers = ['Name', 'Email', 'Organization', 'Country', 'Interest', 'Joined At'];
		const rows = filtered.map(r => [
			r.name, r.email, r.organization || '', r.country, r.interest, r.created_at
		]);
		const csv = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(',')).join('\n');
		const blob = new Blob([csv], { type: 'text/csv' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'pantrypoints-registrations.csv';
		a.click();
		URL.revokeObjectURL(url);
	}

	function formatDate(d: string) {
		return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
	}

	const interestLabels: Record<string, string> = {
		individual: 'Individual', farmer: 'Farmer', business: 'Business',
		ngo: 'NGO', researcher: 'Researcher', other: 'Other'
	};

	const colorDots: Record<string, string> = {
		individual: 'bg-pastel-blue', farmer: 'bg-pastel-green',
		business: 'bg-pastel-yellow', ngo: 'bg-pastel-red',
		researcher: 'bg-purple-300', other: 'bg-gray-300'
	};
</script>

<svelte:head>
	<title>Admin — Pantrypoints</title>
</svelte:head>

{#if !data.isLoggedIn}
	<!-- Login Gate -->
	<section class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 px-4">
		<div
			in:scale={{ start: 0.92, duration: 400, easing: cubicOut }}
			class="w-full max-w-md"
		>
			<div class="bg-gray-900 rounded-3xl border border-gray-800 shadow-2xl overflow-hidden">
				<div class="h-1 bg-gradient-to-r from-pastel-blue via-pastel-green to-pastel-yellow"></div>
				<div class="p-10">
					<div class="w-14 h-14 rounded-2xl bg-pastel-blue-dark/20 flex items-center justify-center mb-6 text-pastel-blue">
						<Lock size={26} />
					</div>
					<h1 class="font-display font-900 text-2xl text-white mb-1">{$t.admin.title}</h1>
					<p class="text-gray-400 text-sm mb-8">{$t.admin.subtitle}</p>

					<div class="space-y-4">
						<div>
							<label class="block text-xs font-display font-700 text-gray-400 uppercase tracking-wide mb-2">{$t.admin.password}</label>
							<div class="relative">
								{#if showPassword}
									<input bind:value={password} type="text" placeholder={$t.admin.passwordPlaceholder} on:keydown={(e) => e.key === 'Enter' && handleLogin()} class="w-full px-4 py-3 pr-12 rounded-2xl bg-gray-800 border-2 border-gray-700 focus:border-pastel-blue text-white placeholder:text-gray-600 outline-none transition-colors font-body" />
								{:else}
									<input bind:value={password} type="password" placeholder={$t.admin.passwordPlaceholder} on:keydown={(e) => e.key === 'Enter' && handleLogin()} class="w-full px-4 py-3 pr-12 rounded-2xl bg-gray-800 border-2 border-gray-700 focus:border-pastel-blue text-white placeholder:text-gray-600 outline-none transition-colors font-body" />
								{/if}
								<button
									on:click={() => showPassword = !showPassword}
									class="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-gray-500 hover:text-gray-300 transition-colors"
								>
									{#if showPassword}<EyeOff size={16} />{:else}<Eye size={16} />{/if}
								</button>
							</div>
						</div>

						{#if loginError}
							<div in:fly={{ y: -4, duration: 150 }} class="flex items-center gap-2 p-3 rounded-2xl bg-pastel-red-dark/20 text-pastel-red text-sm">
								<AlertCircle size={15} class="shrink-0" />
								{$t.admin.wrongPassword}
							</div>
						{/if}

						<button
							on:click={handleLogin}
							disabled={loginLoading || !password}
							class="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-pastel-blue-dark hover:bg-pastel-blue text-white font-display font-700 text-base transition-all disabled:opacity-60 disabled:cursor-not-allowed"
						>
							{#if loginLoading}
								<Loader size={18} class="animate-spin" />
							{:else}
								<Lock size={18} />
							{/if}
							{$t.admin.login}
						</button>
					</div>
				</div>
			</div>
		</div>
	</section>

{:else}
	<!-- Admin Dashboard -->
	<section class="min-h-screen bg-gray-50 dark:bg-gray-950">
		<!-- Top bar -->
		<div class="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-4 sm:px-8 py-4 flex items-center justify-between">
			<div>
				<h1 class="font-display font-900 text-xl text-gray-900 dark:text-white">{$t.admin.title}</h1>
				<p class="text-xs text-gray-500 dark:text-gray-400">{$t.admin.subtitle}</p>
			</div>
			<button
				on:click={handleLogout}
				class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-display font-600 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
			>
				<LogOut size={16} />
				{$t.admin.logout}
			</button>
		</div>

		<div class="max-w-7xl mx-auto px-4 sm:px-8 py-8">
			<!-- Stats -->
			<div in:fly={{ y: 16, duration: 400, easing: cubicOut }} class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
				<div class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
					<div class="flex items-center gap-3 mb-2">
						<div class="w-9 h-9 rounded-xl bg-pastel-blue-light dark:bg-pastel-blue-dark/20 flex items-center justify-center text-pastel-blue-dark dark:text-pastel-blue">
							<Users size={18} />
						</div>
						<span class="text-sm font-display font-600 text-gray-500 dark:text-gray-400">{$t.admin.totalRegistrations}</span>
					</div>
					<div class="font-display font-900 text-3xl text-gray-900 dark:text-white">{registrations.length}</div>
				</div>

				<!-- Interest breakdown -->
				<div class="sm:col-span-2 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
					<div class="text-sm font-display font-600 text-gray-500 dark:text-gray-400 mb-3">By Interest</div>
					<div class="flex flex-wrap gap-2">
						{#each Object.entries(interestLabels) as [key, label]}
							{@const count = registrations.filter(r => r.interest === key).length}
							{#if count > 0}
								<div class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-sm">
									<span class="w-2 h-2 rounded-full {colorDots[key]}"></span>
									<span class="text-gray-700 dark:text-gray-300 font-display font-600">{label}</span>
									<span class="font-display font-800 text-gray-900 dark:text-white">{count}</span>
								</div>
							{/if}
						{/each}
					</div>
				</div>
			</div>

			<!-- Table Card -->
			<div in:fly={{ y: 20, duration: 500, delay: 100, easing: cubicOut }} class="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden">
				<!-- Table header bar -->
				<div class="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
					<h2 class="font-display font-800 text-lg text-gray-900 dark:text-white">{$t.admin.registrations}</h2>
					<div class="flex items-center gap-3 w-full sm:w-auto">
						<div class="relative flex-1 sm:w-72">
							<Search size={14} class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
							<input
								bind:value={searchQuery}
								type="text"
								placeholder={$t.admin.searchPlaceholder}
								class="w-full pl-9 pr-8 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:border-pastel-blue-dark dark:focus:border-pastel-blue transition-colors"
							/>
							{#if searchQuery}
								<button on:click={() => searchQuery = ''} class="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-gray-600 transition-colors">
									<X size={12} />
								</button>
							{/if}
						</div>
						<button
							on:click={exportCSV}
							class="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-pastel-green-light dark:bg-pastel-green-dark/20 text-pastel-green-dark dark:text-pastel-green text-sm font-display font-700 hover:bg-pastel-green/50 transition-colors whitespace-nowrap shrink-0"
						>
							<Download size={14} />
							{$t.admin.export}
						</button>
					</div>
				</div>

				{#if data.error}
					<div class="p-8 text-center text-pastel-red-dark dark:text-pastel-red">
						<AlertCircle size={24} class="mx-auto mb-2" />
						<p class="text-sm">{data.error}</p>
					</div>
				{:else if filtered.length === 0}
					<div class="p-16 text-center text-gray-400">
						<Users size={32} class="mx-auto mb-3 opacity-30" />
						<p class="font-display font-600">{searchQuery ? $t.nav.noResults : $t.admin.noRegistrations}</p>
					</div>
				{:else}
					<div class="overflow-x-auto">
						<table class="w-full">
							<thead>
								<tr class="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
									{#each [$t.admin.name, $t.admin.email, $t.admin.organization, $t.admin.country, $t.admin.interest, $t.admin.joinedAt] as col}
										<th class="text-left px-4 py-3 text-xs font-display font-700 uppercase tracking-wide text-gray-400 dark:text-gray-500 whitespace-nowrap">{col}</th>
									{/each}
								</tr>
							</thead>
							<tbody>
								{#each filtered as reg, i}
									<tr
										in:fly={{ x: -10, duration: 200, delay: i * 20 }}
										class="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
									>
										<td class="px-4 py-3.5 font-display font-600 text-sm text-gray-900 dark:text-white whitespace-nowrap">{reg.name}</td>
										<td class="px-4 py-3.5 text-sm text-gray-600 dark:text-gray-400 font-mono">{reg.email}</td>
										<td class="px-4 py-3.5 text-sm text-gray-600 dark:text-gray-400">{reg.organization || '—'}</td>
										<td class="px-4 py-3.5 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">{reg.country}</td>
										<td class="px-4 py-3.5">
											<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-display font-700 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
												<span class="w-1.5 h-1.5 rounded-full {colorDots[reg.interest] || 'bg-gray-400'}"></span>
												{interestLabels[reg.interest] || reg.interest}
											</span>
										</td>
										<td class="px-4 py-3.5 text-sm text-gray-500 dark:text-gray-500 whitespace-nowrap">{formatDate(reg.created_at)}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</div>
					<div class="px-6 py-3 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-400">
						Showing {filtered.length} of {registrations.length} registrations
					</div>
				{/if}
			</div>
		</div>
	</section>
{/if}
