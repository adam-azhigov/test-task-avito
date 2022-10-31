import React, {useEffect,} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getCommentNews, getNewsCurrent} from "../redux/features/newsCurrent";
import moment from "moment";
import Comments from "./Comments";
import {RiDownloadFill,} from "react-icons/ri";

function NewsCurrent() {
    const useParamsId = useParams();
    const id = useParamsId.id

    const dispatch = useDispatch()

    const news = useSelector(state => state.commentsNews.item);
    const comments = useSelector(state => state.commentsNews.comments)
    const loading = useSelector(state => state.commentsNews.loading)

    // const [open, setOpen] = useState(false);
    // const [kidsComments, setKidsComments] = useState([]);
    //
    // const mapComments = comments.map( item => item)?.map(item => {
    //     return fetch(`https://hacker-news.firebaseio.com/v0/item/${item?.kids}.json`).then(
    //         response => response.json())
    // })



    // const getCommentsKids = async () => {
    //     const mapComments = comments.map( item => item)?.map(item => {
    //         return fetch(`https://hacker-news.firebaseio.com/v0/item/${item?.kids}.json`).then(
    //             response => response.json())
    //     })
    //     setKidsComments(mapComments);
    //     setOpen(true);
    // }

    useEffect(() => {
        dispatch(getCommentNews(id))
    },[]);

    useEffect(() => {
        dispatch(getNewsCurrent(id))
    },[]);

    const updateComments = () => dispatch(getCommentNews(id))

    useEffect( () => {
        updateComments()
    },[])


    return (
        <div className='mx-auto w-2/3 mt-8 bg-gray-200 h-screen rounded-md '>
            <div className='p-10'>
                <p className='text-2xl'> {news.title} </p>
                <div>
                    <span>{'дата: '}{moment(news.time,'X').format('lll')}</span>
                    <span className='ml-2'>{news.by}</span>
                    <span className='ml-2'>{'комментарии: '}{news.descendants}</span>
                </div>
                <a href={news.url} className='border-t-4'>
                    ссылка на новость
                </a>
            </div>
            <div>
                {
                    news.descendants > 0 ? <button   onClick={updateComments} className="px-5 py-2 ml-10 bg-gray-700 text-white rounded shadow-xl">
                        Обновить
                    </button> : null
                }
                {
                    loading ? <svg className="animate-bounce w-20 h-20 mx-auto text-3xl mt-20">
                        <RiDownloadFill />
                    </svg> : (
                        comments.map(comment => {
                        return    < Comments  comm={comment} key={comment.id}/>
                        })
                    )
                }
            </div>

        </div>
    );
}

export default NewsCurrent;