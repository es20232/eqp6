import './TextField.css'
const TextField = (props) => {
    return(
        <div className="text-field">
            <label>{props.label}</label>
            <input value={props.value} onChange={event => props.onChange(event.target.value)} placeholder={props.placeholder} type={props.type} />
        </div>
    )
}

export default TextField;