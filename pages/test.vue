<script setup>
const achievementStore = useAchievementStore();
await achievementStore.fetchAllAchievements();
await achievementStore.fetchAllUsersFinishedAchievements();
await achievementStore.populateUsersAchievementProgress();

</script>

<template>
    <div class="pt-20">
        <pre>{{ achievementStore.finishedAchievementList }}</pre>
        <pre>{{ achievementStore.unfinishedAchievementList }}</pre>
        <pre>{{ achievementStore.achievementList }}</pre>
        <pre>{{ achievementStore.usersAchievementProgress }}</pre>
    </div>
</template>
