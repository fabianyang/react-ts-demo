import * as React from 'react'
// import classnames from 'classnames'
import { observer, inject } from 'mobx-react'
import { Layout, Icon, Switch } from 'antd'

import * as styles from './index.module.scss'
import SiderMenu from './Menu'

interface IStoreProps {
    sideBarCollapsed?: boolean
    sideBarTheme?: IGlobalStore.SideBarTheme
    changeSiderTheme?: (theme: IGlobalStore.SideBarTheme) => void
    routerStore?: RouterStore
}

@inject(
    (store: IStore): IStoreProps => {
        const { routerStore, globalStore } = store
        const { sideBarCollapsed, sideBarTheme, changeSiderTheme } = globalStore
        return {
            routerStore,
            sideBarCollapsed,
            sideBarTheme,
            changeSiderTheme
        }
    }
)
@observer
class Sider extends React.Component<IStoreProps> {
    handleThemeChange = (e: boolean) => {
        const props = this.props;
        if (props.changeSiderTheme) {
            props.changeSiderTheme(e ? 'dark' : 'light')
        }
    }

    render() {
        const { sideBarCollapsed, sideBarTheme } = this.props
        const ChangeTheme = (
            <div className={styles.changeTheme}>
                Switch Theme
                <Switch
                    checkedChildren="dark"
                    unCheckedChildren="light"
                    checked={sideBarTheme === 'dark'}
                    onChange={this.handleThemeChange}
                />
            </div>
        )
        return (
            <Layout.Sider
                className={styles.sider}
                trigger={null}
                theme={sideBarTheme}
                collapsible
                collapsed={sideBarCollapsed}
            >
                <div className={styles.logoBox}>
                    <Icon type="ant-design" />
                </div>
                <SiderMenu />
                {!sideBarCollapsed && ChangeTheme}
            </Layout.Sider>
        )
    }
}

export default Sider
