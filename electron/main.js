
import { app, BrowserWindow } from 'electron';
import path from 'path';

import TcpClient from './TcpClient';
import WindowEvent from "./WindowEvent";

const preloadPath = path.join(__dirname, 'preload.js')


// 创建窗口
const createWindow = async () => {
    const win = new BrowserWindow({
        width: 910,
        height: 640,
        minWidth: 700,  // 设置最小宽度
        minHeight: 500,  // 设置最小高度
        autoHideMenuBar: true, // 隐藏默认菜单栏,
        frame: false, // 隐藏默认的标题栏
        // 窗口图标
        icon: path.resolve(app.isPackaged?"resources/":"public/", "images/logo.ico"),
        //渲染进程预设
        webPreferences: {
            // nodeIntegration: true, // 开启在渲染进程中融入node
            // contextIsolation:false, // 关闭上下文隔离
            // enableRemoteModule:true,  // 开启可在渲染进程中直接引入node模块
            sandbox: false, // 开启关闭沙箱模式
            webviewTag:true,  // 开启webview
            preload: preloadPath,
        }
    });

    // 消除electron控制台警告
    process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

    // 加载页面
    if (app.isPackaged) {
        await win.loadFile(path.join(__dirname, "../dist/index.html"));
    } else {
        await win.loadURL(`${process.env['VITE_DEV_SERVER_URL']}`)
    }


    // 加载页面完打开开发者工具
    win.webContents.openDevTools({mode: 'detach'}); // 'left' | 'right' | 'bottom' | 'undocked' | 'detach'

    // 页面加载完成
    win.webContents.on('did-finish-load', () => {
        win.webContents.send('main-process-message', (new Date).toLocaleString())
    })

    //关闭因为css: -webkit-app-region: drag;   引起的默认鼠标右键菜单
    // 可拖拽区域右键菜单被触发时事件
    win.hookWindowMessage(278,function(e){
        win.setEnabled(false);//窗口禁用
        setTimeout(()=>{
            win.setEnabled(true);//窗口启用
        },100); //延时太快会立刻启动，太慢会妨碍窗口其他操作，可自行测试最佳时间
        return true;
    })

    /* 启动tcp客户端 */
    const tcpClient =  new TcpClient(win.webContents)
    tcpClient.start()

    /* window常用事件 */
    new WindowEvent(win)
};



// 应用程序开始运行
app.on('ready', async ()=>{
    // 让electron允许建立不安全的http连接，在建立连接之前，先设置忽略认证异常
    app.commandLine.appendSwitch('ignore-certificate-errors')

    // 创建窗口并加载 Vite 页面
    await createWindow();

    // 当所有窗口都被关闭时
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    });
    // app退出时
    app.on('will-quit', () => {
    });
});



// 在 macOS 上，当应用程序没有窗口时，重新激活该应用程序的行为
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
