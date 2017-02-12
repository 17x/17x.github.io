/*FilterableProductTable
SearchBar
ProductTable
ProductCategoryRow
ProductRow*/


class ProductCategoryRow extends React.Component{
    render(){
        return (
            <tr>
                <th colSpan="2">{this.props.category}</th>
            </tr>
        )
    }
}
class ProductTableRow extends React.Component{
    render(){
        return(
            <tr>
                <td>
                    {this.props.product.stocked? this.props.product.name: <span style={{color:"red"}}>{this.props.product.name}</span>}
                </td>
                <td>{this.props.product.price}</td>
            </tr>
        )
    }
}
class ProductTable extends React.Component{
    render(){
        const rows = []
        let lastCategory=null;
        this.props.products.forEach((product)=>{

            if(product.category !== lastCategory){
                console.log(product.category,lastCategory)
                rows.push(<ProductCategoryRow key={product.category} category={product.category}/>)
            }
            if(product.name.indexOf(this.props.filterText) === -1 ||(!product.stocked && this.props.InStockOnly)){
                return 
            }
            rows.push(<ProductTableRow product={product} key={product.name}/>)
            /*if(product.stocked){
            }*/
            lastCategory = product.category
        })
        return (
            <table className="ProductTable">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        )
    }
}
class SearchBar extends React.Component{
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this)

    }

    handleChange(){
        this.props.onChange(
            this.filterText.value,
            this.InStockOnly.checked
        )
    }

    render(){
        return (
            <form action="" className="SearchBar">
                <label htmlFor="filterText">
                    userType: <input 
                    type="text" 
                    id="filterText"
                    value={this.props.filterText}
                    ref={(input)=>{
                        this.filterText=input
                    }}
                    onChange={this.handleChange}
                     />
                </label>
                <br/>
                <label htmlFor="">
                    <input 
                    id="inO" 
                    type="checkbox" 
                    ref={(input)=>{
                        this.InStockOnly=input
                    }}
                    onChange={this.handleChange}
                    />show in only stock
                </label>
            </form>
        )
    }
}
class FilterableProductTable extends React.Component{
    constructor(props){
        super(props)
        this.state={
            filterText:'',
            InStockOnly:false
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(filterText,InStockOnly){
        this.setState({
            filterText:filterText,
            InStockOnly:InStockOnly
        });
    }
    render(){
        return(
            <div className="FilterableProductTable">
                <p>FilterableProductTable:</p>
                <SearchBar 
                filterText={this.state.filterText}
                InStockOnly={this.state.InStockOnly}
                onChange={this.handleChange}
                />
                <ProductTable 
                filterText={this.state.filterText}
                InStockOnly={this.state.InStockOnly}
                products={this.props.products}
                />
                
            </div>    
        )
    }
}
var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

ReactDOM.render( 
    < FilterableProductTable products={PRODUCTS} / > , 
    document.getElementById('root')
)
