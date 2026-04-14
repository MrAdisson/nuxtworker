<script setup lang="ts">
definePageMeta({
  layout: 'default',
  middleware: 'auth',
});

const { user } = useUserSession();

// Données d'exemple pour le dashboard
const stats = [
  {
    label: 'Total Visits',
    value: '1,234',
    icon: 'i-lucide-eye',
    trend: '+12.5%',
    trendUp: true,
  },
  {
    label: 'Active Sessions',
    value: '24',
    icon: 'i-lucide-users',
    trend: '+3.2%',
    trendUp: true,
  },
  {
    label: 'API Calls',
    value: '8,456',
    icon: 'i-lucide-zap',
    trend: '-2.4%',
    trendUp: false,
  },
  {
    label: 'Success Rate',
    value: '98.5%',
    icon: 'i-lucide-check-circle',
    trend: '+0.8%',
    trendUp: true,
  },
];

const recentActivity = [
  {
    action: 'Logged in',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    icon: 'i-lucide-log-in',
  },
  {
    action: 'Updated profile',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    icon: 'i-lucide-user',
  },
  {
    action: 'API key generated',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    icon: 'i-lucide-key',
  },
  {
    action: 'Settings changed',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    icon: 'i-lucide-settings',
  },
];

function formatTimeAgo(timestamp: string) {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'Just now';
}
</script>

<template>
  <UContainer class="py-12">
    <div class="max-w-6xl mx-auto">
      <!-- Welcome Header -->
      <div class="mb-8">
        <h1 class="text-3xl sm:text-4xl font-bold mb-2">Welcome back, {{ user?.name || user?.login || 'User' }}! 👋</h1>
        <p class="text-lg text-gray-600 dark:text-gray-400">Here's what's happening with your account today.</p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <UCard v-for="stat in stats" :key="stat.label">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <div class="p-2 bg-primary/10 rounded-lg">
                <UIcon :name="stat.icon" class="w-5 h-5 text-primary" />
              </div>
              <UBadge :color="stat.trendUp ? 'success' : 'error'" variant="soft" size="sm">
                {{ stat.trend }}
              </UBadge>
            </div>
            <div>
              <p class="text-2xl font-bold">{{ stat.value }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ stat.label }}</p>
            </div>
          </div>
        </UCard>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Recent Activity -->
        <UCard class="lg:col-span-2">
          <template #header>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-activity" class="w-5 h-5" />
                <h2 class="text-xl font-semibold">Recent Activity</h2>
              </div>
              <UButton color="neutral" variant="ghost" size="sm" icon="i-lucide-refresh-cw"> Refresh </UButton>
            </div>
          </template>

          <div class="space-y-4">
            <div
              v-for="(activity, index) in recentActivity"
              :key="index"
              class="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <div class="p-2 bg-primary/10 rounded-full">
                <UIcon :name="activity.icon" class="w-4 h-4 text-primary" />
              </div>
              <div class="flex-1">
                <p class="font-medium">{{ activity.action }}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ formatTimeAgo(activity.timestamp) }}
                </p>
              </div>
            </div>
          </div>
        </UCard>

        <!-- Quick Actions -->
        <UCard>
          <template #header>
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-zap" class="w-5 h-5" />
              <h2 class="text-xl font-semibold">Quick Actions</h2>
            </div>
          </template>

          <div class="space-y-2">
            <UButton to="/profile" color="neutral" variant="soft" block icon="i-lucide-user"> View Profile </UButton>
            <UButton color="neutral" variant="soft" block icon="i-lucide-settings"> Settings </UButton>
            <UButton color="neutral" variant="soft" block icon="i-lucide-bell"> Notifications </UButton>
            <UButton color="neutral" variant="soft" block icon="i-lucide-help-circle"> Help Center </UButton>
          </div>

          <template #footer>
            <div class="text-sm text-gray-500 dark:text-gray-400 text-center">
              Need help? <a href="#" class="text-primary hover:underline">Contact Support</a>
            </div>
          </template>
        </UCard>
      </div>

      <!-- Info Banner -->
      <UCard class="mt-6 border-l-4 border-primary">
        <div class="flex items-start gap-3">
          <UIcon name="i-lucide-info" class="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p class="font-semibold mb-1">Dashboard Preview</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              This is a demo dashboard. In a real application, this would display your actual account metrics, recent
              activities, and personalized content.
            </p>
          </div>
        </div>
      </UCard>
    </div>
  </UContainer>
</template>
