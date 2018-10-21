# Unity X
This website is mainly for developing and learning various technical aspects. 

#### Table of Contents
- [Installation](#installation)
- [Configuration](#config)
- [Operating the App](#running)

## Installation <a name="installation"></a>
Run the following command to install node packages.
```
npm i
```

## Configuration <a name="config"></a>
### Local
Add the following to `/etc/hosts` for sub-domains:
```
127.0.0.1 example.com
127.0.0.1 rajpatel.example.com
127.0.0.1 jakemaschoff.example.com
127.0.0.1 othersubdomain.example.com
```
### Production
Forwarding port 80 to 8080 and port 443 to 10443.
(Add this commands to `/etc/rc.local`)
```
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 443 -j REDIRECT --to-port 10443
```

## Operating the App <a name="running"></a>

### Local
#### To Start
```
pm2 start config/ecosystem.config.js
```
Once the app is running, visit `localhost:8000`.

Note: If you run into issues regarding "pm2" not being installed, run this command before running the above command.

```
sudo npm i -g pm2
```

#### To stop
```
pm2 stop config/ecosystem.config.js
```

### Production
#### To start in production
```
pm2 start config/ecosystem.config.js --env production
```
#### Deploying the App
You'll need to add an SSH key to the server before you can run any of the following commands.
##### Set up
```
pm2 depoloy config/ecosystem.config.js production setup
```
##### Starting
```
pm2 depoloy config/ecosystem.config.js production
```
##### Update
```
pm2 depoloy config/ecosystem.config.js production update
```




