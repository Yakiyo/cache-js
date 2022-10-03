type v<T> = {
	data: T;
	createdAt: Date;
	duration: number;
};

/**
 * The base cache class
 */
class Cache<K, V> extends Map<K, v<V>> {
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
	 * @param {number} [duration] Default duration for entries
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
	 * @param {K} key Key of the entry to check
	 * @returns {*}  {boolean}
	 * @memberof Cache
	 */
	public valid(key: K): boolean {
		if (!key) throw new TypeError('Argument key is required');
		const val = this.get(key);
		if (!val) return false;
		if (val.duration === 0) return false;
		return (
			Math.abs((new Date().getTime() - val.createdAt.getTime()) / 1000) <
			val.duration
		);
	}
	/**
	 * Add's a new entry to the cache
	 *
	 * @param {K} key entry key
	 * @param {V} value entry value
	 * @param {number} [duration] duration to remain valid, else uses default duration
	 * @returns {*}  {(V | undefined)}
	 * @memberof Cache
	 */

	public add(key: K, value: V, duration?: number): this {
		if (!key || !value)
			throw new TypeError('Arguments keys and values are required');
		if (duration && typeof duration !== 'number')
			throw new TypeError('Argument duration must be a number');
		this.set(key, {
			data: value,
			createdAt: new Date(),
			duration: duration || this.duration,
		});
		return this;
	}
	/**
	 * Fetches a value from the cache. If expired returns undefined
	 *
	 * @param {K} key Entry key
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
	 * @param {K} key Entry key
	 * @memberof Cache
	 */
	public remove(key: K): this {
		this.delete(key);
		return this;
	}
	/**
	 * Adds multiple entries to the cache
	 *
	 * @param {...Array<[K, V]>} entries an Array of arrays, where first element of array is the key and second is the value
	 * @returns {*}  {this}
	 * @memberof Cache
	 */
	public addMany(...entries: Array<[K, V]>): this {
		entries.forEach((entry) => {
			this.add(entry[0], entry[1]);
		});
		return this;
	}
	/**
	 * Clears all expired values in the cache
	 * and returns number of removed entries
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

export = Cache;
