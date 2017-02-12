class Clock extends React.Component{
    constructor(props){
        super(props)

        this.state={
            clock:new Date()
        }
    }

    componentDidMount(){
        alert('哦哈哟狗炸伊马斯')
        this.timerId = setInterval(
            ()=>{this.tick()},1000
        )
    }
    componentWillUnmount(){
        alert('人家remove了啊啊啊啊啊，讨厌')
       clearInterval(this.timerId)
    }

    tick(){
        this.setState({
            clock:new Date()
        });
    }

    render(){
        return (
            <h1>{this.state.clock.toLocaleTimeString()}</h1>
        )
    }
}

class UserName extends React.Component{
    constructor(props){
        super(props)
        this.state={
            isShowClock:true
        }
        this.handleClick=this.handleClick.bind(this)
    }
    handleClick(){
        this.setState((prevState)=>({
            isShowClock:!prevState.isShowClock
        }))
        console.log(this.state)
    }
    render(){
        return (
            <form action="">
                {this.state.isShowClock?
                <Clock />:''}
                <label htmlFor="">
                    <input type="button" value={this.state.isShowClock?'removeClock':'addClock'} onClick={this.handleClick}/>
                </label>
            </form>
        )
    }
}

ReactDOM.render( 
    <UserName /> , 
    document.getElementById('root')
)
