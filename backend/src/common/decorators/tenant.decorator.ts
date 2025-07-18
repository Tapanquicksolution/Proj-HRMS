import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const TenantDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.tenantId;
  },
);
