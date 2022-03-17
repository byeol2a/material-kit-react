import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Test2 = () => (
    //GET 메소드에서 불러올 객체를 담을 useState 생성
    const [text, setText] = useState([]);

    //post api 사용 -> 업로드 용

    function textInput() {
        var getTitle = document.getElementById("title").value;
        var getContent = document.getElementById("content").value;
        axios.post("http://localhost:8080/restapi/member/", {
          title: getTitle,
          content: getContent,
        })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        <Link to="/notice"></Link>
    }

    //등록하기 버튼 출력
    <Link to="/notice"> <button type="button" className="post" onClick={textInput}>
      등록하기
    </button> </Link>

    //get api 사용 -> 불러들이기 용

    function getMList() {
      axios.get('http://localhost:8080/restapi/member')
        .then((response) => {
          setText([...response.data]);
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    // 간단하게 불러들인 값 출력 용
    {text.map((e) => (
        <div>
          {e.updated_at}, {e.title}, {e.content}
        </div>
      ))}

    //delete api 사용 -> 삭제

    {text.map((e) => (
        <div>
          {e.title} {e.content}
          <button
           className="btnDelete"
           onClick={() => {
             axios.delete(`http://localhost:8080/restapi/member/${e.no}`);
             setText(text.filter((text) => text.no !== e.no));
           }}
         >
         삭제
          </button>
        </div>
      ))}
    //DB에서도 지워지며, setText를 사용하면 화면에서도 지워준다.

);
   
Products.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Test2;