import * as React from 'react'
import { Avatar, Button } from 'antd'

import * as styles from './style.module.scss'

const AVATAR_URL = 'https://avatars3.githubusercontent.com/u/6183232?s=40&v=4'

function Dashboard() {
    const [avatars, setAvatars] = React.useState([AVATAR_URL])
    function addAvatar() {
        const newAvatars = [...avatars, `${AVATAR_URL}&t=${Date.now()}`]
        setAvatars(newAvatars)
    }
    React.useEffect(() => {
        const title = avatars.length > 1 ? `${avatars.length} avatars!` : 'oosh!'
        document.title = title
    })
    return (
        <div className={styles.dashboard}>
            <div className={styles.avatarsContainer}>
                <Button type="primary" onClick={addAvatar}>
                    add
                </Button>
                <div className={styles.avatars}>
                    {avatars.map(a => (
                        <Avatar style={{ marginLeft: 10 }} key={a} src={a} />
                    ))}
                </div>
                <h1>券&策略管理/券管理</h1>
            </div>
        </div>
    )
}

export default Dashboard
