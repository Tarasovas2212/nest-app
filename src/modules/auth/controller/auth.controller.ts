import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../service/auth.service';
import { Connection, Repository } from 'typeorm';
import { Admin } from '../../admin/model/admin.entity';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserLoginDto } from 'src/modules/admin/entity/admin.entity.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private adminRepository: Repository<Admin>;
  constructor(
    private authService: AuthService,
    private connection: Connection,
  ) {
    this.adminRepository = this.connection.getRepository(Admin);
  }

  @ApiBody({ type: UserLoginDto })
  @ApiOkResponse({ description: 'result Token' })
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @ApiOkResponse({ description: 'result Token' })
  @UseGuards(AuthGuard('jwt'))
  @Post('refresh')
  async refresh(@Request() req) {
    const admin = await this.adminRepository.findOne(req.user.id);
    return this.authService.login(admin);
  }
}
