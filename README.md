## 某公司人事管理系统
<!-- 本地准备 -->
1. 电脑要安装node.js及npm
2. 安装淘宝镜像（速度会快一些）
   npm install cnpm -g --registry=https://registry.npm.taobao.org
3. 安装全局vue-cli
   npm install --global vue-cli
4. 查看vue是否安装成功，注意参数是大V
    vue -V
5. 进入persinnel-management文件夹，在当前文件夹打开命令提示符（控制台cmd）。
6. 在cmd输入cnpm install等待安装配置文件。
7. 在persinnel-management文件夹下，运行 npm run serve
8. 等待服务器启动。
9. 打开chrome浏览器输入http://localhost:8080 进入系统。
10. 暂存两类用户：
       科长：用户名：admin  密码：admin
       科员：用户名：fyx   密码：123456
<!-- 打包部署 -->
1. 打包命令：npm run build
2. 成功之后会在项目路径生成名为dist的文件夹
3. 把dist复制到服务器的/var/www/html/soft目录下,命令:
scp -r E://S/Desktop/dist/lib/staff-manage-1.0-SNAPSHOT.jar root@120.26.185.241:/usr/local/staff-manage/lib