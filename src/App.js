import { useEffect, useState } from 'react';
import './App.css';
import RadioButton from './component/radioButton';
import Sidebar from './sidebar';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { ko } from "date-fns/esm/locale";

function App() {

  const [data, setData] = useState();
  const [checkboxes, setCheckboxes] = useState([
    { id: 1, label: '선택1', checked: false, value: "" },
    { id: 2, label: '선택2', checked: false, value: "" },
    { id: 3, label: '선택3', checked: false, value: "* 선택시 텍스트가 표시됩니다" },
  ]);
  const [selectedOption, setSelectedOption] = useState('');
  const [date, setDate] = useState('');
  const [info2Data, setInfo2Data] = useState('');
  const [info4Data, setInfo4Data] = useState('');
  

  const handleCheckboxChange = (id) => {
    setCheckboxes((prevCheckboxes) =>
      prevCheckboxes.map((checkbox) =>
        checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox
      )
    );
  };
  
  const handleRadioButtonChange = (value) => {
    setSelectedOption(value);
  };
  const dateNow = new Date();
  const today = dateNow.toISOString().slice(0, 10);
  useEffect(() => {
    axios(`https://api-jobtest.json2bot.chat/test`, {
     method:'get', 
    })
    .then((res) => {
      setData(res.data.data)
      const receivedDate = res.data.data ? new Date(res.data.data.date) : new Date();
      setDate(receivedDate);
      const initialSelectedOption = res.data.data ? res.data.data.info5 : null;
      setSelectedOption(initialSelectedOption);
      const initialCheckboxValues = res.data.data ? res.data.data.info6 : null;
      console.log(initialCheckboxValues)
      const updatedCheckboxes = checkboxes.map(checkbox =>
        initialCheckboxValues.includes(checkbox.label)
          ? { ...checkbox, checked: true }
          : checkbox
      );
      setCheckboxes(updatedCheckboxes);
    })
    .catch((err) => {
      console.log(err);
    });
  },[])
  
  const infoSubmit = () => {
    console.log(date, info2Data, info4Data, selectedOption)
    axios(`https://api-jobtest.json2bot.chat/test`, {
      method:'post',
      data:{
        date:date,
        info2:info2Data,
        info4:info4Data,
        info5:selectedOption,
        info6:[]
      }
    })
    .then((res) => {
      console.log(res)
   })
   .catch((err) => {
      if(err.response.status === 400) alert('400 error가 발생했습니다')
      if(err.response.status === 500) alert('500 error가 발생했습니다')
      else console.log(err)
   });
   };

   const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1990 + 1 }, (_, index) => 1990 + index);

   const months = [
     "1월",
     "2월",
     "3월",
     "4월",
     "5월",
     "6월",
     "7월",
     "8월",
     "9월",
     "10월",
     "11월",
     "12월",
   ];

  return (
    <div className='infoApp'>
      <div className='sidebar'>
        <Sidebar/>
      </div>
      <div className='infomations'>
        <div className='title'>타이틀</div>
        <div className='line'></div>
        <div className='info'>
          <div className='infoName'>
            <div className='name'>정보1</div>
            <div>{data && data.info1}</div>
          </div>  
          </div>
          <div className='info'>
          <div className='infoName'>
            <div className='name'>정보2</div>
            <input 
              type="text" 
              className='info2Input'
              placeholder={data ? data.info2 : ''}
              onChange={(e) => {setInfo4Data(e.target.value)}}
            />
          </div>  
          </div>
          <div className='info'>
          <div className='infoName'>
            <div className='name'>정보3</div>
            <div>{data && data.info3}</div>
          </div>  
          </div>
          <div className='info'>
          <div className='infoName'>
            <div className='name'>정보4</div>
            <input 
              type="text" 
              className='info2Input'
              placeholder={data ? data.info4 : ''}
              onChange={(e) => {setInfo2Data(e.target.value)}}
            />
          </div>  
          </div>
          <div className='info'>
          <div className='infoName'>
            <div className='name'>날짜</div>
              <DatePicker
              locale={ko}
              dateFormat="yyyy.MM.dd" // 날짜 형식 설정
              className="input-datepicker" // 클래스 명 지정 css주기 위해
              defaultValue={today}
              closeOnScroll={true} // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
              selected={date} // value  // 날짜를 선택하였을 때 실행될 함수
              onChange={(date) => setDate(date)}
              renderCustomHeader={({
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }) => (
                <div
                  style={{
                    margin: 10,
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <button 
                  onClick={decreaseMonth} 
                  disabled={prevMonthButtonDisabled} 
                  style={{
                    backgroundColor:"white",
                    border:0,
                  }}>
                    {"<"}
                  </button>
                  <select
                    value={date.getFullYear()}
                    onChange={({ target: { value } }) => changeYear(value)}
                    style={{
                      width:"100px",
                      heigth:"34px"
                    }}
                  >
                    {years.map((option) => (
                      <option key={option} value={option}>
                        {option}년
                      </option>
                    ))}
                  </select>

                  <select
                    value={months[date.getMonth()]}
                    onChange={({ target: { value } }) =>
                      changeMonth(months.indexOf(value))
                    }
                    style={{
                      width:"72px",
                      heigth:"34px"
                    }}
                  >
                    {months.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <button 
                    onClick={increaseMonth} 
                    disabled={nextMonthButtonDisabled}
                    style={{
                      backgroundColor:"white",
                      border:0,
                    }}>
                    {">"}
                  </button>
                </div>
              )}
            />
          

          </div>  
          </div>
          <div className='info'>
          <div className='infoName'>
            <div className='name'>정보5</div>
            <RadioButton
                label="선택1"
                checked={selectedOption === '선택1'}
                onChange={() => handleRadioButtonChange('선택1')}
                />
              <RadioButton
                label="선택2"
                checked={selectedOption === '선택2'}
                onChange={() => handleRadioButtonChange('선택2')}
                />
              <RadioButton
                label="선택3"
                checked={selectedOption === '선택3'}
                onChange={() => handleRadioButtonChange('선택3')}
              />
          </div> 
            <div className='value'>
                {selectedOption === '선택3' && checkboxes.find(checkbox => checkbox.id === 3)?.value}
                {checkboxes === true ? <div >{checkboxes.value}</div> : null}
            </div>
          </div>
          <div className='info'>
          <div className='infoName'>
            <div className='name'>정보6</div>
            {checkboxes.map((checkbox) => (
              <label id="check1">
                <input type="checkbox" checked={checkbox.checked} onChange={() => handleCheckboxChange(checkbox.id)} />
                {checkbox.label}
              </label>
            ))}
          </div>  
          </div>
          <div className='line'></div>
          <div className='button'>
            <button onClick={infoSubmit} className='submit'>저장</button>
          </div>
        </div>
      </div>
  );
}

export default App;
