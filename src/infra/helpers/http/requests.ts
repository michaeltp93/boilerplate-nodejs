import { Request } from 'express';
import { AuthInfo } from '@sap/xssec';

export interface AuthInfoCustom extends AuthInfo {
	checkLocalScope?(scope: string): boolean;
}

export interface Req<T> extends Request {
	body: T;
	query: Record<string, string>;
	authInfo?: AuthInfoCustom;
	file?: any;
	user?: any;
}
