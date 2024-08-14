import {rollup} from 'rollup';
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs';
import babel from "@rollup/plugin-babel";
import typescript from '@rollup/plugin-typescript';
import terser from "@rollup/plugin-terser";

import "@babel/preset-env"
import "@babel/preset-react"
import "@babel/preset-typescript"

const genRollupConf = (frame) => {
  let inputOption, outputOption
  let inputPath, fileName, input
  if (frame) {
    inputPath = `packages/@apsc-base-${frame}/index.tsx`
    fileName = `apsc-${frame}.js`
  } else {
    inputPath = `./packages`
  }

  inputOption = {
    input: inputPath,
    context: "auto",
    external: ["react", "react-dom"],
    plugins: [
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
      commonjs(),
      typescript(),
      babel({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        babelHelpers: 'bundled',
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
          '@babel/preset-typescript',
        ],
        exclude: 'node_modules/**',
        sourceMaps: false
      }),
      terser(),
    ],
    treeshake: true
  }

  outputOption = {
    file: './lib/@apsc-base-rect.js',
    name: "Hello",
    format: "esm",
    sourcemap: true
  }

  return {inputOption, outputOption}
}

async function generateOutputs(bundle, outputOption) {
  const {output} = await bundle.generate(outputOption);
  return output
}

const build = async (inputOption, outputOption) => {
  let bundle;
  let buildFailed = false;
  try {
    bundle = await rollup(inputOption);
    await generateOutputs(bundle, outputOption);
    await bundle.write(outputOption)
  } catch (error) {
    buildFailed = true;
    console.error("ERRRO _>", error);
  }
  if (bundle) {
    await bundle.close();
  }
  process.exit(buildFailed ? 1 : 0);
}

export {
  genRollupConf,
  build
}


