import React, { useEffect, useState } from 'react'
import { LogoutOutlined, HomeOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { profileImage } from '../../../utils/constant'

export default function UserDetails() {
    const [username, setUsername] = useState('User')

    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear()
        navigate('/login')
    }

    useEffect(() => {
        const username = localStorage.getItem('username')
        if (username)
            setUsername(username)
    }, [])

    return (
        <div className='user-details-container'>
            <div className='user-details-container_header'>
                Hello {username}
            </div>
            <div className='user-details-container_image'>
                <img src={profileImage} alt="profile" />
                <div style={{display: 'flex', gap: '1rem'}}>
                    <Button onClick={() => navigate('/')} type='primary' icon={<HomeOutlined />} />
                    <Button type="primary" shape="circle" icon={<LogoutOutlined />} size={'Large'} onClick={() => logout()} />
                </div>
            </div>
        </div>
    )
}
