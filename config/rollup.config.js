import { rollup } from 'rollup';
import resolve from '@rollup/plugin-node-resolve'
import babel from "@rollup/plugin-babel";

export  function genRollupConf(frame) {
    let input, output, plugins;
    if(frame) {
        input = `./packages/@apsc-base-${frame}/src/index.tsx`
    }else {
        input = `./packages`
    }
    output = {
        dir: "./lib",
        file: ""
    },
    plugins = [
        babel({
            runtimeHelpers: true,
            exclude: "node_modules/**",
            externalHelpers: true,
            babelHelpers: "bundled"
        }),
        resolve(),
    ]
}

export async function build(buildOption) {

}
