import resolve from '@rollup/plugin-node-resolve'


function genRollupConf(frame) {
    let input, output, plugins;
    input = `./packages/@apis/${frame}/src`
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