* use browserify so we can run this thing as a web page (with auto compile and reload, too)
* skin atom shell as our app (exe name, window name, menu items?)
* publish atom shell app to Mac, Windows, Linux
* publish web app to browser
* need to use apm package manager?
* fix problems with dyld.  common with many versions of node.  not on my personal laptop, though
    dyld: lazy symbol binding failed: Symbol not found: _node_module_register
* kill Atom.app, node-inspector on script "stop"
* i18n
    can work in main process? how do we detect user language?
* more serious routing
* Settings
* 'utf8' for file encoding in extensions
* make clean: elasticsearch dir
* config file for elasticsearch => we need our own cluster to not join the user's possibly pre-existing cluster