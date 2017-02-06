import React from 'react';
import {Link,IndexLink} from 'react-router'


export default props=> (
	<div id="header">
		<nav>
			<IndexLink  to="/">Home | </IndexLink>
			<Link to="About">About |</Link>
			<Link to="Contact">Contact</Link>
		</nav>
	</div>
);