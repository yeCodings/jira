import { useState } from "react"
import { LoginScreen } from "./login"
import { RegisterScreen } from "./register"
import { Button, Card, Divider } from "antd"
import styled from "@emotion/styled"
import logo from 'assets/logo.svg'
import left from 'assets/left.svg'
import right from 'assets/right.svg'
import { useDocumentTitle } from "utils"
import { ErrorBox } from "components/lib"

export const UnauthenticateApp = () => {
  const [isRegister, setIsRegister] = useState(false)
  const [error, setError] = useState<Error | null>(null);
  useDocumentTitle('请登录或注册')
  return (
    <Container>
      {/* <Helmet><title>请登录或注册</title></Helmet> */}
      <Header />
      <Background />
      <ShadowCard>
        <Title>
          {!isRegister ? '请登录' : '请注册'}
        </Title>
        <ErrorBox error={error} />
        {!isRegister ? <LoginScreen onError={setError} /> : <RegisterScreen onError={setError} />}
        <Divider />
        <Button type={'link'} onClick={() => setIsRegister(!isRegister)}>{!isRegister ? "没有账号?去注册" : "已有账号？直接登录"}</Button>
      </ShadowCard>
    </Container>
  )
}

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content:center;
align-items: center;
min-height: 100vh;
`

const ShadowCard = styled(Card)`
width: 40rem;
min-height: 56rem;
padding: 3.2rem 4rem;
border-radius: 0.3rem;
box-sizing: border-box;
box-shadow: rgba(0,0,0,0.1) 0 0 10px;
text-align: center;
`

const Background = styled.div`
position: absolute;
width: 100%;
height: 100%;
background-repeat: no-repeat;
background-attachment: fixed;
background-position: left bottom, right bottom;
background-size: 35rem,35rem;
background-image: url(${left}),url(${right});
`

const Header = styled.header`
background: url(${logo}) no-repeat center;
padding: 5rem 0;
background-size: 8rem;
width: 100%;
`
const Title = styled.h2`
margin-bottom: 2.4rem;
color: rgb(94,108,32)
`

export const LongButton = styled(Button)`
width: 100%;
`