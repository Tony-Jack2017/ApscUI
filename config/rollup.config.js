import resolve from '@rollup/plugin-node-resolve'


function genRollupConf(frame) {
    let input, output, plugins;
    input = `./packages/@apis-base-${frame}/src/index.tsx`
    output = {
        dir: "./dist",
        file: ""
    },
    plugins = [
        resolve()
    ]
}

const rollupConfig = {
    input: "",
    output: ""
}

export default rollupConfig