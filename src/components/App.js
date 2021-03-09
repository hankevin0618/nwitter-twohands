import React, { useEffect, useState } from "react"
import AppRouter from "components/Router";
import { authService } from "myBase"

function App() {
  const [init, setInit] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null)
  useEffect(() => {
    // 로그인 되면 콜함
    authService.onAuthStateChanged((user) => {
      if (user) {
        // setUserObj(user) 오브젝트가 너무 크기때문에 필요한 것만 가져온다
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        })
      }
      setInit(true)

    })
  }, [])
  // 프로필 업데이트 했을때 자동으로 변화가 있게
  // 오브젝트를 작게만드니까 적용이됌
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj(authService.currentUser)
  }

  return (
    <>
      {/* 이곳에서의 데이터를 밑으로 보내고싶을때는 props를 사용 */}
      {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj} /> : "Initialising..."}

      {/* <footer>&copy; {new Date().getFullYear()} Nwitter </footer> */}
    </>
  );
}

export default App;
