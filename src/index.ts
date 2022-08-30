type v<T> = {
	data: T;
	createdAt: Date;
};

/**
 * The base cache class
 */
export class Cache<K, V> extends Map<K, v<V>> {
	/**
	 * The amount of time cache entries should be valid
	 * in seconds
	 *
	 * @private
	 * @type {number}
	 * @memberof Cache
	 */
	private readonly duration: number = 0;
	/**
	 * Creates an instance of Cache.
	 * @param {number} [duration]
	 * @memberof Cache
	 */
	constructor(duration?: number) {
		super();
		if (duration) {
			if (typeof duration !== 'number')
				throw new TypeError('Argument time must be a number');
			this.duration = duration;
		}
	}
	/**
	 * Check's if a entry is valid or expired
	 * Always returns true if duration set to 0
	 * @param {K} key
	 * @returns {*}  {boolean}
	 * @memberof Cache
	 */
	public valid(key: K): boolean {
		if (!key) throw new TypeError('Argument key is required');
		if (this.duration === 0) return true;
		const val = this.get(key);
		if (!val) return false;
		return (
			Math.abs((val.createdAt.getTime() - new Date().getTime()) / 1000) <
			this.duration
		);
	}
	/**
	 * Add's a new entry to the cache
	 *
	 * @param {K} key
	 * @param {V} value
	 * @returns {*}  {(V | undefined)}
	 * @memberof Cache
	 */
	public add(key: K, value: V): V | undefined {
		if (!key || !value)
			throw new TypeError('Arguments keys and values are required');
		this.set(key, {
			data: value,
			createdAt: new Date(),
		});
		return this.get(key)?.data;
	}
	/**
	 * Fetches a value from the cache. If expired returns undefined
	 *
	 * @param {K} key
	 * @returns {*}  {(V | undefined)}
	 * @memberof Cache
	 */
	public fetch(key: K): V | undefined {
		if (!key) throw new TypeError('Argument key is required');
		if (this.get(key) && this.valid(key)) {
			return this.get(key)?.data;
		} else {
			this.delete(key);
			return undefined;
		}
	}
	/**
	 * Removes a entry from the cache
	 *
	 * @param {K} key
	 * @memberof Cache
	 */
	public remove(key: K): void {
		this.delete(key);
	}
	/**
	 * Clears all expired values in the cache
	 *
	 * @returns {*}  {number}
	 * @memberof Cache
	 */
	public sweep(): number {
		const oldSize = this.size;
		for (const [k] of this) {
			if (!this.valid(k)) this.delete(k);
		}
		return oldSize - this.size;
	}
	/**
	 * Returns an array with all the values of the cache
	 *
	 * @returns {*}  {Array<V>}
	 * @memberof Cache
	 */
	public toArray(): Array<V> {
		return [...this.values()].map((val) => val.data);
	}
	/**
	 * Returns a map of all the entries excluding the date object
	 *
	 * @returns {*}  {Map<K, V>}
	 * @memberof Cache
	 */
	public toMap(): Map<K, V> {
		const map = new Map();
		this.forEach((v, k) => {
			map.set(k, v.data);
		});
		return map;
	}
}

export default Cache;
