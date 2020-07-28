const path = require('path');
const WebpackObfuscator = require('webpack-obfuscator');

module.exports = [
  // Add support for native node modules
  {
    test: /\.node$/,
    use: 'node-loader',
  },
  {
    test: /\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: '@marshallofsound/webpack-asset-relocator-loader',
      options: {
        outputAssetBase: 'native_modules',
      },
    },
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: 'ts-loader',
      options: {
        transpileOnly: true
      }
    }
  },
  {
    test: /\.(tsx?|jsx?)$/i,
    exclude: /(node_modules|\.webpack)/,
    include: path.resolve(__dirname, 'src'),
    enforce: 'post',
    use: [
      {
        loader: WebpackObfuscator.loader,
        options: {
          compact: true,
          controlFlowFlattening: false,
          controlFlowFlatteningThreshold: 0.75,
          deadCodeInjection: true,
          deadCodeInjectionThreshold: 1,
          debugProtection: true,
          debugProtectionInterval: true,
          disableConsoleOutput: true,
          domainLock: [],
          identifierNamesGenerator: 'hexadecimal',
          identifiersDictionary: [],
          identifiersPrefix: '',
          inputFileName: '',
          log: false,
          numbersToExpressions: true,
          renameGlobals: false,
          renameProperties: false,
          reservedNames: [],
          reservedStrings: [],
          rotateStringArray: true,
          seed: new Date().getTime(),
          selfDefending: false,
          shuffleStringArray: true,
          simplify: true,
          sourceMap: false,
          sourceMapBaseUrl: '',
          sourceMapFileName: '',
          sourceMapMode: 'separate',
          splitStrings: true,
          splitStringsChunkLength: 10,
          stringArray: false,
          stringArrayEncoding: 'rc4',
          stringArrayThreshold: 1,
          target: 'node',
          transformObjectKeys: true,
          unicodeEscapeSequence: true,
        },
      },
    ],
  }
];
