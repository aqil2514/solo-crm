import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleOauthGuard } from 'src/guards/google-oauth.guard';

@Controller('auth')
export class AuthController {
  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async auth() {}

  @Get('callback/google')
  @UseGuards(GoogleOauthGuard)
  async signIn(@Req() req, @Res() res: Response) {
    console.log(req.user);
  }
}
