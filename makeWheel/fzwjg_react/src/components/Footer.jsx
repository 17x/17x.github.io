import React from 'react';
import {Link,IndexLink} from 'react-router'


export default props=> (
	<footer>
		<nav>
			<IndexLink  to="/">Home | </IndexLink>
			<Link to="About">About |</Link>
			<Link to="Contact">Contact</Link>
			<Link to="Contact">Contact</Link>
		</nav>
	</footer>
);