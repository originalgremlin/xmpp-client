* use browserify so we can run this thing as a web page (with auto compile and reload, too)
* skin atom shell as our app (exe name, window name, menu items?)
* publish atom shell app to Mac, Windows, Linux
* publish web app to browser
* need to use apm package manager?
* fix problems with dyld.  common with many versions of node.  not on my personal laptop, though
    dyld: lazy symbol binding failed: Symbol not found: _node_module_register
* kill Atom.app, node-inspector on script "stop"
* can i18n work in main process? how do we detect user language?
* Settings (localStorage does persist)
* instead of limiting indexing of files to a max size, just index the first N bytes of a given file
* Login/logout logic
