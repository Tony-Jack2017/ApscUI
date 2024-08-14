import {rollup} from 'rollup';
import resolve from '@rollup/plugin-node-resolve'
import babel from "@rollup/plugin-babel";
import typescript from '@rollup/plugin-typescript';

const genRollupConf = (frame) => {
  let inputOption, outputOption
  let inputPath, fileName, input
  if (frame) {
    input = `packages/@apsc-base-${frame}`
    inputPath = `packages/@apsc-base-${frame}/index.tsx`
    fileName = `apsc-${frame}.js`
  } else {
    inputPath = `./packages`
  }

  inputOption = {
    input: inputPath,
    external: ["react", "react-dom"],
    plugins: [
      typescript({
        module: "ESNext",
        exclude: 'node_modules/**',
        include: `${input}/**`,
      }),
      babel({
        exclude: "node_modules/**",
        babelHelpers: "bundled",
        extensions: ['.js', '.jsx'],
        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
      }),
      resolve({
        extensions: [".js", ".jsx", ".ts", ".tsx", ".less"], //允许我们加载第三方模块
      }),
    ]
  }

  outputOption = {
    dir: "./lib",
    name: fileName,
    format: "es"
  }

  return {inputOption, outputOption}
}

async function generateOutputs(bundle, outputOption) {
  const {output} = await bundle.generate(outputOption);
  for (const chunkOrAsset of output) {
    if (chunkOrAsset.type === 'asset') {
      console.log('Asset', chunkOrAsset);
    } else {
      console.log('Chunk', chunkOrAsset.modules);
    }
  }
}

const build = async (inputOption, outputOption) => {
  let bundle;
  let buildFailed = false;
  try {
    // create a bundle
    bundle = await rollup(inputOption);

    // an array of file names this bundle depends on
    console.log(bundle.watchFiles);

    await generateOutputs(bundle, outputOption);
  } catch (error) {
    buildFailed = true;
    // do some error reporting
    console.error(error);
  }
  if (bundle) {
    // closes the bundle
    await bundle.close();
  }
  process.exit(buildFailed ? 1 : 0);
}

export {
  genRollupConf,
  build
}


