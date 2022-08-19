import React from 'react'
import { useParams } from 'react-router'
import EditorJS from '@editorjs/editorjs'
import List from '@editorjs/list'
import Embed from '@editorjs/embed'
import ImageTool from '@editorjs/image'
import Header from '@editorjs/header'
import useFetchData from '../../../hooks/useFetchData'
import './NewDetail.css'

const NewDetail = () => {
    const { id } = useParams()
    const { data } = useFetchData(`http://localhost:3500/post/${id}`)
    const [postExist, setPostExist] = React.useState()

    React.useEffect(() => {
        if (data && data?.result === 'failed') {
            setPostExist(false)
        }
        else if (data) {
            let date = new Date(data?.post?.time)
            const content = {
                time: date.getTime(),
                version: data?.post?.version,
                blocks: data?.post?.blocks
            }
            const editor = new EditorJS({
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
                    embed: Embed,
                    image: {
                        class: ImageTool,
                        config: {
                            endpoints: {
                                byFile: 'http://localhost:3500/post/upload', // Your backend file uploader endpoint
                                byUrl: 'http://localhost:3500/post/upload', // Your endpoint that provides uploading by Url
                            }
                        }
                    },
                },
                data: content,
                readOnly: true
            })
            setPostExist(true)
        }
    }, [data])

    return (
        <div className='content new-detail grid'>
            <div id='postEditorjs'></div>
            {!postExist && <p className='text-muted fs-4 d-flex justify-content-center pt-4'>No news founded</p>}
        </div>
    )
}

export default NewDetail