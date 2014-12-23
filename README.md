## Installing

#### Prerequisites
1. [Ruby](https://www.ruby-lang.org/en/installation/) installed (ideally via macports or apt-get)
2. [Compass](http://compass-style.org/install/) installed (`$ gem install compass`)
3. Install [node](http://nodejs.org/download/) (with npm). Ideally with macports or apt-get
4. Install grunt and bower globally via npm (`$ npm install -g grunt-cli`, `$ npm install-g bower`)
5. Install [mongodb](http://docs.mongodb.org/manual/installation/)

#### "Installing" the App
You'll only need to do this once.

1. git clone the repo (`$ git clone git@github.com:khalilravanna/findie.git`)
2. cd into the repo
3. `$ npm install`
4. `$ bower install` / `$ bower update`

#### Serving the app
You'll do this every time you want to start the app.

1. Make sure `$ mongod` is running a tab on the command line or as a daemon somewhere
2. `$ grunt serve` (from inside the repo dir)

## Building/Push To Heroku

#### Prerequisites
1. [Heroku toolbelt](https://toolbelt.heroku.com/)
2. Heroku permissions and stuff set up. Head on over [here for that](https://dashboard-next.heroku.com/apps/findie/code). It'll prolly tell you do `$ heroku login` and some other stuff. You should do that.

#### First Time Setup
1. From the main repo directory run `$ grunt heroku`. This will build everything into a directory insdie the main directory called `dist`.
2. Next we need to hook up this build directory, `dist`, with the heroku repo. To do this, first `cd` into `dist` and then run `$ git init`. This initializes a new git repo just for pushing to heroku. Hook it up to heroku by adding heroku as a remote `$ git remote add heroku git@heroku.com:findie.git`.
3. Add our build stuff and commit it. `$ git add -A` and `$ git commit -m "V 1.33.7 push"`.
4. Now we're ready to push to heroku. Just run `$ git push heroku master`.

#### Every Time After That
Just repeats steps 1-4 without setting up the remote business. More explicitly:

1. From the main repo directory `$ grunt heroku`
2. `$ cd dist`
3. `$ git add -A && git commit -m "your detailed commit message here"`
4. `$ git push heroku master`   