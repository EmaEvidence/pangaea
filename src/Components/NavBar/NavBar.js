import './NavBar.css';
import CartImg from '../../Assets/cart.png';
import Logo from '../../Assets/lumin.png';

const NavBar = (props) => {
  return (
    <nav>
      <div className="left">
        <img src={Logo} alt="" className="logo" />
        <a href="/#" className="nav-item">Shop</a>
        <a href="/#" className="nav-item">Learn</a>
      </div>
      <div className="right">
        <a href="/#" className="nav-item">Account</a>
        <button href="/#" className="nav-item cart-btn" onClick={() => props.toggleCart(true)}>
          <img src={CartImg} alt="" />
          <span className="cart-qty">{props.cartQty}</span>
        </button>
        <select href="/#" className="nav-item">
          <option>AR</option>
          <option>AR</option>
          <option>AR</option>
          <option>AR</option>
        </select>
      </div>
    </nav>
  );
};

export default NavBar;
