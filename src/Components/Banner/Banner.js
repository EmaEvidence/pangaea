import './Banner.css';

const Banner = () => {
  return (
    <div className="banner">
      <div className="left">
        <span className="title">New Products</span>
        <span className="tagline">Brand new upgrades for your routine</span>
      </div>
      <div className="right">
        <select>
          <option>Filter By</option>
        </select>
      </div>
    </div>
  );
};

export default Banner;
