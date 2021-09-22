# Express

## Express 获取 GET 和 POST 请求的参数

### 1. GET

`query`

```js
app.get('/info', (req, res) => {
    console.log(req.query)
})
```

### 2. POST

`app.use(express.json())`

`body`

```js
// 加上这一行 req.body 才有值
app.use(express.json())

app.post('/login', (req, res) => {
    console.log(req.body)
})
```

