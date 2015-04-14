# xmpp-client
XMPP client built on Atom Shell and React.


## Prerequisites

* npm `brew install npm`
* apm `npm install -g atom-package-manager`

    In theory this works.  In practice there is a problem with Mac's dynamic loader (dyld).  It seems
    like the best way to make it work is to [download](https://atom.io/download/mac) and run the Atom text editor (which comes bundled 
    with shell tools like apm).
    
* grunt `sudo npm install -g grunt-cli`
* ruby `brew install ruby`


## One-time installation

`bin/xmpp-client install`


## Run the app

This will start Atom Shell with the xmpp-client app loaded.  It will also set up continuous compilation on
jsx and sass files.

`bin/xmpp-client start`


## Stop the app

`bin/xmpp-client stop`

Kill the app and associated precompilers.


## Build native apps for deployment

*STILL NEEDS DEBUGGING.*

`bin/xmpp-client package`