* use browserify so we can run this thing as a web page (with auto compile and reload, too)
* skin atom shell as our app (exe name, window name, menu items?)
* publish atom shell app to Mac, Windows, Linux
* publish web app to browser
* need to use apm package manager?
* fix problems with dyld.  common with many versions of node.  not on my personal laptop, though
    dyld: lazy symbol binding failed: Symbol not found: _node_module_register
* kill Atom.app, node-inspector on script "stop"
* i18n
    translations
    can work in main process? how do we detect user language?
    synchronous download of translations files from i18n.js
* more serious routing
* Settings
* get elasticsearch to index files
* write file search component
* redirect all install script output to a file, rather than redirect commands one by one
    http://stackoverflow.com/questions/3173131/redirect-copy-of-stdout-to-log-file-from-within-bash-script-itself