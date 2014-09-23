## Installing

#### Prerequisites
1. [Ruby](https://www.ruby-lang.org/en/installation/) installed (ideally via macports or apt-get)
2. [Compass](http://compass-style.org/install/) installed (`$ gem install compass`)
3. Install [node](http://nodejs.org/download/) (with npm). Ideally with macports or apt-get
4. Install grunt and bower globally via npm (`$ npm install -g grunt-cli`, `$ npm install-g bower`)
5. Install [mongodb](http://docs.mongodb.org/manual/installation/)

#### "Installing" the App
1. git clone the repo (`$ git clone git@github.com:khalilravanna/findie.git`)
2. cd into the repo
3. `$ npm install`
4. `$ bower install` / `$ bower update`

#### Serving the app
1. Make sure `$ mongod` is running a tab on the command line or as a daemon somewhere
2. `grunt serve` (from inside the repo dir)

## Building/Push To Heroku
TODO