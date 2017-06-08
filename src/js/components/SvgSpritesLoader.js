export default function(){
    var __svg__ = { 
        path: '../../icons/**/*.svg', 
        name: 'icons.svg'
    };
    require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__);
}

// Usage: <svg><use xlink:href="#icon-demo"></use></svg>
