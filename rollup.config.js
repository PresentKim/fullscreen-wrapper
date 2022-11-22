import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/fullscreen.ts',
    external: [],
    output: [
      {
        file: 'dist/fullscreen.js',
        format: 'umd',
        name: 'FullScreen',
        sourcemap: true,
        globals: {}
      }
    ],
    plugins: [typescript({ tsconfig: './tsconfig.json' })]
  }
];
