import { useState } from "react"
import { LoginScreen } from "./login"
import { RegisterScreen } from "./register"
import { Button, Card } from "antd"

export const UnauthenticateApp = () => {
  const [isRegister, setIsRegister] = useState(false)
  return (
    <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center' }}>
      <Card>
        {isRegister ? <LoginScreen /> : <RegisterScreen />}
        <Button onClick={() => setIsRegister(!isRegister)}>切换到{isRegister ? "注册" : "登录"}</Button>
      </Card>
    </div>
  )
}