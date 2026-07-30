const getUserProfile = (userId: string) => console.log();
const getMetrics = (userId: string) => console.log();

type DashboardData = {
	userProfile: { name: string };
	metrics: { visits: number };
};

export async function fetchDashboardData(userId: string): Promise<DashboardData> {
	// ❌ ERRO DE PERFORMANCE (Sequencial / Waterfall):
	// const userProfile = await getUserProfile(userId); // Demora 200ms
	// const metrics = await getMetrics(userId);         // Demora 300ms -> Total: 500ms

	// ✅ ABORDAGEM MODERNA (Paralela e Resiliente):
	const [profileResult, metricsResult] = await Promise.allSettled([getUserProfile(userId), getMetrics(userId)]);

	// Extrai o perfil ou lança exceção crítica caso o perfil falhe
	if (profileResult.status === "rejected") {
		throw new Error(`Falha crítica no perfil: ${profileResult.reason}`);
	}

	// Se métricas falharem, provê um fallback gracioso sem derrubar a tela
	const metrics = metricsResult.status === "fulfilled" ? metricsResult.value : { visits: 0 };

	return {
		userProfile: profileResult.value,
		metrics,
	};
}
