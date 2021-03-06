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
					importPath: 'bower_components',
					environment: 'development',
					//config: 'config.rb'
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
					skinDir + 'src/images/{,*/}*.{png,jpg,gif}',
					skinDir + 'src/scss/{,*/}*.scss',
					[
						skinDir + 'src/{,*/,*/*/}*.js',
						'!' + skinDir + 'js/*.min.js'
					]
				],
				tasks: [
					'compass',
					'clean:scss',
					'clean:images',
					'jshint',
					'uglify',
					'imagemin'
				]
			}
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc'
		    },
			all: [
				'Gruntfile.js', 
				skinDir + 'src/js/vendor/{,*/}*.js' 
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
		imagemin: {
		    dynamic: {
		        files: [{
		            expand: true,
		            cwd: skinDir + 'src/images',
		            src: '**/*.{png,jpg,gif}',
		            dest: skinDir + 'images/'
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
      			  dest: skinDir + 'fonts/bootsrap',
      			  keepExpandedHierarchy: true,
		          files: [
		           	'assets/javascripts/**',
		           	'assets/fonts/**',
		           	'assets/stylesheets/**'
		          ]		             			  
		        },
		        "font-awesome": {
		        	dest: skinDir + 'fonts/font-awesome'
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
		  ],
		  images: [skinDir + 'images']
		}

		
	});
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-bower-task');
	grunt.renameTask("bower", "bowerInstall");
	grunt.loadNpmTasks('grunt-bower');
	grunt.registerTask('default', [
			'compass',
			'imagemin',
			'clean:images',
			//'clean:scss',
			'jshint',
			'uglify'
	]);
	grunt.registerTask('build', [
			'bowerInstall',
			'bower',
			'clean:scss'
	]);

	
};