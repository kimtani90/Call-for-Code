import React, {Component} from 'react';

import helpinghand from "./helpinghand.png";


class Header extends Component {




    render() {
        return (
            <div>
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">

                        <div className="navbar-header">
                            <br/>
                            <img className="center" src={helpinghand}
                                 alt="" height="50" />
                        </div>
                        <div className="col-md-offset-5 col-md-12">
                            <h3> <b> <label> Helping Hand </label></b></h3>


                        </div>

                    </div>
                </nav>
            </div>

        );

    }
}

export default Header;