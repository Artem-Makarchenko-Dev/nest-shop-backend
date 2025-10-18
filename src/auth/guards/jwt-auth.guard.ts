import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err || !user) {
      this.logger.warn(
        `Unauthorized access attempt. Reason: ${info?.message || err?.message || 'Unknown'}`,
      );
      throw new UnauthorizedException('Invalid token or user is not authorized');
    }

    if (user.isActive === false) {
      this.logger.warn(`User ${user.email} is deactivated and cannot access the system`);
      throw new ForbiddenException('Your account is deactivated');
    }

    return user;
  }
}