import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleOauthGuard } from 'src/guards/google-oauth.guard';
import { AuthService } from './services/auth.service';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}
  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async auth() {}

  @Get('callback/google')
  @UseGuards(GoogleOauthGuard)
  async signIn(@Req() req, @Res() res: Response) {
    const token = await this.service.signJwt(req.user);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // Misal: 7 hari
    });

    res.send(`
    <script>
      window.opener.postMessage({ status: 'success' }, '*');
      window.close();
    </script>
  `);
  }
}
