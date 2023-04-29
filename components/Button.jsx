

export default function Button(props){
    return <button onClick={props.onClick} className="bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full">
        {props.label}
    </button>
}