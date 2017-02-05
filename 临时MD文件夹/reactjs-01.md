### reactjs-01

when **state** changed. react will call the render() to rendering the view.

- Do Not Modify State Directly:
```bash
    // Wrong
    this.state.comment = 'Hello';
    // Correct
    this.setState({comment: 'Hello'});
```
The only place where you can assign this.state is the constructor.

- State Updates May Be Asynchronous:    
React may batch multiple setState() calls into a single update for performance.Because this.props and this.state may be updated asynchronously, you should not rely on their values for calculating the next state. see [State Updates May Be Asynchronous](https://facebook.github.io/react/docs/state-and-lifecycle.html)

- State Updates are Merged
see[State Updates are Merged](https://facebook.github.io/react/docs/state-and-lifecycle.html)

#### Keys only make sense in the context of the surrounding array.