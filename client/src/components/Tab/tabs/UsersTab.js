import clsx from 'clsx'
import React from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown, faUser,faTrash, faPen, faPenClip } from '@fortawesome/free-solid-svg-icons'
import ToastMessage from '../../ToastMessage/ToastMessage'
import useFetchData from '../../../hooks/useFetchData'
import UserContext from '../../../contexts/UserContext'

const UsersTabElement = ({id, username, email, role, handleDelete}) => {
    return (
        <tr>
            <td>{id}</td>
            <td>
                <img 
                    src={`https://avatars.dicebear.com/api/bottts/${username}.svg`} 
                    alt={username} 
                    style={{width: '100px'}}/>
            </td>
            <td>{username}</td>
            <td>{email}</td>
            <td>
                <FontAwesomeIcon
                    icon={role === 1 ? faCrown : role === 2 ? faPenClip : faUser}
                    className={clsx('mod', {
                        'mod--admin': role === 1,
                        'mod--user': role === 0,
                        'mod--editor': role === 2
                    })}
                />
            </td>
            <td>
                <div className='mb-3'>
                    <div 
                        className="btn btn-danger mx-3"
                        onClick={() => {
                            if (window.confirm('Are you sure want to destroy this user ?'))
                                handleDelete(id)
                        }}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </div>
                </div>
            </td>
        </tr>
    )
}

const UsersTab = ({selectedTab}) => {
    const {accessToken} = React.useContext(UserContext)
    const {data} = useFetchData('http://localhost:3500/user/getall', accessToken)
    const [users, setUsers] = React.useState([])
    const [deleteMessage, setDeleteMessage] = React.useState('')

    React.useEffect(() => {
        if(data)
            setUsers(data?.users)
    }, [data])

    const handleDelete = async (id) => {
        if (id !== undefined) {
            const config = {
                method: 'delete',
                url: `http://localhost:3500/user/delete/${id}`,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            }
            axios(config)
                .then(() => {
                    let newList = users.filter((user) => user._id !== id)
                    setUsers(newList)
                })
                .catch(error => {
                    setDeleteMessage(error.response?.data?.result)
                })
        }
    }

    // handle remove toast message
    React.useEffect(() => {
        let tid = setTimeout(() => setDeleteMessage(null), 1500)

        return () => {
            clearTimeout(tid)
        }
    }, [deleteMessage])

    return (
        <>
            {deleteMessage && deleteMessage !== '' && 
                <ToastMessage
                    header={deleteMessage === 'success' ? "Success" : "Fail"}
                    body={`Delete account ${deleteMessage}`}
                />
            }
            <div 
                className={clsx('account', {
                    'disappear': selectedTab !== 'Users'
                })}
            >
                <table className="item-table item__account" style={{width: '1200px'}}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Avatar</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Mod</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users && users?.length !== 0 && users?.map((user, i) => (
                            <UsersTabElement
                                key={i}
                                id={user._id}
                                username={user.username}
                                email={user.email}
                                role={user.role}
                                handleDelete={handleDelete}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default UsersTab