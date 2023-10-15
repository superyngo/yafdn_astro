import tsConfigPaths from 'rollup-plugin-tsconfig-paths'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
  plugins: [
    tsConfigPaths(),
    nodeResolve({ extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'] }),
    commonjs()
  ]
}
