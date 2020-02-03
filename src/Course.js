import React from 'react';
import './App.css';
import { BrowserRouter as Link } from 'react-router-dom';

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

export default Course