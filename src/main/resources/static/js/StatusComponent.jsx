/* Componente que consulta /status periódicamente */
class StatusComponent extends React.Component {
  constructor(props){
    super(props);
    this.state = { error: null, isLoaded: false, status: "" };
  }
  componentDidMount(){
    this.timerID = setInterval(() => this.checkStatus(), 2000);
    this.checkStatus();
  }
  componentWillUnmount(){
    clearInterval(this.timerID);
  }
  checkStatus(){
    fetch('/status')
      .then(res => res.json())
      .then(
        (result) => this.setState({isLoaded:true, status: result.status}),
        (error) => this.setState({isLoaded:true, error})
      );
  }
  render(){
    const { error, isLoaded, status } = this.state;
    if (error) return <div>Error: {error.message}</div>;
    if (!isLoaded) return <div>Loading...</div>;
    return (
      <div style={{padding:'8px', border:'1px solid #ddd', borderRadius:8}}>
        <strong>The server status is:</strong>
        <p>{status}</p>
      </div>
    );
  }
}
ReactDOM.render(<StatusComponent/>, document.getElementById('status'));
