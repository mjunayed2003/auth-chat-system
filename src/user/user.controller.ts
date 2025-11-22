import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "./user.service";

@Controller("profile")
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard("jwt"))
  @Get()
  getProfile(@Req() req) {
    return this.userService.getProfile(req.user);
  }
}
