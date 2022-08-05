import React from 'react'
import TabHeader from './TabHeader'
import TabBody from './TabBody'
import './Tab.css'

const Tab = ({ id, tabNames, role }) => {
    const [selectedTab, setSelectedTab] = React.useState(tabNames.length === 3 ? 'Description' : 'Profile')

    return (
        <div className='tab grid'>
            <TabHeader
                tabNames={tabNames}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
            />  
            {
                role === 'admin' ?
                <TabBody
                    role={role}
                    selectedTab={selectedTab}
                /> :
                role === 'editor' ?
                <TabBody 
                    role={role}
                    selectedTab={selectedTab}
                /> :
                role === 'customer' ?
                <TabBody 
                    role={role}
                    selectedTab={selectedTab}
                /> :
                <TabBody
                    id={id}
                    isProduct
                    selectedTab={selectedTab}
                />
            }
        </div>
    )
}

export default Tab