# Node-board

```
Node-board
├── README.md
├── client
├── replication
└── server
```

1.  Client(Read 부분만 구현)

    - 검색, 게시글 목록, 댓글 조회

    ![image](https://user-images.githubusercontent.com/46602874/130917434-7c98a012-a322-46fc-841a-77feda686244.png)

    - 실행 방법

    ```
    $ cd client
    $ npm run start
    ```

2.  Server

    - 구조

    ```
    server
    ├── README.md
    ├── common
    │   ├── database - pool 관련 설정 및 query 실행 부분
    │   ├── error    - errorHandler
    │   └── handler  - middlewares
    ├── config
    │   ├── cache.js    - node-cache
    │   ├── express.js  - express 관련 정보
    │   ├── jwtMiddleware.js    - jwt 토큰
    │   ├── keyfiles    - http2
    │   ├── response
    │   └── winston.js  - logger(사용 X)
    ├── index.js
    ├── package-lock.json
    ├── package.json
    ├── src
    │   ├── Post
    │   └── User
    └── test
        └── test.js     - test code
    ```

    - 실행 방법

    ```
    $ cd server
    $ npm run start

    # test code(mocha)
    $ npm run test
    ```

3.  Replication(docker 사용)

    - 실행 방법

    ```
    $ cd replication
    $ ./build.sh
    ```
