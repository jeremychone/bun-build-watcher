import { BunPlugin } from 'bun';
import { watch } from "fs/promises";
import debounce from "lodash.debounce";


const DEFAULT_OPTIONS = {
	delayMs: 100,
	path: "src/"
}

export interface WatchOptions {
	/** default: 100 */
	delayMs?: number,
	/** default: 'src/' */
	path?: PathLike
}

export function buildWatcher(options?: WatchOptions): BunPlugin {
	const { delayMs, path } = { ...DEFAULT_OPTIONS, ...options };

	const args = process.argv.slice(2);

	let buildWatchSetup = false;

	const buildWatch: BunPlugin = {
		name: "JC Plugin",
		setup: async function (buildObj) {


			if (args.includes("-w") && !buildWatchSetup) {
				console.log(`Watching path: ${path} delayMs: ${delayMs}`,);

				buildWatchSetup = true;

				async function build_again() {
					console.log("Building again.");
					await Bun.build(buildObj.config);
				}

				const debounced_build = debounce(async () => {
					await build_again();
				}, delayMs);

				const watcher = watch(path, { recursive: true });
				for await (const event of watcher) {
					console.log(`Detected ${event.eventType} in ${event.filename}`);
					debounced_build();
				}
			}
		},
	};

	return buildWatch;
}
