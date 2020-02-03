import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// import Course from './Course.js'

let course = require('./courses.json');


class Course extends React.Component {
  render() {
    let pStyle = {
      height: '28px', 
      FontSize: '17px'
    }
    let link = 'courseinfo/' + this.props.index.toString()
    let button = null
    if (this.props.cart.includes(course[this.props.index])) {
      button = <button class="btn btn-light bg-warning border-warning" type="button">In Cart</button>
    }
    else {
      button = 
      <button onClick={this.props.onClick} class="btn btn-light bg-warning border-warning" type="button">
        Add to Cart</button>
    }

      return(
        <div class="col-lg-6 mb-4">
          <div class="card text-white bg-info shadow">
            <div class="card-body">
              <p class="text-capitalize fm-0" style={pStyle}>{course[this.props.index].title}</p>
              <p class="text-white-50 small m-0" style={pStyle}>{course[this.props.index].dept} {course[this.props.index].number}</p>
              {button}
              <Link to={link}>
      <button class="btn btn-info" type="button">More Info</button>
    </Link>
            </div>
          </div>
        </div>
    );
  }
}

class CourseDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: this.props.cart
    }
  }

  render() {
    let item = course[this.props.match.params.id]
    return(
      <div>
        <Navbar/>
        <div class="container">
          <h2>{item.title}</h2>
          <h4>{item.dept} {item.number}</h4>
          <div>
            <p>{item.description}</p>
          </div> 
          <div>
            <h5>Preqreqs:</h5>
            <div>
              {item.prereqs}
            </div>
            <Link to="/">
            <button class="btn btn-info" type="button">Back</button>
            </Link>
          </div> 
        </div>
      </div>
    )
  }
}

class CheckOut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: this.props.cart
    }
  }

  render() {
    return(
      <div>
        <Navbar/>
        <div class="container">
          You have successfully Placed your order
          <div>
            <Link to="/">
            <button class="btn btn-light" onClick={this.props.clear} type="button">Back to Home</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: this.props.cart,
    }
  }
 
  render() {
    return(
      <div>
      <NavHome searchCourse={this.props.searchCourse} cartSize={this.props.cartSize}/>
      <div class="container-fluid">
    <div class="container">
        <div class="col">
            <div class="row">
            {this.props.list}
            </div>
        </div>
    </div>
</div>
</div>
    );
  }
}

class NavHome extends React.Component {
  handleChange = () => {
    let search = this.searchBar.value
    this.props.searchCourse(search)
  }
  render() {
    let styles = {
      width: '27px',
      opacity: '.19',
    };
    return(
      <nav class="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
      <div class="container-fluid"><button class="btn btn-link d-md-none rounded-circle mr-3" id="sidebarToggleTop" type="button"><i class="fas fa-bars"></i></button>
          <h1 class="text-dark">Penn Course Cart</h1>
            <form class="form-inline d-none d-sm-inline-block mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
              <div class="input-group">
                  <input 
                  ref={(ref) => this.searchBar = ref} 
                  type="text" 
                  onChange={this.handleChange} 
                  class="bg-light form-control border-0 small" 
                  placeholder="Search for ..." />
                    <div class="input-group-append">
                      <button class="btn btn-primary py-0" type="button">
                        <i class="fas fa-search"></i>
                      </button>
                    </div>
                </div>           
              </form>
          <ul class="nav navbar-nav flex-nowrap ml-auto">
              <li role="presentation" class="nav-item dropdown no-arrow mx-1">
                  <div class="nav-item dropdown no-arrow">
                    <a data-toggle="dropdown" aria-expanded="false" class="dropdown-toggle nav-link" href="#">
                      <span class="badge badge-danger badge-counter">
                        {this.props.cartSize}
                      </span><img src="cartIcon.png" style={styles} />
                      </a>
                  </div>
              </li>
              <li role="presentation" class="nav-item dropdown no-arrow">
                <div class="nav-item dropdown no-arrow">
                  <a aria-expanded="false" class="dropdown-toggle nav-link" href="#">
                    <Link to="/cart">
                    <button class="btn btn-success bg-success border-success" type="button">
                    Checkout</button>
                    </Link>
                  </a>                    
                </div>
              </li>
          </ul>
        </div>
      </nav>
    )
  }
}

class Navbar extends React.Component {
  render() {
    let styles = {
      width: '27px',
      opacity: '.19',
    };
    return(
      <nav class="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
        <div class="container-fluid"><button class="btn btn-link d-md-none rounded-circle mr-3" id="sidebarToggleTop" type="button"><i class="fas fa-bars"></i></button>
            <h1 class="text-dark">Penn Course Cart</h1>
            <ul class="nav navbar-nav flex-nowrap ml-auto">
                <li role="presentation" class="nav-item dropdown no-arrow mx-1">
                    <div class="nav-item dropdown no-arrow">
                      <a data-toggle="dropdown" aria-expanded="false" class="dropdown-toggle nav-link" href="#">
                        <span class="badge badge-danger badge-counter">
                          {this.props.cartSize}
                        </span><img src="cartIcon.png" style={styles} />
                        </a>
                    </div>
                </li>
                <li role="presentation" class="nav-item dropdown no-arrow">
                  <div class="nav-item dropdown no-arrow">
                    <a aria-expanded="false" class="dropdown-toggle nav-link" href="#">
                    </a>                    
                  </div>
                </li>
            </ul>
          </div>
        </nav>
    )
  }
  
}

class Cart extends React.Component {
  render() {
    return(
      <div>
        <Navbar cartSize={this.props.cart.length}/>
        <div class="container">
          <h1>Your Cart</h1>
          {this.props.listCart}
          <Link to="/">
          <button onClick={this.props.clearSearch} class="btn btn-light" type="button">Back</button>
          </Link>
          <Link to="/checkout">
          <button class="btn btn-light" type="button">Place Order</button>
          </Link>
        </div>
      </div>      
    )
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      search: ""
    }
  }

  searchCourse = (newSearch) => {
    this.setState({search: newSearch});
  }

  handleClick(i) {
    const newCart = this.state.cart.slice()
    if (!newCart.includes(course[i])) {
      newCart.push(course[i])
    }
    this.setState({
      cart: newCart
    })
  }

  renderCourse(i) {
    return (
      <Course cart={this.state.cart} index={i} onClick={() => this.handleClick(i)}/>
    );
  }

  cartSize() {
    return(
      this.state.cart.length
    )
  }

  remove(course) {
    let newCart = this.state.cart.slice()
    var index = newCart.indexOf(course);
 
    if (index > -1) {
       newCart.splice(index, 1);
    }
    this.setState({
      cart: newCart, 
    })
  }

  //another method for the cart page
  listCart() {
    let children = []
    for (let i = 0; i < this.state.cart.length; i++) {
      children.push(<div class="card-body border rounded-0">
      <h4 class="card-title">{this.state.cart[i].title}</h4>
      <button class="btn btn-light" onClick={() => this.remove(this.state.cart[i])} type="button">Remove</button>
      </div>)
     }
    return (<div class="row">
    <div class="col">
        <div class="card-group">
          {this.state.size}
            <div class="card">
              {children}
            </div>
        </div>
    </div>
</div>
)
  }

  clear() {
    const newCart = []
    this.setState({
      cart: newCart, 
      search: ""
    })
  }

  clearSearch() {
    this.setState({
      search: ""
    })
  }

  listCourses () {
    let children = []
    let search = this.state.search.toLowerCase()
    for (let i = 0; i < course.length; i++) {
      if (course[i].title.toLowerCase().includes(search)) {
        children.push(this.renderCourse(i))
      }
     }
    return (<div class="row">
      {children}
    </div>)
  }

  render() {
    return (
      <Router>
        <Switch>
        <Route
          path="/" exact
          render={(props) => <HomePage {...props}
            searchCourse={this.searchCourse}
            cart={this.state.cart} 
            list={this.listCourses()} 
            cartSize={this.cartSize()}/>}
        />
          <Route path="/cart" 
          render={(props) => <Cart {...props} listCart={this.listCart()} clearSearch={() => this.clearSearch()} cart={this.state.cart}/>}
        />
        <Route path="/checkout" 
          render={(props) => <CheckOut {...props} clear={() => this.clear()} cart={this.state.cart}/>}
        />
        <Route path="/courseinfo/:id" 
          render={(props) => <CourseDetail {...props} cart={this.state.cart}/>}
        />
        </Switch>
      </Router>
    );
  }
}