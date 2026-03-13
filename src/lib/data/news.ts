export interface NewsArticle {
	slug: string;
	title: string;
	excerpt: string;
	content: string;
	author: string;
	authorRole: string;
	date: string;
	tags: string[];
	color: 'blue' | 'green' | 'red' | 'yellow';
	readingTime: number;
}

export const articles: NewsArticle[] = [
	{
		slug: 'pantrypoints-launch',
		title: 'Introducing Pantrypoints: Building the Moneyless Economy',
		excerpt:
			'Today we launch Pantrypoints — an open-source ecosystem of apps enabling communities to exchange real value without money.',
		author: 'Juan dela Cruz',
		authorRole: 'Founder, Pantrypoints',
		date: '2025-11-15',
		tags: ['announcement', 'launch', 'moneyless economy'],
		color: 'blue',
		readingTime: 5,
		content: `# Introducing Pantrypoints

After three years of development and field testing in communities across Southeast Asia, we're proud to officially launch **Pantrypoints** — an open-source platform for the moneyless economy.

## What is Pantrypoints?

Pantrypoints is a suite of interconnected apps that enable communities to exchange goods and services through a transparent, points-based barter system. No money changes hands. Instead, every exchange is recorded as points in a community ledger.

When a farmer delivers vegetables to a neighbor, they earn points. Those points can be used to access the neighbor's services, or anyone else's in the network. The result is a resilient, self-sustaining local economy that isn't dependent on monetary supply or inflation.

## Why This Matters

The global financial system excludes billions of people who lack access to banking, credit, or stable currency. At the same time, communities are rich with underutilized resources — spare rooms, vegetable gardens, skilled labor, tools — that could meet everyone's needs if properly coordinated.

Pantrypoints bridges this gap with technology that's simple enough for a farmer in a remote province, yet sophisticated enough to scale to entire urban neighborhoods.

> "The best economy is one where your neighbor's surplus becomes your necessity." — Pantrypoints founding principle

## The Ecosystem

Our initial launch includes four core apps:

- **Pantrypoints Hub** — the administrative backbone for community management
- **Pantrypreneur Farm** — farm-to-community produce exchange
- **Pantrypreneur Market** — the local marketplace for all goods and services
- **Pantrypoints Pool** — community resource and tool sharing

More apps are in development and will be released throughout 2026.

## Open Source and Community-Driven

Every line of Pantrypoints code is open source under the MIT license. We believe the infrastructure for the moneyless economy should be a public good, not a private platform.

We welcome contributions from developers, economists, community organizers, and anyone who believes the world needs better tools for cooperation.

## Join Us

If you're a community leader, NGO, or simply someone who wants to participate in the moneyless economy, [register for early access](#register). We'll work with the first cohort of communities to refine the platform before a wider launch in Q1 2026.

The future of exchange doesn't require money. It requires trust, technology, and community. Let's build it together.`
	},
	{
		slug: 'moneyless-economy-explained',
		title: 'What Is the Moneyless Economy? A Beginner\'s Guide',
		excerpt:
			'A clear explanation of how communities can thrive without money — and how Pantrypoints makes it practical.',
		author: 'Maria Santos',
		authorRole: 'Community Economist',
		date: '2025-12-01',
		tags: ['education', 'economics', 'barter', 'community'],
		color: 'green',
		readingTime: 7,
		content: `# What Is the Moneyless Economy?

The moneyless economy sounds radical. How can a community function without money? Isn't money necessary to coordinate complex exchange?

The answer is: money is *one way* to coordinate exchange, but not the only way — and often not the best way for local communities.

## A Brief History of Barter

Before money, communities used barter: direct exchange of goods and services. A farmer would trade wheat for a blacksmith's tools. A healer would treat patients in exchange for food.

Barter has one well-known problem: the "double coincidence of wants." For an exchange to happen, A must have what B wants, and B must have what A wants, at the same time.

Money solved this problem by introducing a universal medium. But money brought new problems: inflation, debt, financial exclusion, and the concentration of wealth.

## How Points Systems Work

A points-based exchange system solves the double coincidence problem *without* money. Here's how:

1. **A farmer delivers vegetables** to the community → earns 50 points
2. **A carpenter repairs the farmer's fence** → earns 80 points (from the farmer's balance)
3. **The carpenter uses their 80 points** to access a doctor's service

The key insight: **points are not money**. They don't earn interest, can't be hoarded indefinitely, and their "value" is always grounded in the real goods and services the community produces.

## Why This Works Better Locally

Money is optimized for *global* trade. It needs to be durable, portable, scarce, and universally accepted. These properties make it poorly suited for *local* exchange, where:

- Everyone knows each other and trust is established
- Goods are perishable and need to move quickly
- The goal is community wellbeing, not profit maximization

Points systems are optimized for local exchange. They're flexible, transparent, and governable by the community itself.

## Real-World Examples

Points-based exchange isn't new:

- **Japan's Fureai Kippu** (Care Relationship Ticket) — elder care exchange since 1995
- **Switzerland's WIR Bank** — business credit clearing since 1934
- **Ithaca Hours** — local currency in New York since 1991
- **Community Exchange Systems** — global network of local exchange

Pantrypoints draws lessons from all of these to build a modern, scalable version.

## The Role of Technology

Modern technology makes points systems far more practical than their predecessors:

- **Smartphones** let everyone carry their ledger in their pocket
- **Real-time settlement** removes the delay in recording exchanges
- **Transparent ledgers** build trust without a central authority
- **Data analytics** help communities optimize their exchange patterns

This is what Pantrypoints provides: the technological infrastructure to run a sophisticated local exchange system that anyone can understand and anyone can participate in.

## Getting Started

The moneyless economy isn't about rejecting money entirely. It's about creating *alternatives* that work better for certain contexts — especially local community exchange where money's global properties create unnecessary friction.

Start small: identify what your immediate community produces that others need. A neighbor's excess vegetables, a friend's carpentry skills, a local shop's unsold inventory at day's end. These are the raw materials of the moneyless economy.

Pantrypoints provides the tools to organize it all.`
	},
	{
		slug: 'pantrypreneur-farm-story',
		title: 'How Pantrypreneur Farm Helped 50 Farmers in Nueva Ecija',
		excerpt:
			'A case study from the 2025 pilot program: how a farming community used Pantrypoints to cut waste and boost exchange.',
		author: 'Dr. Ana Reyes',
		authorRole: 'Research Director',
		date: '2025-12-20',
		tags: ['case study', 'farming', 'Philippines', 'pantrypreneur'],
		color: 'yellow',
		readingTime: 6,
		content: `# How Pantrypreneur Farm Helped 50 Farmers in Nueva Ecija

In September 2025, we partnered with a farming cooperative in Nueva Ecija, Philippines, to pilot Pantrypreneur Farm. Here's what happened over 90 days.

## The Problem

Nueva Ecija is known as the "Rice Bowl of the Philippines" — yet farmers in the region faced a paradox: abundant harvests paired with poverty. The issue wasn't production; it was distribution and fair compensation.

Middlemen captured most of the value between farm and table. Farmers sold rice for ₱18/kg while consumers paid ₱45/kg. The 150% markup went to traders, not growers.

At the same time, farmers needed services — veterinary care for livestock, repairs for equipment, school supplies for their children — that they couldn't afford with cash after paying off seasonal loans.

## The Pilot

We onboarded 50 farming households across three barangays. Each household received:

- Training on the Pantrypreneur Farm app (2 hours)
- An initial points allocation (100 points) to bootstrap exchange
- A community point rate guide (e.g., 1 kg rice = 5 points)

The cooperative's existing trust network provided the social infrastructure. Technology provided the coordination layer.

## What Happened

Within 30 days, farmers were actively exchanging:

- Rice, vegetables, and eggs for carpentry and electrical repair
- Farm labor for childcare and tutoring
- Surplus produce for cooking and food preparation services

**Key results after 90 days:**

- **847 exchanges** recorded on the platform
- **₱0 in transaction fees** paid by participants
- **23% reduction** in post-harvest waste (produce exchanged before spoiling)
- **92% participant satisfaction** rate
- **12 new services** offered by community members who had previously had no income

One farmer, Mang Rolando, summarized it best: *"Before Pantrypoints, my extra camote [sweet potato] would rot. Now it feeds my neighbor's family and her husband fixed my water pump. We didn't need any money."*

## Challenges

Not everything went smoothly. We encountered:

**Connectivity issues** — some farms had poor mobile signal. We're developing offline-first features to address this.

**Valuation disputes** — early on, disagreements arose over how many points a skill should be worth. The community solved this themselves by creating a local rate card, which we're now building into the app.

**Points accumulation** — a few households accumulated large point balances without spending them, reducing circulation. We're implementing a gentle "decay" mechanism for large idle balances.

## What's Next

Based on the Nueva Ecija pilot, we're expanding to three more cooperatives in Mindanao in Q1 2026. We're also incorporating the lessons learned into the next version of Pantrypreneur Farm.

If you represent a farming cooperative or NGO working with smallholders and want to explore a pilot partnership, [register for early access](#register) and mention your organization.

The moneyless economy works. The data proves it.`
	},
	{
		slug: 'open-source-announcement',
		title: 'All Pantrypoints Code is Now Open Source',
		excerpt:
			'We\'re releasing the complete Pantrypoints codebase under the MIT license — because the infrastructure for community exchange should belong to everyone.',
		author: 'Juan dela Cruz',
		authorRole: 'Founder, Pantrypoints',
		date: '2026-01-10',
		tags: ['open source', 'announcement', 'developer', 'community'],
		color: 'red',
		readingTime: 3,
		content: `# All Pantrypoints Code is Now Open Source

Starting today, every repository in the Pantrypoints ecosystem is available on GitHub under the MIT license.

## Why Open Source?

The infrastructure for community exchange should be a **public good**. We believe no single company should own the tools communities need to organize themselves.

Open-sourcing Pantrypoints means:

- **Any developer** can contribute improvements
- **Any community** can self-host their own instance
- **Any researcher** can study and build on the protocol
- **Any NGO** can deploy it without licensing costs

## What's Available

All active repositories are now public:

- **pantrypoints/hub** — Community management dashboard
- **pantrypoints/farm** — Pantrypreneur Farm app
- **pantrypoints/market** — Pantrypreneur Market app
- **pantrypoints/pool** — Pantrypoints Pool app
- **pantrypoints/web** — The unified web portal
- **pantrypoints/pantrychain** — The distributed exchange ledger
- **pantrypoints/docs** — Full documentation

## How to Contribute

We welcome contributions of all kinds:

1. **Code** — Bug fixes, features, performance improvements
2. **Translations** — We need help with Filipino, Indonesian, Thai, and more
3. **Documentation** — Guides for community organizers and developers
4. **Design** — UI/UX improvements and assets
5. **Research** — Studies on the impact of exchange systems

Check our [Contributing Guide](https://github.com/pantrypoints/.github/blob/main/CONTRIBUTING.md) to get started.

## Join the Community

Our developer community lives in GitHub Discussions and a public Discord server. Whether you're a seasoned engineer or just learning to code, there's a place for you in Pantrypoints.

The moneyless economy needs all of us. Come build it.`
	}
];

export function getArticle(slug: string): NewsArticle | undefined {
	return articles.find(a => a.slug === slug);
}

export function searchNews(query: string): NewsArticle[] {
	const q = query.toLowerCase();
	return articles.filter(
		a =>
			a.title.toLowerCase().includes(q) ||
			a.excerpt.toLowerCase().includes(q) ||
			a.tags.some(t => t.toLowerCase().includes(q)) ||
			a.author.toLowerCase().includes(q)
	);
}
