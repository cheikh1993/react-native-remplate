
import { 
    useState,
    useEffect
 } from "React";
const useFetch = (url) => {
const [data, setData] = useState([])
const [loading, setLoading] = useState(false)
const [err, setErr] = useState(false)

const fetchData = async () => {

    setLoading(true)
    try {
        
    } catch (err) {
        setErr(err)
    }
}
}