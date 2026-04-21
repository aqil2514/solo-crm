import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth2';
import { VerifiedCallback } from 'passport-jwt';
import { UserProfile, GoogleProfile } from 'src/@types/auth';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: `${process.env.GOOGLE_AUTH_CLIENT_ID}`,
      callbackURL: `${process.env.GOOGLE_AUTH_CALLBACK_URL}`,
      clientSecret: `${process.env.GOOGLE_AUTH_CLIENT_SECRET}`,
      scope: ['profile', 'email'],
    });
  }

  validate(
    _access_token: string,
    _refresh_token: string,
    profile: GoogleProfile,
    done: VerifiedCallback,
  ) {
    const { id, name, emails, photos } = profile;
    const user: UserProfile = {
      provider: 'google',
      providerId: id,
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName}`,
      picture: photos[0].value,
    };

    done(null, user);
  }
}
