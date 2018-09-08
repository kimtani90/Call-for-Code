import React, {Component} from 'react';

import bsn from "./bsn.png";


class Header extends Component {




    render() {
        return (
            <div>
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">

                        <div className="navbar-header">
                            <br/>
                            <img className="" src={bsn}
                                 alt="" height="50" />
                        </div>
                        <div className="col-md-offset-5 col-md-12">
                            <h3> <b> <label>CONTROLLER UPGRADE SERVICE </label></b></h3>


                        </div>

                    </div>
                </nav>
            </div>

        );

    }
}

export default Header;