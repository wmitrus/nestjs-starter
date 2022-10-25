import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import {} from 'class-validator';

export abstract class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string | undefined;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string | undefined;
}
