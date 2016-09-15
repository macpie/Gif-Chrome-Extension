# Gif Chrome Extension


## ESLINT

```` javascript
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    jquery: true
  },

  globals: {
    toastr: true,
    NProgress: true
  },
````

## Webpack add
```
        exclude: /flexboxgrid/
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules',
        include: /flexboxgrid/,
      },
```