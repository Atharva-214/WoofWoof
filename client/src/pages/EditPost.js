import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import Editor from "../Editor";

export default function EditPost() {
  const {id} = useParams();
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect,setRedirect] = useState(false);
  const [breed,setBreed] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [vaccinated, setVaccinated] = useState('');


  const handleCreatePostClick = () => {
    if (!title || !summary || !content || !breed || !gender || !age || !vaccinated) {
      alert('Please fill in all the required fields.');
      return;
    }
    else{
      // setShowModal(true);
      alert('Details Updated Successfully!!');
    }
    
  };

  useEffect(() => {
    fetch('http://localhost:4000/post/'+id)
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
          setBreed(postInfo.breed);
          setAge(postInfo.age);
          setGender(postInfo.gender);
          setVaccinated(postInfo.vaccinated);
          
          
        });
      });
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    data.set('breed', breed);
    data.set('gender', gender);
    data.set('age', age);
    data.set('vaccinated', vaccinated);
    
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }
    const response = await fetch('http://localhost:4000/post', {
      method: 'PUT',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/post/'+id} />
  }

  return (
    <form onSubmit={updatePost}>
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
      <Editor onChange={setContent} value={content} />
      {/* <button style={{marginTop:'5px'}}>Update post</button> */}
      <button style={{ marginTop: '5px' }} onClick={handleCreatePostClick}>
        Update Post
      </button>
    </form>
  );
}