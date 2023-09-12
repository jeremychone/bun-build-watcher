# bun-build-watcher

Bun builder plugin. Will watch and redo the build when file change. 

Look for a `-w` in the argv. 

e.g., `bun run my-build.ts -w`

`my-build.ts`

```ts
import {buildWatcher} from "bun-build-watcher";


await Bun.build({
	entrypoints: ['./src/main.ts'],
	outdir: './content/js',
	plugins: [buildWatcher({ delayMs: 200 })]
});

```

```ts
export interface WatchOptions {
	/** default: 100 */
	delayMs?: number,
	/** default: 'src/' */
	path?: PathLike
}
```

Very simple for now, if you need more, let me know. 