import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from '../../common/api/http-common';
// import { getToken } from '../../../common/api/JWT-common';
import axios from 'axios';

// const token = getToken()
// createAsyncThunk를 이용한 비동기 처리
// 기록 data 가져오기.
export const getCodeData = createAsyncThunk('GET_CODE_DATA', async (data, { rejectWithValue }) => {
  console.log(DataTransferItemList);
  console.log(data.token,'하하하호호호');
  try {
    const response = await axios.get('http://192.168.100.132:8080/user/history/code/', { 
      headers: {
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2OTE3NDYzNjgsImlhdCI6MTY5MTc0NjM2OCwiZW1haWwiOiJtaW5zdUBzc2FmeS5jb20iLCJuaWNrbmFtZSI6Im1pbnN1In0.69qW0KTqDLyVUx9bldG7DtJC-CC8HX8Qa8T72XcrOsA',
        'Content-Type': 'application/json',
      },
      },
    );
    console.log(response.data,'기록기록');
    console.log(response, '기록 전체');
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response);
  }
});

// 초기값 설정
const initialState = {
  course: {}
};

// 리덕스 슬라이스 생성
const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    resetCodeData: (state) => {
      state.course = [];   
    },
    setCourse: (state, action) => {
      state.course = action.payload;
      console.log(state.course);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCodeData.fulfilled, (state, actions) => {
        state.course = actions.payload[0].courses[0];
        console.log('나 저장 잘 했엉 ',state.course);
      })
      .addCase(getCodeData.rejected, (state)=>{
        state.course = null;
      });
    }
});

export const { resetCodeData, setCourse } = pagesSlice.actions;
export default pagesSlice.reducer;
