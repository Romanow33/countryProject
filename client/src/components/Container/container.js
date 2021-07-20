import React from 'react';
import {connect} from "react-redux";
import {findCountries} from '../../Actions/index';
import { Link } from 'react-router-dom';


function Container(props){
    return(
    <div className='container'>
        { props.search && props.search.map( (el)=>(
          
            <div key={el.id + 's'} className='countryCards'>
                <img src={el.imageFlag} alt={el.name}></img>
<h4 className='nombre'><Link to={`/countries/${el.id}`} style={{ textDecoration: 'none', color:'#ffffa4'}}>{el.name}</Link></h4> 
                <label className='title'>Turismo</label><hr></hr>
                <p>{el.continent}</p>
                <label className='title'>Turism </label><hr></hr>
                <label>{el.population}</label>
              
            </div>

        ))}
    </div>
  )
}


function mapStateToProps(state) {
    return {
      search: state.countrySearched,
  
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      findCountry: name => dispatch(findCountries(name)),
    
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(Container);