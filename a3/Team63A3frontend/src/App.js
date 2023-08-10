import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";

function App() {
  const [product, setProduct] = useState([]);
  const [viewer1, setViewer1] = useState(false);

  const [oneProduct, setOneProduct] = useState([]);
  const [viewer2, setViewer2] = useState(false);

  const [checked4, setChecked4] = useState(false);
  const [index, setIndex] = useState(0);

  const [viewer4, setViewer4] = useState(false);

  const [updatedPrice, setUpdatedPrice] = useState(0);
  const [viewer3, setViewer3] = useState(false);

  const [viewer5, setViewer5] = useState(false);
  const [viewer6, setViewer6] = useState(false);


  function getAllProducts() {
    fetch("http://localhost:4000/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Show Catalog of Products :");
        console.log(data);
        setProduct(data);
        setViewer1(!viewer1);
      });
  }


  function getOneProduct(id) {
    console.log(id);
    if (id >= 1 && id <= 20) {
      fetch("http://localhost:4000/" + id)
        .then((response) => response.json())
        .then((data) => {
          console.log("Show one product :", id);
          console.log(data);
          const dataArr = [];
          dataArr.push(data);
          setOneProduct(dataArr);
        });
      setViewer2(!viewer2);
    } else {
      console.log("Wrong number of Product id.");
    }
  }

  function handleUpdatePrice(id) {
    fetch("http://localhost:4000/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: updatedPrice }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Update a product completed : ", id);
        console.log(data);
        console.log("Setting updated price to:", 0);
        setUpdatedPrice(0);
      });
  }


  function StudentView() {
    return (
      <div>
        <h2>Student Information</h2>
        <p><strong>Names:</strong> Aryan Rao, Nishi Kant</p>
        <p><strong>Emails:</strong> aryanrao@iastate.edu, nkant@iastate.edu</p>
        <p><strong>Course Number:</strong> SE319</p>
        <p><strong>Date:</strong> April 30, 2023</p>
        <p><strong>Professor:</strong> Dr. Abraham</p>
        <p><strong>Project:</strong> We built a simple web application that allows users to perform CRUD (Create, Read, Update, Delete) operations on a catalog of products. The application allows users to view all products, view individual products by ID, add new products, update existing products, and delete products from the catalog. We used React for the front-end, and built a simple server using Node.js and Express to handle API requests and interact with a MongoDB database.</p>
      </div>
    );
  }


  function handleChange(evt) {
    const value = evt.target.value;
    if (evt.target.name === "_id") {
      setAddNewProduct({ ...addNewProduct, _id: value });
    } else if (evt.target.name === "title") {
      setAddNewProduct({ ...addNewProduct, title: value });
    } else if (evt.target.name === "price") {
      setAddNewProduct({ ...addNewProduct, price: value });
    } else if (evt.target.name === "description") {
      setAddNewProduct({ ...addNewProduct, description: value });
    } else if (evt.target.name === "category") {
      setAddNewProduct({ ...addNewProduct, category: value });
    } else if (evt.target.name === "image") {
      const temp = value;
      setAddNewProduct({ ...addNewProduct, image: temp });
    } else if (evt.target.name === "rate") {
      setAddNewProduct({ ...addNewProduct, rating: { rate: value } });
    } else if (evt.target.name === "count") {
      const temp = addNewProduct.rating.rate;
      setAddNewProduct({
        ...addNewProduct,
        rating: { rate: temp, count: value },
      });
    }
  }


  function handleOnSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);
    fetch("http://localhost:4000/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(addNewProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Post a new product completed");
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
  }

  function getOneByOneProductNext() {
    if (product.length > 0) {
      if (index === product.length - 1) setIndex(0);
      else setIndex(index + 1);
      if (product.length > 0) setViewer4(true);
      else setViewer4(false);
    }
  }

  function showUpdateForm() {
    setViewer3(true);
  }

  function getOneByOneProductPrev() {
    if (product.length > 0) {
      if (index === 0) setIndex(product.length - 1);
      else setIndex(index - 1);
      if (product.length > 0) setViewer4(true);
      else setViewer4(false);
    }
  }


  function deleteOneProduct(deleteid) {
    console.log("Product to delete :", deleteid);
    fetch("http://localhost:4000/delete/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: deleteid }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Delete a product completed : ", deleteid);
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
    setChecked4(!checked4);
  }

  const showAllItems = product.map((el) => (
    <div key={el._id}>
      <img src={el.image} width={30} /> <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
      Rate :{el.rating.rate} and Count:{el.rating.count} <br />
    </div>
  ));

  const showOneItem = oneProduct.map((el) => (
    <div key={el._id}>
      <img src={el.image} width={30} /> <br />
      Title: {el.title} <br />
      Category: {el.category} <br />
      Price: {el.price} <br />
      Rate :{el.rating.rate} and Count:{el.rating.count} <br />
    </div>
  ));


  // new Product
  const [addNewProduct, setAddNewProduct] = useState({
    _id: 0,
    title: "",
    price: 0.0,
    description: "",
    category: "",
    image: "http://127.0.0.1:4000/images/",
    rating: { rate: 0.0, count: 0 },
  });

  return (
    <div>
      <nav>
        <ul style={{ display: "flex", justifyContent: "center", listStyleType: "none", padding: 0 }}>
          <li style={{ margin: "0 10px" }}>
            <button onClick={() => getAllProducts()}>Show All Products</button>
          </li>
          <li style={{ margin: "0 10px" }}>
            <form action="">
              <button type="button" onClick={() => setViewer2(true)}>Show one Product by Id</button>
              <label htmlFor="_id">Id:</label>
              <input type="text" id="message" name="message" placeholder="Enter id" onChange={(e) => getOneProduct(e.target.value)} />
            </form>
          </li>
          <li style={{ margin: "0 10px" }}>
            <button onClick={() => setViewer4(true)}>Delete one product</button>
          </li>
          <li style={{ margin: "0 10px" }}>
            <button type="button" onClick={() => setViewer3(true)}>Update one Product by Id</button>
            <label htmlFor="_id">Id:</label>
            <input type="text" id="message" name="message" placeholder="Enter id" onChange={(e) => getOneProduct(e.target.value)} />
          </li>
          <li style={{ margin: "0 10px" }}>
            <button onClick={() => setViewer5(true)}>Add Product</button>
          </li>
          <li style={{ margin: "0 10px" }}>
            <button onClick={() => setViewer6(true)}>Student Info</button>
          </li>
        </ul>
      </nav>

      <hr />

      {viewer1 && (
        <div>
          <h2>Show all available Products:</h2>
          {showAllItems}
        </div>
      )}

      {viewer2 && (
        <div>
          <h2>Show one Product by Id:</h2>
          {showOneItem}
        </div>
      )}

      {viewer5 && (
        <div>
          <h2>Add a New Product:</h2>
          <form action="">
            <label htmlFor="_id">Id:</label>
            <input type="number" id="_id" name="_id" value={addNewProduct._id} onChange={handleChange} /><br />
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" value={addNewProduct.title} onChange={handleChange} /><br />
            <label htmlFor="price">Price:</label>
            <input type="number" id="price" name="price" value={addNewProduct.price} onChange={handleChange} /><br />
            <label htmlFor="description">Description:</label>
            <input type="text" id="description" name="description" value={addNewProduct.description} onChange={handleChange} /><br />
            <label htmlFor="category">Category:</label>
            <input type="text" id="category" name="category" value={addNewProduct.category} onChange={handleChange} /><br />
            <label htmlFor="image">Image:</label>
            <input type="text" id="image" name="image" value={addNewProduct.image} onChange={handleChange} /><br />
            <label htmlFor="rate">Rate:</label>
            <input type="number" id="rate" name="rate" value={addNewProduct.rating.rate} onChange={handleChange} /><br />
            <label htmlFor="count">Count:</label>
            <input type="number" id="count" name="count" value={addNewProduct.rating.count} onChange={handleChange} /><br />
            <button type="submit" onClick={handleOnSubmit}>Submit</button>
          </form>
        </div>
      )}

      {viewer4 && (

        <div>
          <h3>Delete one product:</h3>
          <input type="checkbox" id="acceptdelete" name="acceptdelete" checked={checked4} onChange={(e) => setChecked4(!checked4)} />
          <button onClick={() => getOneByOneProductPrev()}>Prev</button>
          <button onClick={() => getOneByOneProductNext()}>Next</button>
          <button onClick={() => deleteOneProduct(product[index]._id)}>Delete</button>
          {checked4 && (
            <div key={product[index]._id}>
              <img src={product[index].image} width={30} /> <br />
              Id:{product[index]._id} <br />
              Title: {product[index].title} <br />
              Category: {product[index].category} <br />
              Price: {product[index].price} <br />
              Rate :{product[index].rating.rate} and Count:
              {product[index].rating.count} <br />
            </div>
          )}
          <hr></hr>
        </div>

      )}
      {viewer3 && (
        <div>
          <h2>Update Product Price</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleUpdatePrice(oneProduct[0]._id); }}>
            <label>
              Product ID:
              <input type="text" value={oneProduct[0]._id} readOnly />
            </label>
            <br />
            <label>
              Product Title:
              <input type="text" value={oneProduct[0].title} readOnly />
            </label>
            <br />
            <label>
              Product Price:
              <input
                type="number"
                value={updatedPrice}
                onChange={(e) => setUpdatedPrice(e.target.value)}
              />
            </label>
            <br />
            <button type="submit">Update Price</button>
          </form>
        </div>
      )}
      {viewer6 && (
      <div>
        <StudentView />
      </div>
      )}
    </div>
  );
}


export default App;
