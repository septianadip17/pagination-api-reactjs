import "./App.css";
import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);

  const [pageCount, setPageCount] = useState(0);

  let limit = 10;

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3004/comments?_page=1&_limit=12`
        );
        const data = response.data;
        const total = response.headers["x-total-count"];
        setPageCount(Math.ceil(total / limit));
        setItems(data);
      } catch (error) {
        console.error(error);
      }
    };

    getComments();
    
  }, [limit, setPageCount])

  // useEffect(() => {
  //   const getComments = async () => {
  //     const res = await fetch(
  //       `http://localhost:3004/comments?_page=1&_limit=12`
  //     );
  //     // const res = await fetch(
  //     //   `https://jsonplaceholder.typicode.com/comments?_page=1&_limit=12`
  //     // );
  //     const data = await res.json();
  //     const total = res.headers.get('x-total-count');
  //     setPageCount(Math.ceil(total/limit));
  //     console.log(Math.ceil(total/limit));
  //     console.log(total)
  //     setItems(data);
  //   };

  //   getComments();
  // }, []);

  console.log(items);
// cara menjalankannya: json-server --watch db.json --port 3004
  const fetchComments = async (currentPage) => {
    try {
      const response = await axios.get(
        `http://localhost:3004/comments?_page=${currentPage}&_limit=${limit}`
      );
      const data = response.data;
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  

  // const fetchComments = async (currentPage) => {
  //   const res = await fetch(
  //     `http://localhost:3004/comments?_page=${currentPage}&_limit=${limit}`
  //   );
  //   // const res = await fetch(
  //   //   `https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=${limit}`
  //   // );
  //   const data = await res.json();
  //   return data;
  // }

  const handlePageClick = async (data) => {
    console.log(data.selected);

    let currentPage = data.selected + 1

    const commentsFormServer = await fetchComments(currentPage);

    setItems(commentsFormServer);
  };

  return (
    <div className="container">
      <div className="row m-2">
        {items.map((item) => {
          return (
            <div key={item.id} className="col-sm-6 col-md-4 v my-2">
              <div className="card shadow-sm w-100" style={{ minHeight: 225 }}>
                <div className="card-body">
                  <h5 className="card-title text-center h2">Id: {item.id}</h5>
                  <h6 className="card-subtitle mb-2 text-muted text-center">
                    {item.email}
                  </h6>
                  <p className="card-text">{item.body}</p>
                </div>
              </div>
            </div>
          );
        })}
        ;
      </div>

      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default App;
