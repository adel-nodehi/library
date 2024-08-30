import notAvailable from "../assets/images/not_available_image.jpg";

function BookItem() {
  return (
    <div className="Books__item">
      <img src={notAvailable} alt="" />
      <div className="Books__item-content">
        <h3>shah name</h3>
        <p>
          author: <span>ferdosi</span>
        </p>
        <p>
          published year: <span>1968</span>
        </p>
      </div>
    </div>
  );
}

export default BookItem;
