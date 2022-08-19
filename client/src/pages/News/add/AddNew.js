import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import swal from 'sweetalert'
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import Embed from '@editorjs/embed'
import ImageTool from '@editorjs/image'
import UserContext from '../../../contexts/UserContext'
import './AddNew.css'

const AddNew = () => {
    const { login, accessToken } = React.useContext(UserContext)
    const [editor, setEditor] = React.useState(new EditorJS({
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
    }))
    let navigate = useNavigate()

    React.useEffect(() => {
        if (!login) {
            navigate('/')
        }
    }, [])

    const handleAddNew = (outputData) => {
        let data = JSON.stringify(outputData)
        const config = {
            method: 'post',
            url: 'http://localhost:3500/post/create',
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
                    text: "A new post has been create",
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
                handleAddNew(outputData)
            })
            .catch(error => {
                console.log("Saving error")
            })
    }

    return (
        <div className='content add-news'>
            <div id='postEditorjs'></div>
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

export default AddNew