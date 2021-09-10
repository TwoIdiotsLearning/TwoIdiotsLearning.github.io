import React from "react";
import {
	HashRouter as Router,
	Switch,
	Route,
	Link,
} from "react-router-dom";
import { render } from "react-dom";
import {
	Home,
	Blog,
	Projects,
} from "./pages"

const App = () => {
	return (
		<Router>
			<div>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/blog">Blog</Link>
					</li>
					<li>
						<Link to="/projects">Projects</Link>
					</li>
				</ul>

				<Switch>
					<Route path="/blog">
						<Blog />
					</Route>
					<Route path="/projects">
						<Projects />
					</Route>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

render(<App />, document.getElementById("main"));