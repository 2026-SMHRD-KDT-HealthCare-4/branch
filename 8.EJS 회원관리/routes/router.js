const express = require("express");
const router = express.Router();


// 가상의 DB공간을 생성(임시)
let user = [];

//1. 사용자에게 메인페이지 만들어주기
router.get("/",(req,res)=>{
    let id = req.query.id;
    res.render("main",{id : id});
})

//2. 사용자가 보낸 join에 대한 응답 만들어주기
router.get("/join",(req,res)=>{
    res.render("join");
})

//3. 사용자가 보낸 id,pw를 저장하는 코드를 작성 -> 실질적인 회원가입 로직을 담당
router.post("/join",(req,res)=>{
    // 1. 넘겨받은 id,pw 받아오기
    let {id,pw} = req.body;
    console.log(id,pw);
    // 2. DB에 id, pw 저장 -> 배열에 넘겨받은 데이터를 저장(임시방편)
    user.push(req.body);
    console.log("회원정보",user);
    // 3. 가입완료 -> 메인페이지 / 가입실패 -> 회원가입실패(알림), 회원가입페이지 보여주기
    if(user.length > 0){
        res.redirect("/");
    }else{
        // send함수는 보통 서버에서 클라이언트에게 <script>코드를 넘겨서 클라이언트가 코드를 
        // 실행할 수 있게 코드를 보내줄때 사용한다.
        res.send("<script>alert('회원가입 실패'); location.href = '/join' </script>")
    }
})

// 4. 로그인 페이지 구현 코드
router.get("/login",(req,res)=>{
    res.render("login");
});

//5. 실질적인 로그인 기능 구현하는 코드
router.post("/login",(req,res)=>{
    //1. 보낸 데이터를 받아주기
    const {id,pw} = req.body;
    console.log(id,pw);
    //2. DB에있는 회원정보와 값을 비교 -> 배열과 비교
    for(let i = 0; i < user.length; i++){
        if(user[i].id == id && user[i].pw == pw ){
            res.redirect(`/?id=${id}`);
            return;
        }
    }
  
     //3. 로그인 성공 -> 메인페이지 / 로그인 실패 -> 실패알림, 로그인페이지 재이동
    res.send("<script>alert('로그인 실패'); location.href = '/login' </script>");
})

//6. 전체회원조회 제작
router.get("/list",(req,res)=>{
    res.render("list",{user : user});
})

module.exports = router;

