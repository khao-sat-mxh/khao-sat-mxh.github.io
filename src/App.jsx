import { useState } from 'react'
import {createClient} from '@supabase/supabase-js'
import './index.css'
import {API, CHEAT} from '../config.js'

const supabase = createClient(API.link, API.anon_key)

export default function App() {
  const [name, setName] = useState("");
  const [classe, setClass] = useState("");
  const [school, setSchool] = useState("");
  const [ques1, setQues1] = useState("");
  const [ques2, setQues2] = useState("");
  const [ques3, setQues3] = useState("");
  const [ques4, setQues4] = useState("");
  const [ques5, setQues5] = useState("");

  const [submitted, setSubmitted] = useState("none");

  async function submit_survey() {
    console.log(localStorage.getItem(CHEAT))
    if ((localStorage.getItem(CHEAT))) {
      return;
    } else {
      localStorage.setItem(CHEAT, "a")
    }
    const data = {
      name: name, 
      class: classe, 
      school: school, 
      ques_1: ques1, 
      ques_2: ques2, 
      ques_3: ques3, 
      ques_4: ques4, 
      ques_5: ques5 
    };
    setSubmitted("block");
    const { error } = await supabase
        .from("main")
        .insert(data)
    console.log(error)
  }

  return (
    <>
      <div>
        <h2>Khảo sát về hành vi, ứng xử trên mạng xã hội</h2>
      </div>
      <div id='name'>
        <h4>Họ và tên</h4>
        <textarea required type="text" placeholder='Họ và tên' onChange={(e) => {setName(e.target.value)}}/>
      </div>
      <div id='class'>
        <h4>Lớp</h4>
        <textarea required type="text" placeholder='Lớp' onChange={(e) => {setClass(e.target.value)}}/>
      </div>
      <div id='school'>
        <h4>Tên trường</h4>
        <textarea required type="text" placeholder='Tên trường' onChange={(e) => {setSchool(e.target.value)}}/>
      </div>
      <div id='ques1'>
        <h4>1. Bạn thường sử dụng mạng xã hội chủ yếu để làm gì? </h4>
        <textarea required type="text" placeholder='Giải trí, học tập, ...' onChange={(e) => {setQues1(e.target.value)}}/>
      </div>
      <div id='ques2'>
        <h4>2. Bạn đã trải qua những lợi ích và rủi ro nào khi sử dụng mạng xã hội? (Ví dụ: Kết nối bạn bè, tiếp cận thông tin, vấn đề về sức khỏe tâm lý, tiếp nhận những thông tin tiêu cực)</h4>
        <textarea required type="text" placeholder='Kết nối bạn bè, tiếp cận thông tin, ...' onChange={(e) => {setQues2(e.target.value)}}/>
      </div>
      <div id='ques3'>
        <h4>3. Với thực trạng sử dụng mạng xã hội hiện nay, bạn có nghĩ rằng liệu giao tiếp qua mạng xã hội có thể thay thế giao tiếp trực tiếp không? Tại sao / Tại sao không?</h4>
        <textarea required type="text" onChange={(e) => {setQues3(e.target.value)}}/>
      </div>
      <div id='ques4'>
        <h4>4. Theo bạn, liệu thực trạng sử dụng mạng xã hội hiện nay có ảnh hưởng đến cách giới trẻ giao tiếp ngoài đời thực không? Nếu có, ảnh hưởng đó là gì?</h4>
        <textarea required type="text" onChange={(e) => {setQues4(e.target.value)}}/>
      </div>
      <div id='ques5'>
        <h4>5. Bạn có nhận ra sự ảnh hưởng của mạng xã hội đối với cuộc sống bản thân không? Nếu có, các ảnh hưởng đó là gì?</h4>
        <textarea required type="text" onChange={(e) => {setQues5(e.target.value)}}/>
      </div>
      <button onClick={async () => {
        await submit_survey()
      }}>Submit</button>
      <h2 style={{display:submitted, margin:"0 auto"}}>Cảm ơn vì thời gian của bạn.</h2>
    </>
  )
}
