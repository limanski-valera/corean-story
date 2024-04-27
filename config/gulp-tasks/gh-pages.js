import ghPages from "gulp-gh-pages";

export const gitHub = () => {
	return app.gulp.src(`${app.path.buildFolder}/**/*.*`)
		.pipe(app.plugins.plumber(
				app.plugins.notify.onError({
					title: "GH-PAGES",
					message: "Error: <%= error.message %>",
				}))
		)
		.pipe(ghPages());
};
