<h1>Deploying a dist folder to GitHub Pages</h1>

<h2>ake sure git knows about your subtree (the subfolder with your site).</h2>
<pre>git add dist && git commit -m "Initial dist subtree commit"</pre>

<h2>Use subtree push to send it to the gh-pages branch on GitHub.</h2>
<pre>git subtree push --prefix dist origin gh-pages</pre>
