
import net from "net"
import {ipcMain} from "electron"

class TcpClient{
    webContents = null

    constructor(webContents) {
        this.webContents = webContents
    }

    start(){
        // 创建一个TCP连接到服务器
        const tcpClient = net.createConnection({
            host:'127.0.0.1',
            port:3000
        });

        // 监听渲染进程消息
        ipcMain.on('toMainMsg', (event, data) => {
            // // 向tcp服务器发送信息
            tcpClient.write(data);
        })

        // 监听服务器发送的数据
        tcpClient.on('data', (data) => {
            this.webContents.send('onAcceptMainMsg', data);
        });

        // 监听服务端关闭连接的事件(执行代码关闭)
            tcpClient.on('end', () => {
                console.log('服务端正常关闭了');
            });

        // 监听服务端关闭连接的事件(非正常执行代码关闭，如强制杀死当前程序)
                tcpClient.on('close', () => {
                    console.log('服务端强制关闭了');
                });

        // 监听服务端错误事件(强制杀死服务端程序时也会执行)
                tcpClient.on('error', (err) => {
                    console.log('服务端出现了异常');
                });
    }
}

export default TcpClient