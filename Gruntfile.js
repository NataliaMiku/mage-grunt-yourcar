module.exports = function(grunt) {
	var skinDir = 'theme/skin/frontend/yourcar-theme/default/';
	var appDir = 'theme/app/design/frontend/yourcar-theme/default/';

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
			grunt: { 
				files: ['Gruntfile.js'] 
			},
			livereload: {
				files: [
					appDir + '**/*.xml',
					skinDir + 'src/scss/{,*/}*.scss',
					[
						skinDir + 'src/*.js', 
						skinDir + 'src/**/*.js',
						'!' + skinDir + 'js/*.min.js'
					]
				],
				tasks: [
					'compass',
					'jshint',
					'uglify'
				]
			}
		},
		jshint: {
			options: {
		        curly: true,
		        eqeqeq: true,
		        eqnull: true,
		        browser: true,
		        globals: {
		          jQuery: true
		        }
		    },
			all: [
				'Gruntfile.js',
				skinDir + 'src/js/{,*/}*.js'
			]
		},
		uglify: {
			dist: {
				options: {
					//mangle: false - preserve variable and function names
					//so they are not clash with Magento JS
					mangle: false,
					compress: true
				}			
				/*files: {
					skinDir + 'js/html5shiv.min.js': [skinDir + 'src/js/html5shiv.js'], 
					skinDir + 'js/jquery.min.js': [skinDir + 'src/js/jquery.js'], 
					skinDir + 'js/respond.min.js': [skinDir + 'src/js/respond.js'],
					skinDir + 'js/respond.min.js': [skinDir + 'src/js/bootstrap/bootstrap.js'],
					skinDir + 'js/jquery.scripts.min.js': [skinDir + 'src/js/vendor/jquery.scripts.js']
				}*/
			},
			all: {
		        files: [{
		            expand: true,
		            src: ['*.js','**/*.js','!*/bootstrap/*.js'],
		            dest: skinDir + 'js',
		            cwd: skinDir + 'src/js',
		            ext: '.min.js'
		        }]
		    }
		},
		bower: {
		  dev: {
		  	dest: skinDir + 'src',
		  	js_dest: skinDir + 'src/js',		    
		  	scss_dest: skinDir + 'src/scss',		    
		    options: {
		      stripAffix: true,	
		      packageSpecific: {
		        "bootstrap-sass-official": {		          
		          js_dest: skinDir + 'src/js/bootstrap',
      			  scss_dest: skinDir + 'src/scss/modules/bootstrap',
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
		},
		clean: {
		  scss: [
		  		skinDir + 'src/scss/modules/bootstrap/_bootstrap.scss',
		  		skinDir + 'src/scss/modules/bootstrap/_bootstrap-*.scss'
		  ]
		}

		
	});
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.renameTask("bower", "bowerInstall");
	grunt.loadNpmTasks('grunt-bower');
	grunt.registerTask('default', [
			'compass',
			'jshint',
			'uglify'
	]);
	grunt.registerTask('build', [
			'bowerInstall',
			'bower',
			'clean'
	]);

	
};