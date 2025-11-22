import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Controller("auth")
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post("register")
  register(@Body() payload: RegisterDto) {
    return this.auth.register(payload);
  }

  @Post("login")
  login(@Body() payload: LoginDto) {
    return this.auth.login(payload);
  }
}
