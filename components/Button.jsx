

export default function Button({onClick,label}){
    return <button onClick={onClick} className="bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full">
        {label}
    </button>
}