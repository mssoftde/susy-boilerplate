module.exports = function(grunt){
	grunt.initConfig({
		compass: {
			development: {
				options: {
					require: ['susy', 'breakpoint'],
					sassDir: '<%= sassDir %>',
					cssDir: '<%= cssDevDir %>',
					bundleExec: true,
					environment: 'development',
					watch: true,

				}	
			}
		},
		serve: {
			options: {
				port: 9000,
				serve: {
        			path: '<%= srcDir %>'
    			}
			}
		}

	});	
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-serve');

	grunt.registerTask('default', ['compass:development']);
}