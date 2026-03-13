<script lang="ts">
	import { t } from '$lib/i18n';
	import { Github, Heart } from 'lucide-svelte';
</script>

<footer class="bg-gray-950 text-gray-400 mt-24">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
		<div class="grid grid-cols-1 md:grid-cols-4 gap-12">
			<!-- Brand -->
			<div class="md:col-span-2">
				<a href="/" class="flex items-center gap-2 mb-4 group w-fit">
					<div class="w-9 h-9 rounded-xl bg-gradient-to-br from-pastel-blue-dark to-pastel-green-dark flex items-center justify-center text-white font-display font-900">
						P
					</div>
					<span class="font-display font-800 text-xl text-white">
						Pantry<span class="text-pastel-blue">points</span>
					</span>
				</a>
				<p class="text-sm leading-relaxed max-w-xs text-gray-500">{$t.footer.tagline}</p>
				<div class="flex items-center gap-3 mt-6">
					<a
						href="https://github.com/pantrypoints"
						target="_blank"
						rel="noopener"
						class="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white text-sm font-display font-600 transition-all"
					>
						<Github size={16} />
						{$t.footer.github}
					</a>
				</div>
			</div>

			<!-- Links -->
			<div>
				<div class="text-white font-display font-700 text-sm uppercase tracking-wide mb-4">{$t.footer.links}</div>
				<ul class="space-y-2.5">
					<li><a href="/apps" class="hover:text-white transition-colors text-sm">{$t.footer.apps}</a></li>
					<li><a href="/news" class="hover:text-white transition-colors text-sm">{$t.footer.news}</a></li>
					<li><a href="/admin" class="hover:text-white transition-colors text-sm">Admin</a></li>
					<li><a href="https://github.com/pantrypoints" target="_blank" rel="noopener" class="hover:text-white transition-colors text-sm">{$t.footer.github}</a></li>
				</ul>
			</div>

			<!-- Apps -->
			<div>
				<div class="text-white font-display font-700 text-sm uppercase tracking-wide mb-4">{$t.footer.apps}</div>
				<ul class="space-y-2.5">
					<li><a href="/apps/pantrypreneur/farm" class="hover:text-white transition-colors text-sm">Farm</a></li>
					<li><a href="/apps/pantrypreneur/market" class="hover:text-white transition-colors text-sm">Market</a></li>
					<li><a href="/apps/pool/main" class="hover:text-white transition-colors text-sm">Pool</a></li>
					<li><a href="/apps/hub/main" class="hover:text-white transition-colors text-sm">Hub</a></li>
					<li><a href="/apps/pantrychain/main" class="hover:text-white transition-colors text-sm">Pantrychain</a></li>
				</ul>
			</div>
		</div>

		<div class="border-t border-gray-900 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
			<p class="text-xs text-gray-600">
				© {new Date().getFullYear()} Pantrypoints. {$t.footer.rights}
			</p>
			<p class="text-xs text-gray-600 flex items-center gap-1">
				Made with <Heart size={12} class="text-pastel-red inline" /> for communities worldwide
			</p>
		</div>
	</div>
</footer>
