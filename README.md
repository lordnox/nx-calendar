<<<<<<< HEAD
<<<<<<< HEAD
AngularJS based webapp repository [![Build Status](https://travis-ci.org/lordnox/nx-builder.png?branch=master)](https://travis-ci.org/lordnox/nx-builder)
=================================

This is a project based on a blog [article](http://www.yearofmoo.com/2013/01/full-spectrum-testing-with-angularjs-and-karma.html) and the corresponding [repository](https://github.com/yearofmoo-articles/AngularJS-Testing-Article/) from [@yearofmoo](https://github.com/yearofmoo).
Furthermore there are parts from [ultimate-seed](http://ultimate-seed.herokuapp.com/) with its [repository](https://github.com/pilwon/ultimate-seed/).

The current working base will create a simple serverless webapp. It features a module structure to include different angular modules. As an example the yearofmoo app is found in `app/scripts/modules/youtube` with each base file (`directives.js`, `services.js`, `filters.js` and `controllers.js`) is now split into seperate directories.

Demo
-------
The Application can be build can be visited at: http://lordnox.github.io/nx-builder/

Why this project
------------------------------
I searched for the best possibility to develop test driven without much of a fuss. To develop an angular module I found that ultimate-seed does a pretty good job. It uses browserify to compile a lot of modules to be able to be usable on the client. The problem with ultimates way surfaces when trying to run automated tests which yearofmoo handles just fine.

## Using the application

Install grunt
`npm install -g grunt-cli`

And then be sure to install everything that the repo requires:
`npm install`
`bower install`

To develop your modules TDD or BDD style:
`grunt autotest` or `grunt autotest:midway`

End-to-End
----------
I removed e2e testing from this page, I will try to integrate [grunt-selenium](https://github.com/sideroad/grunt-selenium) and the new e2e testing from angular [protractor](https://github.com/angular/protractor).

ToDo:
-----

- [ ] Add protractor test suite
- [ ] Find the errors in midway testing
- [ ] furthermore split testing into the module folders
- [ ] write yeoman generator
- [ ] write yeoman generator for modules


=======
Basic CSS3-Carousel with minimal JavaScript to enable all functionality

ToDo:
 - [ ] Add bower.json
 - [ ] Add mouseover event

Based on work for [KSS services/solutions](http://www.kss-online.com/)
>>>>>>> c80511a5b261aefd204db961d3f9e5ee84a562a6
=======
nx-calendar
===========

AngularJS extensive calendar directive
>>>>>>> 4443c770060e532059afb1ab134c78d23fafe391
