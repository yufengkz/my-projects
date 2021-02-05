ssh root@10.211.55.4
passwd: yufeng

Jenkins: http://10.211.55.4:8880/   账号：admin/admin

RabbitMQ: web: http://10.211.55.4:15672/#/   serve: http://10.211.55.4:5672     admin/admin  

mysql:
账号：root/yufeng
update mysql.user set authentication_string=PASSWORD('yufeng') where User='root';
账号：sonar:/yufeng

sonar启动：admin: **d14569c554ee879a06e545a1ab50a10a3879f27d **   sonar:bc9cd7244d3f62de596cb8cb3fd74df1519135b3

c7381d75709b0fe14ebf3a19c7bb90be85994de9

```
cd /usr/local/sonarqube-7.7/
//以普通用户sonar启动服务，不然es启动会报错，用法：console、start、status、stop...
su sonar bin/linux-x86-64/sonar.sh start
//查看状态，但这个状态只是暂时的，并不可信
su sonar bin/linux-x86-64/sonar.sh status
//跟踪日志，确保启动成功(先跟着sonar.log日志，如果报es错误，可以去查看es.log；如果报了web错误，那么就是查看web.log)
tail -f logs/sonar.log
//sonar文件夹中扫描代码：
sonar-scanner
```



启动mysql
systemctl start mysqld.service
停止mysql
systemctl stop mysqld.service
设置开机自启动
systemctl enable mysqld.service
重启mysql
systemctl restart mysqld.service



jenkins: https://blog.51cto.com/13760351/2382464

Jenkins项目流水线配置：https://blog.51cto.com/13760351/2382464  https://blog.csdn.net/wangooo/article/details/109208813 参考

```
node {
    stage('拉取代码'){
        echo "......SVN拉取代码......"
        checkout([$class: 'SubversionSCM', additionalCredentials: [], excludedCommitMessages: '', excludedRegions: '', excludedRevprop: '', excludedUsers: '', filterChangelog: false, ignoreDirPropChanges: false, includedRegions: '', locations: [[cancelProcessOnExternalsFail: true, credentialsId: 'b4f83ac6-a86b-4e28-82cc-053d8e314ebe', depthOption: 'infinity', ignoreExternalsOption: true, local: '.', remote: 'http://192.168.89.31/subversion/dingdang/mobile/HTML5/ddky-epidemic']], quietOperation: true, workspaceUpdater: [$class: 'UpdateUpdater']])
       
    }
    
    stage('代码扫描') {
        withSonarQubeEnv('SonarQube') {
            //注意这里withSonarQubeEnv()中的参数要与之前SonarQube servers中Name的配置相同
            echo "......SonarQube开始扫描......"
    
            sh '/usr/local/sonar-scanner/bin/sonar-scanner -Dproject.settings=./${project_module}/sonar-project.properties'
        }
    }
        
    stage('代码编译') {
        // configId 即为之前配置的npm配置文件
        nodejs(nodeJSInstallationName: 'node12', configId: '79fd5dde-330f-4179-b5b9-e7065f5decd6') {
            // npm 编译安装
            echo "......项目开始安装依赖、编译......"
            sh 'node -v && npm -v'
            sh 'npm install && npm run build-prod'
        }
    }   
    
    stage('发布代码') {
        sshPublisher(publishers: [sshPublisherDesc(configName: "ddky prem", transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '/export/html/chuxing', remoteDirectorySDF: false, removePrefix: 'dist-production', sourceFiles: 'dist-production/**')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
    }
}
```







http://192.168.89.31/subversion/dingdang/mobile/HTML5/

提交本地修改：
git commit
git svn dcommit

更新svn分支改动：
git svn rebase

创建svn分支：
git svn branch -m “message” BRANCH_NAME

更新svn信息：
git svn fetch

合并svn分支
git checkout master
git merge –squash GIT_BRANCH_NAME
git commit
git svn dcommit





============


nvm查看所有node版本：
nvm ls-remote  
nvm off                     //禁用node.js版本管理(不卸载任何东西)
nvm on                      //启用node.js版本管理
nvm install <version>       //安装指定版本node,例如nvm install 12.18.3
nvm uninstall <version>     //卸载指定版本node,例如nvm uninstall 12.18.3 
nvm list                    //显示所有安装的node.js版本
nvm list available          //显示可以安装的所有node.js的版本(windows系统)
nvm use <version>           //切换到使用指定的nodejs版本，例如nvm use 12.18.3









Jenkins:

npm名称：MyNpmrcConfig

npm id：79fd5dde-330f-4179-b5b9-e7065f5decd6

stage('deploy') {
        sshPublisher(publishers: [sshPublisherDesc(configName: "${server_name}", transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: '', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '/usr/local/nginx/html', remoteDirectorySDF: false, removePrefix: 'dist', sourceFiles: 'dist/**')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
    }

    node {
    		env.NODEJS_HOME = "/root/nvm/versions/node/v14.15.4/bin/node"
    		env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
        def developer_mail='65370392@qq.com'
        
    stage('拉取代码'){
        // steps {
        //     # echo env.version
        //     # echo 'pull code '
        //      }
        checkout([$class: 'SubversionSCM', additionalCredentials: [], excludedCommitMessages: '', excludedRegions: '', excludedRevprop: '', excludedUsers: '', filterChangelog: false, ignoreDirPropChanges: false, includedRegions: '', locations: [[cancelProcessOnExternalsFail: true, credentialsId: 'b4f83ac6-a86b-4e28-82cc-053d8e314ebe', depthOption: 'infinity', ignoreExternalsOption: true, local: '.', remote: 'http://192.168.89.31/subversion/dingdang/mobile/HTML5/partners/thirdPublic']], quietOperation: true, workspaceUpdater: [$class: 'UpdateUpdater']])
       
    }
    
    stage('SonarQube Scan') {
        withSonarQubeEnv('SonarQube') {
            //注意这里withSonarQubeEnv()中的参数要与之前SonarQube servers中Name的配置相同
            echo "SonarQube开始扫描......"
    
            sh '/usr/local/sonar-scanner/bin/sonar-scanner -Dproject.settings=./${project_module}/sonar-project.properties'
        }
        // script {
        //     timeout(10) {
        //         //这里设置超时时间1分钟，如果Sonar Webhook失败，不会出现一直卡在检查状态
        //         //利用Sonar webhook功能通知pipeline代码检测结果，未通过质量阈，pipeline将会fail
        //         def qg = waitForQualityGate()
        //         sh 'echo qg'
        //         //注意：这里waitForQualityGate()中的参数也要与之前SonarQube servers中Name的配置相同
        //         if (qg.status != 'OK') {
        //             error "未通过Sonarqube的代码质量阈检查，请及时修改！failure: ${qg.status}"
        //         }
        //     }
        // }
    }
    
    stage('Code Compile Package') {
        sh 'echo "--------------------------- Start install && build ---------------------------"'
       // sh 'yarn --version'
       // sh 'yarn config list'
       // sh 'yarn config delete proxy'
       // sh 'npm config rm proxy'
    //     sh 'npm config rm https-proxy'
    //     sh 'yarn config set registry https://registry.npm.taobao.org'
    
       // sh 'yarn config get registry'
        sh 'yarn install && yarn run dev'
        try {
            sh 'yarn --version'
        } catch (err){
            sh 'echo ${err}'
        }
       }
    }
