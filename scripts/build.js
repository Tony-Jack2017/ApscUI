import {build, genRollupConf} from "../config/rollup.config.js";

const { inputOption, outputOption } = genRollupConf("react")

build(inputOption, outputOption).then(res => {
  console.log("build success !!!!")
}).catch(err => {
  console.log(err)
})
