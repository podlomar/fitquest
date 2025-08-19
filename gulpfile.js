import gulp from 'gulp';
import esbuild from 'esbuild';
import cssModulesPlugin from 'esbuild-css-modules-plugin';
import fs from 'node:fs/promises';

const buildTs = async () => {
  return esbuild.build({
    bundle: true,
    platform: 'node',
    format: 'esm',
    packages: 'external',
    logLevel: 'error',
    sourcemap: 'external',
    entryPoints: {
      main: 'src/server.tsx'
    },
    tsconfig: 'tsconfig.json',
    outbase: 'src',
    outfile: 'dist/server.js',
    resolveExtensions: ['.ts', '.tsx'],
    plugins: [cssModulesPlugin({
      force: true,
      pattern: '[local]-[hash]',
      localsConvention: 'camelCaseOnly',
      namedExports: true,
      inject: false,
    })],
  }).catch(() => {
    console.error('Build failed');
    process.exit(1);
  });
}

const watchTs = () => {
  return gulp.watch('src/**/*.{ts,tsx}', buildTs);
}

// const copyStyles = () => {
//   return gulp.src(['dist/server.css'])
//     .pipe(gulp.dest('dist/static'));
// }

// const watchStyles = () => {
//   return gulp.watch('dist/server.css', copyStyles);
// }

const clean = () => {
  return fs.rm('dist', { recursive: true, force: true });
}

export const build = gulp.series(
  clean,
  buildTs,
  // copyStaticFiles,
  // copyStyles,
  // copyPosts
);

export const watch = gulp.series(
  build,
  gulp.parallel(
    watchTs,
    // watchStaticFiles,
    // watchPosts,
    // watchStyles
  )
);

