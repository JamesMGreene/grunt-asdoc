# grunt-asdoc

> A Grunt task plugin to generate documentation for Adobe Flex/ActionScript/MXML/FLV/etc. apps with the `asdoc` tool from the Apache/Adobe Flex SDK.


## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the
[Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to
create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and
use Grunt plugins. Once you're familiar with that process, you may install this
plugin with this command:

```shell
npm install grunt-asdoc --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-asdoc');
```


## The "asdoc" task

### Overview
In your project's Gruntfile, add a section named `asdoc` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  asdoc: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.rawConfig
Type: `String`
Default value: `null`

A string value that is used as the raw configuration for the `asdoc` command line arguments, minus the input and output files.

#### options.output
Type: `String`
Default value: `null`

A string value that is used as the output directory. If a "dest" file is configured, it will override this `output` option.

#### _(Other Options)_
For all other options, see the [ASDoc Tool](http://help.adobe.com/en_US/flex/using/WSd0ded3821e0d52fe1e63e3d11c2f44bc36-7ffa.html#WSd0ded3821e0d52fe1e63e3d11c2f44bb7b-7feb)
documentation for further explanation.


### Usage Examples

#### Basic example with src-dest file

```js
grunt.initConfig({
  asdoc: {
    example1: {
      'docs/': ['src/example.as']
    }
  }
});
```


#### Basic example with `output` option

```js
grunt.initConfig({
  asdoc: {
    options: {
      /* `output` can be used in place of a "dest" option */
      output: 'docs/'
    },
    example2: {
      options: {
        rawConfig: '-source-path .'
      },
      src: ['src/example.as']
    }
  }
});
```


#### Basic example with `output` and `docSources` options

```js
grunt.initConfig({
  asdoc: {
    example3: {
      /* `output` can be used in place of a "dest" option */
      output: 'docs/',
      /* `docSources` can be used in place of a "src" option */
      docSources: ['src/example.as']
    }
  }
});
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).


## Release History
 - 0.1.0: Published to NPM on 2014-02-12.
    - Initial release.


## License
Copyright (c) 2014 James M. Greene  
Licensed under the MIT license.
