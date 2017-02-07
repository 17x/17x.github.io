import React, {render,Component} from 'react';
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'


export default props=> (
		<div>
			<Header />
			{props.children}
			<Footer />
		</div>
)
