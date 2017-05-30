export default function(){
    var __svg__ = { 
        path: '../../icons/**/*.svg', 
        name: 'icons.svg'
    };
    require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__);
}

// Usage: <svg class="icon"><use xlink:href="#icon-menu"></use></svg>
