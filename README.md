# xmpp-client
AeroFS and AeroIM clients built on Atom Shell and React.


## Prerequisites

* npm `brew install npm`
* apm `npm install -g atom-package-manager`

    In theory this works.  In practice there is a problem with Mac's dynamic loader (dyld).  It seems
    like the best way to make it work is to [download](https://atom.io/download/mac) and run the Atom text editor (which comes bundled 
    with shell tools like apm).

* ruby `brew install ruby`


## Client

### One-time installation

`bin/aero-client install`


### Run the app

This will start Atom Shell with the xmpp-client app loaded.  It will also set up continuous compilation on
jsx and sass files.

`bin/aero-client start`


### Stop the app

`bin/aero-client stop`

Kill the app and associated precompilers.


### Build native apps for deployment

*STILL NEEDS DEBUGGING.*

`bin/aero-client package`


## i18n

### Collect all translatable strings into a template file

`bin/i18n gather`


### Add a new translation

`bin/i18n add fr-FR`
