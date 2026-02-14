import React, { useEffect, useState } from 'react'
import { Toaster, toast } from "react-hot-toast"
import "./App.css"

function App () {
  var [title, setTitle] = useState("")
  var [description, setDesription] = useState("")
  var [data, setData] = useState([])

  var newBlog = {
    BlogTitle: title,
    BlogDescription: description
  }

  async function createBlog() {
    if (title ==""|| description=="") {
      toast.error("Please fill all fields")
      return
    }

    var response = await fetch("https://698d5dffb79d1c928ed51ba9.mockapi.io/data", {
      method: "post",
      headers: {
        "content-Type": "application/json"
      },
      body: JSON.stringify(newBlog)
    })

    if (response.ok) {
      toast.success("Blog Created Successfully 🎉")
      fetchData()
      setTitle("")
      setDesription("")
    } else {
      toast.error("Failed to create blog")
    }
  }

  async function fetchData() {
    var result = await fetch("https://698d5dffb79d1c928ed51ba9.mockapi.io/data")
    var jsonResult = await result.json()
    setData(jsonResult.reverse())
  }

  useEffect(() => {
    fetchData()
  }, [])

  async function deleteBlog(blogItem) {
    var deletedBlog = await fetch(`https://698d5dffb79d1c928ed51ba9.mockapi.io/data${blogItem.id}`, {
      method: "delete"
    })

    if (deletedBlog.ok) {
      toast.success("Blog Deleted 🗑️")
      fetchData()
    } else {
      toast.error("Failed to delete blog")
    }
  }

  async function updateBlog(updateItem) {
    var newTitle = prompt("Enter new Title:")
    var newDescription = prompt("Enter new Description:")

    if(newTitle=="" || newDescription==""){
      toast.error("fill all fields")
      return
    }



    var updatedblog = {
      BlogTitle: newTitle,
      BlogDescription: newDescription
    }

    var blogUpdated = await fetch(`${updateItem.id}`, {
      method: "put",
      headers: {
        "content-Type": "application/json"
      },
      body: JSON.stringify(updatedblog)
    })
   

    if (blogUpdated.ok) {
      toast.success("Blog Updated ✨")
      fetchData()
    } else {
      toast.error("Failed to update blog")
    }
  }

  return (
    <div className="app">
      <Toaster />

      <div className="blog-container">

        <h1 className="heading">Premium Blog App</h1>

        <div className="form-card">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter Blog Title"
          />

          <textarea
            value={description}
            onChange={(e) => setDesription(e.target.value)}
            placeholder="Enter Blog Description"
          />

          <button className="create-btn" onClick={createBlog}>
            Create Blog
          </button>
        </div>

        <div className="blog-list">
          {data.map((item) => (
            <div key={item.id} className="blog-card">
              <h2>{item.BlogTitle}</h2>
              <p>{item.BlogDescription}</p>

              <div className="card-buttons">
                <button
                  className="update-btn"
                  onClick={() => updateBlog(item)}
                >
                  Update
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteBlog(item)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default App