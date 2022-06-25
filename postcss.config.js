
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

const plugins=[
    autoprefixer,
    cssnano({preset: 'default'})
];

module.exports = {
    plugins, 
}