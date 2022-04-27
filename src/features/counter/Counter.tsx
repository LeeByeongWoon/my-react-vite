import React from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { decreament, fetchIncreament, increament, increamentByAmount } from "./CounterSlice";
type Props = {};

const BtnWrap = styled.div``;
const Container = styled.div`
    display: flex;
    flex-flow: column;
    justify-content: center;
`;
export default function Counter({}: Props) {
    const count = useAppSelector((state) => state.counter.value);
    const dispatch = useAppDispatch();
    return (
        <Container>
            <span>{count}</span>
            <BtnWrap>
                <button onClick={() => dispatch(increament())}>+</button>
                <button onClick={() => dispatch(fetchIncreament(count))}>fetch</button>
                <button onClick={() => dispatch(decreament())}>-</button>
                <button onClick={() => dispatch(increamentByAmount(5))}>+5</button>
            </BtnWrap>
        </Container>
    );
}
