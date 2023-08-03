import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import React, { useState } from "react";
import {Navigate} from "react-router-dom";
import Editor from "../Editor";


export default function CreatePost() {
  const [showModal, setShowModal] = useState(false);
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  //breed 
  const [breed,setBreed] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [vaccinated, setVaccinated] = useState('');


  const handleCreatePostClick = () => {
    if (!title || !summary || !content || !files[0] || !breed || !gender || !age || !vaccinated) {
      alert('Please fill in all the required fields.');
      return;
    }
    else{
      // setShowModal(true);
      alert('Details Submitted!!');
    }
    
  };

  async function createNewPost(ev) {
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    data.set('breed', breed);
    data.set('gender', gender);
    data.set('age', age);
    data.set('vaccinated', vaccinated);
    

    ev.preventDefault();
    const response = await fetch('http://localhost:4000/post', {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  // return (
  //   <form onSubmit={createNewPost}>
      
  //     <button style={{marginTop:'5px'}}>Create post</button>
  //   </form>

  // );
  return (
    <form onSubmit={createNewPost}>
      <h4>Name</h4>
      <input type="title"
             placeholder={'Dog Name'}
             value={title}
             onChange={ev => setTitle(ev.target.value)} />
      <input type="summary"
             placeholder={'Summary'}
             value={summary}
             onChange={ev => setSummary(ev.target.value)} />
      <h4>Basic Information</h4>
      <input type="text"
             placeholder={'Dog Breed'}
             value={breed}
             onChange={ev => setBreed(ev.target.value)} />
      <input type="text"
  placeholder={'Is it Vaccinated?(Yes/No)'}
  value={vaccinated}
  onChange={(ev) => setVaccinated(ev.target.value)}
/>
      
      <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(ev) => setAge(ev.target.value)}
      />
      <input
            type="text"
            placeholder="Gender (Male/Female)"
            value={gender}
            onChange={(ev) => setGender(ev.target.value)}
      />

      <h4>A Photo</h4>
      <input type="file"
             onChange={ev => setFiles(ev.target.files)} />
      <h4>His/Her Story</h4>
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: '5px' }} onClick={handleCreatePostClick}>
        Create post
      </button>
      
  
      {/* The pop-up/modal */}
      {/* {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModalClick}>
              &times;
            </span>
            <h2>Your post has been created successfully!</h2>
          </div>
        </div>
      )} */}
    </form>
  );
  
}