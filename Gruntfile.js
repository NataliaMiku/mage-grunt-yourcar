module.exports = function(grunt) {
	var skinDir = 'theme/skin/frontend/yourcar-theme/default/';
	var appDir = 'theme/app/design/frontend/yourcar-theme/default/';

	/*var jsLibs = [
			'bower_components/jquery/dist/jquery.min.js',
			'bower_components/html5shiv/dist/html5shiv.min.js',
			'bower_components/respond/dest/respond.min.js'
	];
	var jsBootstrap = [
			'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js'
	];
	var sassBootstrap =[
			'bower_components/bootstrap-sass-official/assets/stylesheets/bootstrap.scss',
			'bower_components/bootstrap-sass-official/assets/stylesheets/bootstrap-compass.scss'
	];*/

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		compass: {
			dist: {
				options: {
					sassDir: skinDir + 'src/scss',
					cssDir: skinDir + 'css',
					environment: 'development',
					outputStyle: 'nested'
				}
			}
		},
		watch: {
			options: {
				livereload: true
			},
			livereload: {
				files: [
					skinDir + 'src/scss/{,*/}*.scss'
				],
				tasks: ['compass']
			}
		},
		uglify: {
			dist: {
				options: {
					//mangle: false - preserve variable and function names
					//so they are not clash with Magento JS
					mangle: false
				},
				files: {
					//'theme/skin/frontend/yourcar-theme/default/js/jquery.scripts.min.js': [skinDir + 'src/js/scripts.js'], 
					//'theme/skin/frontend/yourcar-theme/default/js/bootstrap.min.js': [skinDir + 'src/js/bootstrap.js'],

				}
			}
		},
		/*bower: {
		  install: {
		  	options: {
		  		targetDir: skinDir + 'src',
		  		layout: 'byType',
		  		cleanTargetDir: false,
		  		install: true		  		
		  	}
		  }
		}*/
		bower: {
		  dev: {
		  	dest: skinDir + 'src',
		  	fonts_dest: skinDir + 'src/fonts',
		    js_dest: skinDir + 'src/js',		    
		    options: {
		      packageSpecific: {
		        "bootstrap-sass-official": {		          
		          js_dest: skinDir + 'src/js/bootstrap',
      			  scss_dest: skinDir + 'src/scss/bootsrap',
      			  dest: skinDir + 'src/fonts/bootsrap',
      			  keepExpandedHierarchy: true,
		          files: [
		           	'assets/javascripts/**',
		           	'assets/fonts/**',
		           	'assets/stylesheets/**'
		          ]
			             			  
		        }
		        
		      }
		    }
		  }
		},
		bowerInstall: {
			install: {

			}
		}

		
	});
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.renameTask("bower", "bowerInstall");
	grunt.loadNpmTasks('grunt-bower');
	grunt.registerTask('default', [
			'compass',
			'uglify',
	]);
	grunt.registerTask('build', [
			'bowerInstall',
			'bower'
	]);

	
};