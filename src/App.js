import React from 'react';
import Cart from "./Cart";
import Navbar from './Navbar';
import * as firebase from 'firebase';
import 'firebase/firestore';
class App extends React.Component{
  constructor () {
    super();
    this.state = {
      products: [],
      loading:true
    }
    this.db=firebase.firestore();
    // this.increaseQuantity = this.increaseQuantity.bind(this);
    // this.testing();
  }
  componentDidMount (){
    // firebase
    // .firestore()
    // .collection('products')
    // .get()
    // .then((snapshot)=>{
    //   console.log(snapshot); 
    //   snapshot.docs.map((doc)=>{
    //     console.log(doc.data())
    //   });
    //   const products=snapshot.docs.map((doc)=>{
    //     const data=doc.data();
    //     data['id']=doc.id;
    //     return data;
    //   });
    //   this.setState({
    //     products,
    //     loading:false
    //   })
    // })
    this.db
    .collection('products')
    // .where('price','>',899)
    // .where('title','==','Washing machine')
    .orderBy('price','desc')
    .onSnapshot((snapshot)=>{
      console.log(snapshot); 
      snapshot.docs.map((doc)=>{
        console.log(doc.data())
      });
      const products=snapshot.docs.map((doc)=>{
        const data=doc.data();
        data['id']=doc.id;
        return data;
      });
      this.setState({
        products,
        loading:false
      })
    })
  }

  handleIncreaseQuantity = (product) => {
    // console.log('Heyy please inc the qty of ', product);
    const { products } = this.state;
    const index = products.indexOf(product);
//p1 p2 p3 know the index of product for change
    // products[index].qty += 1;

    // this.setState({
    //   products
    // });
    const docRef =this.db.collection('products').doc(products[index].id);
    docRef
    .update({
      qty:products[index].qty+1
    })
    .then(()=>{
      console.log('Updated Sucessfully')
    })
    .catch((error)=>{
      console.log('Error:',error)
    })
  }

  handledecreaseQuantity = (product) => {
    // console.log('Heyy please inc the qty of ', product);
    const { products } = this.state;
    const index = products.indexOf(product);
  //p1 p2 p3 know the index of product for change
  if(products[index].qty===0){
    return;
  }
    // products[index].qty -= 1;

    // this.setState({
    //   products
    // })
    const docRef =this.db.collection('products').doc(products[index].id);
    docRef
    .update({
      qty:products[index].qty-1
    })
    .then(()=>{
      console.log('Updated Sucessfully')
    })
    .catch((error)=>{
      console.log('Error:',error)
    })
  }
  handleDeleteProduct=(id)=>{
    const{products}=this.state;
    // const items=products.filter((item)=>item.id!==id);
    // this.setState({
    //   products:items
    // })
    const docRef =this.db.collection('products').doc(id);
    docRef
    .delete()
    .then(()=>{
      console.log('Deleted Sucessfully')
    })
    .catch((error)=>{
      console.log('Error:',error)
    })
  }
    getCartCount =() =>{
    const{products}=this.state;
    let count=0;
    products.forEach((product)=>{
      count+=product.qty;
    })
    return count;
  }
  getCartTotal=()=>{
    const {products}=this.state;
    let cartTotal=0;
    products.map((product)=>{
    if(product.qty>0){
      cartTotal=cartTotal + product.qty * product.price
    }
    return '';
    })
    return cartTotal;
  }
  addProduct=()=>{
  this.db
    .collection('products')
    .add({
      img:'',
      price:900,
      qty:3,
      title:'Washing machine'
    })
    .then((docRef)=>{
      console.log('product has been added',docRef);
    })
    .catch((error)=>{
      console.log('Error :',error);
    })
  }
  render(){
    const {products,loading}=this.state;
    
  return (
    <div className="App">
      
      <Navbar count={this.getCartCount()}/>
      {/* <button onClick={this.addProduct} style={{padding:20,fontSize:20}}>Add a product</button> */}
      <Cart
      products={products}
       onIncreaseQuantity={this.handleIncreaseQuantity}
       onDecreaseQuantity={this.handledecreaseQuantity}
       onDeleteProduct={this.handleDeleteProduct}
      />
      {loading && <h1>Loading Products..</h1>}
      <div style={{padding:10,fontSize:20}}>TOTAL:{this.getCartTotal()}</div>
    </div>
  );
}
}

export default App;
