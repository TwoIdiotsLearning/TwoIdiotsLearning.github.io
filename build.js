// eslint-disable-next-line @typescript-eslint/no-var-requires
const esbuild = require("esbuild");

const devMode = !!process.argv.includes("--dev");

esbuild.build({
	entryPoints: [devMode ? "app/api/mocks/index.ts" : null, "app/index.tsx"].filter(n => !!n),
	bundle: true,
	minify: !devMode,
	sourcemap: true,
	outdir: "dist",
	watch: devMode ? {
		onRebuild(error, result) {
			if (error) console.error("watch build failed:", error)
			else console.log("watch build succeeded:", result)
		},
	} : false
})
	.catch(() => process.exit(1));