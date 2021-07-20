export class Product {
	private _id?: string;
	private _name: string;
	private _description: string;
	private _hasStock?: boolean;

	constructor(name: string, description: string, id?: string, hasStock?: boolean) {
		this._name = name;
		this._description = description;
		this._id = id;
		this._hasStock = hasStock || false;
	}

	public get id(): string | undefined {
		return this._id;
	}

	public get name(): string {
		return this._name;
	}

	public get description(): string {
		return this._description;
	}

	public get hasStock(): boolean | undefined {
		return this._hasStock;
	}

	public toJSON(): Record<string, any> {
		return {
			name: this.name,
			description: this.description,
			hasStock: this.hasStock
		};
	}
}
