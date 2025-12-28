import {useParams, Link} from 'react-router-dom'

const Article = () => {
    const {id} = useParams();
    return(
        <div>
            <h2>{id}{id}{id}{id}게시글{id}</h2>
            <Link to ="/articles">게시글 목록</Link>
        </div>
    )
}

export default Article