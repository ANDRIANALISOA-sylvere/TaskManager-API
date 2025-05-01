import { ProjectService } from 'src/project/project.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ProjectOwnerGuard implements CanActivate {
  constructor(private projectService: ProjectService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.sub;
    const projectId = request.params.id;

    return this.projectService.isProjectOwner(projectId, userId);
  }
}
