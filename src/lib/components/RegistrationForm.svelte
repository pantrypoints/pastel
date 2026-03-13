<script lang="ts">
	import { scale, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { CheckCircle, AlertCircle, Loader } from 'lucide-svelte';
	import { t } from '$lib/i18n';
	import { countries } from '$lib/db';

	let name = '';
	let email = '';
	let organization = '';
	let country = '';
	let interest = 'individual';

	let status: 'idle' | 'loading' | 'success' | 'error' | 'duplicate' = 'idle';
	let errorMsg = '';

	async function handleSubmit() {
		if (!name || !email || !country) return;
		status = 'loading';
		try {
			const res = await fetch('/api/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ name, email, organization, country, interest })
			});
			const data = await res.json();
			if (data.success) {
				status = 'success';
			} else if (data.duplicate) {
				status = 'duplicate';
			} else {
				status = 'error';
				errorMsg = data.error || '';
			}
		} catch {
			status = 'error';
		}
	}
</script>

<div class="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden">
	<!-- Header band -->
	<div class="h-2 bg-gradient-to-r from-pastel-blue via-pastel-green to-pastel-yellow"></div>

	<div class="p-8">
		{#if status === 'success'}
			<div
				in:scale={{ start: 0.9, duration: 300, easing: cubicOut }}
				class="text-center py-8"
			>
				<div class="w-16 h-16 bg-pastel-green-light dark:bg-pastel-green-dark/20 rounded-full flex items-center justify-center mx-auto mb-5">
					<CheckCircle size={32} class="text-pastel-green-dark dark:text-pastel-green" />
				</div>
				<h3 class="font-display font-800 text-xl text-gray-900 dark:text-white mb-2">{$t.registration.success}</h3>
				<p class="text-gray-500 dark:text-gray-400 text-sm">We'll notify you at <strong class="text-gray-700 dark:text-gray-300">{email}</strong></p>
			</div>
		{:else}
			<div in:fly={{ y: 10, duration: 200 }}>
				<h2 class="font-display font-800 text-2xl text-gray-900 dark:text-white mb-1">{$t.registration.title}</h2>
				<p class="text-gray-500 dark:text-gray-400 text-sm mb-7">{$t.registration.subtitle}</p>

				<form on:submit|preventDefault={handleSubmit} class="space-y-4">
					<!-- Name + Email -->
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div>
							<label class="block text-xs font-display font-700 text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">{$t.registration.name} *</label>
							<input
								bind:value={name}
								type="text"
								placeholder={$t.registration.namePlaceholder}
								required
								class="input"
							/>
						</div>
						<div>
							<label class="block text-xs font-display font-700 text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">{$t.registration.email} *</label>
							<input
								bind:value={email}
								type="email"
								placeholder={$t.registration.emailPlaceholder}
								required
								class="input"
							/>
						</div>
					</div>

					<!-- Organization -->
					<div>
						<label class="block text-xs font-display font-700 text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">{$t.registration.organization}</label>
						<input
							bind:value={organization}
							type="text"
							placeholder={$t.registration.organizationPlaceholder}
							class="input"
						/>
					</div>

					<!-- Country + Interest -->
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div>
							<label class="block text-xs font-display font-700 text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">{$t.registration.country} *</label>
							<div class="relative">
								<select bind:value={country} required class="select">
									<option value="" disabled selected>{$t.registration.countryPlaceholder}</option>
									{#each countries as c}
										<option value={c}>{c}</option>
									{/each}
								</select>
								<div class="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">▾</div>
							</div>
						</div>
						<div>
							<label class="block text-xs font-display font-700 text-gray-600 dark:text-gray-400 mb-1.5 uppercase tracking-wide">{$t.registration.interest}</label>
							<div class="relative">
								<select bind:value={interest} class="select">
									{#each Object.entries($t.registration.interestOptions) as [key, label]}
										<option value={key}>{label}</option>
									{/each}
								</select>
								<div class="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">▾</div>
							</div>
						</div>
					</div>

					<!-- Error Messages -->
					{#if status === 'error'}
						<div in:fly={{ y: -5, duration: 150 }} class="flex items-center gap-2 p-3 rounded-2xl bg-pastel-red-light dark:bg-pastel-red-dark/20 text-pastel-red-dark dark:text-pastel-red text-sm">
							<AlertCircle size={16} class="shrink-0" />
							{errorMsg || $t.registration.error}
						</div>
					{/if}
					{#if status === 'duplicate'}
						<div in:fly={{ y: -5, duration: 150 }} class="flex items-center gap-2 p-3 rounded-2xl bg-pastel-yellow-light dark:bg-pastel-yellow-dark/20 text-pastel-yellow-dark dark:text-pastel-yellow text-sm">
							<AlertCircle size={16} class="shrink-0" />
							{$t.registration.duplicate}
						</div>
					{/if}

					<!-- Submit -->
					<button
						type="submit"
						disabled={status === 'loading'}
						class="btn-primary w-full justify-center text-base py-4 disabled:opacity-70 disabled:cursor-not-allowed"
					>
						{#if status === 'loading'}
							<Loader size={18} class="animate-spin" />
							{$t.registration.submitting}
						{:else}
							{$t.registration.submit}
						{/if}
					</button>
				</form>
			</div>
		{/if}
	</div>
</div>
