export interface App {
	id: string;
	category: string;
	slug: string;
	title: string;
	tagline: string;
	description: string;
	longDescription: string;
	icon: string;
	color: 'blue' | 'green' | 'red' | 'yellow';
	tags: string[];
	features: string[];
	status: 'live' | 'beta' | 'coming-soon';
	url?: string;
	github?: string;
}

export const apps: App[] = [
	{
		id: 'pantrypreneur-farm',
		category: 'pantrypreneur',
		slug: 'farm',
		title: 'Pantrypreneur Farm',
		tagline: 'Farm-to-community exchange',
		description: 'Manage your farm produce and exchange directly with your community through points-based barter.',
		longDescription: `Pantrypreneur Farm empowers farmers to list their produce, track harvests, and engage in fair exchanges with community members — all without money changing hands.

Through the Pantrypoints system, farmers earn points for every delivery of fresh produce, and use those points to receive services and goods they need from others in the network.

The app includes harvest tracking, demand forecasting based on community needs, and a simple interface designed for farmers with varying levels of tech experience.`,
		icon: '🌾',
		color: 'green',
		tags: ['farming', 'agriculture', 'produce', 'exchange'],
		features: [
			'Harvest tracking and inventory management',
			'Direct producer-to-consumer exchanges',
			'Community demand forecasting',
			'Points-based compensation system',
			'Mobile-optimized for field use',
			'Offline-first design'
		],
		status: 'beta',
		github: 'https://github.com/pantrypoints/farm'
	},
	{
		id: 'pantrypreneur-market',
		category: 'pantrypreneur',
		slug: 'market',
		title: 'Pantrypreneur Market',
		tagline: 'Community marketplace',
		description: 'A local marketplace for listing goods and services, with points-based transactions between community members.',
		longDescription: `Pantrypreneur Market is the bustling marketplace at the heart of the Pantrypoints ecosystem. Community members can list anything from handmade crafts to professional services, all exchanged through a transparent points system.

Discover what your neighbors have to offer, make requests for what you need, and build a resilient local economy that thrives without currency.`,
		icon: '🏪',
		color: 'blue',
		tags: ['marketplace', 'local', 'goods', 'services'],
		features: [
			'Product and service listings',
			'Search and filter by category',
			'Points-based checkout',
			'Seller and buyer profiles',
			'Review and rating system',
			'Location-based discovery'
		],
		status: 'beta',
		github: 'https://github.com/pantrypoints/market'
	},
	{
		id: 'pantrypreneur-resto',
		category: 'pantrypreneur',
		slug: 'resto',
		title: 'Pantrypreneur Resto',
		tagline: 'Food service exchange',
		description: 'Enable restaurants and food stalls to participate in the moneyless economy by exchanging meals for points.',
		longDescription: `Pantrypreneur Resto brings food service businesses into the Pantrypoints ecosystem. Restaurants, food stalls, and home cooks can offer meals in exchange for points, making nutritious food accessible to the whole community.

The app handles menu management, order tracking, and point settlements — everything a food business needs to thrive in the moneyless economy.`,
		icon: '🍜',
		color: 'yellow',
		tags: ['restaurant', 'food', 'meals', 'catering'],
		features: [
			'Digital menu management',
			'Order management system',
			'Points settlement per meal',
			'Table and delivery coordination',
			'Community kitchen support',
			'Nutritional tracking'
		],
		status: 'coming-soon'
	},
	{
		id: 'pool-main',
		category: 'pool',
		slug: 'main',
		title: 'Pantrypoints Pool',
		tagline: 'Resource pooling for communities',
		description: 'Pool resources, tools, and skills within your community. Share what you have, access what you need.',
		longDescription: `Pantrypoints Pool is a resource-sharing platform that enables communities to collectively own and share tools, equipment, and other assets. Instead of every household buying its own lawnmower or drill, the community shares one — and participants earn and spend points for access.

Pool also manages shared spaces like community gardens, workshops, and kitchens, optimizing utilization and ensuring fair access for all members.`,
		icon: '🔧',
		color: 'red',
		tags: ['sharing', 'resources', 'tools', 'community'],
		features: [
			'Tool and equipment library',
			'Booking and scheduling system',
			'Shared space management',
			'Community ownership tracking',
			'Maintenance coordination',
			'Skills-sharing board'
		],
		status: 'live',
		github: 'https://github.com/pantrypoints/pool'
	},
	{
		id: 'hub-main',
		category: 'hub',
		slug: 'main',
		title: 'Pantrypoints Hub',
		tagline: 'Community coordination center',
		description: 'The central hub for managing your Pantrypoints community — members, points ledger, and governance.',
		longDescription: `Pantrypoints Hub is the administrative backbone of every Pantrypoints community. Hub administrators can manage membership, oversee the points ledger, set exchange rates between goods, and configure community-specific rules.

Members use Hub to view their points balance, transaction history, and community activity feed. It's where the moneyless economy gets organized.`,
		icon: '🏛️',
		color: 'blue',
		tags: ['admin', 'governance', 'ledger', 'community'],
		features: [
			'Member management dashboard',
			'Points ledger and history',
			'Community governance tools',
			'Exchange rate configuration',
			'Activity and analytics feed',
			'Multi-community support'
		],
		status: 'live',
		github: 'https://github.com/pantrypoints/hub'
	},
	{
		id: 'pantrypoints-card',
		category: 'pantrypoints',
		slug: 'card',
		title: 'Pantrypoints Card',
		tagline: 'Your digital exchange card',
		description: 'A digital card that stores your points and enables quick, seamless exchanges at participating locations.',
		longDescription: `The Pantrypoints Card is your portable identity in the moneyless economy. Carry your points balance with you as a QR code or NFC-enabled digital card, and transact instantly at any participating location.

The card bridges the gap between the digital Pantrypoints platform and real-world exchanges — scan to pay in points at the market, farm stand, or community event.`,
		icon: '💳',
		color: 'yellow',
		tags: ['payments', 'digital wallet', 'qr code', 'nfc'],
		features: [
			'QR code and NFC transactions',
			'Offline transaction capability',
			'Multi-community balance display',
			'Transaction history',
			'Family account linking',
			'Contactless exchange'
		],
		status: 'coming-soon'
	},
	{
		id: 'pantrychain-main',
		category: 'pantrychain',
		slug: 'main',
		title: 'Pantrychain',
		tagline: 'Distributed ledger for exchanges',
		description: 'A transparent, immutable ledger recording all Pantrypoints exchanges across communities worldwide.',
		longDescription: `Pantrychain provides the transparent, tamper-proof ledger that records every exchange in the Pantrypoints ecosystem. Built on distributed ledger technology, it ensures that every point earned and spent is permanently and publicly verifiable.

Unlike traditional cryptocurrency, Pantrychain tokens represent real goods and services rather than speculative value — anchoring the system in genuine community exchange.`,
		icon: '⛓️',
		color: 'red',
		tags: ['blockchain', 'ledger', 'transparency', 'distributed'],
		features: [
			'Immutable exchange records',
			'Cross-community verification',
			'Public audit trail',
			'Real-value anchoring',
			'Community node support',
			'Open-source protocol'
		],
		status: 'coming-soon',
		github: 'https://github.com/pantrypoints/pantrychain'
	},
	{
		id: 'pantrypoints-web',
		category: 'pantrypoints',
		slug: 'web',
		title: 'Pantrypoints Web',
		tagline: 'The web portal',
		description: 'Access all Pantrypoints services through a unified web portal — your gateway to the moneyless economy.',
		longDescription: `Pantrypoints Web is the unified web portal giving community members and administrators access to every app in the ecosystem from one place. Single sign-on, unified points balance, and a personalized dashboard make it easy to participate in the moneyless economy.

Whether you're checking your farm's harvest schedule, browsing the marketplace, or reviewing your community's ledger — Web brings it all together.`,
		icon: '🌐',
		color: 'green',
		tags: ['portal', 'unified', 'dashboard', 'access'],
		features: [
			'Single sign-on across all apps',
			'Unified points dashboard',
			'Community activity feed',
			'App launcher and shortcuts',
			'Notification center',
			'Profile and settings management'
		],
		status: 'live',
		github: 'https://github.com/pantrypoints/web'
	}
];

export function getApp(category: string, slug: string): App | undefined {
	return apps.find(a => a.category === category && a.slug === slug);
}

export function searchApps(query: string): App[] {
	const q = query.toLowerCase();
	return apps.filter(
		a =>
			a.title.toLowerCase().includes(q) ||
			a.description.toLowerCase().includes(q) ||
			a.tagline.toLowerCase().includes(q) ||
			a.tags.some(t => t.toLowerCase().includes(q))
	);
}
