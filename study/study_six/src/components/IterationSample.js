import {useState} from 'react'

const IterationSample = () => {

    const [names, setNames] = useState([
        {id: 1, text: '눈사람'},
        {id: 2, text: '얼음'},
        {id: 3, text: '눈'},
        {id: 4, text: '바람'},
    ])
    const [inputText, setInputText] = useState('')
    const [inputDeleteText, setInputDeleteText] = useState('')
    const [nextId, setNextId] = useState(5);

    const onChange = e => setInputText(e.target.value)
    const onDeleteChange = e => setInputDeleteText(e.target.value)
    const onClick = () => {
        const nextNames = names.concat({
            id:nextId,
            text:inputText,
        })
        setNextId(nextId + 1)
        setNames(nextNames)
        setInputText('')
    }
    const onDeleteClick = () => {
        const DeleteNames = names.filter(names => names.text !== inputDeleteText)
        setNextId(nextId - 1)
        setNames(DeleteNames)
        setInputText('')
    }

    const nameList = names.map((names) => <li key = {names.id}>{names.text}</li>);

    return(
        <ul>
            <input value={inputText} onChange={onChange}></input>
            <button onClick={onClick}>입력</button>
            {nameList}
            <input value = {inputDeleteText} onChange ={onDeleteChange}></input>
            <button onClick={onDeleteClick}>삭제</button>
        </ul>
    )
}

export default IterationSample;