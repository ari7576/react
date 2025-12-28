import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: 'counter',
    initialState: 0, // 숫자 상태 그대로 유지 가능
    reducers: {
        increase: (state) => state + 1,
        decrease: (state) => state - 1,
    },
});

// 액션과 리듀서 내보내기
export const { increase, decrease } = counterSlice.actions;
export default counterSlice.reducer;