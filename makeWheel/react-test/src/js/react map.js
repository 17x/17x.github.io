function Blog(props){
	const side=props.posts.map((post)=>
		<li key={post.id}>{post.title}</li>
	)
	const content=props.posts.map((post)=>
		<div key={post.id}>
			<h1>{post.title}</h1>
			<p>{post.content}</p>
		</div>
	)
	return (
		<div>
			{side}
			<br/>
			{content}
		</div>
	)
}
const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];

ReactDOM.render(
	<Blog posts={posts}/>
	,document.getElementById('root')
)

// Keys Must Only Be Unique Among Siblings