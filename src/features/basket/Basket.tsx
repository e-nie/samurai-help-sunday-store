import {FC, useEffect, useState} from 'react';
import {InitialStateType} from "../../app/App";
import styled from "styled-components";

type PropsType = {
    basket: InitialStateType[]
    setBasket: (basket: InitialStateType[]) => void
}

type BasketGroupType = InitialStateType & {
    count: number
}
export const Basket: FC<PropsType> = (props) => {
    const {basket, setBasket} = props
    const [resultBasket, setResultBasket] = useState<BasketGroupType[]>([])

    useEffect(() => {
        const newResultBasket = basket.map(el => ({...el, count: 1}))
        setResultBasket(newResultBasket)
    }, [basket])

    const addCountProduct = (prodId:number) => {
        const newResultBasket = resultBasket.map(el=> el.id === prodId ? {...el, count: el.count + 1} : el)
        setResultBasket(newResultBasket)
    }

    const removeCountProduct = (prodId:number) => {
        const newResultBasket = resultBasket.map(el=> el.id ===prodId ? {...el, count: el.count - 1} : el)
        setResultBasket(newResultBasket)
    }

    const removeBasket = (prodId: number) => {
        const newBasket = basket.filter((el) => el.id !== prodId)
        setBasket(newBasket)
        localStorage.setItem('basket', JSON.stringify(newBasket))
    }

    return (
        <div>
            <h1>Basket</h1>
            {resultBasket.map(prod => {
                return (
                    <div key = {prod.id}>
                        <span>{prod.title}</span>
                        <div>
                            <button onClick = {()=> {removeCountProduct(prod.id)}}>-</button>
                            {prod.count}
                            <button onClick = {()=> {addCountProduct(prod.id)}}>+</button>
                        </div>
                        <button onClick = {()=> removeBasket(prod.id)}>X</button>
                    </div>
                )
            })}
            <p>sumPrice: {resultBasket.reduce((acc, el) => acc + (el.price * el.count), 0)}</p>
        </div>
    );
};

const StBasket = styled.div`
    
    position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background:gray;
  
`
