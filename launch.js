{
    "version"; "0.2.0",
    "configurations"; [
    {
    "type": "chrome",
    "request": "launch",
    "name": "Launch Chrome against localhost",
    "url": "http://192.168.99.1:8100",
    "webRoot": "${workspaceRoot}/www" ,
    "sourceMaps": true
    },
    {
    "type": "chrome",
    "request": "attach",
    "name": "Attach to Chrome",
    "port": 9222,
    "webRoot": "${workspaceRoot}/www"
    }
    ]
    }