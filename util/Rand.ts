class Rand {
	public static rand(min, max):number {
		return min + Math.round(Math.random() * (max - min));
	}
}