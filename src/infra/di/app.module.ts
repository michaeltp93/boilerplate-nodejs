import { registerRepositoryDependencies } from './repository.module';
import { registerUseCase } from './use-case.module';
import { container } from 'tsyringe';

function registerDependencies(): void {
	registerRepositoryDependencies();
	registerUseCase();
}

export { registerDependencies, container };
