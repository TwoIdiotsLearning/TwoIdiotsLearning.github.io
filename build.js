// eslint-disable-next-line @typescript-eslint/no-var-requires
const esbuild = require("esbuild");

const devMode = !!process.argv.includes("--dev");

esbuild.build({
	entryPoints: ["app/index.tsx"],
	bundle: true,
	minify: !devMode,
	sourcemap: true,
	outfile: "dist/main.js",
	watch: devMode ? {
		onRebuild(error, result) {
			if (error) console.error("watch build failed:", error)
			else console.log("watch build succeeded:", result)
		},
	} : false
})
	.catch(() => process.exit(1));