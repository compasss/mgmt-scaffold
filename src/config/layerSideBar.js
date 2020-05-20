/**
 * 菜单配置
 * 一级菜单 parent: null, 二级以下菜单parent: 父菜单的id
 */
export default [
  {
    id: 1,
    title: '菜单1',
    icon: 'iconfont eye-dashboard',
    path: '/order-list',
    parent: null,
    sub: 1,
    roles: ['path1']
  },
  {
    id: 2,
    title: '菜单2',
    icon: 'iconfont eye-doctor',
    path: '/path2',
    parent: null,
    roles: ['path1', 'path3']
  },
  {
    id: 3,
    title: '菜单2-1',
    path: '/path2-1',
    parent: 2,
    roles: ['path6']
  },{
    id: 4,
    title: '菜单2-2',
    path: '/path2-2',
    parent: 2,
    roles: ['path3']
  }
]
