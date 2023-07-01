
import './inputs.styles.css'

export const TextField =({label, name, value, type, onChange})=>(
    <div className="textFieldContainer">       
        <input id={name} name={name} type={type} onChange={onChange} value={value} placeholder=' '/>
        <label htmlFor={name}>{label}</label>
    </div>
)

export const TextArea = ( {label, name, value,  onChange})=>(
    <div className='textAreaContainer'>
        <textarea id={name} name={name} onChange={onChange} placeholder=' '>{value}</textarea>
        <label htmlFor={name}>{label}</label>
    </div>
)

export const CheckBoxSlider =({label, name, value, onChange})=>{ 
    return(
    <div className='toggleContainer' >        
        <input id={name} name={name} className='toggle' type='checkbox' checked={value} value={value}  onChange={onChange}/>
        <label htmlFor={name}>{label}</label>
    </div>
    )
}
