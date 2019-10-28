const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#25b864', '@secondary-color': '#A0D911', '@font-size-base': '14px',
            '@heading-color': 'rgba(0, 0, 0, 0.85)', '@text-color': 'rgba(0, 0, 0, 0.65)',
            '@text-color-secondary': 'rgba(0, 0, 0, .45)', '@border-radius-base': '4px',
            '@border-color-base': '#d9d9d9', '@buttonFace': '#5B83AD',
            '@buttonText': '#D9EEF2'},
    }),
);