import React from 'react';
import { Link }       from 'react-router'

import Compteur    from './generic/Compteur'


class NavBar extends React.Component {
  componentDidMount() {
    $(document).ready(function() {
      $('.button-collapse').sideNav({
      })
      $(".dropdown-button").dropdown();
    });
  }

  componentWillUnmount() {
  }

  render() {
    return(
      <div>
        {/*<ul id="dropdown1" className="dropdown-content">
          <li><a href="#!">one</a></li>
          <li><a href="#!">two</a></li>
          <li className="divider"></li>
          <li><a href="#!">three</a></li>
        </ul>*/}
        <nav>
          <div className="nav-wrapper">
            <a href="#" className="button-collapse"><i className="material-icons">menu</i></a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">

              {/*<li>
                <a className="dropdown-button" href="#!" data-activates="dropdown1">
                  Dropdown<i className="material-icons right">arrow_drop_down</i>
                </a>
              </li>*/}

              <li>
                <Link to="/">
                  Liste des services
                </Link>
              </li>
              <li>
                <Link to="/declarations">
                  Liste des declarations
                </Link>
              </li>
              <li>
                <Link to="/announces">
                  Creer annonce
                </Link>
              </li>

              <li>
                <Link to="/declaration">
                  Declaration
                </Link>
              </li>

              <li>
                <Link to="/validation">
                  En attente de validation
                </Link>
              </li>

              <li>
                <Link to="/userPage">
                  Profil
                </Link>
              </li>

              <li>
                <Compteur title="Solde: " value={ this.props.user.solde } unite=" heure(s)"/>
                <div className="center" >{ this.props.user.username }</div>
              </li>

            </ul>
          </div>
        </nav>

      </div>

    )
  }
}

export default NavBar
