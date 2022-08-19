import React from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router'
import swal from 'sweetalert'
import EditorJS from '@editorjs/editorjs'
import List from '@editorjs/list'
import Embed from '@editorjs/embed'
import ImageTool from '@editorjs/image'
import Header from '@editorjs/header'
import UserContext from '../../../contexts/UserContext'
import useFetchData from '../../../hooks/useFetchData'
import './EditNew.css'

const EditNew = () => {
    const { id } = useParams()
    const { login, accessToken } = React.useContext(UserContext)
    const {data} = useFetchData(`http://localhost:3500/post/${id}`)
    const [postExist, setPostExist] = React.useState(false)
    const [editor, setEditor] = React.useState(null)
    let navigate = useNavigate()

    React.useEffect(() => {
        if (!login || !id) {
            navigate('/')
        }
    }, [])

    React.useEffect(() => {
        let date = new Date(data?.post?.time)
        const content = {
            time: date.getTime(),
            version: data?.post?.version,
            blocks: data?.post?.blocks
        }
        setEditor(new EditorJS({
            holder: 'postEditorjs',
            tools: {
                header: Header,
                list: {
                    class: List,
                    inlineToolbar: true,
                    config: {
                        defaultStyle: 'unordered'
                    }
                },
                image: {
                    class: ImageTool,
                    config: {
                        endpoints: {
                            byFile: 'http://localhost:3500/post/upload', // Your backend file uploader endpoint
                            byUrl: 'http://localhost:3500/post/upload', // Your endpoint that provides uploading by Url
                        }
                    }
                },
                embed: Embed,
            },
            placeholder: 'Write you post here!',
            data: content
        }))
        setPostExist(true)
    }, [data])

    const handleUpdatePost = (outputData, id) => {
        let data = JSON.stringify({ 
            id: id,
            version: outputData?.version,
            blocks: outputData?.blocks
        })
        const config = {
            method: 'put',
            url: `http://localhost:3500/post/edit`,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            data : data
        }
        axios(config)
            .then(() => {
                swal({
                    title: "Congratulations",
                    text: "A new post has been updated",
                    icon: "success",
                })
            })
            .catch(() => {
                swal({
                    title: "Error",
                    text: "Something wrong happened",
                    icon: "error",
                })
            })
    }

    const handleSubmitPost = () => {
        editor.save()
            .then(outputData => {
                handleUpdatePost(outputData, id)
            })
            .catch(error => {
                console.log("Saving error")
            })
    }

    return (
        <div className='content edit-news'>
            <div id='postEditorjs'></div>
            {!postExist && <p className='text-muted fs-4 d-flex justify-content-center pt-4'>No news founded</p>}
            <div className="d-flex justify-content-center">
                <button 
                    className="submit-post button__submit btn"
                    onClick={handleSubmitPost}
                >
                    Submit
                </button>   
            </div>
        </div>
    )
}

export default EditNew