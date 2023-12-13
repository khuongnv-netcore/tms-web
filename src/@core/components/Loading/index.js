// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

// import { loadingGrey } from '../../../assests/images'
import "./Loading.scss";
import logo from '@src/assets/images/systemlogo/MileMarkerLogo.svg'

const Loading = ({ msg, className, loading, childLoading }) => {
  const customOverlayClass = cn(
    'webim-loading',
    { 'child-loading': childLoading },
    [className]
  )
  return loading ? (
    <div className={customOverlayClass}>
      {/* <img src={loadingGrey} alt="loading" /> */}
      <img className='fallback-logo' src={logo} alt='logo' />
      { msg && <span>{msg}</span> }
    </div>
  ) : null
};

const { string, bool } = PropTypes;

Loading.propTypes = {
  msg: string,
  className: string,
  loading: bool,
  childLoading: bool,
};

Loading.defaultProps = {
  childLoading: false,
};

export default Loading;
