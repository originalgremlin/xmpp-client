module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        "download-atom-shell": {
            version: "0.22.3",
            outputDir: "./atom_shell",
            rebuild: true
        }
    });
    grunt.loadNpmTasks('grunt-download-atom-shell');
};