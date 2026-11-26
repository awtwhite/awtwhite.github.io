import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'My Docs',
			social: {
				github: 'https://github.com/withastro/starlight',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', link: '/guides/example/' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
				{
					label: 'Kana Drill',
					link: '/kana-drill/',
					attrs: { target: '_blank' },
				},
				{
					label: 'Eigo Drill',
					link: '/eigo-drill/',
					attrs: { target: '_blank' },
				},
				{
					label: 'Kanji Drill',
					link: '/kanji-drill/',
					attrs: { target: '_blank' },
				},
				{
					label: 'Nihongo Drill',
					link: '/nihongo-drill/',
					attrs: { target: '_blank' },
				},
			],
		}),
	],
});
