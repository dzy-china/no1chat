
import  { contextBridge ,ipcRenderer}   from 'electron'

// 暴露给渲染进程的数据，通过：window.main获取
contextBridge.exposeInMainWorld('electronAPI',{
    // 暴露ipc渲染进程
    ipcRenderer: ipcRenderer,
    // 监听主进程发送的消息
    onAcceptMainMsg: (callback) => ipcRenderer.on('onAcceptMainMsg', callback),
})