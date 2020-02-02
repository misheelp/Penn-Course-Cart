import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

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
          <h4>{item.dept} {item.id}</h4>
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

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: this.props.cart
    }
  }

  course(i) {
    return(
      <div class="card-body border rounded-0">
    <h4 class="card-title">{this.state.cart[i].title}</h4>
    <button class="btn btn-light" type="button">Remove</button>
    </div>
    )
  }

  listCart() {
    let children = []
    //let rows = Math.floor(course.length / 2)
    for (let i = 0; i < this.state.cart.length; i++) {
      children.push(this.course(i))
     }
    return (<div class="row">
    <div class="col">
        <div class="card-group">
            <div class="card">
              {children}
            </div>
        </div>
    </div>
</div>
)
  }

  render() {
    return(
      <div>
        <Navbar cartSize={this.state.cart.length}/>
        <div class="container">
          <h1>Your Cart</h1>
          {this.listCart()}
          <Link to="/">
          <button class="btn btn-light" type="button">Back</button>
          </Link>
          <Link to="/checkout">
          <button class="btn btn-light" type="button">Place Order</button>
          </Link>
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
      page: 0
    }
  }
 
  render() {
    return(
      <div>
      <Navbar cartSize={this.props.cartSize}/>
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
            <form class="form-inline d-none d-sm-inline-block mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                <div class="input-group"><input type="text" class="bg-light form-control border-0 small" placeholder="Search for ..." />
                    <div class="input-group-append"><button class="btn btn-primary py-0" type="button"><i class="fas fa-search"></i></button></div>
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

/*page: 0 is homepage, 1 is cart, 2 is item */
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
    }
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

  clearCart() {
    const newCart = []
    this.setState({
      cart: newCart
    })
  }


  listCourses () {
    let children = []
    //let rows = Math.floor(course.length / 2)
    for (let i = 0; i < course.length; i++) {
      // let children = []
      // for (let j = 0; j < 2; j++) {
      //   children.push(
      //       this.renderCourse(count)
      //     )
      //   count++
      // }
      children.push(this.renderCourse(i))
    // }
    // if (count < course.length) {
    //   let children = []
    //   for (let i = count; i < course.length; i++) {
    //     children.push(<td>
    //       Course {course[count].title}
    //       </td>)
    //     count++
    //   }
    //   table.push(<tr>{children}</tr>)
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
          render={(props) => <HomePage {...props} cart={this.state.cart} 
            list={this.listCourses()} 
            cartSize={this.cartSize()}/>}
        />
          <Route path="/cart" 
          render={(props) => <Cart {...props} cart={this.state.cart}/>}
        />
        <Route path="/checkout" 
          render={(props) => <CheckOut {...props} clear={() => this.clearCart()} cart={this.state.cart}/>}
        />
        <Route path="/courseinfo/:id" 
          render={(props) => <CourseDetail {...props} cart={this.state.cart}/>}
        />
        </Switch>
      </Router>
    );
  }
}