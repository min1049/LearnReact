import { useState } from 'react';
import './App.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'html-react-parser';

function App() {
  const [movieContent, setMovieContent] = useState( {title: "", content: ""})
  //해당 상태(타이을, 내용)을 movieContent와 setMovieContent에 입력

  const [viewContent, setViewContent] = useState( [] );
  //getValue (이벤트) 해당 이벤트의 타겟의 값을 name,value에 넣어준다. ex) name = "title" value = "input의 내용"
  const getValue = e => {
    const { name, value } = e.target;
    setMovieContent({
      ...movieContent,
      [name]: value
    })
    console.log(movieContent);
  };
  // moviContent의 내용을 복사하여 그 안에 name이라는 이름의 키의 값을 value로 바꿔저장한다.
  return (
    <div className="App">
      <h1>MT 게임 게시판</h1>
      <div className='movie-container'>
        {viewContent.map(element =>
         <div>
          <h2>{element.title}</h2>
            <div>
              {ReactHtmlParser(element.content)}
            </div>
          </div>
        )}
    </div>
      <div className='form-wrapper'>
        <input className="title-input" type='text' placeholder='제목' onChange={getValue} name='title'/>
        <CKEditor
          editor={ClassicEditor}
          data="<p>Hello from CKEditor 5!</p>"
          onReady={editor => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor is ready to use!', editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
            setMovieContent({
              ...movieContent,
              content: data
            })
            console.log(movieContent);
          }}
          onBlur={(event, editor) => {
            console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            console.log('Focus.', editor);
          }}
        />
      </div>
      <button 
      className="submit-button" 
      onClick = {() => {
        setViewContent(viewContent.concat({...movieContent}));
      }
      }>입력</button>
    </div>
  );
}

export default App;