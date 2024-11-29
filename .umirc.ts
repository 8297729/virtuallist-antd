import { defineConfig } from "dumi";

export default defineConfig({
	title: "virtuallist-eui",
	favicon: "https://avatars0.githubusercontent.com/u/9441414?s=200&v=4",
	logo: "https://avatars0.githubusercontent.com/u/9441414?s=200&v=4",
	outputPath: "docs-dist",
	// more config: https://d.umijs.org/config
	headScripts: [`document.documentElement.setAttribute('theme-platform', 'eui');`],
});
