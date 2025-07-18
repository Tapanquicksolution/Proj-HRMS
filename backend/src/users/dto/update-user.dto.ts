import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
  
  @ApiProperty({ required: false })
  @IsOptional()
  googleId?: string;
  
  @ApiProperty({ required: false })
  @IsOptional()
  microsoftId?: string;
}
